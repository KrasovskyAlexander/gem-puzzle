import './scss/index.scss';
import generateGame from './js/createGame';
import createStatic from './js/createMenu';
import viewGame from './js/viewGame';
import createTimer from './js/timer';
import mainFunctional from './js/mainFunctional';
import button from './js/button';
import savedSolution from './js/savedSolution';

window.addEventListener('DOMContentLoaded', () => {
  const wrapper = document.createElement('div');
  wrapper.classList.add('app');
  document.body.append(wrapper);
  createStatic('.app');
  const { arr, arrSolution, counter } = generateGame(16, '.app');
  const { timer, time } = createTimer();
  viewGame(arr);
  mainFunctional(arr, timer, time, false, arrSolution, counter);
  savedSolution(arrSolution, counter);
  button();
});
