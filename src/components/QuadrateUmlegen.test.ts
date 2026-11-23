import { expect, test } from "vite-plus/test";
import { area, describeStep, first, fmt, second } from "./QuadrateUmlegen.ts";

const cases: [number, number][] = [
  [3, 4],
  [2, 5],
  [1, 1],
  [6, 6],
  [2, 3],
];

test("in both arrangements the four triangles and the squares fill the large square exactly", () => {
  for (const [a, b] of cases) {
    const whole = (a + b) * (a + b);
    for (const arr of [first(a, b), second(a, b)]) {
      const sum =
        arr.triangles.reduce((acc, t) => acc + area(t), 0) + arr.squares.reduce((acc, q) => acc + area(q.polygon), 0);
      expect(sum).toBeCloseTo(whole, 9);
      for (const t of arr.triangles) expect(area(t)).toBeCloseTo((a * b) / 2, 9);
    }
  }
});

test("the square over the hypotenuse has the area of the two squares over the legs", () => {
  for (const [a, b] of cases) {
    const c2 = area(first(a, b).squares[0]!.polygon);
    const [sb, sa] = second(a, b).squares;
    expect(area(sb!.polygon)).toBe(b * b);
    expect(area(sa!.polygon)).toBe(a * a);
    expect(c2).toBeCloseTo(a * a + b * b, 9);
  }
});

test("the texts name the numbers with a decimal comma", () => {
  expect(describeStep(1, 3, 4)).toContain("Fläche 49 cm²");
  expect(describeStep(1, 3, 4)).toContain("6 cm²");
  expect(describeStep(1, 3, 4)).toContain("25 cm²");
  expect(describeStep(2, 3, 4)).toContain("16 cm²");
  expect(describeStep(3, 3, 4)).toContain("25 cm² = 9 cm² + 16 cm²");
  expect(describeStep(1, 2, 5)).toContain("5 cm²");
  expect(fmt(2.5)).toBe("2,5");
});
