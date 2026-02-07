import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,       // 네트워크(폰/다른기기)에서도 접속 가능 (원치 않으면 제거)
    port: 5173,
    strictPort: true, // 5173이 이미 쓰이면 다른 포트로 자동 변경하지 않고 에러 (원치 않으면 제거)
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:5105',
        changeOrigin: true,
        secure: false,
      },
      '/images': {
        target: 'http://127.0.0.1:5105',
        changeOrigin: true,
        secure: false,
      },
      '/files': {
        target: 'http://127.0.0.1:5105',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
