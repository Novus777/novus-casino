/**
 * PHI Casino core helpers
 * Safe, shared utilities only
 * NO React
 * NO client-only code
 */

/**
 * Formats PHI amounts safely
 */
export function formatPhi(amount?: number | null): string {
  const value = typeof amount === "number" ? amount : 0;
  return value.toFixed(2);
}

/**
 * Converts XP → VIP level
 */
export function xpToVipLevel(xp: number): number {
  if (xp >= 5000) return 5;
  if (xp >= 2500) return 4;
  if (xp >= 1000) return 3;
  if (xp >= 250) return 2;
  return 1;
}

/**
 * VIP display name
 */
export function vipName(level: number): string {
  switch (level) {
    case 5:
      return "Diamond";
    case 4:
      return "Platinum";
    case 3:
      return "Gold";
    case 2:
      return "Silver";
    default:
      return "Bronze";
  }
}

/**
 * VIP gradient (CSS)
 */
export function vipGradient(level: number): string {
  if (level >= 5) return "linear-gradient(135deg,#00f2ff,#7a00ff)";
  if (level >= 4) return "linear-gradient(135deg,#a855f7,#3b82f6)";
  if (level >= 3) return "linear-gradient(135deg,#f59e0b,#ef4444)";
  if (level >= 2) return "linear-gradient(135deg,#9ca3af,#6b7280)";
  return "linear-gradient(135deg,#92400e,#78350f)";
}
