"use client";

import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import LoadingHome from './loading-home'; // Import Skeleton Home
import './css/home.css';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Navbar />
      {isLoading ? (
        <LoadingHome />
      ) : (
        <div className="page-container" style={{ padding: 0 }}>
          <img src="/background_cp.jpg" alt="bg" className="home-bg" />
          <div className="home-overlay" />
          <div className="home-content">
            <div className="pill-badge">MARITIME INTELLIGENCE SYSTEM • ONLINE</div>
            <img src="/logo-thalassa.png" alt="Thalassa Logo" className="home-logo" />
            <div className="home-title">THALASSA</div>
            <div className="home-title-purple">SISTERHOOD GROUP</div>
            <div className="home-subtitle">MARITIME CARGO MONITORING SYSTEM</div>
            <div className="home-desc">Shipping &amp; Maritime Excellence since 2022</div>
            <button className="btn-track" onClick={() => router.push('/track')}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              TRACK SHIPMENT
            </button>
          </div>
        </div>
      )}
    </>
  );
}