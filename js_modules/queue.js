// Everything related to adding, animating and removing orders from the queue (should use the animation from gsap.js)

// This is just abbriviations to save writing time
const qs = (s) => document.querySelector(s);
const qsA = (s) => document.querySelectorAll(s);

import _ from "lodash/array"; // Imports array methods from lodash library

import { animMoonOrbit } from "./queue_anim.js";

// Global bariables
let currentQueue = [];
export let ordersToRemove = [];

export function manageQueue(freshQueueData) {
    const oldOrders = getOldOrders(freshQueueData, currentQueue);
    ordersToRemove = oldOrders.map(order => {
        return order.id // Create array with just the id's of the orders (used in animMoonOrbit in gsap.js)
    });
    //console.log('Old orders:');
    //console.table(ordersToRemove);

    const newOrders = getNewOrders(freshQueueData, currentQueue);
    currentQueue = _.concat(currentQueue, newOrders); // Adds the new orders to the currentQueue
    // console.log('New Orders: ')
    // console.table(newOrders);
    // console.log('Updated queue: ')
    // console.table(currentQueue);
    updateQueue(newOrders); // Create new rockets from the orders that are new
}

function getOldOrders(newQueue, currentQueue) {
    // Check orders in currentQueue, that are no longer in the updatedQueue.  
    const oldOrders = _.differenceBy(currentQueue, newQueue, (order) => order.id);
    return oldOrders;
}
// Check for orders that are new
function getNewOrders(newQueue, currentQueue) {
    const difference = _.differenceBy(newQueue, currentQueue, (order) => order.id); // Gets the new orders not in the currentQueue (arrow func without {} automatically returns)
    return difference; // Returns the new orders
}
// Create the small order rockets and send them in orbit around the moon
function updateQueue(newOrders) { // Treats the new orders found in getNewOrders function above
    //console.log(newOrders);
    newOrders.forEach(order => {
        // Good old fashioned cloning!
        const clone = qs('.order').content.cloneNode(true);
        const id = order.id;
        // Getting the time of ordering:
        // const time = new Date(order.startTime); // Converts timestamp to normal time
        // // Get just hour, mins and sec from the converted normal time (which also includes timezone, day, month etc.):
        // const hour = time.getHours();
        // const mins = time.getMinutes();
        // const secs = time.getSeconds();
        // const content = order.order; // Yes, its confusing calling the argument 'order' when we also have an object propety called 'order' :)
        // Elements and data that gets cloned:
        clone.querySelector('.order_id').textContent = `${id.toString()}`;
        clone.querySelector('section').classList.add(`order${order.id}`);
        qs("#window").appendChild(clone);
        animMoonOrbit(`.order${order.id}`); // Call the imported animation function from gsap.js and pass the order element as an argument
    });
}