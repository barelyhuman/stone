class DimensionFactory {
  raw: string | number;
  value: () => string | number;
  unit: () => string | number;
  constructor(dimension: string | number) {
    const unitRegex = /(\d+)(px|rem|em)$/;
    const result = String(dimension).match(unitRegex) || "";
    this.raw = dimension;
    this.value = () => (result && result[1]) || "";
    this.unit = () => (result && result[2]) || "";
  }
}

export { DimensionFactory };
