let formData = {
  email: '',
  message: '',
};

const LS_KEY = 'feedback-form-state';
const form = document.querySelector('.feedback-form');

form.addEventListener('input', hendlerInput);
form.addEventListener('submit', hendlerFormSubmit);

function saveFormData() {
  localStorage.setItem(LS_KEY, JSON.stringify(formData));
}

// Визначення збережених даних у формі
window.addEventListener('DOMContentLoaded', () => {
  const savedFormData = JSON.parse(localStorage.getItem(LS_KEY));
  if (savedFormData) {
    formData.email = savedFormData.email;
    formData.message = savedFormData.message;
    updateForm();
  }
});

function updateForm() {
  form.elements.email.value = formData.email;
  form.elements.message.value = formData.message;
}

function hendlerInput(event) {
  const { name, value } = event.target;
  formData[name] = value;
  saveFormData();
}

function hendlerFormSubmit(evt) {
  evt.preventDefault();

  const email = form.elements.email.value.trim();
  const message = form.elements.message.value.trim();

  if (email === '' || message === '') {
    return alert('Fill please all fields');
  }
  const formData = {
    email,
    message,
  };
  console.log(formData);
  localStorage.removeItem(LS_KEY);
  form.reset();
}
