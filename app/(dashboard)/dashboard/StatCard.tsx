type Props = {
  label: string;
  value: string;
  sub?: string;
};

export default function StatCard({ label, value, sub }: Props) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
      <p className="text-sm text-white/60">{label}</p>
      <p className="mt-2 text-2xl font-bold">{value}</p>
      {sub ? <p className="mt-1 text-xs text-white/50">{sub}</p> : null}
    </div>
  );
}
