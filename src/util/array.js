export const covertTo2DArray = (arr, col) => {
  //arr: 1치원배열, col: 열 수
  const tmpList = [];
  for (let i = 0; i < arr.length; i += col) {
    tmpList.push(arr.slice(i, i + col));
  }
  return tmpList;
};
