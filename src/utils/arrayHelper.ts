type CallbackOrString<T> = ((item: T) => string | number) | keyof T;

const groupBy = <T>(
  array: T[],
  cbOrString: CallbackOrString<T>,
): Record<string | number, T[]> => {
  const map = new Map<string | number, T[]>();

  for (let i = 0; i < array.length; i++) {
    const element = array[i];
    const key =
      typeof cbOrString === 'function'
        ? cbOrString(element)
        : (element[cbOrString] as string | number);

    if (map.has(key)) {
      map.get(key)!.push(element);
    } else {
      map.set(key, [element]);
    }
  }

  return Object.fromEntries(map) as Record<string | number, T[]>;
};

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
function comapreArrayAndGetPercentage(arr1: any[], arr2: any[]) {
  if (arr1.length === 0) return 0; // Avoid division by zero
  const matchCount = arr1.filter((item) => arr2.includes(item)).length;
  return (matchCount / arr1.length) * 100;
}

export { groupBy, wait, comapreArrayAndGetPercentage };
