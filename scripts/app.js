import {
  resetFormInputsHandler,
  emailChecker,
  toggleBackdrop,
  resetModalFormInput,
  navbarNavigation,
} from '../utils/index.js';
import { fetchingFormData, fetchingCurrencyAPI } from '../services/index.js';
import Slider from '../models/slider.js';

// Main elements
const mobileMenuBtn = document.querySelector('.menu-mobile-btn');
const scrollBarElement = document.querySelector('#scroll-bar-filled');
const scrollArrowUp = document.getElementById('container-footer-arrow-up');
const inputCheckboxElement = document.querySelector('#checkbox-TOS');
const formElement = document.querySelector('.container-contact-info-form');
const priceSelector = document.querySelector('#price-selector');
const navbarList = document.querySelectorAll('#menu-desktop-list');

// Modal elements
const backdropElement = document.querySelector('#backdrop');
const closeModalBtn = document.querySelector('#close-modal-btn');
const modalFormElement = document.querySelector('.newsletter-form');

// Slide arrow elements
const leftSliderArrowElement = document.querySelector('#left-arrow');
const rightSliderArrowElement = document.querySelector('#right-arrow');

let popupAlreadyShowed = false;
let returnToTopTimer;
let popupTimer;
let currentPercentageScrolled = 0;
let modalState = 'close';
let currentCurrency = 'usd';

const onLoadedDOM = () => {
  // initializing the slider
  const slider = new Slider('#slider');
  slider.renderingImgCirclesContainer();
  slider.sliderInterval();
  leftSliderArrowElement.addEventListener('click', slider.changeLeftHandler);
  rightSliderArrowElement.addEventListener('click', slider.changeRightHandler);

  // checking popup newsletter
  popupAlreadyShowed = JSON.parse(localStorage.getItem('oxygenShopPopup'));
  if (popupAlreadyShowed) return;
  popupTimer = setTimeout(() => {
    popupAlreadyShowed = true;
    toggleBackdrop(true);
    modalState = 'open';
  }, 5000);
};

const navbarListClickHandler = (e) => {
  navbarList.forEach((ul) => {
    for (const element of ul.children) {
      const hasClass = element.hasAttribute('class');
      if (hasClass) {
        element.classList.remove('menu-desktop-element-selected');
      }
      if (e.target.id === element.id) {
        element.classList.add('menu-desktop-element-selected');
        navbarNavigation(element.textContent);
      }
    }
  });
};

const openMobileMenu = () => {
  const mobileMenu = document.querySelector('#nav-mobile-menu--closed');
  mobileMenu.firstElementChild.classList.toggle('nav-mobile-menu--open');
};

const submitFormHandler = async (e) => {
  e.preventDefault();
  inputCheckboxElement.classList.remove('error-checkbox');
  const TOSContainerElement = document.querySelector(
    '#container-contact-info-form-TOS-checkbox'
  );
  TOSContainerElement.classList.remove('error-label');
  const inputElements = document.querySelectorAll(
    '.container-contact-info-form-input-elem'
  );
  inputElements.forEach((el) => el.classList.remove('error-input'));

  const formData = new FormData(e.target);
  const enteredName = formData.get('name').trim();
  const enteredEmail = formData.get('email').trim();
  const checkbox = formData.get('checkbox');

  if (enteredName.length < 2 || enteredName.length > 100) {
    const inputNameElement = document.querySelector(
      '#container-contact-info-form-name'
    );
    inputNameElement.parentElement.classList.add('error-input');
    return;
  }

  if (!emailChecker(enteredEmail)) {
    const inputEmailElement = document.querySelector(
      '#container-contact-info-form-email'
    );
    inputEmailElement.parentElement.classList.add('error-input');
    return;
  }

  if (!checkbox) {
    inputCheckboxElement.classList.add('error-checkbox');
    TOSContainerElement.classList.add('error-label');
    return;
  }

  const formDataToSave = {
    name: enteredName,
    email: enteredEmail,
  };

  const result = await fetchingFormData(formDataToSave);
  console.log('result', result);

  result.ok
    ? resetFormInputsHandler(inputCheckboxElement)
    : resetFormInputsHandler(inputCheckboxElement, false);
};

const returnToTop = () => {
  if (returnToTopTimer) {
    clearTimeout(returnToTopTimer);
  }

  returnToTopTimer = setTimeout(() => {
    scroll(0, 0);
  }, 200);
};

const modalSubmitFormHandler = async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const enteredEmail = formData.get('email').trim();

  if (!emailChecker(enteredEmail)) {
    const inputEmailElement = document.querySelector('.newsletter-form-input');
    inputEmailElement.classList.add('error-input');
    return;
  }

  const formDataToSave = {
    email: enteredEmail,
  };

  const result = await fetchingFormData(formDataToSave);

  result.ok ? resetModalFormInput() : resetModalFormInput(false);

  closeBackdropModalHandler();
};

const closeBackdropModalHandler = () => {
  toggleBackdrop();
  modalState = 'close';
};

const priceSelectorHandler = async (e) => {
  const optionSelected = e.target.value;

  const result = await fetchingCurrencyAPI(currentCurrency, optionSelected);

  if (result.error) {
    console.error(result.error);
    return alert(
      'There is a problem with the currency selector. Please try again later!'
    );
  }

  const conversionValue = result[optionSelected];

  document
    .querySelectorAll('.container-price-card-price--value')
    .forEach((el) => {
      const amount = +el.textContent.slice(1) * conversionValue;
      switch (optionSelected) {
        case 'eur':
          el.textContent = `€${Math.round(amount)}`;
          currentCurrency = 'eur';
          return;
        case 'gbp':
          el.textContent = `£${Math.round(amount)}`;
          currentCurrency = 'gbp';
          return;
        default:
          el.textContent = `$${Math.round(amount)}`;
          currentCurrency = 'usd';
          return;
      }
    });
};

const onKeyDown = (e) => {
  if (e.key === 'Escape' && modalState === 'open') closeBackdropModalHandler();
};

window.onscroll = () => {
  const viewportHeight = window.innerHeight;
  const totalBodyHeight = document.body.offsetHeight;
  const currentTopPositionYAxis = window.scrollY; // Getting the amount in pixels from the top side of the viewport (has to add the viewportHeight to match the totalBodyHeight)

  currentPercentageScrolled = (
    (currentTopPositionYAxis * 100) /
    (totalBodyHeight - viewportHeight)
  ).toFixed(0);

  scrollBarElement.style.width = `${currentPercentageScrolled}%`;

  if (!popupAlreadyShowed && currentPercentageScrolled > 25) {
    popupAlreadyShowed = true;
    toggleBackdrop(true);
    clearTimeout(popupTimer);
    modalState = 'open';
  }

  currentPercentageScrolled > 25
    ? (scrollArrowUp.style.display = 'block')
    : (scrollArrowUp.style.display = 'none');
};

// Document events
document.addEventListener('DOMContentLoaded', onLoadedDOM);
document.addEventListener('keydown', onKeyDown);

// Modal events
backdropElement.addEventListener('click', closeBackdropModalHandler);
closeModalBtn.addEventListener('click', closeBackdropModalHandler);

// Main events
mobileMenuBtn.addEventListener('click', openMobileMenu);
scrollArrowUp.addEventListener('click', returnToTop);
formElement.addEventListener('submit', submitFormHandler);
modalFormElement.addEventListener('submit', modalSubmitFormHandler);
priceSelector.addEventListener('input', priceSelectorHandler);

// Navbar events
navbarList.forEach((ul) => {
  for (const element of ul.children) {
    element.addEventListener('click', navbarListClickHandler);
  }
});

// Slide arrow events
leftSliderArrowElement.addEventListener('click', Slider.changeLeftHandler);
rightSliderArrowElement.addEventListener('click', Slider.changeRightHandler);
