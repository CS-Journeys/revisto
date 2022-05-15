export const addMilliseconds = (date, milliseconds) => {
  const result = new Date(date);
  result.setMilliseconds(result.getMilliseconds() + milliseconds);
  return result;
};