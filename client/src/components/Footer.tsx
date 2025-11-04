export default function Footer() {
  return (
    <footer className="bg-black/0">
      <div className="bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-700">
        <div className="mx-auto max-w-6xl px-6 py-10 flex flex-col items-center gap-8">
          {/* icons */}
          <div className="flex gap-8">
            {/* 1. Email */}
            <a
              href="mailto:samashe.chang@gmail.com"
              className="w-10 h-10 flex items-center justify-center text-white transition transform hover:-translate-y-1.5"
              aria-label="Email"
            >
              <svg
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth={1.8} 
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 5h18v14H3z" />
                <path d="M3 5l9 7 9-7" />
              </svg>
            </a>

            {/* 2. LinkedIn */}
            <a
              href="https://www.linkedin.com/in/samashe/"
              className="w-10 h-10 flex items-center justify-center text-white transition transform hover:-translate-y-1.5"
              aria-label="LinkedIn"
            >
              <svg
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="white"
              >
                <path d="M6.94 8.5H3.56V20h3.38V8.5zM5.25 3.75A1.75 1.75 0 105.26 7.25 1.75 1.75 0 005.25 3.75zM20.44 20h-3.37v-5.8c0-1.38-.5-2.33-1.73-2.33-.94 0-1.5.64-1.75 1.25-.09.2-.11.49-.11.78V20H10.1s.04-9.9 0-10.9h3.38v1.55A3.37 3.37 0 0116.5 8c2.21 0 3.94 1.44 3.94 4.53V20z" />
              </svg>
            </a>

            {/* 3. GitHub */}
            <a
              href="https://github.com/DobbyLikesCoding"
              className="w-10 h-10 flex items-center justify-center text-white transition transform hover:-translate-y-1.5"
              aria-label="GitHub"
            >
              <svg
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="white"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2C6.48 2 2 6.58 2 12.2c0 4.5 2.87 8.32 6.84 9.67.5.1.68-.22.68-.48 0-.24-.01-.87-.01-1.69-2.78.62-3.37-1.37-3.37-1.37-.45-1.17-1.11-1.48-1.11-1.48-.91-.64.07-.62.07-.62 1 .07 1.54 1.05 1.54 1.05.9 1.55 2.36 1.1 2.94.84.09-.67.35-1.1.64-1.35-2.22-.26-4.56-1.13-4.56-4.99 0-1.1.39-1.99 1.03-2.7-.1-.26-.45-1.28.1-2.66 0 0 .84-.27 2.75 1.03a9.36 9.36 0 015 0c1.9-1.3 2.74-1.03 2.74-1.03.55 1.38.2 2.4.1 2.66.64.71 1.03 1.6 1.03 2.7 0 3.88-2.34 4.72-4.57 4.98.36.32.68.93.68 1.88 0 1.36-.01 2.45-.01 2.78 0 .26.18.58.69.48 3.97-1.35 6.84-5.17 6.84-9.67C22 6.58 17.52 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>

          {/* text */}
          <p className="text-sm text-white tracking-wide">
            © Sunghyun Chang {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}