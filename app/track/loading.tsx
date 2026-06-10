"use client";

import { Roboto_Mono } from "next/font/google";

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function Loading() {
  return (
    <main className={`track-page ${robotoMono.className}`}>
      <div className="sk-back">
        <span className="sk" style={{ width: 20, height: 20, borderRadius: 4, display: "inline-block" }} />
        <span className="sk" style={{ width: 40, height: 14, display: "inline-block" }} />
      </div>

      <section className="track-container">
        <div className="track-label-row">
          <span className="track-line" />
          <div className="track-label-wrap">
            <span className="sk" style={{ width: 130, height: 13, display: "block" }} />
            <span className="sk" style={{ width: 170, height: 10, display: "block", marginTop: 8 }} />
          </div>
          <span className="track-line" />
        </div>

        <span className="sk sk-title" />
        <span className="sk sk-desc-1" />
        <span className="sk sk-desc-2" />

        <div className="sk-form">
          <span className="sk sk-input" />
          <span className="sk sk-button" />
        </div>

        <div className="sk-example">
          <span className="sk" style={{ width: 60, height: 14, display: "inline-block" }} />
          <span className="sk" style={{ width: 140, height: 14, display: "inline-block" }} />
          <span className="sk" style={{ width: 120, height: 14, display: "inline-block" }} />
        </div>

        <div className="sk-features">
          {[90, 90, 110].map((w, i) => (
            <div key={i} className="sk-feature">
              <span className="sk" style={{ width: 12, height: 12, borderRadius: "50%", display: "inline-block" }} />
              <span className="sk" style={{ width: w, height: 14, display: "inline-block" }} />
            </div>
          ))}
        </div>
      </section>

      <style jsx>{`
        @keyframes shimmer {
          0%   { background-position: -600px 0; }
          100% { background-position:  600px 0; }
        }

        .sk {
          background: linear-gradient(
            90deg,
            rgba(168, 85, 247, 0.08) 25%,
            rgba(168, 85, 247, 0.20) 50%,
            rgba(168, 85, 247, 0.08) 75%
          );
          background-size: 600px 100%;
          animation: shimmer 1.6s infinite linear;
          border-radius: 6px;
        }

        .track-page {
          min-height: 100vh;
          width: 100%;
          padding: 72px 56px;
          color: #ffffff;
          background:
            radial-gradient(circle at 18% 18%, rgba(88, 28, 135, 0.38), transparent 34%),
            radial-gradient(circle at 84% 24%, rgba(88, 28, 135, 0.22), transparent 36%),
            linear-gradient(135deg, #1b0735 0%, #120323 46%, #080111 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
          overflow-x: hidden;
          position: relative;
        }

        .sk-back {
          position: absolute;
          top: 34px;
          left: 38px;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .track-container {
          width: 100%;
          max-width: 1040px;
          text-align: center;
        }

        .track-label-row {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 18px;
          margin-bottom: 48px;
        }

        .track-label-wrap {
          min-width: 190px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .track-line {
          flex: 1;
          height: 1px;
          background: rgba(168, 85, 247, 0.2);
        }

        .sk-title {
          width: min(560px, 70%);
          height: 56px;
          display: block;
          margin: 0 auto 24px;
          border-radius: 8px;
        }

        .sk-desc-1 {
          width: min(640px, 80%);
          height: 16px;
          display: block;
          margin: 0 auto 10px;
        }

        .sk-desc-2 {
          width: min(480px, 60%);
          height: 16px;
          display: block;
          margin: 0 auto 64px;
        }

        .sk-form {
          display: grid;
          grid-template-columns: 1fr 292px;
          max-width: 960px;
          margin: 0 auto 28px;
        }

        .sk-input {
          height: 74px;
          display: block;
          border-radius: 8px 0 0 8px;
        }

        .sk-button {
          height: 74px;
          display: block;
          border-radius: 0 8px 8px 0;
          opacity: 0.7;
        }

        .sk-example {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 14px;
          margin-bottom: 64px;
        }

        .sk-features {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
          max-width: 940px;
          margin: 0 auto;
        }

        .sk-feature {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
        }

        @media (max-width: 900px) {
          .track-page {
            padding: 72px 24px 56px;
          }

          .sk-back {
            top: 26px;
            left: 24px;
          }

          .sk-form {
            grid-template-columns: 1fr;
          }

          .sk-input {
            border-radius: 8px 8px 0 0;
          }

          .sk-button {
            border-radius: 0 0 8px 8px;
          }

          .sk-features {
            grid-template-columns: 1fr;
            gap: 18px;
          }
        }
      `}</style>
    </main>
  );
}