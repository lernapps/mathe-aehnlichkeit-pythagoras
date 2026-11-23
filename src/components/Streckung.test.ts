import { expect, test } from "vite-plus/test";
import { angle, area, describeState, original, readout, snap, stretchTriangle, distance } from "./Streckung.ts";

test("the original triangle has legs 3 cm and 4 cm, hypotenuse 5 cm and area 6 cm²", () => {
  expect(distance(original.A, original.B)).toBe(3);
  expect(distance(original.A, original.C)).toBe(4);
  expect(distance(original.B, original.C)).toBe(5);
  expect(area(original)).toBe(6);
  expect(angle(original.A, original.B, original.C)).toBe(90);
});

test("stretching by k multiplies every length by k, keeps the angles and multiplies the area by k²", () => {
  for (const k of [0.5, 1, 1.5, 2, 2.5, 3]) {
    const s = stretchTriangle(original, k);
    expect(distance(s.A, s.B)).toBeCloseTo(3 * k, 9);
    expect(distance(s.B, s.C)).toBeCloseTo(5 * k, 9);
    expect(angle(s.A, s.B, s.C)).toBe(90);
    expect(area(s)).toBeCloseTo(6 * k * k, 9);
  }
});

test("the readout uses a decimal comma", () => {
  const r = readout(2.5);
  expect(r.abImage).toBe("7,5");
  expect(r.bcImage).toBe("12,5");
  expect(describeState(0.5)).toContain("k = 0,5");
  expect(describeState(0.5)).toContain("1,5 cm");
});

test("snap keeps the slider on the offered steps", () => {
  expect(snap(0.1)).toBe(0.5);
  expect(snap(1.74)).toBe(1.5);
  expect(snap(9)).toBe(3);
});
