// Constants and Initial Values
const MAX_STEP_SIZE = 10;
const MAX_WEIGHT = 40;
const INITIAL_WEIGHT = 4;
const WIDTH = 500;
const HEIGHT = 300;
var currR = 0;
var currG = 0;
var currB = 0;
const INITIAL_COLOR = 'rgb('+currR+','+currG+','+currB+')';
var STEP_SIZE = 4; // Initial
var lineWeight = INITIAL_WEIGHT;
// Canvas
var canvWidth = 500;
var canvHeight =  300;
// var canvas = document.createElement('canvas');
// canvas.id = 'myCanvas';
// Append to canvas
// document.body.appendChild(canvas);
canvas = document.getElementById('myCanvas');
etchASketch = document.getElementById('etch-a-sketch');
canvas.width = canvWidth;
canvas.height = canvHeight;
// Set up context
var context = canvas.getContext('2d');
context.lineCap = 'round';
context.lineWidth = INITIAL_WEIGHT;
context.beginPath();
// Drawing
var currX = canvWidth/2;
var currY = canvHeight/2;
context.moveTo(currX, currY);
context.lineTo(currX,currY);
// colorSpinner();
context.strokeStyle = 'rgb('+currR+','+currG+','+currB+')';context.stroke(); // Start in the center
document.addEventListener('keydown', (event)=> {
  var keyStroke = event.key;
  // Draw for each keystroke
  context.beginPath();
  if(keyStroke === 'ArrowUp'){
    // Wrap
    if(currY - 1 <= 0){
      currY = canvHeight;
    }
    context.moveTo(currX, currY);
    currY = currY - STEP_SIZE; // move up
    context.lineTo(currX, currY);
    context.stroke();
  }
  if(keyStroke === 'ArrowDown'){
    // Wrap
    if(currY + 1 >= canvHeight){
      currY = 0;
    }
    context.moveTo(currX, currY);
    currY = currY + STEP_SIZE; // move down
    context.lineTo(currX, currY);
    context.stroke();
  }
  if(keyStroke === 'ArrowLeft'){
    // Wrap
    if(currX - 1 <= 0){
      currX = canvWidth;
    }
    context.moveTo(currX, currY);
    currX = currX - STEP_SIZE; // move left
    context.lineTo(currX, currY);
    context.stroke();
  }
  if(keyStroke === 'ArrowRight'){
    // Wrap
    if(currX + 1 >= canvWidth){
      currX = 0;
    }
    context.moveTo(currX, currY);
    currX = currX + STEP_SIZE; // move right
    context.lineTo(currX, currY);
    context.stroke();
  }
  // SETTINGS
  // Step size
  if(keyStroke === 'e'){
    if(STEP_SIZE < MAX_STEP_SIZE){
      STEP_SIZE = STEP_SIZE + 1;
    }
  }
  if(keyStroke === 'd'){
    if(STEP_SIZE > 1){
      STEP_SIZE = STEP_SIZE - 1;
    }
  }
  // Weight
  if(keyStroke === 's'){
    if(lineWeight > 0){
      lineWeight = lineWeight - 1;
      context.lineWidth = lineWeight;
    }
  }
  if(keyStroke === 'f'){
    if(lineWeight < MAX_WEIGHT){
      lineWeight = lineWeight + 1;
      context.lineWidth = lineWeight;
    }
  }
  // Clear
  if(keyStroke === ' '){
    addClass(etchASketch, 'animate-shake');
    setTimeout(function(){
      context.clearRect(0,0,canvas.width,canvas.height);
      context.beginPath();
      context.lineTo(currX, currY);
      context.stroke();
    }, 500);
    setTimeout(function(){
      removeClass(etchASketch, 'animate-shake');
    }, 700);
  }
  console.log(keyStroke);
}, false);

// INCLUDED FUNCTIONS FROM https://jaketrent.com/post/addremove-classes-raw-javascript/
// Used to avoid including jQuery, wanted an easy way to add a class.
function addClass(el, className) {
  if (el.classList)
    el.classList.add(className)
  else if (!hasClass(el, className)) el.className += " " + className
}
function removeClass(el, className) {
  if (el.classList)
    el.classList.remove(className)
  else if (hasClass(el, className)) {
    var reg = new RegExp('(\\s|^)' + className + '(\\s|$)')
    el.className=el.className.replace(reg, ' ')
  }
}
function hasClass(el, className) {
  if (el.classList)
    return el.classList.contains(className)
  else
    return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))
}
