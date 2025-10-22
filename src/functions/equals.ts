export const equals = (...elements: unknown[]): boolean => {
  if (elements.length === 0) {
    return true;
  }

  if (
    ["string", "number", "bigint", "boolean", "undefined"].includes(
      typeof elements[0]
    )
  ) {
    return elements.every((element) => elements[0] === element);
  }

  if (elements[0] === null) {
    return elements.every((element) => element === null);
  }

  if (typeof elements[0] === "object") {
    const lengths = (elements as Record<string, unknown>[]).map(
      (el) => Object.keys(el).length
    );

    const isLengthEqual = lengths.every((len) => len === lengths[0]);

    if (!isLengthEqual) {
      return false;
    }

    const first = elements[0] as Record<string, unknown>;
    const firstKeys = Object.keys(first);

    return (elements as Record<string, unknown>[]).every((element) =>
      firstKeys.every((key) => equals(first[key], element[key]))
    );
  }

  return false;
};
