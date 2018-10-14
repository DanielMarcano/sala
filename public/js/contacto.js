window.onload = function () {
  const { body } = document;

  window.scrollTo({ left: 0, top: body.scrollHeight });

  setTimeout(() => {
    body.className = '';
  }, 500);
};