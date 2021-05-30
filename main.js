"use strict"
// This file is a delegator for fetching the data and calling all other modules when needed

// Import style and packages
import './sass/style.scss';

// Import js modules and functions
import { manageQueue } from "./js_modules/queue.js";
import { animMoon } from "./js_modules/queue_anim.js";
import { manageBartenders } from "./js_modules/bartenders.js";
import { infoQueue, currentlyPrinting, animInfoText } from "./js_modules/info_text_anim.js";

// This is just abbriviations to save writing time
const qs = (s) => document.querySelector(s);
const qsA = (s) => document.querySelectorAll(s);

// Debugging functions
window.manual = () => { // Get all current data - once
  updateData();
}

window.automatic = (seconds) => {
  animMoon(); // Animates the moon
  setInterval(updateData, seconds * 1000); // Get data update every x seconds
}

// Start everything!
//window.addEventListener("DOMContentLoaded", getData);

function getData() {
  setInterval(updateData, 1000);
}

function updateData() {
  fetch("https://foobearz.herokuapp.com/", {
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
  // updateBartenders(data.bartenders);
  // updateTaps(data.taps);
  // updateStorage(data.storage);
  // updateTimer(data.timestamp);
}


// export function getOldOrders(updatedQueue) {

//   console.log('Old queue: ')
//   console.table(currentQueue);
//   console.log('Updated Queue');
//   console.table(updatedQueue);

//   // Get orders from currentQueue that should no longer be in the queue (because they are now being served)
//   const oldOrders = _.differenceBy(currentQueue, updatedQueue, (order) => order.id);
//   console.table(oldOrders);

//   // Animate the old orders out of the queue
//   function animateOutOfQueue(oldOrders) {
//     oldOrders.forEach(order => {
//       gsap.to(order, { stagger: 0.5, duration: 2, repeat: 1, scale: 4, opacity: 0, onComplete: removeOldOrders, onCompleteParams: [order] });
//       // _.remove(currentQueue, function(n) {
//       //   return n 
//       // });
//     });
//   }
// }

function updateServing(serving) {
  // console.log('serving updated');
  // console.log(serving);
  qs('#serving_display').innerHTML = '';
  serving.forEach(order => {
    //console.log(order);
    const clone = qs('.serving').content.cloneNode(true);

    const id = order.id;
    const time = new Date(order.startTime);
    const hour = time.getHours();
    const mins = time.getMinutes();
    const secs = time.getSeconds();
    const content = order.order;
    //console.log(id, hour, mins, content);

    clone.querySelector('.id').textContent = `#${id.toString()}  `;
    clone.querySelector('.time').textContent = `${hour}:${mins}:${secs}  `;
    clone.querySelector('.beers').textContent = content;
    qs("#serving_display").appendChild(clone);
  });
}


function updateBartenders(bartenders) {
  // console.log('bartenders updated');
  //console.log(bartenders);
  bartenders.forEach(bartender => {
    //console.log(bartender);

    const name = bartender.name;
    const bartenderElem = qs(`#${name}`);
    const status = bartender.status;
    const doing = bartender.statusDetail;
    const usingTap = (bartender.usingTap);
    const serving = bartender.servingCustomer;

    bartenderElem.querySelector('.status').textContent = `is ${status}`;
    bartenderElem.querySelector('.doing').textContent = `Currently ${doing}`;
    bartenderElem.querySelector('.usingTap').textContent = `Using tap ${usingTap} right now`;
    bartenderElem.querySelector('.servingCustomer').textContent = `to serve cusomer ${serving}!`;
  });
}
function updateTaps(taps) {
  // console.log('taps updated');
  // console.log(taps);
  qs('#tap_display').innerHTML = '';
  taps.forEach(tap => {
    //console.log(tap);
    const clone = qs('.tap').content.cloneNode(true);

    const id = tap.id; // So there is no 'tap 0'
    const brand = tap.beer;
    const inUse = tap.inUse;
    const level = ((tap.level / tap.capacity) * 100).toFixed(0);

    //console.log(id, brand, inUse, level);

    clone.querySelector('.beer').textContent = `${id} ${brand}`;
    const thisTap = clone.querySelector('.tap_info');
    const tapColor = tap.inUse ? 'lightgreen' : 'grey';
    thisTap.style.backgroundColor = `${tapColor}`;
    clone.querySelector('.level').textContent = `is at ${level}%`;
    thisTap.style.width = `${level}%`;

    qs("#tap_display").appendChild(clone);
  })
}


function updateStorage(storage) {
  // console.log('storage updated');
  // console.log(storage);
  qs('#storage_display').innerHTML = '';
  storage.forEach(beer => {
    //console.log(beer);
    const clone = qs('.storage').content.cloneNode(true);

    const name = beer.name;
    const amount = beer.amount;

    //console.log(name, amount);

    clone.querySelector('.brand').textContent = `${name}`;

    for (let step = 0; step < amount; step++) {
      clone.querySelector('.kegNr').textContent += " " + "\u25CF";
    }
    qs("#storage_display").appendChild(clone);
  })
}

function updateTimer(time) {
  //console.log(time)

  const toString = new Date(time);
  const h = toString.getHours().toString();
  const m = toString.getMinutes().toString();
  const s = toString.getSeconds().toString();

  const clock = qs('#timer');
  //console.log(clock)
  clock.textContent = `${h}:${m}:${s}`;
}

function getBeers() {
  fetch("https://foobearz.herokuapp.com/beertypes", {
    method: "get",
    // headers: {
    //     "Content-Type": "application/json; charset=utf-8",
    //     "cache-control": "no-cache"
    // }
  })
    .then(res => res.json())
    .then((data) => {
      console.log(data.timestamp);
      console.log(data);
    });
};

window.order = (beer, amount) => {
  const data = [
    { name: beer, amount: amount },
  ];

  const postData = JSON.stringify(data); // The data is converted to a JSON string (because the content type we send should be JSON)
  fetch("https://foobearz.herokuapp.com/order", {
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

function translateDates(data) {

  const realTime = new Date(data.timestamp); // Translate timestamp to normal date and time
  //console.log('Overall time (realtime): ' + realTime);
  const toStamp = realTime.getTime(realTime); // Translates normal date to timestamp
  //console.log(toStamp);
  // Get only the time from a date string:
  const hours = realTime.getHours();
  const minutes = realTime.getMinutes();
  console.log('time is ' + hours, minutes);

  // Get q numbers and timestamps
  const queue = data.queue;
  console.log(queue[0].startTime);

  const orderStamp = new Date(queue[0].startTime)
  const h = orderStamp.getHours();
  const m = orderStamp.getMinutes();
  console.log('Orders time is ' + h, m);
  // Get serve numbers and timestamps

}