const ityped = require('./vendor/ityped.min');

window.onload = function () {
  const body = document.getElementsByTagName('body')[0];
  window.scrollTo({ left: 0, top: body.scrollHeight });

  const words = ["artistas", "actorxs", "personas", "cantantes", "bailarinxs", "humanxs", "rarxs", "grandes", "pequeñxs", "amantes", "hippies", "cineastas", "pintorxs"];
  const people = document.getElementsByClassName('js-main__people')[0];
  people.innerHTML = "";

  ityped.init(people, { strings: words, loop: true });
};
