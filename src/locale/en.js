var ordinals = ["th", "st", "nd", "rd"];

export function ordinal(x) {
  return ordinals[(3 < x && x < 21) || (x %= 10) > 3 ? 0 : x];
};
