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

type VesselProfile = {
  id: number;
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

const vesselProfiles: VesselProfile[] = [
  {
    id: 1,
    name: "MV Pacific Star",
    type: "Container Ship",
    code: "V001",
    status: "EN ROUTE",
    statusIcon: "≈",
    latitude: 6.202,
    latitudeDirection: "S",
    longitude: 106.8426,
    longitudeDirection: "E",
    baseSpeed: 16.6,
    baseHeading: 141,
    fuel: 77,
    location: "Singapore Strait",
    destination: "Singapore Port",
    eta: "Today, 18:45",
    captain: "Capt. James Anderson",
    crew: 25,
    weatherList: ["SUNNY", "CLOUDY", "LIGHT WIND"],
    engine: "OPTIMAL",
    navigation: "OPERATIONAL",
    alerts: "ALL CLEAR",
    cargo: "Electronics & Machinery",
  },
  {
    id: 2,
    name: "MV Ocean Voyager",
    type: "Bulk Carrier",
    code: "V002",
    status: "IN PORT",
    statusIcon: "●",
    latitude: 7.2575,
    latitudeDirection: "S",
    longitude: 112.7521,
    longitudeDirection: "E",
    baseSpeed: 0,
    baseHeading: 0,
    fuel: 56,
    location: "Port of Surabaya",
    destination: "Makassar Port",
    eta: "Awaiting departure",
    captain: "Capt. Sarah Mitchell",
    crew: 22,
    weatherList: ["SUNNY", "CLOUDY", "CLEAR"],
    engine: "STANDBY",
    navigation: "IN PORT",
    alerts: "ALL CLEAR",
    cargo: "Coal & Mineral Bulk",
  },
  {
    id: 3,
    name: "MV Maritime Express",
    type: "Tanker",
    code: "V003",
    status: "DELAYED",
    statusIcon: "!",
    latitude: 3.003,
    latitudeDirection: "N",
    longitude: 101.3928,
    longitudeDirection: "E",
    baseSpeed: 2.4,
    baseHeading: 267,
    fuel: 62,
    location: "Port Klang Anchorage",
    destination: "Tanjung Priok Port",
    eta: "Delayed, weather review",
    captain: "Capt. Daniel Foster",
    crew: 28,
    weatherList: ["CLOUDY", "RAINY", "HIGH WIND"],
    engine: "CHECK REQUIRED",
    navigation: "ROUTE REVIEW",
    alerts: "DELAY WARNING",
    cargo: "Fuel & Liquid Cargo",
  },
  {
    id: 4,
    name: "MV Cargo Master",
    type: "Container Ship",
    code: "V004",
    status: "MAINTENANCE",
    statusIcon: "⚙",
    latitude: 8.40952,
    latitudeDirection: "S",
    longitude: 115.18892,
    longitudeDirection: "E",
    baseSpeed: 0,
    baseHeading: 0,
    fuel: 30,
    location: "Bali Port",
    destination: "Maintenance Dock",
    eta: "Maintenance mode",
    captain: "Capt. Robert Hayes",
    crew: 18,
    weatherList: ["WINDY", "CLOUDY", "CLEAR"],
    engine: "MAINTENANCE",
    navigation: "OFFLINE",
    alerts: "SERVICE REQUIRED",
    cargo: "General Container Cargo",
  },
];

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

  const vesselId = Number(params.id);

  const profile = useMemo(() => {
    return vesselProfiles.find((item) => item.id === vesselId);
  }, [vesselId]);

  const [liveState, setLiveState] = useState<LiveVesselState | null>(() => {
    if (!profile) return null;
    return createInitialLiveState(profile);
  });

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