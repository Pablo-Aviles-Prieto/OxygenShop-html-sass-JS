export const resetModalFormInput = (success = true) => {
  if (success) {
    alert('Thank you for subscribing to our newsletter!');
  } else {
    alert(
      'There was an error subscribing to the newsletter. Please try again later!'
    );
  }
  document.querySelector('#newsletter-form-mail').value = '';
};
