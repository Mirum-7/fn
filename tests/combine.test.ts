import { describe, expect, test } from "bun:test";
import { combine } from "../src";

describe("combine()", () => {
  test("combines functions", () => {
    const func1 = (a: number) => ({ a });
    const func2 = ({ a }: { a: number }) => ({ b: a * 2, a });
    const func3 = ({ a, b }: { a: number; b: number }) => a + b;

    const combined = combine(func1, func2, func3);
    expect(combined(5)).toBe(15); // 5 + (5 * 2) = 15
  });

  test("handles single function", () => {
    const func = (a: number) => a * a;
    const combined = combine(func);
    expect(combined(4)).toBe(16); // 4 * 4 = 16
  });
});
