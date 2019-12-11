import * as ityped from './vendor/ityped.min';

window.onload = function () {
  const error = document.getElementsByClassName('error__code')[0];
  const errorMessage = error.innerHTML;

  error.innerHTML = '';
  ityped.init(error, {
    strings: [errorMessage], loop: true, typeSpeed: 300, backSpeed: 200, showCursor: false,
  });
};
