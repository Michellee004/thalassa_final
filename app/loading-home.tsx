"use client";

import { Roboto_Mono } from "next/font/google";

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function LoadingHome() {
  return (
    <main className={`page-container-sk ${robotoMono.className}`}>
      <div className="home-overlay-sk" />

      <div className="home-content-sk">
        {/* SKELETON: PILL BADGE */}
        <span className="sk sk-pill" />

        {/* SKELETON: LOGO */}
        <span className="sk sk-home-logo" />

        {/* SKELETON: MAIN TITLES */}
        <span className="sk sk-home-title" />
        <span className="sk sk-home-title purple" />

        {/* SKELETON: SUBTITLE & DESC */}
        <span className="sk sk-home-subtitle" />
        <span className="sk sk-home-desc" />

        {/* SKELETON: TRACK BUTTON */}
        <span className="sk sk-btn-track" />
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0%   { background-position: -600px 0; }
          100% { background-position:  600px 0; }
        }

        /* Base Shimmer Efek Ungu */
        .sk {
          background: linear-gradient(
            90deg,
            rgba(168, 85, 247, 0.06) 25%,
            rgba(168, 85, 247, 0.18) 50%,
            rgba(168, 85, 247, 0.06) 75%
          );
          background-size: 600px 100%;
          animation: shimmer 1.6s infinite linear;
          border-radius: 4px;
          display: block;
        }

        /* Layout Container mengikuti home.css */
        .page-container-sk {
          min-height: calc(100vh - 71px);
          width: 100%;
          background: #050408;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          box-sizing: border-box;
          overflow: hidden;
        }

        .home-overlay-sk {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 50% 50%, rgba(88, 28, 135, 0.3), transparent 70%);
          z-index: 1;
        }

        .home-content-sk {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          width: 100%;
          max-width: 600px;
          padding: 0 24px;
          box-sizing: border-box;
        }

        .sk-pill {
          width: 290px;
          height: 22px;
          border-radius: 999px;
          margin-bottom: 24px;
        }

        .sk-home-logo {
          width: 110px;
          height: 110px;
          border-radius: 50%;
          margin-bottom: 20px;
        }

        .sk-home-title {
          width: 280px;
          height: 52px;
          margin-bottom: 8px;
        }

        .sk-home-title.purple {
          width: 440px;
          height: 52px;
          margin-bottom: 24px;
        }

        .sk-home-subtitle {
          width: 340px;
          height: 16px;
          margin-bottom: 14px;
        }

        .sk-home-desc {
          width: 220px;
          height: 12px;
          margin-bottom: 38px;
        }

        .sk-btn-track {
          width: 190px;
          height: 46px;
          border-radius: 8px;
        }

        /* Responsive Mobile */
        @media (max-width: 600px) {
          .sk-home-title { width: 200px; height: 38px; }
          .sk-home-title.purple { width: 280px; height: 38px; }
          .sk-home-subtitle { width: 260px; }
        }
      `}</style>
    </main>
  );
}