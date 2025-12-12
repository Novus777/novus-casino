type Props = {
  xp: number;
  vipName: string;
};

export default function VipBadge({ xp, vipName }: Props) {
  // next tier targets (matches your vip.ts thresholds)
  const next =
    xp >= 100000
      ? null
      : xp >= 25000
      ? { name: "Whale", at: 100000 }
      : xp >= 10000
      ? { name: "Diamond", at: 25000 }
      : xp >= 2500
      ? { name: "Gold", at: 10000 }
      : { name: "Silver", at: 2500 };

  const pct = next ? Math.min(100, Math.round((xp / next.at) * 100)) : 100;

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm text-white/70">VIP Status</p>
          <p className="mt-1 text-2xl font-bold">{vipName}</p>
          <p className="mt-1 text-sm text-white/60">XP: {xp.toLocaleString()}</p>
        </div>

        <div className="shrink-0 rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-center">
          <p className="text-xs text-white/60">Progress</p>
          <p className="mt-1 text-xl font-bold">{pct}%</p>
        </div>
      </div>

      <div className="mt-4">
        <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-purple-500 to-emerald-400"
            style={{ width: `${pct}%` }}
          />
        </div>

        <div className="mt-2 flex items-center justify-between text-xs text-white/60">
          <span>Current</span>
          <span>
            {next ? `Next: ${next.name} @ ${next.at.toLocaleString()} XP` : "Max tier reached"}
          </span>
        </div>
      </div>
    </div>
  );
}
