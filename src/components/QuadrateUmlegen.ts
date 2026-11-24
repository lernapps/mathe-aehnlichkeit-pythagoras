// Logic of the proof by rearranging: a square of side a + b holds four right triangles with the legs a and b. In the first
// arrangement the rest is the square over the hypotenuse (c²); in the second the same four triangles leave the squares
// over the legs (a² and b²). The numbers are in cm, y points up. Pure functions, no browser.
export type Point = { x: number; y: number };
export type Polygon = Point[];

export type Arrangement = {
  /** The four triangles, in the order 1 to 4. */
  triangles: Polygon[];
  /** The squares that remain: one for the first arrangement (c²), two for the second (a², b²). */
  squares: { name: "a" | "b" | "c"; polygon: Polygon }[];
};

const p = (x: number, y: number): Point => ({ x, y });

/** Shoelace formula: the area of a polygon. */
export function area(poly: Polygon): number {
  let s = 0;
  for (let i = 0; i < poly.length; i++) {
    const q = poly[i]!;
    const r = poly[(i + 1) % poly.length]!;
    s += q.x * r.y - r.x * q.y;
  }
  return Math.abs(s) / 2;
}

/** The first arrangement: four triangles in the corners, the tilted square over c in the middle. */
export function first(a: number, b: number): Arrangement {
  const s = a + b;
  return {
    triangles: [
      [p(a, 0), p(s, 0), p(s, a)],
      [p(s, a), p(s, s), p(b, s)],
      [p(b, s), p(0, s), p(0, b)],
      [p(0, b), p(0, 0), p(a, 0)],
    ],
    squares: [{ name: "c", polygon: [p(a, 0), p(s, a), p(b, s), p(0, b)] }],
  };
}

/** The second arrangement: the square over b at the bottom left, the square over a at the top right, the triangles in the two rectangles. */
export function second(a: number, b: number): Arrangement {
  const s = a + b;
  return {
    triangles: [
      [p(b, 0), p(s, 0), p(s, b)],
      [p(0, b), p(b, b), p(b, s)],
      [p(0, b), p(b, s), p(0, s)],
      [p(b, 0), p(s, b), p(b, b)],
    ],
    squares: [
      { name: "b", polygon: [p(0, 0), p(b, 0), p(b, b), p(0, b)] },
      { name: "a", polygon: [p(b, b), p(s, b), p(s, s), p(b, s)] },
    ],
  };
}

/** A number with a decimal comma and at most two decimals. */
export function fmt(x: number): string {
  return String(Math.round(x * 100) / 100).replace(".", ",");
}

export const steps = 3;

/** The sentence under the figure for the step 1 to 3 with the legs a and b. */
export function describeStep(step: number, a: number, b: number): string {
  const s = a + b;
  const whole = s * s;
  const tri = (a * b) / 2;
  const a2 = a * a;
  const b2 = b * b;
  const c2 = a2 + b2;
  if (step === 1) {
    return (
      `Das große Quadrat hat die Seite ${a} cm + ${b} cm = ${s} cm und die Fläche ${whole} cm². ` +
      `Vier Dreiecke mit den Katheten ${a} cm und ${b} cm haben je ${fmt(tri)} cm², zusammen ${fmt(4 * tri)} cm². ` +
      `In der Mitte bleibt das schiefe Quadrat über der Hypotenuse c: ${fmt(whole - 4 * tri)} cm².`
    );
  }
  if (step === 2) {
    return (
      `Dieselben vier Dreiecke liegen jetzt anders, das große Quadrat ist gleich groß. Übrig bleiben zwei Quadrate: ` +
      `das Quadrat über b mit ${b2} cm² und das Quadrat über a mit ${a2} cm².`
    );
  }
  return (
    `Beide Male bleibt vom großen Quadrat nach Abzug derselben vier Dreiecke gleich viel übrig. ` +
    `Also gilt c² = a² + b²: ${fmt(c2)} cm² = ${a2} cm² + ${b2} cm².`
  );
}
