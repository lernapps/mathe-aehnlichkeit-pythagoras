import { expect, test } from "vite-plus/test";
import { clampInt, corners, describeState, fmt, ratios, sides } from "./WinkelRegler.ts";

test("the sides follow Pythagoras and the angle", () => {
  for (const alpha of [5, 30, 45, 60, 85]) {
    for (const c of [4, 7, 10]) {
      const s = sides(alpha, c);
      expect(s.opposite ** 2 + s.adjacent ** 2).toBeCloseTo(c * c, 9);
    }
  }
  const s = sides(30, 8);
  expect(s.opposite).toBeCloseTo(4, 9);
  expect(s.adjacent).toBeCloseTo(6.9282, 3);
});

test("the ratios depend on the angle only, not on the size", () => {
  for (const alpha of [10, 30, 45, 70]) {
    expect(ratios(alpha, 4)).toEqual(ratios(alpha, 10));
  }
  expect(ratios(30, 6)).toEqual({ sin: "0,500", cos: "0,866", tan: "0,577" });
  expect(ratios(45, 5).tan).toBe("1,000");
});

test("the corners form a right angle at C", () => {
  const { A, B, C } = corners(40, 9);
  expect(C.y).toBe(0);
  expect(B.x).toBe(C.x);
  expect(A.x).toBe(0);
});

test("text uses a decimal comma and clampInt keeps whole numbers inside the limits", () => {
  expect(fmt(3.5, 2)).toBe("3,50");
  expect(describeState(30, 8)).toContain("α = 30°");
  expect(describeState(30, 8)).toContain("0,500");
  expect(clampInt(2, 5, 85)).toBe(5);
  expect(clampInt(40.4, 5, 85)).toBe(40);
  expect(clampInt(99, 5, 85)).toBe(85);
});
