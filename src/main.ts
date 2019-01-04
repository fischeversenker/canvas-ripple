import Ripple from './ripple-directive';

document.addEventListener('DOMContentLoaded', () => {
  const rippleElements = document.querySelectorAll(Ripple.selector);
  Array.from(rippleElements).forEach((el) => {
    return new Ripple(el as HTMLElement);
  });
});
