import Ripple from './ripple-directive.js';
document.addEventListener('DOMContentLoaded', () => {
    const rippleElements = document.querySelectorAll(Ripple.selector);
    const rippleInstances = Array.from(rippleElements).map((el) => {
        return new Ripple(el);
    });
});
