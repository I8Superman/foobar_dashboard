// Everything related to adding, animating and removing orders from the queue (should use the animation from gsap.js)

// This is just abbriviations to save writing time
const qs = (s) => document.querySelector(s);
const qsA = (s) => document.querySelectorAll(s);

import _ from "lodash/array"; // Imports array methods from lodash library

import { animateRocket } from "./gsap.js";

export function getNewOrders(queueData, currentQueue) {
    const newQueue = queueData; // renaming the incoming data
    const difference = _.differenceBy(newQueue, currentQueue, (order) => order.id); // Lodash method. Gets the orders NOT in both arrays (currentQueue and newQueue)
    return difference; // Returns the new orders
}

export function updateQueue(newOrders) { // Treats the new orders found in getNewOrders function 
    console.log(newOrders);
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
        animateRocket(`.order${order.id}`);
        //gsap.to(`.order${order.id}`, { duration: 2, repeat: -1, yoyo: true, ease: 'power1.inOut', x: 200 });
    });
}