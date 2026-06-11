"use client";

import { useEffect, useState } from "react"; 
import Navbar from "../components/Navbar";
import LoadingFleet from "./loading"; 
import "../css/home.css";
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export default function Fleet() {
  const [isLoading, setIsLoading] = useState(true); 
  const [vessels, setVessels] = useState<any[]>([]);
  const [stats, setStats] = useState({
    activeFleets: 0,
    completedVoyages: 0,
    destinationPorts: 0
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const { data: vesselData } = await supabase.from("vessel").select("*");
        const { data: cargoData } = await supabase.from("cargo").select("status_pengiriman, kota_tujuan");
        
        const vesselList = vesselData || [];
        const cargoList = cargoData || [];
        
        // Calculate dynamic stats
        const activeFleets = vesselList.filter(v => 
          v.status?.toLowerCase() === "active" || v.status?.toLowerCase() === "en route"
        ).length;
        
        const completedVoyages = cargoList.filter(c => 
          c.status_pengiriman?.toLowerCase() === "received"
        ).length;
        
        const uniqueDestinations = new Set(cargoList.map(c => c.kota_tujuan).filter(Boolean));
        const destinationPorts = uniqueDestinations.size;

        setVessels(vesselList);
        setStats({
          activeFleets: activeFleets || vesselList.length, // Fallback if none are marked active/enroute
          completedVoyages: completedVoyages || 200,      // Fallback to mock if empty
          destinationPorts: destinationPorts || 15        // Fallback to mock if empty
        });
      } catch (err) {
        console.error("Error fetching database stats:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  // Jika masih loading dalam 1 detik pertama, tampilkan skeleton
  if (isLoading) {
    return (
      <>
        <Navbar />
        <LoadingFleet />
      </>
    );
  }


  return (
    <>
      <Navbar />

      <main className="fleet-page-custom">
        <section className="fleet-content-custom">
          <div className="fleet-stats-custom">
            <div className="fleet-stat-box-custom">
              <div className="fleet-stat-value-custom">{stats.activeFleets}</div>
              <div className="fleet-stat-label-custom">ACTIVE FLEETS</div>
            </div>

            <div className="fleet-stat-box-custom">
              <div className="fleet-stat-value-custom">{stats.completedVoyages}+</div>
              <div className="fleet-stat-label-custom">COMPLETED VOYAGES</div>
            </div>

            <div className="fleet-stat-box-custom">
              <div className="fleet-stat-value-custom">{stats.destinationPorts}</div>
              <div className="fleet-stat-label-custom">DESTINATION PORTS</div>
            </div>

            <div className="fleet-stat-box-custom">
              <div className="fleet-stat-value-custom">24/7</div>
              <div className="fleet-stat-label-custom">LIVE MONITORING</div>
            </div>
          </div>

          <div className="fleet-center-text-custom">
            <h1>
              CONNECTING THE ARCHIPELAGO WITH <br />
              GLOBAL MARITIME STANDARDS
            </h1>

            <p>
              Thalassa Sisterhood Group is committed to being the most trusted
              and innovative maritime logistics partner in Southeast Asia,
              connecting strategic ports with secure, timely, and transparent
              shipping services.
            </p>
          </div>

          <div className="fleet-features-custom">
            <div className="fleet-feature-card-custom">
              <div className="fleet-feature-icon-custom">
                <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 3L19 6V11C19 15.5 16.1 19.7 12 21C7.9 19.7 5 15.5 5 11V6L12 3Z"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h2>SAFETY</h2>
              <p>IMO &amp; SOLAS Standards</p>
            </div>

            <div className="fleet-feature-card-custom">
              <div className="fleet-feature-icon-custom">
                <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M4 13H8L10 7L14 17L16 11H20"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h2>EFFICIENCY</h2>
              <p>Real-time route optimization</p>
            </div>

            <div className="fleet-feature-card-custom">
              <div className="fleet-feature-icon-custom">
                <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M16 11C17.66 11 19 9.66 19 8C19 6.34 17.66 5 16 5"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                  <path
                    d="M8 11C9.66 11 11 9.66 11 8C11 6.34 9.66 5 8 5C6.34 5 5 6.34 5 8C5 9.66 6.34 11 8 11Z"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  />
                  <path
                    d="M3 19C3 16.24 5.24 14 8 14C10.76 14 13 16.24 13 19"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                  <path
                    d="M14 14C16.76 14 19 16.24 19 19"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <h2>PROFESSIONAL</h2>
              <p>Internationally certified crew</p>
            </div>
          </div>

          {vessels.length > 0 && (
            <div className="vessel-list-section">
              <h2 className="vessel-list-title">OUR FLEET DATABASE</h2>
              <div className="vessel-grid-custom">
                {vessels.map((v) => (
                  <div key={v.id} className="vessel-card-custom">
                    <div className="vessel-card-header-custom">
                      <span className="vessel-type-custom">{v.jenis || "Container Ship"}</span>
                      <span className={`vessel-status-badge-custom status-${(v.status || "active").toLowerCase().replace(/\s+/g, '-')}`}>
                        {v.status || "Active"}
                      </span>
                    </div>
                    <h3 className="vessel-name-custom">{v.nama}</h3>
                    <div className="vessel-details-row-custom">
                      <div className="vessel-detail-item-custom">
                        <span className="detail-label-custom">CODE</span>
                        <span className="detail-value-custom font-mono">{v.kode}</span>
                      </div>
                      <div className="vessel-detail-item-custom">
                        <span className="detail-label-custom">CAPACITY</span>
                        <span className="detail-value-custom">{Number(v.kapasitas || 0).toLocaleString('id-ID')} Tons</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      </main>

      <style jsx>{`
        .fleet-page-custom {
          min-height: calc(100vh - 71px);
          width: 100%;
          padding: 28px 56px 64px;
          color: #ffffff;
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
          overflow-x: hidden;
        }

        .fleet-content-custom {
          width: 100%;
          max-width: 1100px;
          margin: 0 auto;
        }

        .fleet-stats-custom {
          width: 100%;
          min-height: 138px;
          padding: 28px 54px;
          border: 1.5px solid rgba(168, 85, 247, 0.72);
          border-radius: 8px;
          background: rgba(11, 9, 32, 0.72);
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          align-items: center;
          gap: 24px;
          box-shadow:
            0 0 0 1px rgba(168, 85, 247, 0.06),
            0 18px 48px rgba(0, 0, 0, 0.22);
        }

        .fleet-stat-box-custom {
          text-align: center;
        }

        .fleet-stat-value-custom {
          color: #a855f7;
          font-size: 48px;
          line-height: 1;
          font-weight: 900;
          letter-spacing: 0.05em;
          text-shadow:
            0 0 10px rgba(168, 85, 247, 0.85),
            0 0 24px rgba(168, 85, 247, 0.45);
          margin-bottom: 14px;
        }

        .fleet-stat-label-custom {
          color: rgba(226, 216, 255, 0.58);
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .fleet-center-text-custom {
          max-width: 920px;
          margin: 34px auto 28px;
          text-align: center;
        }

        .fleet-center-text-custom h1 {
          margin: 0 0 24px;
          color: #ffffff;
          font-size: 30px;
          line-height: 1.45;
          font-weight: 900;
          letter-spacing: 0.06em;
        }

        .fleet-center-text-custom p {
          margin: 0 auto;
          max-width: 880px;
          color: rgba(226, 216, 255, 0.66);
          font-size: 17px;
          line-height: 1.55;
          letter-spacing: 0.04em;
        }

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
          border: 1.5px solid rgba(168, 85, 247, 0.72);
          border-radius: 8px;
          background: rgba(11, 9, 32, 0.74);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          box-shadow:
            0 0 0 1px rgba(168, 85, 247, 0.06),
            0 18px 44px rgba(0, 0, 0, 0.18);
        }

        .fleet-feature-icon-custom {
          color: #a855f7;
          margin-bottom: 18px;
          filter: drop-shadow(0 0 12px rgba(168, 85, 247, 0.55));
        }

        .fleet-feature-card-custom h2 {
          margin: 0 0 10px;
          color: #ffffff;
          font-size: 17px;
          font-weight: 900;
          letter-spacing: 0.06em;
        }

        .fleet-feature-card-custom p {
          margin: 0;
          color: rgba(226, 216, 255, 0.62);
          font-size: 12px;
          letter-spacing: 0.04em;
        }

        .vessel-list-section {
          margin-top: 64px;
        }

        .vessel-list-title {
          font-size: 20px;
          font-weight: 900;
          letter-spacing: 0.15em;
          text-align: center;
          margin-bottom: 32px;
          color: #a855f7;
          text-shadow: 0 0 10px rgba(168, 85, 247, 0.4);
        }

        .vessel-grid-custom {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 24px;
        }

        .vessel-card-custom {
          padding: 24px;
          border: 1.5px solid rgba(168, 85, 247, 0.3);
          border-radius: 12px;
          background: rgba(11, 9, 32, 0.65);
          backdrop-filter: blur(10px);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.24);
          transition: all 0.3s ease;
        }

        .vessel-card-custom:hover {
          border-color: rgba(168, 85, 247, 0.85);
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(168, 85, 247, 0.15);
        }

        .vessel-card-header-custom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .vessel-type-custom {
          font-size: 11px;
          color: rgba(226, 216, 255, 0.58);
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .vessel-status-badge-custom {
          padding: 4px 10px;
          border-radius: 999px;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          border: 1px solid currentColor;
        }

        .vessel-status-badge-custom.status-active,
        .vessel-status-badge-custom.status-en-route {
          background: rgba(16, 185, 129, 0.1);
          color: #34d399;
        }

        .vessel-status-badge-custom.status-maintenance {
          background: rgba(239, 68, 68, 0.1);
          color: #f87171;
        }

        .vessel-status-badge-custom.status-in-port,
        .vessel-status-badge-custom.status-docked {
          background: rgba(14, 165, 233, 0.1);
          color: #38bdf8;
        }

        .vessel-status-badge-custom.status-delayed {
          background: rgba(234, 179, 8, 0.1);
          color: #fbbf24;
        }

        .vessel-name-custom {
          font-size: 20px;
          font-weight: 800;
          color: #ffffff;
          margin: 0 0 20px 0;
          letter-spacing: 0.02em;
        }

        .vessel-details-row-custom {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          padding-top: 16px;
        }

        .vessel-detail-item-custom {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .detail-label-custom {
          font-size: 9px;
          color: rgba(226, 216, 255, 0.4);
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .detail-value-custom {
          font-size: 13px;
          font-weight: 700;
          color: rgba(226, 216, 255, 0.9);
        }

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

          .vessel-grid-custom {
            grid-template-columns: 1fr;
          }

          .fleet-center-text-custom h1 {
            font-size: 24px;
          }

          .fleet-center-text-custom p {
            font-size: 14px;
          }
        }
      `}</style>
    </>
  );
}