"use strict"
// This file is a delegator for fetching the data and calling all other modules when needed

// Import style and packages
import './sass/style.scss';

// Import js modules and functions
import { manageQueue } from "./js_modules/queue.js";
import { animMoon } from "./js_modules/queue_anim.js";
import { manageBartenders } from "./js_modules/bartenders.js";
import { infoQueue, currentlyPrinting, animInfoText } from "./js_modules/info_text_anim.js";
import { updateTaps } from "./js_modules/taps";

// This is just abbriviations to save writing time
const qs = (s) => document.querySelector(s);
const qsA = (s) => document.querySelectorAll(s);

// Start everything!
window.addEventListener("DOMContentLoaded", init);

function init() {
  animMoon(); // Animates the moon SVG
  setInterval(updateData, 500); // Get data every 0.5 sec 
  setTimeout(function () {
    infoQueue.push('Follow your order from queue to serving on this dashboard.')
  }, 7000)
}

function updateData() {
  fetch("https://fooboobar.herokuapp.com/", {
    method: "get"
  })
    .then(res => res.json())
    .then((data) => {
      runFooBar(data);
    });
};

function runFooBar(data) {
  if (currentlyPrinting === false) { // Check if messages are currently being displayed (to not interrupt the animation)
    animInfoText(); // Display info messages in the infoQueue
  }
  manageQueue(data.queue); // Update the queue, create and animate new 'order rockets'
  manageBartenders(data.bartenders);
  updateTaps(data.taps);
}

console.log('Welcome to Moon Bar!');
console.log('Follow your order from queue to serving on this animated dashboard');
console.log('To test different robot behaviors (like changing kegs), you can order beers dirctly from the console.');
console.log('Just write order("beer name", x), where x it the number of beers. Beer name must be a string.')
console.log('Choose between these beers: Ruined Childhood, Movintime, Row 26, Steampunk, Githop, Fairy Tale Ale, Hollaback Lager, Sleighride, Hoppily Ever After, El Hefe')

// Debugging functions (window. so we can call it in the console)
window.manual = () => { // Get all current data - once
  updateData();
}

window.automatic = (seconds) => {
  animMoon(); // Animates the moon
  setInterval(updateData, seconds * 1000); // Get data update every x seconds
}

// Make a beer order from the console
window.order = (beer, amount) => {
  const data = [
    { name: beer, amount: amount },
  ];

  const postData = JSON.stringify(data); // The data is converted to a JSON string (because the content type we send should be JSON)
  fetch("https://fooboobar.herokuapp.com/order", {
    method: "post",
    body: postData,
    headers: {
      "Content-Type": "application/json; charset=utf-8"
      // "cache-control": "no-cache",
    },
  })
    .then(res => res.json())
    .then((dataPost) => {
      console.log(dataPost)
    });
}
