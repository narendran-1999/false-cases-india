// degrees → radians factor
const DEG = Math.PI / 180

// % (0–100) → sweep angle in degrees
export const pctToDeg = (pct: number) => pct * 3.6

// rotate so 0° starts at top (SVG starts at 3 o’clock)
const toSvgDeg = (deg: number) => deg - 90

// polar → cartesian using degrees
export function polarToCartesian(
    cx: number,
    cy: number,
    r: number,
    deg: number
): {x: number; y: number} {
    const a = toSvgDeg(deg) * DEG
    return {
        x: cx + r * Math.cos(a),
        y: cy + r * Math.sin(a)
    }
}

// filled pie-slice path
export function arcPath(
    cx: number,
    cy: number,
    r: number,
    startDeg: number,
    endDeg: number
): string {
  const s = polarToCartesian(cx, cy, r, startDeg)
  const e = polarToCartesian(cx, cy, r, endDeg)
  const large = endDeg - startDeg > 180 ? 1 : 0

  return `
    M ${cx} ${cy}
    L ${s.x} ${s.y}
    A ${r} ${r} 0 ${large} 1 ${e.x} ${e.y}
    Z
  `
}