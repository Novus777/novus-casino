import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center px-6">
        {/* Glow background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(124,58,237,0.25),transparent_40%),radial-gradient(circle_at_70%_60%,rgba(34,211,238,0.2),transparent_45%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/70 to-black" />

        <div className="relative z-10 max-w-4xl text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
            PHI Casino
          </h1>
          <p className="mt-6 text-lg md:text-xl text-white/70">
            A next-generation crypto casino built for transparency, rewards,
            and real ownership.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/auth/signup"
              className="px-8 py-4 rounded-xl bg-purple-600 hover:bg-purple-500 font-semibold shadow-[0_0_40px_rgba(124,58,237,0.7)] transition"
            >
              Create Account
            </Link>

            <Link
              href="/auth/login"
              className="px-8 py-4 rounded-xl bg-white/10 hover:bg-white/20 font-semibold transition border border-white/10"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="relative py-32 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <Feature
            title="PHI Rewards"
            desc="Earn PHI daily through activity, VIP progression, and gameplay."
            glow="purple"
          />
          <Feature
            title="VIP Levels"
            desc="Level up with XP and unlock exclusive bonuses and perks."
            glow="cyan"
          />
          <Feature
            title="Provably Fair"
            desc="Transparent systems built with crypto-native trust."
            glow="emerald"
          />
        </div>
      </section>

      {/* PREVIEW STRIP */}
      <section className="py-24 px-6 border-t border-white/10">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold">
            Built for the Future of Crypto Gaming
          </h2>
          <p className="mt-4 text-white/60">
            Wallets, rewards, referrals, and real casino games — all in one
            unified platform.
          </p>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <Preview label="Dashboard" />
            <Preview label="Wallet" />
            <Preview label="VIP" />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-32 px-6">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-700/30 via-cyan-600/15 to-transparent blur-3xl" />
        <div className="relative max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold">
            Early Access Is Live
          </h2>
          <p className="mt-4 text-white/70">
            Join now and start earning PHI before full casino launch.
          </p>

          <Link
            href="/auth/signup"
            className="inline-block mt-10 px-10 py-5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-black font-semibold shadow-[0_0_40px_rgba(52,211,153,0.7)] transition"
          >
            Enter PHI Casino
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-10 text-center text-sm text-white/40">
        © {new Date().getFullYear()} PHI Casino — All rights reserved
      </footer>
    </main>
  );
}

/* ---------------- COMPONENTS ---------------- */

function Feature({
  title,
  desc,
  glow,
}: {
  title: string;
  desc: string;
  glow: "purple" | "cyan" | "emerald";
}) {
  const glowMap = {
    purple: "shadow-[0_0_40px_rgba(124,58,237,0.45)]",
    cyan: "shadow-[0_0_40px_rgba(34,211,238,0.45)]",
    emerald: "shadow-[0_0_40px_rgba(52,211,153,0.45)]",
  };

  return (
    <div
      className={`rounded-3xl border border-white/10 bg-[#07070c] p-8 ${glowMap[glow]}`}
    >
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="mt-3 text-white/60">{desc}</p>
    </div>
  );
}

function Preview({ label }: { label: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#07070c] p-8 text-center text-white/60 hover:bg-white/5 transition">
      {label}
    </div>
  );
}
