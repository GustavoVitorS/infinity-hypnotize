/*Edit and modify the way you want*/

var c = document.querySelector('.c') /* the canvas element */,

  ctx = c.getContext('2d') /* canvas context */,
  w /* canvas height */, h /* canvas height */,

  t = 0,

  max = Math.max,
  pow = Math.pow, sqrt = Math.sqrt,
  PI = Math.PI,
  sin = Math.sin, cos = Math.cos,

  n = 23 /* shades */,
  m = 23 /* shade repetitions */,
  p = 33 /* dots on each branch */,
  r,
  beta /* branch specific */, gamma /* dot specific */,
  x0, y0, x1, y1,
  hue,
  t_step = 2 / 90,
  requestID;

/* FUNCTIONS */
var trimUnit = function (input_str, unit) {
  return parseInt(input_str.split(unit)[0], 10);
};

var spiral = function () {
  ctx.clearRect(0, 0, w, h);

  for (var i = 0; i < n * m; i++) {
    beta = i * 3 * PI / (n * m);
    x0 = 0;

    /* Begin the path up here */
    ctx.beginPath();
    hue = i * 666 / n;
    ctx.translate(w / 2, h / 2);
    ctx.rotate(t / 3);
    /* only need to set the fillstyle once up here now */
    ctx.fillStyle = 'hsl(' + hue + ', 100%, 65%)';

    for (var j = 0; j < p; j++) {
      gamma = j * 3 * PI / p;
      r = max(1, pow(2 * (j * (p - j)), .43) - 10);

      x0 += 3.4 * r;
      y0 = x0 * sin(gamma + 2 * t + x0 / 99) / 5;

      /* change of coordinates */
      x1 = x0 * cos(beta) - y0 * sin(beta);
      y1 = x0 * sin(beta) + y0 * cos(beta);

      /* move it to the position of the arc */
      /* (remove this for a cool effect) */
      ctx.moveTo(x1, y1);
      /* setup the arc path here */
      ctx.arc(x1, y1, r, 0, 2 * PI);
    }

    /* close the 1 path that now is a combination of all the arcs */
    ctx.closePath();
    /* fill the whole path only once now */
    ctx.fill();
    ctx.rotate(-t / 3);
    ctx.translate(-w / 2, -h / 2);
  }

  t += t_step;

  requestID = requestAnimationFrame(spiral)
};

var initCanvas = function () {
  var s /* canvas style set via CSS */;

  setTimeout(function () {
    s = getComputedStyle(c);
    w = c.width = trimUnit(s.width, 'px');
    h = c.height = trimUnit(s.height, 'px');
    if (requestID) {
      cancelAnimationFrame(requestID);
    }
    spiral();
  }, 0);
};

/* STEPS */
initCanvas();

/* fix looks on resize */
addEventListener('resize', initCanvas, false);