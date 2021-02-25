const swapСhips = (indEmpty, indSwap, animate, bg) => {
  const item = document.querySelectorAll('[data-id]');
  const dataSwap = item[indSwap].dataset.id;
  const dataEmpty = item[indEmpty].dataset.id;
  item[indSwap].outerHTML = `
    <div class="empty" style="order:${indSwap}" data-id=${dataEmpty}></div>
    `;
  item[indEmpty].outerHTML = `
    <div class="game-board__item ${animate}" draggable='true' style='order:${indEmpty};background:${bg}' data-id=${dataSwap}>${dataSwap}</div>
    `;
};

export default swapСhips;
