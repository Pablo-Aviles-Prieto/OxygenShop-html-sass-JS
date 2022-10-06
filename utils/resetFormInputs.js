export const resetFormInputsHandler = (
  inputCheckboxElement,
  success = true
) => {
  if (success) {
    alert('Thank you, we will reach you as soon as possible!');
  } else {
    alert(
      'There was an error retrieving the contact details. Please, reload and try again!'
    );
  }
  document
    .querySelectorAll('.container-contact-info-form-input-elem')
    .forEach((el) => (el.lastElementChild.value = ''));
  inputCheckboxElement.checked = false;
};
