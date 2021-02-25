import swapСhips from './swapСhips';
import savedSolution from './savedSolution';

const arrfff = [];
const mainFunctional = (arr, timer, time, step = false, arrSolution, counter, newGame = false) => {
  const wrapper = document.querySelector('.game-board');
  const solution = document.querySelector('#solution');
  if (!localStorage.getItem('records')) {
    localStorage.setItem('records', '[]');
  }
  const problemArr = [];
  const problemArr2 = [];
  let num = arr.length - 1;
  let num2 = arr.length;
  for (let index = 0; index < Math.sqrt(arr.length); index++) {
    problemArr.push(num);
    problemArr2.push(num2);
    num -= Math.sqrt(arr.length);
    num2 -= Math.sqrt(arr.length);
  }
  let count = 0;
  if (step) {
    count = +step;
  }
  document.querySelector('.steps').textContent = `Steps: ${count}`;
  const finalArray = [];
  for (let index = 1; index <= arr.length; index++) {
    finalArray.push(index);
  }
  function diff(a, b) {
    return JSON.stringify(a) == JSON.stringify(b);
  }

  function playAudio() {
    if (document.querySelector('#sound').classList.contains('btn_active')) {
      const audio = new Audio();
      audio.src = './img/Sound.mp3';
      audio.autoplay = true;
    }
  }
  function isCheck() {
    if (diff(finalArray, arr)) {
      clearInterval(timer);
      const modal = document.querySelector('.modal_final');
      const overlay = document.querySelector('.overlay');
      const chips = document.querySelectorAll('.game-board__item');
      modal.textContent = `Youuu win on ${count} steps and ${time.min ? `${time.min}m` : ''} ${time.sec}s`;
      let records = JSON.parse(localStorage.getItem('records'));
      const obj = {
        time: `${time.min ? `${time.min}m` : ''} ${time.sec}s`,
        steps: count,
        bg: chips[0].style.background.slice(5, 17),
        size: `${Math.sqrt(arr.length)}x${Math.sqrt(arr.length)}`,
      };
      for (let index = 0; index < records.length; index++) {
        if (obj.steps > records[records.length - 1].steps) {
          records.push(obj);
          break;
        }
        if (obj.steps < records[index].steps) {
          const record = records.splice(index, records.length);
          records = records.splice(0, index);
          records.push(obj);
          records = [...records, ...record];
          break;
        }
      }
      if (records.length === 0) {
        records.push(obj);
      }
      localStorage.setItem('records', JSON.stringify(records.splice(0, 10)));
      overlay.classList.add('overlay_active');
      modal.classList.add('modal_active');
    }
  }
  function dragAndDrop() {
    const items = document.querySelectorAll('[data-id]');
    const empty = document.querySelector('.empty');
    items.forEach((item) => {
      item.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text', e.target.textContent);
      });
    });
    empty.addEventListener('dragover', (e) => {
      e.preventDefault();
    });
    empty.addEventListener('drop', (e) => {
      const items = document.querySelectorAll('[data-id]');
      const empty = document.querySelector('.empty');
      const emptyInd = +empty.style.order;
      const swapInd = arr.indexOf(+(e.dataTransfer.getData('text')));
      if (swapInd + 1 == emptyInd && !problemArr.includes(swapInd)) {
        const empty = arr.splice(emptyInd, 1)[0];
        const swap = arr.splice(swapInd, 1)[0];
        arr.splice(emptyInd - 1, 0, swap);
        arr.splice(swapInd, 0, empty);
        count++;
        playAudio();
        const bg = items[swapInd].style.background;
        swapСhips(emptyInd, swapInd, '', bg);
        if (swapInd === arrSolution[counter]) {
          counter -= 1;
          arrSolution.pop();
        } else {
          counter += 1;
          arrSolution.push(swapInd);
        }
        document.querySelector('.steps').textContent = `Steps: ${count}`;
        isCheck();
        savedSolution(arrSolution, counter);
        return dragAndDrop();
      } if (swapInd - 1 == emptyInd && !problemArr2.includes(swapInd)) {
        const empty = arr.splice(emptyInd, 1)[0];
        const swap = arr.splice(swapInd - 1, 1)[0];
        arr.splice(emptyInd, 0, swap);
        arr.splice(swapInd, 0, empty);
        count++;
        playAudio();
        const bg = items[swapInd].style.background;
        swapСhips(emptyInd, swapInd, '', bg);
        if (swapInd === arrSolution[counter]) {
          counter -= 1;
          arrSolution.pop();
        } else {
          counter += 1;
          arrSolution.push(swapInd);
        }
        savedSolution(arrSolution, counter);
        document.querySelector('.steps').textContent = `Steps: ${count}`;
        isCheck();
        return dragAndDrop();
      } if (swapInd - Math.sqrt(arr.length) == emptyInd) {
        const empty = arr.splice(emptyInd, 1)[0];
        const swap = arr.splice(swapInd - 1, 1)[0];
        arr.splice(emptyInd, 0, swap);
        arr.splice(swapInd, 0, empty);
        count++;
        playAudio();
        const bg = items[swapInd].style.background;
        swapСhips(emptyInd, swapInd, '', bg);
        if (swapInd === arrSolution[counter]) {
          counter -= 1;
          arrSolution.pop();
        } else {
          counter += 1;
          arrSolution.push(swapInd);
        }
        savedSolution(arrSolution, counter);
        document.querySelector('.steps').textContent = `Steps: ${count}`;
        isCheck();
        return dragAndDrop();
      } if (swapInd + Math.sqrt(arr.length) == emptyInd) {
        const empty = arr.splice(emptyInd, 1)[0];
        const swap = arr.splice(swapInd, 1)[0];
        arr.splice(emptyInd - 1, 0, swap);
        arr.splice(swapInd, 0, empty);
        count++;
        playAudio();
        const bg = items[swapInd].style.background;
        swapСhips(emptyInd, swapInd, '', bg);
        if (swapInd === arrSolution[counter]) {
          counter -= 1;
          arrSolution.pop();
        } else {
          counter += 1;
          arrSolution.push(swapInd);
        }
        document.querySelector('.steps').textContent = `Steps: ${count}`;
        savedSolution(arrSolution, counter);
        isCheck();
        return dragAndDrop();
      }
    });
  }

  wrapper.addEventListener('click', (e) => {
    if (e.target && e.target.classList.contains('game-board__item')) {
      const items = document.querySelectorAll('[data-id]');
      const empty = document.querySelector('.empty');
      const emptyInd = +empty.style.order;
      const swapInd = arr.indexOf(+(e.target.textContent));
      if (swapInd + 1 == emptyInd && !problemArr.includes(swapInd)) {
        const empty = arr.splice(emptyInd, 1)[0];
        const swap = arr.splice(swapInd, 1)[0];
        arr.splice(emptyInd - 1, 0, swap);
        arr.splice(swapInd, 0, empty);
        count++;
        playAudio();
        const bg = items[swapInd].style.background;
        if (swapInd === arrSolution[counter]) {
          counter -= 1;
          arrSolution.pop();
        } else {
          counter += 1;
          arrSolution.push(swapInd);
        }
        savedSolution(arrSolution, counter);
        swapСhips(emptyInd, swapInd, 'moveRight', bg);
      } else if (swapInd - 1 == emptyInd && !problemArr2.includes(swapInd)) {
        const empty = arr.splice(emptyInd, 1)[0];
        const swap = arr.splice(swapInd - 1, 1)[0];
        arr.splice(emptyInd, 0, swap);
        arr.splice(swapInd, 0, empty);
        count++;
        playAudio();
        const bg = items[swapInd].style.background;
        if (swapInd === arrSolution[counter]) {
          counter -= 1;
          arrSolution.pop();
        } else {
          counter += 1;
          arrSolution.push(swapInd);
        }
        savedSolution(arrSolution, counter);
        swapСhips(emptyInd, swapInd, 'moveLeft', bg);
      } else if (swapInd - Math.sqrt(arr.length) == emptyInd) {
        const empty = arr.splice(emptyInd, 1)[0];
        const swap = arr.splice(swapInd - 1, 1)[0];
        arr.splice(emptyInd, 0, swap);
        arr.splice(swapInd, 0, empty);
        count++;
        playAudio();
        const bg = items[swapInd].style.background;
        if (swapInd === arrSolution[counter]) {
          counter -= 1;
          arrSolution.pop();
        } else {
          counter += 1;
          arrSolution.push(swapInd);
        }
        savedSolution(arrSolution, counter);
        swapСhips(emptyInd, swapInd, 'moveUp', bg);
      } else if (swapInd + Math.sqrt(arr.length) == emptyInd) {
        const empty = arr.splice(emptyInd, 1)[0];
        const swap = arr.splice(swapInd, 1)[0];
        arr.splice(emptyInd - 1, 0, swap);
        arr.splice(swapInd, 0, empty);
        count++;
        playAudio();
        if (swapInd === arrSolution[counter]) {
          counter -= 1;
          arrSolution.pop();
        } else {
          counter += 1;
          arrSolution.push(swapInd);
        }
        savedSolution(arrSolution, counter);
        const bg = items[swapInd].style.background;
        swapСhips(emptyInd, swapInd, 'moveDown', bg);
      }
      dragAndDrop();
      document.querySelector('.steps').textContent = `Steps: ${count}`;
      isCheck();
    }
  });
  dragAndDrop();
  if (newGame) {
    solution.disabled = false;
    solution.classList.remove('btn_dis');
    solution.removeEventListener('click', arrfff[0]);
    arrfff.shift();
  }
  function solutionStart() {
    solution.disabled = true;
    const newGame = document.querySelector('#newGame');
    const load = document.querySelector('#load');
    const select = document.querySelector('.select');
    newGame.disabled = true;
    select.disabled = true;
    load.disabled = true;
    load.classList.add('btn_dis');
    newGame.classList.add('btn_dis');
    solution.classList.add('btn_dis');
    const iterati = setInterval(() => {
      const items = document.querySelectorAll('[data-id]');
      const emId = arrSolution[counter];
      const swIn = arrSolution[counter - 1];
      if (arr[emId] == arr.length) {
        const b = arr[emId];
        arr[emId] = arr[swIn];
        arr[swIn] = b;
        count++;
        document.querySelector('.steps').textContent = `Steps: ${count}`;
        playAudio();
        const bg = items[swIn].style.background;
        swapСhips(emId, swIn, 'fade', bg);
      }
      counter -= 1;
      if (counter === 0) {
        isCheck();
        clearInterval(iterati);
        newGame.disabled = false;
        select.disabled = false;
        load.disabled = false;
        load.classList.remove('btn_dis');
        newGame.classList.remove('btn_dis');
      }
    }, 600);
  }
  solution.addEventListener('click', solutionStart);
  arrfff.push(solutionStart);
};

export default mainFunctional;
