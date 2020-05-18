import React from 'react'
import ReactDOM from 'react-dom'
import HelloWorld from './HelloWorld'

const COMPONENTS = {
  HelloWorld
}

function renderComponentInElement(el) {
  var Component = COMPONENTS[el.dataset.component];
  if (!Component) return;
  // get props from elements data attribute, like the post_id
  const props = Object.assign({}, el.dataset);
  ReactDOM.render(<Component {...props} />, el);
}

document
  .querySelectorAll('.__react-component')
  .forEach(renderComponentInElement)

const html = document.documentElement;
const body = document.body;
let viewportHeight = window.innerHeight;
let hover = window.matchMedia("(hover: none)").matches;
let handleCompleted = false;
let mobileRatio = window.matchMedia('(max-aspect-ratio: 1/1)');


var touch;
if (matchMedia('(pointer:coarse)').matches == true) {
  touch = true;
  document.body.classList.add('touch-true');
} else {
  touch = false;
}


let clientX = -100;
let clientY = -100;
let lookMouse = false;
let mouseRequest = 0;
let mouseID = null;

document.addEventListener("mousemove", e => {
  clientX = e.clientX;
  clientY = e.clientY;
  if (!mouseID) {
    mouseID = requestAnimationFrame(initCursor)
  };
});


const sections = document.querySelectorAll("section");
let requestId = null;
var progressEnd;

function updateScroller() {

  var resized = scroller.resizeRequest > 0;

  if (resized) {
    var height = scroller.target.clientHeight;
    document.querySelector("body").style.height = height + "px";
    scroller.resizeRequest = 0;
  }

  var scrollY = window.pageYOffset || html.scrollTop || body.scrollTop || 0;

  scroller.endY = scrollY;
  scroller.y += (scrollY - scroller.y) * scroller.ease;

  if (Math.abs(scrollY - scroller.y) < 0.05 || resized) {
    scroller.y = scrollY;
    scroller.scrollRequest = 0;
  }
  if (touch == false) {
    scroller.target.style.transform = 'translate3d(0, ' + -scroller.y + 'px, 0)';
  }


  vfEffect = viewportHeight - vfEffectTrigger.getBoundingClientRect().top;

  if (vfEffect > 0 && vfEffect < viewportHeight * 0.66) {
    var wght = vfEffect * (700 / (viewportHeight * 0.66)) + 100;
    vfEffectEl.style.fontVariationSettings = "'wght' " + Math.round(wght);
  } else if (vfEffect <= 0 && vfEffect < -viewportHeight) {
    vfEffectEl.style.fontVariationSettings = "'wght' 0";
  } else if (vfEffect >= viewportHeight * 0.66 && vfEffect > viewportHeight * 1.66) {
    vfEffectEl.style.fontVariationSettings = "'wght' 800";
  }


  for (var i = 0; i < typeEl.length; i++) {
    var position = viewportHeight - typeEl[i].getBoundingClientRect().top;
    if (position > 0 && position < viewportHeight * 1.5) {
      typeActive[i] = true;
    } else {
      typeActive[i] = false;
    }
  }


  sections.forEach(el => {
    const begin = el.getBoundingClientRect().top;
    const end = el.getBoundingClientRect().bottom;
  });

  requestId = scroller.scrollRequest > 0 ? requestAnimationFrame(updateScroller) : null;
}

let currentSection = 'intro';



function onScroll() {
  scroller.scrollRequest++;
  if (!requestId) {
    requestId = requestAnimationFrame(updateScroller);
  }
}


function onResize() {
  let viewportHeight = window.innerHeight;
  scroller.resizeRequest++;
  if (!requestId) {
    requestId = requestAnimationFrame(updateScroller);
  }
}
function handleComplete() {
  body.classList.add('loaded');
}

document.addEventListener("DOMContentLoaded", function () {
  setTimeout(function () { if (handleCompleted != true) { handleComplete() } }, 4000);
});


window.onload = function () {
  if (handleCompleted != true) {
    handleComplete();
  }

  updateScroller();
  window.focus();
  window.addEventListener("resize", onResize);
  document.addEventListener("scroll", onScroll);
}  
