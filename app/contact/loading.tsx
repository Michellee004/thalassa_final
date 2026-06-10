"use client";

import { Roboto_Mono } from "next/font/google";

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function LoadingContact() {
  const contactItemPlaceholders = Array(4).fill(null);

  return (
    <main className={`contact-page-custom ${robotoMono.className}`}>
      <section className="contact-content-custom">
        
        {/* SKELETON: LEFT SIDE (INFO) */}
        <div className="contact-info-side-custom">
          <span className="sk sk-main-title" />
          <span className="sk sk-sub-title" />

          <div className="contact-list-custom">
            {contactItemPlaceholders.map((_, i) => (
              <div className="contact-item-custom" key={i}>
                {/* Icon Placeholder */}
                <span className="sk sk-icon-placeholder" />

                {/* Label & Value Text Placeholder */}
                <div className="text-rows-placeholder">
                  <span className="sk sk-label-line" />
                  <span className="sk sk-value-line" />
                  {/* Baris tambahan untuk menyamakan tinggi alamat kantor */}
                  {i === 2 && <span className="sk sk-value-line short" />}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SKELETON: RIGHT SIDE (IMAGE) */}
        <div className="contact-image-side-custom">
          <div className="contact-image-frame-custom">
            <span className="sk sk-image-placeholder" />
          </div>
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

        /* Layout Utama Disamakan dengan Halaman Asli */
        .contact-page-custom {
          min-height: calc(100vh - 71px);
          width: 100%;
          padding: 62px 56px 72px;
          background:
            radial-gradient(
              circle at 16% 18%,
              rgba(88, 28, 135, 0.36),
              transparent 34%
            ),
            radial-gradient(
              circle at 85% 26%,
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

        .contact-content-custom {
          width: 100%;
          max-width: 1120px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: center;
        }

        /* INFO SIDE SKELETON */
        .sk-main-title {
          width: 260px;
          height: 44px;
          margin-bottom: 10px;
        }

        .sk-sub-title {
          width: 180px;
          height: 26px;
          margin-bottom: 48px;
        }

        .contact-list-custom {
          display: flex;
          flex-direction: column;
          gap: 34px;
        }

        .contact-item-custom {
          display: grid;
          grid-template-columns: 34px 1fr;
          gap: 18px;
          align-items: flex-start;
        }

        .sk-icon-placeholder {
          width: 24px;
          height: 24px;
          border-radius: 4px;
        }

        .text-rows-placeholder {
          display: flex;
          flex-direction: column;
          gap: 10px;
          width: 100%;
        }

        .sk-label-line {
          width: 120px;
          height: 11px;
        }

        .sk-value-line {
          width: 80%;
          height: 15px;
        }

        .sk-value-line.short {
          width: 50%;
        }

        /* IMAGE SIDE SKELETON */
        .contact-image-side-custom {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
        }

        .contact-image-frame-custom {
          width: 100%;
          max-width: 520px;
          height: 360px;
          border-radius: 16px;
          overflow: hidden;
          border: 1.5px solid rgba(168, 85, 247, 0.2);
          background: rgba(11, 9, 32, 0.5);
          box-sizing: border-box;
        }

        .sk-image-placeholder {
          width: 100%;
          height: 100%;
          border-radius: 0;
        }

        /* MEDIA QUERIES RESPONSIVE */
        @media (max-width: 900px) {
          .contact-page-custom {
            padding: 42px 24px 58px;
          }

          .contact-content-custom {
            grid-template-columns: 1fr;
            gap: 42px;
          }

          .sk-main-title {
            width: 200px;
            height: 34px;
          }

          .sk-sub-title {
            width: 140px;
            height: 22px;
            margin-bottom: 36px;
          }

          .contact-image-frame-custom {
            height: 300px;
          }
        }
      `}</style>
    </main>
  );
}