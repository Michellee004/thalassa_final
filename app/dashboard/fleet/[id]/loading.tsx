"use client";

import { Roboto_Mono } from "next/font/google";

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function Loading() {
  return (
    <main className={`fleet-detail-page ${robotoMono.className}`}>

      {/* Header */}
      <header className="fd-header">
        <div className="fd-header-left">
          <span className="sk" style={{ width: 28, height: 28, borderRadius: 6, display: "inline-block" }} />
          <div className="fd-title-group">
            <div className="fd-title-row">
              <span className="sk" style={{ width: 180, height: 20, display: "inline-block" }} />
              <span className="sk" style={{ width: 90, height: 20, borderRadius: 20, display: "inline-block" }} />
            </div>
            <span className="sk" style={{ width: 140, height: 12, display: "block", marginTop: 6 }} />
          </div>
        </div>
        <span className="sk" style={{ width: 54, height: 22, borderRadius: 20, display: "inline-block" }} />
      </header>

      {/* Main grid */}
      <div className="fd-grid">

        {/* ── Left column ── */}
        <div>

          {/* GPS card */}
          <div className="fd-card">
            <div className="fd-card-header">
              <span className="sk" style={{ width: 16, height: 16, borderRadius: "50%", display: "inline-block" }} />
              <span className="sk" style={{ width: 110, height: 11, display: "inline-block", marginLeft: 6 }} />
            </div>
            <span className="sk" style={{ width: 60,  height: 10, display: "block", marginBottom: 6 }} />
            <span className="sk" style={{ width: 140, height: 24, display: "block", marginBottom: 10 }} />
            <span className="sk" style={{ width: 60,  height: 10, display: "block", marginBottom: 6 }} />
            <span className="sk" style={{ width: 150, height: 24, display: "block", marginBottom: 10 }} />
            <span className="sk" style={{ width: 120, height: 10, display: "block" }} />
          </div>

          {/* Mini cards — Speed / Heading / Crew / Weather */}
          <div className="fd-small-grid">
            {[50, 55, 40, 60].map((w, i) => (
              <div className="fd-mini-card" key={i}>
                <span className="sk" style={{ width: w,  height: 10, display: "block", marginBottom: 10 }} />
                <span className="sk" style={{ width: 70, height: 22, display: "block" }} />
              </div>
            ))}
          </div>

          {/* Captain */}
          <div className="fd-card">
            <span className="sk" style={{ width: 55,  height: 10, display: "block", marginBottom: 10 }} />
            <span className="sk" style={{ width: 160, height: 18, display: "block" }} />
          </div>

          {/* Route Info */}
          <div className="fd-card">
            <span className="sk" style={{ width: 75, height: 10, display: "block", marginBottom: 14 }} />
            <span className="sk" style={{ width: 80, height: 10, display: "block", marginBottom: 6 }} />
            <span className="sk" style={{ width: 110, height: 18, display: "block", marginBottom: 12 }} />
            <span className="sk" style={{ width: 40, height: 10, display: "block", marginBottom: 6 }} />
            <span className="sk" style={{ width: 145, height: 18, display: "block" }} />
          </div>

        </div>

        {/* ── Right column ── */}
        <div>

          {/* Chart card */}
          <div className="fd-chart-card">
            <div className="fd-chart-header">
              <div className="fd-chart-title" style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span className="sk" style={{ width: 14, height: 14, display: "inline-block" }} />
                <span className="sk" style={{ width: 150, height: 13, display: "inline-block" }} />
              </div>
              <div className="fd-chart-legend" style={{ display: "flex", gap: 12 }}>
                <span className="sk" style={{ width: 55, height: 11, display: "inline-block" }} />
                <span className="sk" style={{ width: 55, height: 11, display: "inline-block" }} />
              </div>
            </div>
            <div className="fd-chart-area">
              <span className="sk" style={{ width: "100%", height: "100%", display: "block", borderRadius: 8 }} />
            </div>
          </div>

          {/* Status mini cards — Engine / Navigation / Alerts */}
          <div className="fd-status-grid">
            {[55, 65, 40].map((w, i) => (
              <div className="fd-mini-card" key={i}>
                <span className="sk" style={{ width: w,  height: 10, display: "block", marginBottom: 10 }} />
                <span className="sk" style={{ width: 85, height: 18, display: "block" }} />
              </div>
            ))}
          </div>

          {/* Bottom — Cargo + Fuel */}
          <div className="fd-bottom-grid">
            <div className="fd-card">
              <span className="sk" style={{ width: 45,  height: 10, display: "block", marginBottom: 10 }} />
              <span className="sk" style={{ width: 140, height: 18, display: "block" }} />
            </div>
            <div className="fd-card">
              <span className="sk" style={{ width: 70, height: 10, display: "block", marginBottom: 10 }} />
              <div className="fd-fuel-header">
                <span className="sk" style={{ width: 10, height: 10, display: "inline-block" }} />
                <span className="sk" style={{ width: 40, height: 18, display: "inline-block" }} />
              </div>
              <div className="fd-progress-bar" style={{ marginTop: 8 }}>
                <span className="sk" style={{ width: "100%", height: "100%", display: "block", borderRadius: 4 }} />
              </div>
              <span className="sk" style={{ width: 65, height: 11, display: "block", marginTop: 8 }} />
            </div>
          </div>

        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0%   { background-position: -600px 0; }
          100% { background-position:  600px 0; }
        }

        .sk {
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0.04) 25%,
            rgba(255, 255, 255, 0.12) 50%,
            rgba(255, 255, 255, 0.04) 75%
          );
          background-size: 600px 100%;
          animation: shimmer 1.6s infinite linear;
          border-radius: 6px;
        }
      `}</style>
    </main>
  );
}
