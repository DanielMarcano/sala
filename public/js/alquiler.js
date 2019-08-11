const consentButton = document.getElementById('consent-button');
const form = document.getElementById('form');
const requiredFields = form.querySelectorAll('[required]');
const fields = form.querySelectorAll('input:not([type="checkbox"]), textarea');
const focusable = document.querySelectorAll('input:not([type="checkbox"]), textarea, .conditions');

const addValidationEvents = () => {
  fields.forEach((element) => {
    element.addEventListener('blur', (e) => {
      e.target.classList.add('form__validate');
    });
  });
};

consentButton.addEventListener('keyup', (e) => {
  e.preventDefault();
  if (e.key === 'Enter') consentButton.click();
});

requiredFields.forEach((element) => {
  element.addEventListener('focus', (e) => {
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

addValidationEvents();