#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"
CLIENT_DIR="$ROOT_DIR/client"
SERVER_DIR="$ROOT_DIR/server"

CLIENT_PORT="${CLIENT_PORT:-5173}"
SERVER_PORT="${SERVER_PORT:-5105}"

FORCE=false
if [[ "${1:-}" == "--force" ]]; then
  FORCE=true
fi

echo "✅ Dev runner"
echo " - Client: $CLIENT_DIR (port $CLIENT_PORT)"
echo " - Server: $SERVER_DIR (port $SERVER_PORT)"
echo " - Force:  $FORCE"
echo

# -------------------------------
# helpers
# -------------------------------
pids_on_port() {
  lsof -nP -iTCP:"$1" -sTCP:LISTEN -t 2>/dev/null || true
}

print_port_owner() {
  local pids
  pids="$(pids_on_port "$1")"
  [[ -z "$pids" ]] && return
  echo "🔎 Port $1 is in use by:"
  for pid in $pids; do
    ps -p "$pid" -o pid=,command= 2>/dev/null || true
  done
}

kill_listeners_on_port() {
  local pids
  pids="$(pids_on_port "$1")"
  [[ -z "$pids" ]] && return
  echo "🧨 Killing listeners on port $1"
  for pid in $pids; do
    kill -KILL "$pid" 2>/dev/null || true
  done
}

kill_orphan_watchers() {
  # Catch stale dotnet-watch supervisor/children that can survive Ctrl+C.
  pkill -9 -f "dotnet-watch.dll" 2>/dev/null || true
  pkill -9 -f "DOTNET_WATCH=1" 2>/dev/null || true
  pkill -9 -f "$SERVER_DIR/bin/Debug/net9.0/server" 2>/dev/null || true
}

wait_port_free() {
  local port="$1"
  for _ in {1..200}; do
    [[ -z "$(pids_on_port "$port")" ]] && return 0
    sleep 0.05
  done
  echo "⚠️ Port $port did not free in time"
  print_port_owner "$port"
}

kill_tree() {
  local pid="$1"
  [[ -z "$pid" ]] && return

  # Stop supervisor first so it doesn't respawn children while we clean up.
  kill -TERM "$pid" 2>/dev/null || true

  local children
  children="$(pgrep -P "$pid" 2>/dev/null || true)"
  for c in $children; do
    kill_tree "$c"
  done

  for _ in {1..40}; do
    kill -0 "$pid" 2>/dev/null || return 0
    sleep 0.05
  done

  kill -KILL "$pid" 2>/dev/null || true
}

# -------------------------------
# cleanup
# -------------------------------
CLEANED=0
cleanup() {
  [[ "$CLEANED" -eq 1 ]] && return
  CLEANED=1
  trap - INT TERM EXIT

  echo
  echo "🧹 Cleaning up..."

  [[ -n "${CLIENT_PID:-}" ]] && kill_tree "$CLIENT_PID"
  [[ -n "${SERVER_PID:-}" ]] && kill_tree "$SERVER_PID"
  wait "${CLIENT_PID:-}" "${SERVER_PID:-}" 2>/dev/null || true

  sleep 0.5

  kill_orphan_watchers
  kill_listeners_on_port "$CLIENT_PORT"
  kill_listeners_on_port "$SERVER_PORT"
  wait_port_free "$CLIENT_PORT"
  wait_port_free "$SERVER_PORT"

  echo "✅ Cleanup done."
}
trap cleanup INT TERM EXIT

# -------------------------------
# preflight
# -------------------------------
CLIENT_PIDS="$(pids_on_port "$CLIENT_PORT")"
SERVER_PIDS="$(pids_on_port "$SERVER_PORT")"

if [[ -n "$CLIENT_PIDS" || -n "$SERVER_PIDS" ]]; then
  echo "⚠️ Detected ports already in use."
  [[ -n "$CLIENT_PIDS" ]] && print_port_owner "$CLIENT_PORT"
  [[ -n "$SERVER_PIDS" ]] && print_port_owner "$SERVER_PORT"
  echo

  if $FORCE; then
    echo "🧹 --force enabled → cleaning existing processes..."
    pkill -9 -f "dotnet watch" 2>/dev/null || true
    pkill -9 -f "dotnet-watch.dll" 2>/dev/null || true
    pkill -9 -f "$SERVER_DIR/bin/Debug" 2>/dev/null || true
    pkill -9 -f "server --urls http://127.0.0.1:$SERVER_PORT" 2>/dev/null || true
    kill_listeners_on_port "$CLIENT_PORT"
    kill_listeners_on_port "$SERVER_PORT"
    wait_port_free "$CLIENT_PORT"
    wait_port_free "$SERVER_PORT"
  else
    echo "👉 Run with --force to clean them up."
    exit 1
  fi
fi

# -------------------------------
# start server
# -------------------------------
echo "🚀 Starting .NET server (dotnet run, explicit URL)..."
(
  cd "$SERVER_DIR"
  export ASPNETCORE_ENVIRONMENT=Development

  # ✅ 혹시 터미널/쉘에 남아있는 URL 강제 변수를 완전 제거
  unset ASPNETCORE_URLS || true
  unset DOTNET_URLS || true
  unset URLS || true

  # Run profile-less to avoid launchSettings URL collisions.
  dotnet run --no-launch-profile --urls "http://127.0.0.1:$SERVER_PORT"
) &
SERVER_PID=$!

# -------------------------------
# start client
# -------------------------------
echo "⚡ Starting client (Vite)..."
(
  cd "$CLIENT_DIR"
  npm run dev -- --port "$CLIENT_PORT" --host
) &
CLIENT_PID=$!

echo
echo "🎯 Running:"
echo " - Client PID: $CLIENT_PID"
echo " - Server PID: $SERVER_PID"
echo
echo "Open:"
echo " - Client: http://localhost:$CLIENT_PORT"
echo " - API:    http://localhost:$SERVER_PORT"
echo
echo "Press Ctrl+C to stop."

# -------------------------------
# keep alive
# -------------------------------
while true; do
  kill -0 "$CLIENT_PID" 2>/dev/null || break
  kill -0 "$SERVER_PID" 2>/dev/null || break
  sleep 1
done
