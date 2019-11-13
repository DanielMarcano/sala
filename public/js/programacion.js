window.addEventListener('DOMContentLoaded', () => {
  const sinopsisButtons = document.querySelectorAll('.event__sinopsis');
  const closeButtons = document.querySelectorAll('.popup__close');
  const headerHeight = document.querySelector('.header').scrollHeight;

  const disableScroll = () => document.documentElement.classList.add('u-disable-scroll');
  const enableScroll = () => document.documentElement.classList.remove('u-disable-scroll');
  const sinopsisClickHandler = (event) => {
    disableScroll();
  }

  const initializeSinopsisButtons = () => {
    sinopsisButtons.forEach((element) => element.addEventListener('click', sinopsisClickHandler));
  };

  const scrollToId = (selector) => {
    document.querySelector(`a[href='#${selector}']`).scrollIntoView();
    document.documentElement.scrollTop -= headerHeight;
  };

  const closeButtonClickHandler = (event) => {
    enableScroll();
    setTimeout(() => scrollToId(event.target.getAttribute('data-back')), 0);
  }

  const initializeCloseButtons = () => {
    closeButtons.forEach((element) => element.addEventListener('click', closeButtonClickHandler));
  };

  initializeSinopsisButtons();
  initializeCloseButtons();
});