export const convertObjectToArray = (obj: any) => {
  const array = [];

  for (let i = 0; obj[i] !== undefined; i++) {
    array.push(obj[i]);
  }

  const { feed_key, message, ...rest } = obj;
  array.push(rest);

  return array;
};
