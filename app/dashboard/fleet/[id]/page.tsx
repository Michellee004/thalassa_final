"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import "../../../css/fleet-detail.css";
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

type VesselProfile = {
  id: string | number;
  name: string;
  type: string;
  code: string;
  status: string;
  statusIcon: string;
  latitude: number;
  latitudeDirection: "N" | "S";
  longitude: number;
  longitudeDirection: "E" | "W";
  baseSpeed: number;
  baseHeading: number;
  fuel: number;
  location: string;
  destination: string;
  eta: string;
  captain: string;
  crew: number;
  weatherList: string[];
  engine: string;
  navigation: string;
  alerts: string;
  cargo: string;
};

type LivePoint = {
  time: string;
  speed: number;
  fuel: number;
};

type LiveVesselState = {
  latitude: number;
  longitude: number;
  speed: number;
  heading: number;
  fuel: number;
  weather: string;
  updatedAt: Date;
  chartData: LivePoint[];
};

function getDeterministicVesselProfile(vessel: any): VesselProfile {
  const idStr = String(vessel.id || '');
  let seed = 0;
  for (let i = 0; i < idStr.length; i++) {
    seed += idStr.charCodeAt(i);
  }

  const mappedStatus = (vessel.status || '').toUpperCase();
  
  const captains = [
    "Capt. James Anderson",
    "Capt. Sarah Mitchell",
    "Capt. Daniel Foster",
    "Capt. Robert Hayes",
    "Capt. Elena Rostova",
    "Capt. Marcus Vance"
  ];
  const captain = captains[seed % captains.length];
  
  const crew = 15 + (seed % 15);
  
  const weatherLists = [
    ["SUNNY", "CLOUDY", "LIGHT WIND"],
    ["SUNNY", "CLOUDY", "CLEAR"],
    ["CLOUDY", "RAINY", "HIGH WIND"],
    ["WINDY", "CLOUDY", "CLEAR"]
  ];
  const weatherList = weatherLists[seed % weatherLists.length];
  
  let engine = "OPTIMAL";
  let navigation = "OPERATIONAL";
  let alerts = "ALL CLEAR";
  let statusIcon = "≈";
  let status = "EN ROUTE";

  if (mappedStatus === "EN ROUTE" || mappedStatus === "ACTIVE") {
    status = "EN ROUTE";
    statusIcon = "≈";
    engine = "OPTIMAL";
    navigation = "OPERATIONAL";
  } else if (mappedStatus === "IN PORT" || mappedStatus === "DOCKED" || mappedStatus === "MOORED") {
    status = "IN PORT";
    statusIcon = "●";
    engine = "STANDBY";
    navigation = "IN PORT";
  } else if (mappedStatus === "DELAYED" || mappedStatus === "ROUTE REVIEW") {
    status = "DELAYED";
    statusIcon = "!";
    engine = "CHECK REQUIRED";
    navigation = "ROUTE REVIEW";
    alerts = "DELAY WARNING";
  } else if (mappedStatus === "MAINTENANCE" || mappedStatus === "SERVICE REQUIRED") {
    status = "MAINTENANCE";
    statusIcon = "⚙";
    engine = "MAINTENANCE";
    navigation = "OFFLINE";
    alerts = "SERVICE REQUIRED";
  }

  const cargos = [
    "Electronics & Machinery",
    "Coal & Mineral Bulk",
    "Fuel & Liquid Cargo",
    "General Container Cargo",
    "Agricultural Produce",
    "Automotive Parts"
  ];
  const cargo = cargos[seed % cargos.length];
  
  const baseSpeed = status === "EN ROUTE" ? 14.5 + (seed % 6) : 0;
  const baseHeading = (seed * 13) % 360;
  
  const ports = ['Singapore Strait', 'Port of Surabaya', 'Port Klang Anchorage', 'Bali Port', 'Makassar Port', 'Tanjung Priok Port'];
  const location = ports[seed % ports.length];
  const destination = ports[(seed + 1) % ports.length];
  
  const eta = status === "EN ROUTE" ? `Tomorrow, ${(10 + (seed % 12)).toString().padStart(2, '0')}:${(seed % 60).toString().padStart(2, '0')}` : "Docked";

  return {
    id: vessel.id,
    name: vessel.nama,
    type: vessel.jenis,
    code: vessel.kode,
    status,
    statusIcon,
    latitude: status === "EN ROUTE" ? -6.202 : -7.2575,
    latitudeDirection: "S",
    longitude: status === "EN ROUTE" ? 106.8426 : 112.7521,
    longitudeDirection: "E",
    baseSpeed,
    baseHeading,
    fuel: 40 + (seed % 55),
    location,
    destination,
    eta,
    captain,
    crew,
    weatherList,
    engine,
    navigation,
    alerts,
    cargo
  };
}

function formatTime(date: Date) {
  return date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

function createInitialChartData(profile: VesselProfile): LivePoint[] {
  const now = new Date();

  return Array.from({ length: 8 }).map((_, index) => {
    const time = new Date(now.getTime() - (7 - index) * 3000);

    return {
      time: formatTime(time),
      speed: Number(
        Math.max(
          profile.baseSpeed + (Math.random() * 1.2 - 0.6),
          0
        ).toFixed(1)
      ),
      fuel: Number(Math.max(profile.fuel - (7 - index) * 0.05, 0).toFixed(1)),
    };
  });
}

function createInitialLiveState(profile: VesselProfile): LiveVesselState {
  return {
    latitude: profile.latitude,
    longitude: profile.longitude,
    speed: profile.baseSpeed,
    heading: profile.baseHeading,
    fuel: profile.fuel,
    weather: profile.weatherList[0],
    updatedAt: new Date(),
    chartData: createInitialChartData(profile),
  };
}

function getFuelStatus(fuel: number) {
  if (fuel >= 70) return "Sufficient";
  if (fuel >= 40) return "Moderate";
  return "Low";
}

function getRandomWeather(profile: VesselProfile, currentWeather: string) {
  const shouldChangeWeather = Math.random() > 0.88;

  if (!shouldChangeWeather) {
    return currentWeather;
  }

  const randomIndex = Math.floor(Math.random() * profile.weatherList.length);
  return profile.weatherList[randomIndex];
}

function updateLiveState(
  previous: LiveVesselState,
  profile: VesselProfile
): LiveVesselState {
  const isMoving = profile.status === "EN ROUTE" || profile.status === "DELAYED";

  const speedChange = isMoving ? Math.random() * 1.4 - 0.7 : Math.random() * 0.2;
  const nextSpeed = isMoving
    ? Math.max(profile.baseSpeed + speedChange, 0.4)
    : Math.max(profile.baseSpeed + speedChange, 0);

  const headingChange = isMoving ? Math.random() * 4 - 2 : 0;
  const nextHeading = isMoving
    ? Math.round((previous.heading + headingChange + 360) % 360)
    : profile.baseHeading;

  const coordinateStep = isMoving ? 0.00015 + Math.random() * 0.00012 : 0;
  const nextLatitude =
    profile.latitudeDirection === "S"
      ? previous.latitude + coordinateStep
      : previous.latitude + coordinateStep;

  const nextLongitude = previous.longitude + coordinateStep * 1.4;

  const nextFuel = isMoving
    ? Math.max(previous.fuel - (0.015 + Math.random() * 0.015), 0)
    : Math.max(previous.fuel - 0.003, 0);

  const now = new Date();

  const nextChartPoint = {
    time: formatTime(now),
    speed: Number(nextSpeed.toFixed(1)),
    fuel: Number(nextFuel.toFixed(1)),
  };

  return {
    latitude: Number(nextLatitude.toFixed(5)),
    longitude: Number(nextLongitude.toFixed(5)),
    speed: Number(nextSpeed.toFixed(1)),
    heading: nextHeading,
    fuel: Number(nextFuel.toFixed(1)),
    weather: getRandomWeather(profile, previous.weather),
    updatedAt: now,
    chartData: [...previous.chartData.slice(-11), nextChartPoint],
  };
}

export default function FleetDetail() {
  const router = useRouter();
  const params = useParams<{ id: string }>();

  const [profile, setProfile] = useState<VesselProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchVessel() {
      setLoading(true);
      try {
        const { data, error } = await supabase.from('vessel').select('*').eq('id', params.id).single();
        if (!error && data) {
          setProfile(getDeterministicVesselProfile(data));
        }
      } catch (err) {
        console.error('Error fetching vessel profile:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchVessel();
  }, [params.id]);

  const [liveState, setLiveState] = useState<LiveVesselState | null>(null);


  useEffect(() => {
    if (!profile) return;

    setLiveState(createInitialLiveState(profile));

    const interval = setInterval(() => {
      setLiveState((previous) => {
        if (!previous) return createInitialLiveState(profile);
        return updateLiveState(previous, profile);
      });
    }, 1800);

    return () => clearInterval(interval);
  }, [profile]);

  if (loading) {
    return (
      <div className="fleet-detail-page" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: "48px", height: "48px", borderRadius: "50%", border: "4px solid #a855f7", borderTopColor: "transparent", animation: "spin 1s linear infinite" }}></div>
        <style jsx global>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (!profile || !liveState) {
    return (
      <div className="fleet-detail-page">
        <div
          style={{
            minHeight: "80vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <h1 style={{ fontSize: "32px", margin: 0 }}>Vessel Not Found</h1>
          <p style={{ color: "rgba(255,255,255,0.55)", margin: 0 }}>
            No vessel found with this ID.
          </p>
          <button
            onClick={() => router.push("/dashboard")}
            className="fd-back-btn"
            style={{
              width: "auto",
              padding: "0 22px",
              fontSize: "13px",
              letterSpacing: "0.08em",
            }}
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fleet-detail-page">
      <header className="fd-header">
        <div className="fd-header-left">
          <button
            onClick={() => router.back()}
            className="fd-back-btn border-none bg-transparent cursor-pointer font-inherit flex items-center justify-center pb-1"
          >
            &larr;
          </button>

          <div className="fd-title-group">
            <div className="fd-title-row">
              <h1 className="fd-vessel-name">{profile.name}</h1>

              <div className="fd-badge-enroute">
                <span>{profile.statusIcon}</span> {profile.status}
              </div>
            </div>

            <div className="fd-vessel-sub">
              {profile.type} • ID: {profile.code}
            </div>
          </div>
        </div>

        <div className="fd-live-badge">
          <div className="fd-live-dot"></div>
          LIVE
        </div>
      </header>

      <div className="fd-grid">
        <div>
          <div className="fd-card">
            <div className="fd-card-header">
              <span className="fd-card-icon">((•))</span>
              <span className="fd-card-title">GPS COORDINATES</span>
            </div>

            <div className="fd-coord-label">LATITUDE</div>
            <div className="fd-coord-val">
              {liveState.latitude.toFixed(5)}°{" "}
              <span className="fd-coord-dir">{profile.latitudeDirection}</span>
            </div>

            <div className="fd-coord-label">LONGITUDE</div>
            <div className="fd-coord-val" style={{ marginBottom: 10 }}>
              {liveState.longitude.toFixed(5)}°{" "}
              <span className="fd-coord-dir">{profile.longitudeDirection}</span>
            </div>

            <div className="fd-updated">
              Updated: {formatTime(liveState.updatedAt)} UTC • Live AIS Feed
            </div>
          </div>

          <div className="fd-small-grid">
            <div className="fd-mini-card">
              <div className="fd-card-header" style={{ marginBottom: 0 }}>
                <span className="fd-card-title">SPEED</span>
              </div>
              <div className="fd-mini-val">{liveState.speed.toFixed(1)} kn</div>
            </div>

            <div className="fd-mini-card">
              <div className="fd-card-header" style={{ marginBottom: 0 }}>
                <span className="fd-card-title">HEADING</span>
              </div>
              <div className="fd-mini-val">{liveState.heading}°</div>
            </div>

            <div className="fd-mini-card">
              <div className="fd-card-header" style={{ marginBottom: 0 }}>
                <span className="fd-card-title">CREW</span>
              </div>
              <div className="fd-mini-val">{profile.crew}</div>
            </div>

            <div className="fd-mini-card">
              <div className="fd-card-header" style={{ marginBottom: 0 }}>
                <span className="fd-card-title">WEATHER</span>
              </div>
              <div className="fd-mini-val">{liveState.weather}</div>
            </div>
          </div>

          <div className="fd-card">
            <div className="fd-card-header" style={{ marginBottom: 5 }}>
              <span className="fd-card-title">CAPTAIN</span>
            </div>
            <div className="fd-single-val">{profile.captain}</div>
          </div>

          <div className="fd-card">
            <div className="fd-card-header" style={{ marginBottom: 15 }}>
              <span className="fd-card-title">ROUTE INFO</span>
            </div>

            <div className="fd-coord-label">CURRENT LOCATION</div>
            <div className="fd-route-val">{profile.location}</div>

            <div className="fd-coord-label">DESTINATION</div>
            <div className="fd-route-val">{profile.destination}</div>

            <div className="fd-coord-label">ETA</div>
            <div className="fd-route-val" style={{ marginBottom: 0 }}>
              {profile.eta}
            </div>
          </div>
        </div>

        <div>
          <div className="fd-chart-card">
            <div className="fd-chart-header">
              <div className="fd-chart-title">
                <span className="fd-card-icon">〽</span> Speed &amp; Fuel
                Monitor
              </div>

              <div className="fd-chart-legend">
                <div className="fd-legend-item">
                  <div
                    className="fd-legend-color"
                    style={{ background: "#10b981" }}
                  ></div>
                  Speed
                </div>

                <div className="fd-legend-item">
                  <div
                    className="fd-legend-color"
                    style={{ background: "#eab308" }}
                  ></div>
                  Fuel %
                </div>
              </div>
            </div>

            <div className="fd-chart-area">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={liveState.chartData}>
                  <XAxis
                    dataKey="time"
                    stroke="rgba(255,255,255,0.2)"
                    fontSize={9}
                    tickLine={false}
                    axisLine={true}
                  />

                  <YAxis
                    yAxisId="speed"
                    stroke="rgba(16,185,129,0.55)"
                    fontSize={9}
                    tickLine={false}
                    axisLine={true}
                    domain={[0, 25]}
                    ticks={[0, 5, 10, 15, 20, 25]}
                  />

                  <YAxis
                    yAxisId="fuel"
                    orientation="right"
                    stroke="rgba(234,179,8,0.55)"
                    fontSize={9}
                    tickLine={false}
                    axisLine={true}
                    domain={[0, 100]}
                    ticks={[0, 25, 50, 75, 100]}
                  />

                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(255,255,255,0.05)"
                    vertical={false}
                  />

                  <Line
                    yAxisId="speed"
                    type="monotone"
                    dataKey="speed"
                    stroke="#10b981"
                    strokeWidth={2}
                    dot={false}
                    isAnimationActive={true}
                  />

                  <Line
                    yAxisId="fuel"
                    type="monotone"
                    dataKey="fuel"
                    stroke="#eab308"
                    strokeWidth={2}
                    dot={false}
                    isAnimationActive={true}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="fd-status-grid">
            <div className="fd-mini-card">
              <div className="fd-card-title">ENGINE</div>
              <div className="fd-status-badge">
                <div className="fd-live-dot"></div>
                {profile.engine}
              </div>
            </div>

            <div className="fd-mini-card">
              <div className="fd-card-title">NAVIGATION</div>
              <div className="fd-status-badge">
                <div className="fd-live-dot"></div>
                {profile.navigation}
              </div>
            </div>

            <div className="fd-mini-card">
              <div className="fd-card-title">ALERTS</div>
              <div className="fd-status-badge">
                <div className="fd-live-dot"></div>
                {profile.alerts}
              </div>
            </div>
          </div>

          <div className="fd-bottom-grid">
            <div className="fd-card">
              <div className="fd-card-title">CARGO</div>
              <div className="fd-single-val">{profile.cargo}</div>
            </div>

            <div className="fd-card">
              <div className="fd-card-title">FUEL LEVEL</div>

              <div className="fd-fuel-header">
                <div style={{ width: 10 }}></div>
                <div className="fd-fuel-pct">{liveState.fuel.toFixed(1)}%</div>
              </div>

              <div className="fd-progress-bar">
                <div
                  className="fd-progress-fill"
                  style={{ width: `${liveState.fuel}%` }}
                ></div>
              </div>

              <div className="fd-fuel-status">
                {getFuelStatus(liveState.fuel)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}