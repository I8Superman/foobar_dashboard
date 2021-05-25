// Here we make a general animation function that contains all possible animations for the dashboard

// This is just abbriviations to save writing time
const qs = (s) => document.querySelector(s);
const qsA = (s) => document.querySelectorAll(s);

import { gsap } from "gsap"; // Imports gsap library

import { ordersToRemove } from "./queue.js";

// GSAP ANIMATIONS, exported as functions:

// Makes the rockets fly around the moon
export function animMoonOrbit(elemClass) { // elemClass = class name of the order ('.order34' fx)
    console.log('Sending order ' + parseInt(elemClass.slice(6)) + ' into orbit!');
    // Even if in a const, the gsap animation starts automatically. You dont have to call it to start it.
    const orbitAnim = gsap.timeline({ repeat: -1 }); // Timeline for rocket orbit animation
    orbitAnim.set(elemClass, { transformOrigin: '50% 50%' });
    orbitAnim.to(elemClass, { duration: 4, rotation: 360, ease: 'none', onComplete: checkForOldOrder });
    // Afer every completed orbit (onComplete above), check to see if order should be animated out
    function checkForOldOrder() {
        const getId = parseInt(elemClass.slice(6));
        if (ordersToRemove.includes(getId)) {
            orbitAnim.kill(); // Stop the orbit animation
            console.log(getId + ' is leaving orbit!');
            animOutOfOrbit(elemClass); // Call another animation
        }
    }
}
// Leaving the orbit around the moon. Triggered when the rockets order id shows up in orderToRemove array (imported in line 9)
function animOutOfOrbit(elem) {
    // Animate rocket leaving the orbit around the mon
    const leaveOrbit = gsap.to(elem, { duration: 3, scale: 3, x: 600, opacity: 0, onComplete: removeOrder });
    function removeOrder() {
        const elemToRemove = qs(elem); // Select the section element based on the order id
        elemToRemove.remove(); // Remove/delete the section completely from the DOM
        console.log(parseInt(elem.slice(6)) + ' has ben rmoved from the DOM');
    }
}