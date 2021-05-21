"use strict"

import './style.css'
import { gsap } from "gsap";

console.log('This is a test of the data for the FooBar assignment');
console.log('Every fetch is a "snapshot" of how the evolving data looks at the time of fetching');
console.log('NOTE: every update fetches and display ALL the data all over again, so you machine may start boiling :)');
console.log('In the console, run the function manual() to update the data at any given time (the data will still change in realtime on the server).');
console.log('Run automatic(x) to make the site auto-update every x seconds');
console.log('Run order(beer, amount) to add an order to the queue. The beer must be put in quotes')

const qs = (s) => document.querySelector(s);
const qsA = (s) => document.querySelectorAll(s);


// Get all current data - once
window.manual = () => {
  getAll();
}

// Get data update every x seconds
window.automatic = (seconds) => {
  setInterval(getAll, seconds * 1000);
}

function getAll() {
  fetch("https://foobearz.herokuapp.com/", {
    method: "get",
    // headers: {
    //     "Content-Type": "application/json; charset=utf-8",
    //     "cache-control": "no-cache"
    // }
  })
    .then(res => res.json())
    .then((data) => {
      //console.log('All data:', data);
      updateQueue(data.queue);
      //sortNewOrders(data.queue);
      updateServing(data.serving);
      updateBartenders(data.bartenders);
      updateTaps(data.taps);
      updateStorage(data.storage);
      updateTimer(data.timestamp);
      //translateDates(data);
    });
};

let currentQueue = [];

function sortNewOrders(queueData) {
  const newQueue = queueData;

  console.log('newQueue:');
  console.table(newQueue);

  console.log('currentQueue:')
  console.table(currentQueue);

  const difference = _.differenceBy(newQueue, currentQueue, (order) => order.id);
  //let difference = newQueue.filter((order) => !currentQueue.includes(order.id));

  //currentQueue = currentQueue.concat(difference);

  console.log(difference);
  console.table(difference);

  console.log('updated currentQueue:')
  console.table(currentQueue);

  //updateQueue(difference);
}

// let difference = arr1.filter(x => !arr2.includes(x));

// function diffArray(arr1, arr2) {
//     return arr1
//       .concat(arr2)
//       .filter(item => !arr1.includes(item) || !arr2.includes(item));
//   }


function updateQueue(newOrders) {
  // console.log('queue updated');
  //console.log(queue);
  //qs('#order_display').innerHTML = '';
  newOrders.forEach(order => {
    //console.log(order);

    const clone = qs('.order').content.cloneNode(true);

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
    clone.querySelector('section').setAttribute('class', `order${order.id}`);
    qs("#order_display").appendChild(clone);
    gsap.to(`.order${order.id}`, { duration: 2, repeat: -1, yoyo: true, ease: 'power1.inOut', x: 200 });
  });
}
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

function order(beer, amount) {
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