"use client";

import { useEffect, useState } from "react";

export default function CountUp({
  value,
  duration = 600,
}: {
  value: number;
  duration?: number;
}) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let start = 0;
    const step = Math.max(1, Math.floor(value / (duration / 16)));

    const interval = setInterval(() => {
      start += step;
      if (start >= value) {
        setDisplay(value);
        clearInterval(interval);
      } else {
        setDisplay(start);
      }
    }, 16);

    return () => clearInterval(interval);
  }, [value, duration]);

  return <span>{display.toLocaleString()}</span>;
}
