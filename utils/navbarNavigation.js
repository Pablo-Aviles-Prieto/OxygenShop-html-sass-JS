export const navbarNavigation = (navbarSelected) => {
  switch (navbarSelected) {
    case 'Benefits':
      return window.location.replace('#go-to-benefits');
    case 'Prices':
      return window.location.replace('#go-to-price');
    case 'Images':
      return window.location.replace('#go-to-slider');
    case 'Contact':
      return window.location.replace('#go-to-contact');
    default:
      return window.location.replace('#go-to-popular');
  }
};
