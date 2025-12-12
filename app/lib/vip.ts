export function getVipName(level: number) {
  switch (level) {
    case 1:
      return "Starter";
    case 2:
      return "Bronze";
    case 3:
      return "Silver";
    case 4:
      return "Gold";
    case 5:
      return "Platinum";
    case 6:
      return "Diamond";
    case 7:
      return "Whale";
    default:
      return "Starter";
  }
}

export function getVipGradient(level: number) {
  switch (level) {
    case 1:
      return "from-gray-400 to-gray-600";
    case 2:
      return "from-orange-400 to-orange-600";
    case 3:
      return "from-slate-300 to-slate-500";
    case 4:
      return "from-yellow-400 to-yellow-600";
    case 5:
      return "from-purple-400 to-purple-600";
    case 6:
      return "from-cyan-400 to-blue-500";
    case 7:
      return "from-pink-500 to-red-600";
    default:
      return "from-gray-400 to-gray-600";
  }
}
