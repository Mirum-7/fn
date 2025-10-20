export const equals = (...elements: unknown[]): boolean => {
  if (elements.length === 0) {
    return true;
  }

  const isTypeEqual = elements.every((element1, _, arr) =>
    arr.every((element2) => typeof element2 === typeof element1)
  );

  if (!isTypeEqual) {
    return false;
  }

  if (
    ["string", "number", "bigint", "boolean", "undefined"].includes(
      typeof elements[0]
    )
  ) {
    return elements.every((element1, _, arr) =>
      arr.every((element2) => element1 === element2)
    );
  }

  if (elements[0] === null) {
    return elements.every((element) => element === null);
  }

  if (typeof elements[0] === "object") {
    return (elements as Record<string, unknown>[]).every((element1, _, arr) =>
      arr.every((element2) =>
        Object.keys(element1).every((key) =>
          equals(element1[key], element2[key])
        )
      )
    );
  }

  return false;
};
