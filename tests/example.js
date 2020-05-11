const calculateArea = (l, w) => {
  return l * w;
};

const calculate = (l, w) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (isNaN(l) || isNaN(w)) {
        reject("args need to be numbers");
      }
      resolve(calculateArea(l, w));
    }, 1000);
  });

module.exports = { calculateArea, calculate };
