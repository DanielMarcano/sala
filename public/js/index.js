import * as ityped from './vendor/ityped.min';

window.onload = function () {
  const footer = document.querySelector('.footer');
  window.scrollTo({ left: 0, top: footer.scrollHeight / 2 });

  const people = document.getElementsByClassName('js-main__people')[0];
  const words = people.innerText.split(',');

  people.innerHTML = '';
  people.classList.remove('hidden');

  ityped.init(people, { strings: words, loop: true });
};
