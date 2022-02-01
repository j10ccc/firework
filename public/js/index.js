var cdom = document.createElement("canvas");
cdom.id = "myCanvas";
cdom.style.position = "fixed";
cdom.style.left = "0";
cdom.style.top = "0";
cdom.style.zIndex = 1;
document.body.appendChild(cdom);

var img = document.createElement('img');
img.src = '/img/' + String(Math.floor(Math.random() * 3) + 1) + '.jpg'
document.querySelector('#main').appendChild(img);
const color = 120;
/*
			red: 0,
			yellow: 60,
			green: 120,
			cyan: 180,
			blue: 240,
			magenta: 300
		*/
var canvas = document.querySelector("#myCanvas");
var context = canvas.getContext("2d");
context.globalAlpha = 0;
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = document.documentElement.clientHeight;
}

function clearCanvas() {
  context.fillStyle = "rgba(255,255,255,0)";
  context.fillRect(0, 0, canvas.width, canvas.height);
}
window.addEventListener("resize", resizeCanvas, false);
resizeCanvas();

function mouseDownHandler(e) {
  var x = e.clientX;
  var y = e.clientY;
  fire(x, y);
}
var radius = 0;
function fire(x, y) {
  createFireworks(x, y);
  function tick() {
    context.globalCompositeOperation = "destination-out";
    context.fillStyle = "rgba(0, 0, 0, 0.1)";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.globalCompositeOperation = "lighter";
    drawFireworks();
    radius = requestAnimationFrame(tick);
  }
  cancelAnimationFrame(radius);
  tick();
}
var particles = [];
function createFireworks(sx, sy) {
  particles = [];
  var hue = Math.floor(Math.random() * 51) + color;
  var hueVariance = 30; // 颜色种类
  var count = 120; // 一发的炮数

  for (var i = 0; i < count; i++) {
    var p = new Object();
    var angle = Math.floor(Math.random() * 360);
    p.radians = (angle * Math.PI) / 180;
    p.x = sx;
    p.y = sy;
    p.speed = Math.random() * 5 + 0.4;
    p.radius = p.speed * (0.5 + Math.random());
    p.size = Math.floor(Math.random() * 3) + 1;
    p.hue =
      Math.floor(Math.random() * (hue + hueVariance - (hue - hueVariance))) +
      (hue - hueVariance);
    p.brightness = Math.floor(Math.random() * 31) + 50;
    p.alpha = (Math.floor(Math.random() * 61) + 40) / 100;
    particles.push(p);
  }
}
function drawFireworks() {
  clearCanvas();

  for (var i = 0; i < particles.length; i++) {
    var p = particles[i];
    var vx = Math.cos(p.radians) * p.radius;
    var vy = Math.sin(p.radians) * p.radius + 0.4;
    p.x += vx;
    p.y += vy;
    p.radius *= 1 - p.speed / 100;
    p.alpha -= 0.005;

    context.beginPath();
    context.arc(p.x, p.y, p.size, 0, Math.PI * 2, false);
    context.closePath();
    context.fillStyle =
      "hsla(" + p.hue + ", 100%, " + p.brightness + "%, " + p.alpha + ")";
    context.fill();
  }
}
document.addEventListener("mousedown", mouseDownHandler, false);
