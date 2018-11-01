const sinopsisButtons = document.querySelectorAll('.event__sinopsis');
const closeButtons = document.querySelectorAll('.popup__close');
const headerHeight = document.querySelector('header').scrollHeight;

const addClass = element => document.documentElement.classList.add('u-disable-scroll');
const removeClass = element => document.documentElement.classList.remove('u-disable-scroll');
const scrollToId = (selector) => {
  console.log(`a[href='#${selector}']`);
  document.querySelector(`a[href='#${selector}']`).scrollIntoView();
  document.documentElement.scrollTop -= headerHeight;
};

const removeScroll = () => {
  sinopsisButtons.forEach((element) => {
    element.addEventListener('click', addClass);
  });
};

const addScroll = () => {
  closeButtons.forEach((element) => {
    element.addEventListener('click', (event) => {
      removeClass();
      setTimeout(() => {
        scrollToId(event.target.getAttribute('data-back'));
      }, 100);
    });
  });
};

removeScroll();
addScroll();