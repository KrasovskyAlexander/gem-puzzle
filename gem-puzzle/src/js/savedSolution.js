const arr = [];
export default function savedSolution(solutionArr = false, solutionCount = false) {
  if (arr.length !== 0 && solutionArr && solutionCount) {
    arr.pop();
    arr.pop();
  } if (solutionArr && solutionCount) {
    arr.push(solutionArr);
    arr.push(solutionCount);
  }
  return function () {
    return arr;
  };
}
