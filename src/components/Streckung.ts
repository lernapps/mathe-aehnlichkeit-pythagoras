// Logic of the stretching figure: a triangle with the right angle at A, legs AB = 3 cm and AC = 4 cm (the area stays on the next page), stretched from the
// centre Z by a factor k. The numbers are in cm, Z is the origin and y points up. Pure functions, no browser.
export type Point = { x: number; y: number };
export type Triangle = { A: Point; B: Point; C: Point };

/** The original triangle: A(4|3), B(7|3), C(4|7); AB = 3 cm, AC = 4 cm, BC = 5 cm, ZA = 5 cm, area 6 cm². */
export const original: Triangle = { A: { x: 4, y: 3 }, B: { x: 7, y: 3 }, C: { x: 4, y: 7 } };

/** The slider offers 0.5 to 2.5 in steps of 0.1. */
export const kMin = 0.5;
export const kMax = 2.5;

/** The point stretched from the centre Z (0|0) by k. */
export function stretch(p: Point, k: number): Point {
  return { x: p.x * k, y: p.y * k };
}

export function stretchTriangle(t: Triangle, k: number): Triangle {
  return { A: stretch(t.A, k), B: stretch(t.B, k), C: stretch(t.C, k) };
}

const origin: Point = { x: 0, y: 0 };

export function distance(p: Point, q: Point): number {
  return Math.hypot(p.x - q.x, p.y - q.y);
}

/** The angle at the vertex p between the rays to q and r, in degrees. */
export function angle(p: Point, q: Point, r: Point): number {
  const a = Math.atan2(q.y - p.y, q.x - p.x);
  const b = Math.atan2(r.y - p.y, r.x - p.x);
  let d = Math.abs(a - b) * (180 / Math.PI);
  if (d > 180) d = 360 - d;
  return Math.round(d * 1000) / 1000;
}

export function area(t: Triangle): number {
  return Math.abs((t.B.x - t.A.x) * (t.C.y - t.A.y) - (t.C.x - t.A.x) * (t.B.y - t.A.y)) / 2;
}

/** A number with a decimal comma and at most two decimals: 2.5 → "2,5", 6 → "6". */
export function fmt(x: number): string {
  return String(Math.round(x * 100) / 100).replace(".", ",");
}

export type Readout = {
  k: string;
  za: string;
  zaImage: string;
  ab: string;
  ac: string;
  bc: string;
  abImage: string;
  acImage: string;
  bcImage: string;
  angleA: string;
  angleAImage: string;
};

/** All numbers the figure shows for the factor k, as text with decimal comma. */
export function readout(k: number): Readout {
  const t = original;
  const s = stretchTriangle(t, k);
  return {
    k: fmt(k),
    za: fmt(distance(origin, t.A)),
    zaImage: fmt(distance(origin, s.A)),
    ab: fmt(distance(t.A, t.B)),
    ac: fmt(distance(t.A, t.C)),
    bc: fmt(distance(t.B, t.C)),
    abImage: fmt(distance(s.A, s.B)),
    acImage: fmt(distance(s.A, s.C)),
    bcImage: fmt(distance(s.B, s.C)),
    angleA: fmt(angle(t.A, t.B, t.C)),
    angleAImage: fmt(angle(s.A, s.B, s.C)),
  };
}

/** The sentence a screen reader gets after each change of the slider. */
export function describeState(k: number): string {
  const r = readout(k);
  return (
    `Streckfaktor k = ${r.k}. Der Abstand von Z zu A ist ${r.za} cm, zu A′ ${r.zaImage} cm. Die Strecke AB ist ${r.ab} cm lang, ihr Bild A′B′ ${r.abImage} cm. ` +
    `Der Winkel bei A misst vorher ${r.angleA}° und nachher ${r.angleAImage}°.`
  );
}

/** The next value of the slider by arrow keys is the browser's; this keeps a typed or dragged value on the offered steps (0.1). */
export function snap(value: number): number {
  const clamped = Math.min(kMax, Math.max(kMin, value));
  return Math.round(clamped * 10) / 10;
}
