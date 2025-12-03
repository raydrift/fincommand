'use client';

export function SkeletonCard() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 animate-pulse">
      <div className="space-y-3">
        <div className="h-4 bg-slate-200 rounded w-3/4"></div>
        <div className="h-8 bg-slate-200 rounded w-1/2"></div>
        <div className="space-y-2">
          <div className="h-3 bg-slate-200 rounded"></div>
          <div className="h-3 bg-slate-200 rounded w-5/6"></div>
        </div>
      </div>
    </div>
  );
}

export function SkeletonGrid({ count = 3 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

export function SkeletonChart() {
  // Use fixed bar heights to satisfy React purity rules
  const barHeights = [60, 80, 100, 75, 90, 70, 85];

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 animate-pulse">
      <div className="space-y-4">
        <div className="h-4 bg-slate-200 rounded w-1/3"></div>
        <div className="flex gap-2 h-40">
          {barHeights.map((height, i) => (
            <div
              key={i}
              className="flex-1 bg-slate-200 rounded"
              style={{ height: `${height}px` }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function SkeletonMetric() {
  return (
    <div className="rounded-lg bg-slate-50 p-4 animate-pulse border border-slate-200">
      <div className="h-3 bg-slate-200 rounded w-1/2 mb-2"></div>
      <div className="h-6 bg-slate-200 rounded w-2/3"></div>
    </div>
  );
}

export function SkeletonMetricsRow({ count = 4 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonMetric key={i} />
      ))}
    </div>
  );
}
