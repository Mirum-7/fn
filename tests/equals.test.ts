import { describe, expect, test } from "bun:test";
import { equals } from "../src";

describe("equals()", () => {
  test("empty", () => {
    expect(equals()).toBeTrue();
  });

  describe("number, bigint", () => {
    test("true", () => {
      expect(equals(1, 1, 1, 1, 1)).toBeTrue();

      expect(equals(0)).toBeTrue();

      expect(equals(1n, 1n, 1n, 1n, 1n)).toBeTrue();
    });

    test("false", () => {
      expect(equals(0, 1, 1, 1)).toBeFalse();

      expect(equals(1n, 1)).toBeFalse();

      expect(equals(1n, 2n)).toBeFalse();
    });
  });

  describe("null", () => {
    test("true", () => {
      expect(equals(null, null, null)).toBeTrue();
    });

    test("false", () => {
      expect(equals(null, undefined)).toBeFalse();
      expect(equals(null, 0)).toBeFalse();
    });
  });

  describe("undefined", () => {
    test("true", () => {
      expect(equals(undefined, undefined, undefined)).toBeTrue();
    });

    test("false", () => {
      expect(equals(undefined, null)).toBeFalse();
      expect(equals(undefined, 0)).toBeFalse();
    });
  });

  describe("array", () => {
    test("true", () => {
      expect(equals([1, 2, 3], [1, 2, 3], [1, 2, 3])).toBeTrue();
    });

    test("false", () => {
      expect(equals([1, 2, 3], [1, 2, 4], [1, 2, 3])).toBeFalse();
      expect(equals([1, 2, 3], [1, 2], [1, 2, 3])).toBeFalse();
    });
  });

  describe("object", () => {
    test("true", () => {
      expect(
        equals(
          { a: 1, b: { c: 2 } },
          { a: 1, b: { c: 2 } },
          { a: 1, b: { c: 2 } }
        )
      ).toBeTrue();
    });

    test("false", () => {
      expect(
        equals(
          { a: 1, b: { c: 2 } },
          { a: 1, b: { c: 3 } },
          { a: 1, b: { c: 2 } }
        )
      ).toBeFalse();

      expect(
        equals({ a: 1, b: { c: 2 } }, { a: 1, b: 2 }, { a: 1, b: { c: 2 } })
      ).toBeFalse();
    });
  });
});
