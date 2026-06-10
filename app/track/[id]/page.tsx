"use client";

import { useRouter, useParams } from "next/navigation";
import { Roboto_Mono } from "next/font/google";
import dynamic from 'next/dynamic';
import { useEffect, useState } from "react";
import { createClient } from '../../../utils/supabase/client';

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
});

const MapComponent = dynamic(() => import('../../dashboard/components/MapComponent'), { 
  ssr: false, 
  loading: () => (
    <div className="w-full h-full bg-[#0a0a0a] flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-2 border-[#a855f7] border-t-transparent animate-spin"></div>
    </div>
  )
});

export default function TrackDetail() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [cargo, setCargo] = useState<any>(null);
  const [loading, setLoading] = useState(true);

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
    colorKey: "emerald"
  }
];

  useEffect(() => {
  const fetchCargo = async () => {
    setLoading(true);
    setCargo(null);
    const supabase = createClient();

    // DATABASE
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
    <div className="min-h-screen bg-[#050408] flex items-center justify-center text-white">
      Loading...
    </div>
  );
}

if (!cargo) {
  return (
    <div className="min-h-screen bg-[#050408] flex flex-col items-center justify-center text-center">
      <h1 className="text-3xl font-bold text-white mb-4">
        Shipment Not Found
      </h1>

      <p className="text-gray-400 mb-8">
        No shipment found with this tracking number.
      </p>

      <button
        onClick={() => router.push("/track")}
        className="bg-[#a855f7] hover:bg-[#9333ea] text-white px-6 py-3 rounded-xl"
      >
        Back to Tracking
      </button>
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
    <div className={`relative min-h-screen bg-[#050408] ${robotoMono.className} text-gray-300 px-6 py-[120px]`}>
      <button 
        type="button"
        onClick={() => router.push("/track")}
        className="absolute top-8 left-8 flex items-center gap-3 text-gray-500 hover:text-white text-sm font-bold tracking-[0.18em] transition-colors"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
        </svg>
        BACK
      </button>

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white tracking-widest mb-1 uppercase">SHIPPING TRACKING DETAIL</h1>
        <p className="text-gray-500 text-xs tracking-wide">Shipment Tracking Detail Real-Time</p>
      </div>

      <div className="w-full h-[400px] border border-[#a855f7]/20 rounded-xl mb-10 bg-[#0a0812] relative overflow-hidden shadow-[0_0_20px_rgba(168,85,247,0.1)]">
        <MapComponent vessels={mockVessel} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        <div>
          <h2 className="text-white font-bold tracking-widest text-[13px] mb-6 border-b border-gray-800 pb-4">SHIPPING INFORMATION</h2>
          
          <div className="space-y-5 text-xs">
            <div className="flex justify-between items-center">
              <span className="text-gray-500 tracking-wider">SHIPPING</span>
              <span className="text-white font-bold">{cargo.kota_asal} to {cargo.kota_tujuan}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500 tracking-wider">RECEIPT NUMBER</span>
              <span className="text-white font-bold uppercase">{decodeURIComponent(id) || 'PLF-2026-0417-SG'}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500 tracking-wider">VESSEL</span>
              <span className="text-white font-bold">{cargo.jenis_kendaraan}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500 tracking-wider">CARGO TYPE</span>
              <span className="text-white font-bold">{cargo.jenis_barang}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500 tracking-wide">ROUTE DISTANCE</span>
              <span className="text-white font-bold">887 NM</span>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-white font-bold tracking-widest text-[13px] mb-6 border-b border-gray-800 pb-4">SHIPMENT HISTORY</h2>
          
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