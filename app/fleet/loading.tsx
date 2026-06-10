"use client";

import { Roboto_Mono } from "next/font/google";

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function LoadingFleet() {
  const statPlaceholders = Array(4).fill(null);
  const cardPlaceholders = Array(3).fill(null);

  return (
    <main className={`fleet-page-custom ${robotoMono.className}`}>
      <section className="fleet-content-custom">
        
        {/* SKELETON: TOP STATS ROW */}
        <div className="fleet-stats-custom">
          {statPlaceholders.map((_, i) => (
            <div className="fleet-stat-box-custom" key={i}>
              <span className="sk sk-stat-value" />
              <span className="sk sk-stat-label" />
            </div>
          ))}
        </div>

        {/* SKELETON: CENTER TEXT BLOCK */}
        <div className="fleet-center-text-custom">
          <span className="sk sk-main-title" />
          <span className="sk sk-main-title sub" />
          
          <div className="paragraph-shimmer">
            <span className="sk sk-text-line" />
            <span className="sk sk-text-line" />
            <span className="sk sk-text-line half" />
          </div>
        </div>

        {/* SKELETON: BOTTOM FEATURE CARDS */}
        <div className="fleet-features-custom">
          {cardPlaceholders.map((_, i) => (
            <div className="fleet-feature-card-custom" key={i}>
              <span className="sk sk-feature-icon" />
              <span className="sk sk-feature-title" />
              <span className="sk sk-feature-desc" />
            </div>
          ))}
        </div>

      </section>

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

        /* Layout & Background Utama Disamakan */
        .fleet-page-custom {
          min-height: calc(100vh - 71px);
          width: 100%;
          padding: 28px 56px 64px;
          background:
            radial-gradient(
              circle at 15% 18%,
              rgba(88, 28, 135, 0.36),
              transparent 34%
            ),
            radial-gradient(
              circle at 85% 25%,
              rgba(88, 28, 135, 0.22),
              transparent 36%
            ),
            linear-gradient(
              135deg,
              #1b0735 0%,
              #120323 46%,
              #0a0113 100%
            );
          box-sizing: border-box;
          overflow-x: hidden;
        }

        .fleet-content-custom {
          width: 100%;
          max-width: 1100px;
          margin: 0 auto;
        }

        /* STYLE: STATS SKELETON */
        .fleet-stats-custom {
          width: 100%;
          min-height: 138px;
          padding: 28px 54px;
          border: 1.5px solid rgba(168, 85, 247, 0.2);
          border-radius: 8px;
          background: rgba(11, 9, 32, 0.5);
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          align-items: center;
          gap: 24px;
          box-sizing: border-box;
        }

        .fleet-stat-box-custom {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .sk-stat-value {
          width: 75px;
          height: 48px;
          margin-bottom: 14px;
        }

        .sk-stat-label {
          width: 100px;
          height: 11px;
        }

        /* STYLE: CENTER TEXT SKELETON */
        .fleet-center-text-custom {
          max-width: 920px;
          margin: 34px auto 28px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .sk-main-title {
          width: 70%;
          height: 30px;
          margin-bottom: 10px;
        }

        .sk-main-title.sub {
          width: 50%;
          margin-bottom: 24px;
        }

        .paragraph-shimmer {
          width: 100%;
          max-width: 880px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }

        .sk-text-line {
          width: 100%;
          height: 15px;
        }

        .sk-text-line.half {
          width: 60%;
        }

        /* STYLE: FEATURE CARDS SKELETON */
        .fleet-features-custom {
          width: 100%;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          margin-top: 28px;
        }

        .fleet-feature-card-custom {
          min-height: 150px;
          padding: 28px 24px;
          border: 1.5px solid rgba(168, 85, 247, 0.2);
          border-radius: 8px;
          background: rgba(11, 9, 32, 0.5);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
        }

        .sk-feature-icon {
          width: 34px;
          height: 34px;
          margin-bottom: 18px;
          border-radius: 6px;
        }

        .sk-feature-title {
          width: 90px;
          height: 17px;
          margin-bottom: 10px;
        }

        .sk-feature-desc {
          width: 140px;
          height: 12px;
        }

        /* RESPONSIVE DESIGN (Ponsel pintar) */
        @media (max-width: 900px) {
          .fleet-page-custom {
            padding: 28px 24px 56px;
          }

          .fleet-stats-custom {
            grid-template-columns: repeat(2, 1fr);
            padding: 28px 24px;
          }

          .fleet-features-custom {
            grid-template-columns: 1fr;
          }

          .sk-main-title {
            width: 90%;
          }
          
          .sk-main-title.sub {
            width: 80%;
          }
        }
      `}</style>
    </main>
  );
}