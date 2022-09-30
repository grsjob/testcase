export const getUniqID = () => {
  return Math.random().toString(32).substring(8);
};