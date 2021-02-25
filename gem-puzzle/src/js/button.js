import generateGame from './createGame';
import viewGame from './viewGame';
import createTimer from './timer';
import mainFunctional from './mainFunctional';
import savedSolution from './savedSolution';

const button = () => {
  const newGame = document.querySelector('#newGame');
  const sound = document.querySelector('#sound');
  const save = document.querySelector('#save');
  const loadSaveGame = document.querySelector('#load');
  const record = document.querySelector('#record');
  const select = document.querySelector('.select');
  const overlay = document.querySelector('.overlay');
  const closeModal = document.querySelector('.modal-records__close');
  const modalContent = document.querySelector('.modal-records__content');

  function templateRecords(pos, steps, time, size, image) {
    return `
        <div class="modal-records__row" >
            <div class="modal-records__pos">${pos}</div>
            <div class="modal-records__steps">${steps}</div>
            <div class="modal-records__time">${time}</div>
            <div class="modal-records__size">${size}</div>
            <div class="modal-records__image"><img src=${image} alt=""></div>
        </div>
        `;
  }
  function templateSave(dataid, time, steps, bg) {
    return `
        <div class="modal-records__row" data-idSave=${dataid}>
            <div class="modal-records__pos">${dataid}</div>
            <div class="modal-records__steps">${steps}</div>
            <div class="modal-records__time">${time}</div>
            <div class="modal-records__load"><button class="modal-records__load_btn">load</button></div>
            <div class="modal-records__image"><img src=${bg} alt=""></div>
        </div>
        `;
  }
  if (!localStorage.getItem('savedObj')) {
    localStorage.setItem('savedObj', '[]');
  }
  newGame.addEventListener('click', () => {
    document.querySelector('.steps').textContent = 'Steps: 0';
    const { arr, arrSolution, counter } = generateGame(select.value, '.app');
    const { timer, time } = createTimer(true);
    viewGame(arr);
    mainFunctional(arr, timer, time, false, arrSolution, counter, true);
    savedSolution(arrSolution, counter);
  });
  sound.addEventListener('click', () => {
    sound.classList.toggle('btn_active');
  });
  select.addEventListener('change', () => {
    const items = document.querySelectorAll('[data-id]');
    const bg = items[0].style.background.slice(5, 17);
    const { arr, arrSolution, counter } = generateGame(select.value, '.app');
    const { timer, time } = createTimer(true);
    viewGame(arr, bg);
    mainFunctional(arr, timer, time, false, arrSolution, counter, true);
    savedSolution(arrSolution, counter);
  });
  save.addEventListener('click', () => {
    let savedObj = localStorage.getItem('savedObj');
    savedObj = JSON.parse(savedObj);
    const items = document.querySelectorAll('[data-id]');
    const chips = document.querySelectorAll('.game-board__item');
    const arr = [];
    items.forEach((item) => {
      if (item.innerText === '') {
        arr.push(items.length);
      } else {
        arr.push(+item.innerText);
      }
    });
    const time = document.querySelector('.time').textContent.slice(5);
    const steps = document.querySelector('.steps').textContent.slice(6);
    const bg = chips[0].style.background.slice(5, 17);
    const sol = savedSolution()();
    savedObj.push({
      dataid: savedObj.length,
      arr,
      time,
      steps,
      bg,
      solutionArr: sol[0],
      solutionCounter: sol[1],
    });
    localStorage.setItem('savedObj', JSON.stringify(savedObj));
    const infoSave = document.querySelector('.info-save');
    infoSave.classList.add('info-save_active');
    setTimeout(() => {
      infoSave.classList.remove('info-save_active');
    }, 2000);
  });
  loadSaveGame.addEventListener('click', () => {
    const saved = JSON.parse(localStorage.getItem('savedObj'));
    const modal = document.querySelector('.modal-records');
    const modalContent = document.querySelector('.modal-records__content');
    modalContent.innerHTML = '';
    modalContent.innerHTML = `
        <div class="modal-records__row modal-records__row_header">
            <div class="modal-records__pos">№</div>
            <div class="modal-records__steps">steps</div>
            <div class="modal-records__time">time</div>
            <div class="modal-records__load">load</div>
            <div class="modal-records__image">image</div>
        </div>
        `;
    let fragment = '';
    saved.forEach((item) => {
      fragment += templateSave(+item.dataid, item.time, item.steps, item.bg);
    });
    modalContent.insertAdjacentHTML('beforeend', fragment);
    modal.classList.add('modal_active');
    overlay.classList.add('overlay_active');
  });

  modalContent.addEventListener('click', (e) => {
    if (e.target && e.target.classList.contains('modal-records__load_btn')) {
      const save = JSON.parse(localStorage.getItem('savedObj'));
      const idItem = e.target.parentElement.parentElement.dataset.idsave;
      select.value = save[idItem].arr.length;
      generateGame(save[idItem].arr.length, '.app');
      const timeArr = save[idItem].time.trim().split('');
      const timeObj = {
        sec: [],
        min: [],
      };
      const mIndx = timeArr.indexOf('m');
      for (let index = 0; index < timeArr.length; index++) {
        if (index <= mIndx) {
          timeObj.min.push(timeArr[index]);
        } else {
          timeObj.sec.push(timeArr[index]);
        }
      }
      timeObj.sec.pop();
      timeObj.sec = +(timeObj.sec.join(''));
      timeObj.min.pop();
      timeObj.min = +(timeObj.min.join(''));
      const { timer, time } = createTimer(true, timeObj);
      viewGame(save[idItem].arr, save[idItem].bg);
      mainFunctional(save[idItem].arr, timer, time, save[idItem].steps,
        save[idItem].solutionArr, save[idItem].solutionCounter, true);
      const modals = document.querySelectorAll('.modal');
      modals.forEach((item) => {
        item.classList.remove('modal_active');
      });
      overlay.classList.remove('overlay_active');
    }
  });

  record.addEventListener('click', () => {
    const records = JSON.parse(localStorage.getItem('records'));
    const modal = document.querySelector('.modal-records');
    const modalContent = document.querySelector('.modal-records__content');
    modalContent.innerHTML = '';
    modalContent.innerHTML = `
        <div class="modal-records__row modal-records__row_header">
            <div class="modal-records__pos">№</div>
            <div class="modal-records__steps">steps</div>
            <div class="modal-records__time">time</div>
            <div class="modal-records__size">size</div>
            <div class="modal-records__image">image</div>
        </div>
        `;
    let fragment = '';
    records.forEach((item, i) => {
      fragment += templateRecords(i + 1, item.steps, item.time, item.size, item.bg);
    });
    modalContent.insertAdjacentHTML('beforeend', fragment);
    modal.classList.add('modal_active');
    overlay.classList.add('overlay_active');
  });
  overlay.addEventListener('click', () => {
    const modals = document.querySelectorAll('.modal');
    modals.forEach((item) => {
      item.classList.remove('modal_active');
    });
    overlay.classList.remove('overlay_active');
  });
  closeModal.addEventListener('click', () => {
    const modals = document.querySelectorAll('.modal');
    modals.forEach((item) => {
      item.classList.remove('modal_active');
    });
    overlay.classList.remove('overlay_active');
  });
};

export default button;
