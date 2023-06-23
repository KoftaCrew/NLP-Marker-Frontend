// eslint-disable-next-line @typescript-eslint/no-explicit-any
const deepCopy = <T>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj));
};

export { deepCopy };
