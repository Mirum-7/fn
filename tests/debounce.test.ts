import { describe, expect, test } from "bun:test";
import { debounce } from "../src";

describe("debounce()", () => {
  test("debounces function calls", () => {
    let callCount = 0;
    const { fn, clear } = debounce({
      fn: () => {
        callCount++;
      },
      wait: 100,
    });

    fn();
    fn();
    fn();

    expect(callCount).toBe(0);
  });

  test("debounces function calls with await", async () => {
    let callCount = 0;
    const { fn, clear } = debounce({
      fn: () => {
        callCount++;
      },
      wait: 100,
    });

    await fn();
    await fn();
    await fn();

    expect(callCount).toBe(3);
  });

  test("clear cancels the debounce", () => {
    let callCount = 0;
    const { fn, clear } = debounce({
      fn: () => {
        callCount++;
      },
      wait: 100,
    });

    fn();
    clear();

    setTimeout(() => {
      expect(callCount).toBe(0);
    }, 200);
  });
});
