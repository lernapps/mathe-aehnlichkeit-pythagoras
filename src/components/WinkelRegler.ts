// Logic of the angle slider: a right triangle with the angle alpha at A, the right angle at C and the hypotenuse c = AB. The
// learner changes alpha and the size c; the ratios of the sides depend on alpha only. Lengths in cm, y points up.
export type Point = { x: number; y: number };

export const alphaMin = 5;
export const alphaMax = 85;
export const sizeMin = 4;
export const sizeMax = 10;

export type Sides = { opposite: number; adjacent: number; hypotenuse: number };

/** The sides of the triangle for the angle alpha (degrees) and the hypotenuse c. */
export function sides(alpha: number, c: number): Sides {
  const rad = (alpha * Math.PI) / 180;
  return { opposite: c * Math.sin(rad), adjacent: c * Math.cos(rad), hypotenuse: c };
}

/** The corners A (angle alpha), C (right angle) and B. */
export function corners(alpha: number, c: number): { A: Point; B: Point; C: Point } {
  const s = sides(alpha, c);
  return { A: { x: 0, y: 0 }, C: { x: s.adjacent, y: 0 }, B: { x: s.adjacent, y: s.opposite } };
}

/** A number with a decimal comma and the given number of decimals (trailing zeros stay). */
export function fmt(x: number, decimals: number): string {
  return x.toFixed(decimals).replace(".", ",");
}

export type Ratios = { sin: string; cos: string; tan: string };

/** The three ratios as text with three decimals, computed from the side lengths (not from the angle). */
export function ratios(alpha: number, c: number): Ratios {
  const s = sides(alpha, c);
  return {
    sin: fmt(s.opposite / s.hypotenuse, 3),
    cos: fmt(s.adjacent / s.hypotenuse, 3),
    tan: fmt(s.opposite / s.adjacent, 3),
  };
}

/** Keeps a typed or dragged value on whole numbers inside the limits. */
export function clampInt(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, Math.round(value)));
}

export function describeState(alpha: number, c: number): string {
  const s = sides(alpha, c);
  const r = ratios(alpha, c);
  return (
    `Winkel α = ${alpha}°, Hypotenuse ${c} cm. Gegenkathete ${fmt(s.opposite, 2)} cm, Ankathete ${fmt(s.adjacent, 2)} cm. ` +
    `Gegenkathete durch Hypotenuse ${r.sin}, Ankathete durch Hypotenuse ${r.cos}, Gegenkathete durch Ankathete ${r.tan}.`
  );
}
