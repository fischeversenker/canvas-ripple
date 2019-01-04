const STARTING_RADIUS = 10;
const RADIUS_INCREMENT = 12;
const CIRCLE_FILL = 'rgba(255, 255, 255, 0.2)';
const RIPPLE_DURATION = 400;
export default class Ripple {
    constructor(element) {
        this._rippler = new CanvasRippler();
        this._rippler.setup(element);
    }
}
Ripple.selector = '[ripple]';
class CanvasRippler {
    constructor() {
        this._radius = STARTING_RADIUS;
        this._duration = RIPPLE_DURATION;
    }
    setup(element) {
        this;
        // make sure host is relative
        if (element.style.position !== 'relative') {
            element.style.position = 'relative';
        }
        // get width and height from host
        this._width = element.clientWidth;
        this._height = element.clientHeight;
        // create canvas
        const rippleCanvas = document.createElement('canvas');
        rippleCanvas.width = this._width;
        rippleCanvas.height = this._height;
        rippleCanvas.style.position = 'absolute';
        rippleCanvas.style.top = '0';
        rippleCanvas.style.left = '0';
        // append canvas to host
        element.appendChild(rippleCanvas);
        // store canvas and context
        this._ctx = rippleCanvas.getContext('2d');
        this._addListener(element);
    }
    ripple(x, y) {
        this._initialX = x;
        this._initialY = y;
        this._started = Date.now();
        this._grow();
    }
    _addListener(element) {
        element.addEventListener('click', (e) => {
            this.ripple(e.layerX, e.layerY);
        });
    }
    _drawCircle(x, y, radius) {
        this._ctx.fillStyle = CIRCLE_FILL;
        this._ctx.beginPath();
        this._ctx.arc(x, y, radius, 0, 2 * Math.PI);
        this._ctx.fill();
    }
    _clear() {
        this._ctx.clearRect(0, 0, this._width, this._height);
    }
    _grow() {
        this._clear();
        if (Date.now() <= this._started + this._duration) {
            this._radius += RADIUS_INCREMENT;
            this._drawCircle(this._initialX, this._initialY, this._radius);
            requestAnimationFrame(this._grow.bind(this));
        }
        else {
            this._radius = STARTING_RADIUS;
        }
    }
}
