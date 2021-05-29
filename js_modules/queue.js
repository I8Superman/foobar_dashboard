// Everything related to adding, animating and removing orders from the queue (should use the animation from gsap.js)

// This is just abbriviations to save writing time
const qs = (s) => document.querySelector(s);
const qsA = (s) => document.querySelectorAll(s);

import _ from "lodash/array"; // Imports array methods from lodash library

import { animMoonOrbit } from "./queue_anim.js";
import { infoQueue } from "./info_text_anim.js";

// Global bariables
let currentQueue = []; // What's in the constantly updated queue
export let ordersToRemove = []; // Orders no longer in the queue get their id sent here, to be removed in queue_anim.js

export function manageQueue(freshQueueData) {
    const oldOrders = getOldOrders(freshQueueData, currentQueue);
    ordersToRemove = oldOrders.map(order => {
        return order.id // Create array with just the id's of the orders (used in animMoonOrbit in gsap.js)
    });

    const newOrders = getNewOrders(freshQueueData, currentQueue);
    currentQueue = _.concat(currentQueue, newOrders); // Adds the new orders to the currentQueue
    updateQueue(newOrders); // Create new rockets from the orders that are 

    const getNewOrderIds = newOrders.map(order => order.id);
    if (getNewOrderIds.length === 1) {
        const message = 'Order ' + getNewOrderIds[0].toString() + ' has entered moon orbit and will be served soon!';
        infoQueue.push(message);
    }
    if (getNewOrderIds.length > 1) {
        const commasAndSpaces = getNewOrderIds.join(', ');
        const lastSpace = commasAndSpaces.lastIndexOf(" ");
        const addAnd = commasAndSpaces.slice(0, lastSpace - 1) + ' and ' + commasAndSpaces.slice(lastSpace + 1);
        const message = 'Orders ' + addAnd + ' has entered moon orbit and will be served soon!'
        infoQueue.push(message);
    }
}

function getOldOrders(newQueue, currentQueue) {
    // Check orders in currentQueue, that are no longer in the updatedQueue.  
    const oldOrders = _.differenceBy(currentQueue, newQueue, (order) => order.id);
    return oldOrders;
}
function getNewOrders(newQueue, currentQueue) {
    // Check for orders that are new
    const difference = _.differenceBy(newQueue, currentQueue, (order) => order.id); // Gets the new orders not in the currentQueue (arrow func without {} automatically returns)
    return difference; // Returns the new orders
}
// Create the small order rockets and send them in orbit around the moon
function updateQueue(newOrders) { // Treats the new orders found in getNewOrders function above
    newOrders.forEach(order => {
        // Good old fashioned cloning!
        const clone = qs('.order').content.cloneNode(true);
        const id = order.id;
        clone.querySelector('.order_id').textContent = `${id.toString()}`; // Add order id to rocket
        clone.querySelector('section').classList.add(`order${order.id}`); // Add selector class to rocket element
        qs("#window").appendChild(clone);
        animMoonOrbit(`.order${order.id}`); // Call the imported animation function from gsap.js and pass the order element as an argument
    });
}