export const checkElementsExist = (
  sourceValue: number,
  targetArray: number[],
): boolean => {
  return targetArray.includes(sourceValue);
};

export const generateRandomNumber = (n) => {
  const min = 10 ** (n - 1);
  const max = 10 ** n - 1;
  return (Math.floor(Math.random() * (max - min + 1)) + min).toString();
};
