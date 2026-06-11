import React from 'react';

export default function DashboardSkeleton() {
  return (
    <div className="w-full text-gray-300 font-sans tracking-wide">
      {/* 5 Stats Cards Skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="px-6 py-5 rounded-2xl border border-gray-800/60 bg-[#080808] flex items-center gap-5 animate-pulse"
          >
            <div className="w-7 h-7 rounded-lg bg-purple-500/10" />
            <div className="flex-1 space-y-2">
              <div className="h-5 bg-purple-500/10 rounded w-10" />
              <div className="h-3 bg-purple-500/10 rounded w-16" />
            </div>
          </div>
        ))}
      </div>

      {/* Main Grid Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Vessel Cards Skeleton */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="bg-[#09080b] rounded-xl p-5 border border-gray-800/60 overflow-hidden relative flex flex-col justify-between h-[360px] animate-pulse"
            >
              <div className="absolute top-0 left-0 w-full h-[2px] bg-purple-500/20" />
              <div>
                <div className="flex justify-start mb-5 mt-1">
                  <div className="h-5 w-20 bg-purple-500/10 rounded-full" />
                </div>
                <div className="h-6 bg-purple-500/10 rounded w-3/4 mb-2" />
                <div className="h-3.5 bg-purple-500/5 rounded w-1/3 mb-6" />
                <div className="grid grid-cols-3 gap-3 mb-8">
                  <div className="bg-[#050505] rounded-xl p-3 h-16 flex flex-col justify-between">
                    <div className="h-2.5 bg-purple-500/10 rounded w-12" />
                    <div className="h-4 bg-purple-500/10 rounded w-8" />
                  </div>
                  <div className="bg-[#050505] rounded-xl p-3 h-16 flex flex-col justify-between">
                    <div className="h-2.5 bg-purple-500/10 rounded w-12" />
                    <div className="h-4 bg-purple-500/10 rounded w-8" />
                  </div>
                  <div className="bg-[#050505] rounded-xl p-3 h-16 flex flex-col justify-between">
                    <div className="h-2.5 bg-purple-500/10 rounded w-12" />
                    <div className="h-4 bg-purple-500/10 rounded w-8" />
                  </div>
                </div>
              </div>
              <div>
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <div className="h-2.5 bg-purple-500/10 rounded w-10" />
                    <div className="h-2.5 bg-purple-500/10 rounded w-6" />
                  </div>
                  <div className="w-full h-1.5 bg-gray-800 rounded-full" />
                </div>
                <div className="h-3.5 bg-purple-500/10 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>

        {/* Right Column Skeleton */}
        <div className="space-y-6">
          {/* Live Radius Sensor Skeleton */}
          <div className="bg-[#121016] border border-gray-800/80 rounded-3xl p-6 relative overflow-hidden animate-pulse">
            <div className="flex justify-between items-center mb-6">
              <div className="h-4 bg-purple-500/10 rounded w-28" />
              <div className="h-3 bg-purple-500/10 rounded w-12" />
            </div>
            <div className="h-3 bg-purple-500/10 rounded w-24 mb-3" />
            <div className="space-y-2 mb-8">
              <div className="h-8 bg-purple-500/10 rounded w-1/2" />
              <div className="h-8 bg-purple-500/10 rounded w-1/2" />
            </div>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-[#18161f] rounded-xl p-4 border border-gray-800/60 h-16" />
              <div className="bg-[#18161f] rounded-xl p-4 border border-gray-800/60 h-16" />
            </div>
            <div className="w-full h-12 bg-purple-500/10 rounded-xl" />
          </div>

          {/* Fleet Status List Skeleton */}
          <div className="bg-[#121215] border border-gray-800/80 rounded-2xl p-6 animate-pulse">
            <div className="h-4 bg-purple-500/10 rounded w-28 mb-6" />
            <div className="space-y-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex justify-between items-center p-2">
                  <div className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-purple-500/20" />
                    <div className="space-y-1.5">
                      <div className="h-3 bg-purple-500/10 rounded w-24" />
                      <div className="h-2.5 bg-purple-500/10 rounded w-16" />
                    </div>
                  </div>
                  <div className="h-3 bg-purple-500/10 rounded w-8" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
