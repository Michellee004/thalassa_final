"use client";

import { Roboto_Mono } from "next/font/google";

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function LoadingLogin() {
  return (
    <main className={`page-wrapper-sk ${robotoMono.className}`}>
      {/* Background overlay tiruan */}
      <div className="bg-overlay-sk" />

      <div className="login-card-sk">
        {/* SKELETON: LOGO SECTION */}
        <div className="logo-wrap-sk">
          <span className="sk sk-logo-circle" />
          <div className="logo-text-sk">
            <span className="sk sk-logo-title" />
            <span className="sk sk-logo-sub" />
          </div>
        </div>

        {/* SKELETON: FORM SECTION */}
        <div className="form-group-sk">
          <span className="sk sk-label" />
          <span className="sk sk-input" />
        </div>

        <div className="form-group-sk">
          <span className="sk sk-label" />
          <span className="sk sk-input" />
        </div>

        {/* SKELETON: BUTTONS */}
        <span className="sk sk-btn-submit" />
        <span className="sk sk-back-link" />
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
          border-radius: 6px;
          display: block;
        }

        /* Wrapper & Layout Disamakan dengan login.css */
        .page-wrapper-sk {
          min-height: 100vh;
          width: 100%;
          background: #050408;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          box-sizing: border-box;
          padding: 24px;
        }

        .bg-overlay-sk {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 50% 50%, rgba(88, 28, 135, 0.25), transparent 70%);
          z-index: 1;
        }

        .login-card-sk {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 480px;
          background: rgba(12, 9, 20, 0.75);
          border: 1.5px solid rgba(168, 85, 247, 0.2);
          border-radius: 16px;
          padding: 48px;
          box-sizing: border-box;
        }

        /* LOGO SECTION SHIMMER */
        .logo-wrap-sk {
          display: flex;
          align-items: center;
          gap: 18px;
          margin-bottom: 42px;
        }

        .sk-logo-circle {
          width: 52px;
          height: 52px;
          border-radius: 50%;
        }

        .logo-text-sk {
          display: flex;
          flex-direction: column;
          gap: 8px;
          flex: 1;
        }

        .sk-logo-title {
          width: 85%;
          height: 18px;
        }

        .sk-logo-sub {
          width: 60%;
          height: 12px;
        }

        /* INPUT GROUP SHIMMER */
        .form-group-sk {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 28px;
        }

        .sk-label {
          width: 70px;
          height: 12px;
        }

        .sk-input {
          width: 100%;
          height: 52px;
          border-radius: 8px;
        }

        /* BUTTONS SHIMMER */
        .sk-btn-submit {
          width: 100%;
          height: 52px;
          border-radius: 8px;
          margin-top: 36px;
          margin-bottom: 24px;
        }

        .sk-back-link {
          width: 130px;
          height: 14px;
          margin: 0 auto;
        }

        /* Responsive Mobile */
        @media (max-width: 480px) {
          .login-card-sk {
            padding: 32px 24px;
          }
        }
      `}</style>
    </main>
  );
}