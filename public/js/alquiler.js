const consentButton = document.getElementById('consent-button');
// const send = document.getElementById('send');
// const headerHeight = document.querySelector('header').scrollHeight;
const form = document.getElementById('form');
const requiredFields = form.querySelectorAll('[required]');
const fields = form.querySelectorAll('input:not([type="checkbox"]), textarea');
const focusable = document.querySelectorAll('input:not([type="checkbox"]), textarea, .conditions');

// fields = Array.from(fields);

const addValidationEvents = () => {
  fields.forEach((element) => {
    element.addEventListener('blur', (e) => {
      e.target.classList.add('form__validate');
    });
  });
};

// function isScrolledIntoView(el) {
//   const rect = el.getBoundingClientRect();
//   const elemTop = rect.top;
//   const elemBottom = rect.bottom;

//   // Only completely visible elements return true:
//   const isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
//   // Partially visible elements return true:
//   //isVisible = elemTop < window.innerHeight && elemBottom >= 0;
//   return isVisible;
// }

// const focus = () => {
//   focusable.forEach((element) => {
//     element.addEventListener('focus', (e) => {
//       e.target.scrollIntoView();
//       document.documentElement.scrollTop -= headerHeight;
//       if (!isScrolledIntoView(e.target)) {
//         document.documentElement.scrollTop += headerHeight;
//       }
//     });
//   });
// };

consentButton.addEventListener('keyup', (e) => {
  e.preventDefault();
  if (e.key === 'Enter') consentButton.click();
});

requiredFields.forEach((element) => {
  element.addEventListener('focus', (e) => {
    e.target.scrollIntoView(false);
  });
});

const validateForm = () => {
  const invalidFields = form.querySelectorAll(':invalid');
  let allFilled = true;

  if (invalidFields.length !== 0) {
    allFilled = false;
    invalidFields.forEach((element) => {
      element.classList.add('form__validate');
    });
    if (invalidFields[0].value !== 'on') {
      invalidFields[0].scrollIntoView(false);
      invalidFields[0].focus();
    } else {
      consentButton.focus();
    }
  }

  return allFilled;
};

const restartFields = () => {
  document.querySelectorAll('input, textarea').forEach((element) => {
    const field = element;
    field.value = '';
    field.checked = false;
    field.classList.remove('form__validate');
  });
};

const saveFormIntoJSON = () => {
  const formObject = {};
  const updatedFields = form.querySelectorAll('input:not([type="checkbox"]), textarea');
  updatedFields.forEach((element) => {
    console.log(element);
    formObject[element.getAttribute('name')] = element.value;
  });
  return JSON.stringify(formObject);
};

const sendForm = () => {
  const request = new Request('/alquiler', {
    method: 'POST',
    cache: 'reload',
    body: saveFormIntoJSON(),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  fetch(request)
    .then(response => response.json())
    .then(jsonData => alert(jsonData.message));
};

form.addEventListener('submit', function (e) {
  e.preventDefault();
  if (validateForm(this)) {
    sendForm();
    restartFields();
  }
});

// // const formDataSaver = saveForm();
// saveForm();

// console.log(formDataSaver.entries().next());

addValidationEvents();