"use client";

import { Roboto_Mono } from "next/font/google";

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function LoadingServices() {
  // Membuat placeholder 4 card sesuai jumlah data layanan Anda
  const skeletonCards = Array(4).fill(null);

  return (
    <main className={`services-page-clean ${robotoMono.className}`}>
      <section className="services-content-clean">
        <div className="services-grid-clean">
          {skeletonCards.map((_, index) => (
            <div className="service-card-clean" key={index}>
              <div className="service-card-inner-clean">
                {/* Skeleton untuk Icon Kotak */}
                <span className="sk sk-icon" />

                <div className="service-text-clean">
                  {/* Skeleton untuk Judul Layanan */}
                  <span className="sk sk-title" />
                  
                  {/* Skeleton untuk Deskripsi Teks Baris 1 & 2 */}
                  <span className="sk sk-desc-1" />
                  <span className="sk sk-desc-2" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <style jsx>{`
        @keyframes shimmer {
          0%   { background-position: -600px 0; }
          100% { background-position:  600px 0; }
        }

        /* Base Animasi Shimmer Efek Ungu */
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
        }

        /* Layout & Background Utama Disamakan dengan halaman aslinya */
        .services-page-clean {
          min-height: calc(100vh - 71px);
          width: 100%;
          padding: 54px 56px 70px;
          background:
            radial-gradient(
              circle at 16% 18%,
              rgba(88, 28, 135, 0.35),
              transparent 32%
            ),
            linear-gradient(
              135deg,
              #1b0735 0%,
              #120323 45%,
              #0a0113 100+px
            );
          box-sizing: border-box;
          overflow-x: hidden;
        }

        .services-content-clean {
          width: 100%;
          max-width: 1320px;
          margin: 0 auto;
        }

        .services-grid-clean {
          width: 100%;
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 44px 38px;
        }

        .service-card-clean {
          min-height: 240px;
          border-radius: 10px;
          background: linear-gradient(
            135deg,
            rgba(16, 10, 42, 0.6),
            rgba(9, 5, 26, 0.6)
          );
          border: 1.5px solid rgba(168, 85, 247, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
        }

        .service-card-inner-clean {
          width: 100%;
          height: 100%;
          padding: 38px 46px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
        }

        /* Ukuran Tiap Komponen Elemen */
        .sk-icon {
          width: 56px;
          height: 56px;
          margin-bottom: 26px;
          border-radius: 11px;
          display: block;
        }

        .service-text-clean {
          width: 100%;
          max-width: 520px;
        }

        .sk-title {
          width: 60%;
          height: 18px;
          display: block;
          margin-bottom: 18px;
        }

        .sk-desc-1 {
          width: 90%;
          height: 13px;
          display: block;
          margin-bottom: 8px;
        }

        .sk-desc-2 {
          width: 75%;
          height: 13px;
          display: block;
        }

        /* Query Responsif Ponsel pintar */
        @media (max-width: 900px) {
          .services-page-clean {
            padding: 34px 24px 56px;
          }

          .services-grid-clean {
            grid-template-columns: 1fr;
            gap: 24px;
          }

          .service-card-clean {
            min-height: 210px;
          }

          .service-card-inner-clean {
            padding: 32px;
          }
        }
      `}</style>
    </main>
  );
}