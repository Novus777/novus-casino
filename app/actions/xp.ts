export function getXpProgress(xp: number) {
  const tiers = [
    { level: 1, name: "Starter", at: 0 },
    { level: 2, name: "Silver", at: 2500 },
    { level: 3, name: "Gold", at: 10000 },
    { level: 4, name: "Diamond", at: 25000 },
    { level: 5, name: "Whale", at: 100000 },
  ];

  const current =
    [...tiers].reverse().find(t => xp >= t.at) ?? tiers[0];

  const next =
    tiers.find(t => t.level === current.level + 1) ?? null;

  return {
    current,
    next,
    percent: next
      ? Math.min(100, Math.floor((xp / next.at) * 100))
      : 100,
  };
}
