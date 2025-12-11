"use client";

export default function OGBadge({ size = "md" }: { size?: "sm" | "md" }) {
  const classes =
    size === "sm"
      ? "px-2 py-0.5 text-xs"
      : "px-3 py-1 text-sm";

  return (
    <span
      className={`${classes} font-semibold rounded-full 
      bg-gradient-to-br from-purple-500 to-fuchsia-500 
      text-white shadow-lg border border-white/20`}
    >
      OG
    </span>
  );
}
