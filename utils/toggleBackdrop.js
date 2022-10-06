const backdropElement = document.querySelector('#backdrop-modal');

export const toggleBackdrop = (saveToStorage = false) => {
  backdropElement.classList.toggle('backdrop-closed');
  if (saveToStorage) localStorage.setItem('oxygenShopPopup', true);
};
