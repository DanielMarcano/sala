const ityped = require('./vendor/ityped.min');

window.onload = function () {
  const { body } = document;
  window.scrollTo({ left: 0, top: body.scrollHeight });

  const words = ['artistas', 'actorxs', 'soñadorxs', 'cantantes', 'bailarinxs', 'humanxs', 'rarxs', 'grandes', 'pequeñxs', 'amantes', 'hippies', 'cineastas', 'pintorxs', 'productorxs', 'directorxs', 'dramaturgxs', 'escritorxs', 'guionistas', 'cantantes', 'músicos'];

  const people = document.getElementsByClassName('js-main__people')[0];
  people.innerHTML = '';

  ityped.init(people, { strings: words, loop: true });
};
