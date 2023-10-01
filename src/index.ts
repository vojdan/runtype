export const runtype = (input: any): string => {
  if (input === null) {
    return "null";
  }

  const type = typeof input;

  if (type === "object") {
    if (Array.isArray(input)) {
      if (input.length === 0) {
        return "any[]";
      }
      const uniqueTypes = Array.from(new Set(input.map(runtype)));
      return uniqueTypes.length === 1
        ? `${uniqueTypes[0]}[]`
        : `(${uniqueTypes.join(" | ")})[]`;
    }

    const keys = Object.keys(input);
    if (keys.length === 0) {
      return "{}";
    }

    const properties = keys
      .map((key) => `${key}: ${runtype(input[key])}`)
      .join("; ");
    return `{ ${properties} }`;
  }

  return type;
};

export default runtype;
