export const getValuesCount = (objectsArray, key) => {
  return objectsArray.reduce((acc, curr) => {
    const value = curr[key];
    acc[value] ? acc[value].count++ : acc[value] = { count: 1 };
    return acc;
  }, {});
};


export const getUniqueValues = (objectsArray, key) => {
  return objectsArray.reduce((acc, curr) => {
    ~acc.indexOf(curr[key]) || acc.push(curr[key]);
    return acc;
  }, []);
};


export const getAllSizes = (objectsArray) => {
  return objectsArray
    .reduce((acc, object) => {
      const sizes = object && object.sizes ? object.sizes.split(`,`) : [];
      sizes.forEach((size) => {
        ~acc.indexOf(+size) || acc.push(+size);
      });
      return acc;
    }, [])
    .sort();
};


export const extend = (a, b) => {
  return Object.assign({}, a, b);
};
