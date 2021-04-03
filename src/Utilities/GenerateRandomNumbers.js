
const generateRandomNumbers = (param) => {
  let result = [];
  const round = param * param;
  for (let i = 0; i < param; i += 1) {
    let ranDom = Math.floor((Math.random() * round) + 1);
    if (!result.includes(ranDom)) {
      result.push(ranDom);
    } else {
      i -= 1;
    }
  }
  return result;
};

export default generateRandomNumbers;
