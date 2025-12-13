import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 pt-32 pb-24 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">
          The Future of Crypto Casinos
        </h1>

        <p className="mt-6 text-lg text-white/70 max-w-2xl mx-auto">
          PHI Casino is a next-generation platform powered by PHI Coin,
          transparent rewards, real ownership, and community-driven growth.
        </p>

        <div className="mt-10 flex justify-center gap-4 flex-wrap">
          <Link
            href="/auth/signup"
            className="px-8 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 font-semibold transition"
          >
            Create Account
          </Link>

          <Link
            href="/auth/login"
            className="px-8 py-3 rounded-xl bg-white/10 hover:bg-white/20 font-semibold transition"
          >
            Login
          </Link>
        </div>
      </section>

      {/* PHI COIN */}
      <section className="max-w-6xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-bold">What is PHI Coin?</h2>
          <p className="mt-4 text-white/70">
            PHI Coin is the internal currency of PHI Casino. It powers rewards,
            VIP levels, daily streaks, and future crypto casino gameplay.
          </p>

          <ul className="mt-6 space-y-3 text-white/70">
            <li>• Earn PHI daily just by logging in</li>
            <li>• Use PHI for games, rewards, and perks</li>
            <li>• Convert PHI to crypto when the casino launches</li>
          </ul>
        </div>

        <div className="bg-[#0b0b0b] border border-[#1f1f1f] rounded-2xl p-8">
          <p className="text-white/60 text-sm">Pre-launch bonus</p>
          <p className="text-2xl font-bold mt-2">🎁 100 PHI on signup</p>
          <p className="text-white/60 mt-2">
            + daily rewards & VIP progression
          </p>
        </div>
      </section>

      {/* CHARITY */}
      <section className="bg-[#0a0a0a] border-t border-[#1f1f1f] py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold">20% to Charity</h2>
          <p className="mt-4 text-white/70">
            We believe casinos should give back.
            <br />
            <strong>20% of all platform earnings</strong> are donated to
            charities chosen by the community.
          </p>

          <div className="mt-8 p-6 bg-black border border-[#1f1f1f] rounded-xl">
            <p className="text-white/60 text-sm">
              Transparency first. Donations will be publicly tracked.
            </p>
          </div>
        </div>
      </section>

      {/* ROADMAP */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <h2 className="text-3xl font-bold text-center">Roadmap</h2>

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <RoadmapCard
            title="Phase 1"
            items={[
              "Accounts & profiles",
              "PHI rewards",
              "VIP levels",
              "Dashboard",
            ]}
            active
          />

          <RoadmapCard
            title="Phase 2"
            items={[
              "Mini-games (Plinko, Coin Flip)",
              "Daily challenges",
              "Referrals",
            ]}
          />

          <RoadmapCard
            title="Phase 3"
            items={[
              "Full crypto casino",
              "Slots & table games",
              "PHI ↔ crypto withdrawals",
            ]}
          />
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-[#1f1f1f] py-20 text-center">
        <h2 className="text-3xl font-bold">Early Access Is Live</h2>
        <p className="mt-4 text-white/70">
          Create an account now and start earning PHI.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <Link
            href="/auth/signup"
            className="px-10 py-4 rounded-xl bg-purple-600 hover:bg-purple-700 font-semibold transition"
          >
            Sign Up
          </Link>

          <Link
            href="/auth/login"
            className="px-10 py-4 rounded-xl bg-white/10 hover:bg-white/20 font-semibold transition"
          >
            Login
          </Link>
        </div>
      </section>
    </main>
  );
}

function RoadmapCard({
  title,
  items,
  active,
}: {
  title: string;
  items: string[];
  active?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl p-6 border ${
        active
          ? "border-purple-500 bg-purple-500/10"
          : "border-[#1f1f1f] bg-[#0b0b0b]"
      }`}
    >
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <ul className="space-y-2 text-white/70">
        {items.map((item) => (
          <li key={item}>• {item}</li>
        ))}
      </ul>
    </div>
  );
}
