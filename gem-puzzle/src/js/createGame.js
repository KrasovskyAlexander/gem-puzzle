const generateGame = (size, wrapperSel) => {
  const arr = [];
  size = +size;
  const arrSolution = [size - 1];
  let quantityIteration = 0;
  if (size === 9) {
    quantityIteration = size * 20;
  } else if (size === 16) {
    quantityIteration = size * 40;
  } else if (size === 25) {
    quantityIteration = size * 80;
  } else if (size === 36) {
    quantityIteration = size * 150;
  } else if (size === 49) {
    quantityIteration = size * 250;
  } else if (size === 64) {
    quantityIteration = size * 400;
  }
  let counter = 0;
  const wrapper = document.querySelector(wrapperSel);

  if (document.querySelector('.game-board')) {
    document.querySelector('.game-board').remove();
  }
  const gameBoard = document.createElement('div');
  gameBoard.classList.add('game-board');
  gameBoard.style.cssText = `
    grid-template-columns: repeat(${Math.sqrt(size)}, 1fr);
    `;
  wrapper.append(gameBoard);

  const problemArr = [];
  let num = size - 1;
  for (let index = 0; index < Math.sqrt(size); index++) {
    problemArr.push(num);
    num -= Math.sqrt(size);
  }

  for (let i = 0; i < size; i++) {
    arr.push(i + 1);
  }
  let side = '';
  for (let i = 0; i < quantityIteration; i++) {
    const emptyInd = arr.indexOf(+size);
    const randomInd = Math.floor(Math.random() * Math.floor(size));
    if (randomInd + 1 == emptyInd && !problemArr.includes(randomInd) && side !== 'left') {
      const empty = arr.splice(emptyInd, 1)[0];
      const swap = arr.splice(randomInd, 1)[0];
      arr.splice(emptyInd - 1, 0, swap);
      arr.splice(randomInd, 0, empty);
      counter++;
      arrSolution.push(randomInd);
      side = 'right';
    } else if (randomInd - 1 == emptyInd && !problemArr.includes(emptyInd) && side !== 'right') {
      const empty = arr.splice(emptyInd, 1)[0];
      const swap = arr.splice(randomInd - 1, 1)[0];
      arr.splice(emptyInd, 0, swap);
      arr.splice(randomInd, 0, empty);
      counter++;
      arrSolution.push(randomInd);
      side = 'left';
    } else if (randomInd - Math.sqrt(size) == emptyInd && side !== 'down') {
      const empty = arr.splice(emptyInd, 1)[0];
      const swap = arr.splice(randomInd - 1, 1)[0];
      arr.splice(emptyInd, 0, swap);
      arr.splice(randomInd, 0, empty);
      counter++;
      arrSolution.push(randomInd);
      side = 'up';
    } else if (randomInd + Math.sqrt(size) == emptyInd && side !== 'up') {
      const empty = arr.splice(emptyInd, 1)[0];
      const swap = arr.splice(randomInd, 1)[0];
      arr.splice(emptyInd - 1, 0, swap);
      arr.splice(randomInd, 0, empty);
      counter++;
      arrSolution.push(randomInd);
      side = 'down';
    }
  }
  return { arr, arrSolution, counter };
};
export default generateGame;
