import runtype from ".";

describe("generateTypeDefinition - simpler", () => {
  test("should handle numbers", () => {
    expect(runtype(42)).toBe("number");
  });

  test("should handle strings", () => {
    expect(runtype("hello")).toBe("string");
  });

  test("should handle booleans", () => {
    expect(runtype(true)).toBe("boolean");
  });

  test("should handle null", () => {
    expect(runtype(null)).toBe("null");
  });

  test("should handle arrays", () => {
    expect(runtype([1, 2, 3])).toBe("number[]");
    expect(runtype(["a", "b"])).toBe("string[]");
    expect(runtype([1, "a"])).toBe("(number | string)[]");
  });

  test("should handle objects", () => {
    expect(runtype({})).toBe("{}");
    expect(runtype({ a: 1, b: "hello" })).toBe("{ a: number; b: string }");
  });

  test("should handle nested objects", () => {
    expect(runtype({ a: { b: 1 }, c: "hello" })).toBe(
      "{ a: { b: number }; c: string }"
    );
  });
});

describe("generateTypeDefinition", () => {
  // Primitive types
  test("should handle numbers", () => {
    expect(runtype(42)).toBe("number");
  });

  test("should handle strings", () => {
    expect(runtype("hello")).toBe("string");
  });

  test("should handle booleans", () => {
    expect(runtype(true)).toBe("boolean");
  });

  test("should handle undefined", () => {
    expect(runtype(undefined)).toBe("undefined");
  });

  test("should handle null", () => {
    expect(runtype(null)).toBe("null");
  });

  // Arrays
  test("should handle empty arrays", () => {
    expect(runtype([])).toBe("any[]");
  });

  test("should handle arrays of numbers", () => {
    expect(runtype([1, 2, 3])).toBe("number[]");
  });

  test("should handle arrays of strings", () => {
    expect(runtype(["a", "b"])).toBe("string[]");
  });

  test("should handle arrays of mixed types", () => {
    expect(runtype([1, "a"])).toBe("(number | string)[]");
  });

  test("should handle arrays of objects", () => {
    expect(runtype([{ a: 1 }, { a: 2 }])).toBe("{ a: number }[]");
  });

  test("should handle arrays of different objects", () => {
    expect(runtype([{ a: 1 }, { b: "hello" }])).toBe(
      "({ a: number } | { b: string })[]"
    );
  });

  // Objects
  test("should handle empty objects", () => {
    expect(runtype({})).toBe("{}");
  });

  test("should handle simple objects", () => {
    expect(runtype({ a: 1, b: "hello" })).toBe("{ a: number; b: string }");
  });

  test("should handle nested objects", () => {
    expect(runtype({ a: { b: 1 }, c: "hello" })).toBe(
      "{ a: { b: number }; c: string }"
    );
  });

  test("should handle objects with array properties", () => {
    expect(runtype({ a: [1, 2, 3], b: "hello" })).toBe(
      "{ a: number[]; b: string }"
    );
  });

  test("should handle objects with mixed array properties", () => {
    expect(runtype({ a: [1, "a"], b: "hello" })).toBe(
      "{ a: (number | string)[]; b: string }"
    );
  });

  test("should handle objects with null properties", () => {
    expect(runtype({ a: null, b: "hello" })).toBe("{ a: null; b: string }");
  });

  // Complex nested structures
  test("should handle deeply nested objects", () => {
    expect(runtype({ a: { b: { c: { d: 1 } } } })).toBe(
      "{ a: { b: { c: { d: number } } } }"
    );
  });

  test("should handle deeply nested arrays", () => {
    expect(runtype([[[[1]]]])).toBe("number[][][][]");
  });

  test("should handle arrays of deeply nested objects", () => {
    expect(runtype([{ a: { b: { c: 1 } } }])).toBe(
      "{ a: { b: { c: number } } }[]"
    );
  });
});
