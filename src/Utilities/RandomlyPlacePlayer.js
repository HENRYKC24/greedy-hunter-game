
const randomlyPlacePlayer = (param, contentArray) => {
  let result;
  const round = param * param;
  for (let i = 0; i < param; i += 1) {
    let ranDom = Math.floor((Math.random() * round) + 1);
    if (!contentArray.includes(ranDom)) {
      result = ranDom;
    } else {
      i -= 1;
    }
  }
  return result;
};

export default randomlyPlacePlayer;
