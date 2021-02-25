const viewGame = (arr, background = false) => {
  const gameBoard = document.querySelector('.game-board');
  let bg = '';
  if (background) {
    bg = background;
  } else {
    bg = `./img/${Math.floor(Math.random() * Math.floor(20)) + 10}.jpg`;
  }
  const bgSize = `${Math.sqrt(arr.length)}00%`;
  const bgPos = {
    x: 0,
    y: 0,
  };
  function templateItem(i, j) {
    return `
        <div class="game-board__item" draggable='true' style="order:${j}; background: no-repeat url(${bg}) ${bgPos.x}% ${bgPos.y}% / ${bgSize};" data-id=${i}>${i}</div>
        `;
  }
  function templateEmpty(i, j) {
    return `
        <div class="empty" style="order:${j}" data-id=${i}></div>
        `;
  }
  let fragment = '';
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === arr.length) {
      fragment += templateEmpty(arr[i], i);
      continue;
    }
    bgPos.x = 0;
    bgPos.y = 0;
    for (let j = 1; j < arr[i]; j++) {
      bgPos.x += Math.floor(100 / (Math.sqrt(arr.length) - 1));
      if (bgPos.x > 100) {
        bgPos.y += Math.floor(100 / (Math.sqrt(arr.length) - 1));
        if (bgPos.y > 100) {
          bgPos.y = 0;
        }
        bgPos.x = 0;
      }
    }
    const item = templateItem(arr[i], i);
    fragment += item;
  }

  gameBoard.innerHTML = '';
  gameBoard.insertAdjacentHTML('afterbegin', fragment);
};

export default viewGame;
