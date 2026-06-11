"use client";

import { useRouter, useParams } from "next/navigation";
import { Roboto_Mono } from "next/font/google";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { createClient } from "../../../utils/supabase/client";

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
});

const MapComponent = dynamic(
  () => import("../../dashboard/components/MapComponent"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full bg-[#0a0a0a] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-[#a855f7] border-t-transparent animate-spin"></div>
      </div>
    ),
  }
);

export default function TrackDetail() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  const [cargo, setCargo] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const decodedId = decodeURIComponent(id || "");

  const mockVessel = [
    {
      id: 999,
      name: cargo?.jenis_kendaraan || "MV Polaris",
      type: cargo?.jenis_barang || "Container Cargo",
      status: cargo?.status_pengiriman || "EN ROUTE",
      speed: "18.9",
      heading: "129°",
      weather: "Clear",
      fuel: 78,
      location: "Central Kalimantan",
      colorKey: "emerald",
    },
  ];

  useEffect(() => {
    const fetchCargo = async () => {
      setLoading(true);
      setCargo(null);

      const supabase = createClient();

      const { data, error } = await supabase
        .from("cargo")
        .select("*")
        .eq("id", decodeURIComponent(id))
        .single();

      if (error) {
        console.error(error);
        setCargo(null);
      } else {
        setCargo(data);
      }

      setLoading(false);
    };

    fetchCargo();
  }, [id]);

  if (loading) {
    return (
      <div
        className={`min-h-screen bg-[#050408] flex items-center justify-center text-white ${robotoMono.className}`}
      >
        Loading...
      </div>
    );
  }

  if (!cargo) {
    return (
      <div className={`not-found-page ${robotoMono.className}`}>
        <div className="not-found-card">
          <div className="not-found-icon">
            <svg width="42" height="42" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 9V13"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
              <path
                d="M12 17H12.01"
                stroke="currentColor"
                strokeWidth="2.8"
                strokeLinecap="round"
              />
              <path
                d="M10.3 4.2C11.05 2.93 12.95 2.93 13.7 4.2L21.4 17.2C22.16 18.5 21.23 20.13 19.7 20.13H4.3C2.77 20.13 1.84 18.5 2.6 17.2L10.3 4.2Z"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <h1>Shipment Not Found</h1>

          <p>No shipment found with this tracking number.</p>

          <button
            type="button"
            onClick={() => router.push("/track")}
            className="back-tracking-button"
          >
            <span className="button-glow"></span>

            <span className="button-content">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M19 12H5M12 19L5 12L12 5"
                  stroke="currentColor"
                  strokeWidth="2.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Back to Tracking
            </span>
          </button>
        </div>

        <style jsx>{`
          .not-found-page {
            min-height: 100vh;
            width: 100%;
            background:
              radial-gradient(
                circle at 50% 40%,
                rgba(88, 28, 135, 0.2),
                transparent 34%
              ),
              linear-gradient(135deg, #050408 0%, #080111 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            color: #ffffff;
            padding: 32px;
            box-sizing: border-box;
          }

          .not-found-card {
            display: flex;
            flex-direction: column;
            align-items: center;
            animation: cardEnter 0.55s ease both;
          }

          .not-found-icon {
            width: 78px;
            height: 78px;
            margin-bottom: 24px;
            border-radius: 999px;
            color: #c084fc;
            background: rgba(168, 85, 247, 0.1);
            border: 1px solid rgba(168, 85, 247, 0.32);
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow:
              0 0 22px rgba(168, 85, 247, 0.22),
              inset 0 0 20px rgba(168, 85, 247, 0.08);
            animation: iconPulse 2.2s ease-in-out infinite;
          }

          .not-found-card h1 {
            margin: 0 0 18px;
            font-size: 36px;
            line-height: 1.1;
            font-weight: 800;
            letter-spacing: -0.03em;
            color: #ffffff;
          }

          .not-found-card p {
            margin: 0 0 42px;
            color: #b7bdd0;
            font-size: 18px;
            line-height: 1.6;
          }

          .back-tracking-button {
            position: relative;
            min-width: 250px;
            min-height: 68px;
            padding: 0 30px;
            border: none;
            border-radius: 16px;
            color: #ffffff;
            background:
              linear-gradient(135deg, #a855f7 0%, #8b00ff 55%, #d8b4fe 100%);
            cursor: pointer;
            overflow: hidden;
            box-shadow:
              0 0 0 1px rgba(216, 180, 254, 0.22),
              0 16px 34px rgba(168, 85, 247, 0.28),
              0 0 30px rgba(168, 85, 247, 0.32);
            transition:
              transform 0.25s ease,
              box-shadow 0.25s ease,
              filter 0.25s ease;
            animation: buttonFloat 2.6s ease-in-out infinite;
          }

          .back-tracking-button::before {
            content: "";
            position: absolute;
            top: 0;
            left: -120%;
            width: 80%;
            height: 100%;
            background: linear-gradient(
              120deg,
              transparent,
              rgba(255, 255, 255, 0.36),
              transparent
            );
            transform: skewX(-18deg);
            transition: left 0.75s ease;
          }

          .back-tracking-button::after {
            content: "";
            position: absolute;
            inset: -4px;
            border-radius: 20px;
            border: 1px solid rgba(216, 180, 254, 0.38);
            opacity: 0;
            transform: scale(0.96);
            transition:
              opacity 0.25s ease,
              transform 0.25s ease;
          }

          .back-tracking-button:hover {
            transform: translateY(-5px) scale(1.03);
            filter: brightness(1.08);
            box-shadow:
              0 0 0 1px rgba(216, 180, 254, 0.35),
              0 22px 44px rgba(168, 85, 247, 0.38),
              0 0 46px rgba(168, 85, 247, 0.58);
          }

          .back-tracking-button:hover::before {
            left: 130%;
          }

          .back-tracking-button:hover::after {
            opacity: 1;
            transform: scale(1);
          }

          .button-glow {
            position: absolute;
            width: 100px;
            height: 100px;
            right: -28px;
            bottom: -42px;
            border-radius: 999px;
            background: rgba(255, 255, 255, 0.24);
            filter: blur(26px);
            pointer-events: none;
          }

          .button-content {
            position: relative;
            z-index: 2;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 12px;
            font-size: 20px;
            font-weight: 800;
            letter-spacing: -0.02em;
          }

          .button-content svg {
            transition: transform 0.25s ease;
          }

          .back-tracking-button:hover .button-content svg {
            transform: translateX(-5px);
          }

          @keyframes cardEnter {
            from {
              opacity: 0;
              transform: translateY(16px) scale(0.98);
            }

            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }

          @keyframes iconPulse {
            0%,
            100% {
              transform: scale(1);
              box-shadow:
                0 0 22px rgba(168, 85, 247, 0.22),
                inset 0 0 20px rgba(168, 85, 247, 0.08);
            }

            50% {
              transform: scale(1.06);
              box-shadow:
                0 0 34px rgba(168, 85, 247, 0.42),
                inset 0 0 24px rgba(168, 85, 247, 0.14);
            }
          }

          @keyframes buttonFloat {
            0%,
            100% {
              transform: translateY(0);
            }

            50% {
              transform: translateY(-3px);
            }
          }
        `}</style>
      </div>
    );
  }

  const shipmentHistory = [];

  shipmentHistory.push({
    title: "Order received & confirmed",
    time: cargo.created_at,
  });

  shipmentHistory.push({
    title: `Cargo is loaded onto the ${cargo.jenis_kendaraan}`,
    time: cargo.created_at,
  });

  if (
    cargo.status_pengiriman === "Shipped" ||
    cargo.status_pengiriman === "Received"
  ) {
    shipmentHistory.push({
      title: `Shipment departed from ${cargo.kota_asal}`,
      time: cargo.created_at,
    });
  }

  if (cargo.status_pengiriman === "Received") {
    shipmentHistory.push({
      title: `Shipment has arrived in ${cargo.kota_tujuan}`,
      time: cargo.created_at,
    });
  }

  return (
    <div
      className={`relative min-h-screen bg-[#050408] ${robotoMono.className} text-gray-300 px-6 py-[120px]`}
    >
      <button
        type="button"
        onClick={() => router.push("/track")}
        className="absolute top-8 left-8 flex items-center gap-3 text-gray-500 hover:text-white text-sm font-bold tracking-[0.18em] transition-colors"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        BACK
      </button>

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white tracking-widest mb-1 uppercase">
          SHIPPING TRACKING DETAIL
        </h1>
        <p className="text-gray-500 text-xs tracking-wide">
          Shipment Tracking Detail Real-Time
        </p>
      </div>

      <div className="w-full h-[400px] border border-[#a855f7]/20 rounded-xl mb-10 bg-[#0a0812] relative overflow-hidden shadow-[0_0_20px_rgba(168,85,247,0.1)]">
        <MapComponent vessels={mockVessel} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        <div>
          <h2 className="text-white font-bold tracking-widest text-[13px] mb-6 border-b border-gray-800 pb-4">
            SHIPPING INFORMATION
          </h2>

          <div className="space-y-5 text-xs">
            <div className="flex justify-between items-center">
              <span className="text-gray-500 tracking-wider">SHIPPING</span>
              <span className="text-white font-bold">
                {cargo.kota_asal} to {cargo.kota_tujuan}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-500 tracking-wider">
                RECEIPT NUMBER
              </span>
              <span className="text-white font-bold uppercase">
                {decodedId || "PLF-2026-0417-SG"}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-500 tracking-wider">VESSEL</span>
              <span className="text-white font-bold">
                {cargo.jenis_kendaraan}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-500 tracking-wider">CARGO TYPE</span>
              <span className="text-white font-bold">{cargo.jenis_barang}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-500 tracking-wide">
                ROUTE DISTANCE
              </span>
              <span className="text-white font-bold">887 NM</span>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-white font-bold tracking-widest text-[13px] mb-6 border-b border-gray-800 pb-4">
            SHIPMENT HISTORY
          </h2>

          <div className="relative border-l border-[#a855f7]/20 ml-2 space-y-8 pb-4">
            {[...shipmentHistory].reverse().map((item, index) => (
              <div key={index} className="relative pl-6">
                <div
                  className={`absolute w-2.5 h-2.5 rounded-full -left-[5.5px] top-1 ${
                    index === 0
                      ? "bg-[#a855f7] border border-[#d8b4fe] shadow-[0_0_10px_rgba(168,85,247,0.8)]"
                      : "bg-[#050408] border border-[#a855f7]/50"
                  }`}
                ></div>

                <div
                  className={`font-bold text-[13px] tracking-wide leading-tight mb-1 ${
                    index === 0 ? "text-white" : "text-gray-300"
                  }`}
                >
                  {item.title}
                </div>

                <div className="text-gray-600 text-[10px] tracking-widest">
                  {item.time
                    ? new Date(item.time).toLocaleString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      }) + " WIB"
                    : "-"}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}