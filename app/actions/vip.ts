export function getVipName(xp: number): string {
  if (xp >= 100000) return "Whale";
  if (xp >= 25000) return "Diamond";
  if (xp >= 10000) return "Gold";
  if (xp >= 2500) return "Silver";
  return "Starter";
}

export function getVipLevel(xp: number): number {
  if (xp >= 100000) return 5;
  if (xp >= 25000) return 4;
  if (xp >= 10000) return 3;
  if (xp >= 2500) return 2;
  return 1;
}
