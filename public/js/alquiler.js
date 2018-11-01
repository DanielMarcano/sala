const consentButton = document.getElementById('consent-button');
const send = document.getElementById('send');
const headerHeight = document.querySelector('header').scrollHeight;

let fields = document.querySelectorAll('input:not([type="checkbox"]), textarea');

const focusable = document.querySelectorAll('input:not([type="checkbox"]), textarea, button[type="submit"]');

fields = Array.from(fields);

const addValidationEvents = () => {
  fields.forEach((element) => {
    element.addEventListener('blur', (e) => {
      e.target.classList.add('form__validate');
    });
  });
};

function isScrolledIntoView(el) {
  const rect = el.getBoundingClientRect();
  const elemTop = rect.top;
  const elemBottom = rect.bottom;

  // Only completely visible elements return true:
  const isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
  // Partially visible elements return true:
  //isVisible = elemTop < window.innerHeight && elemBottom >= 0;
  return isVisible;
}

const focus = () => {
  focusable.forEach((element) => {
    element.addEventListener('focus', (e) => {
      e.target.scrollIntoView();
      document.documentElement.scrollTop -= headerHeight;
      if (!isScrolledIntoView(e.target)) {
        document.documentElement.scrollTop += headerHeight;
      }
    });
  });
};

const addClasses = () => {
  fields.forEach((element) => {
    element.classList.add('form__validate');
  });
};

consentButton.addEventListener('keyup', (e) => {
  e.preventDefault();
  if (e.key === 'Enter') consentButton.click();
});

send.addEventListener('click', (e) => {
  addClasses();
  focus();
});

addValidationEvents();