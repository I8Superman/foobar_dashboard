// Here we make a general animation function that contains all possible animations for the dashboard

// This is just abbriviations to save writing time
const qs = (s) => document.querySelector(s);
const qsA = (s) => document.querySelectorAll(s);

import { gsap } from "gsap"; // Imports gsap library

import { ordersToRemove } from "./queue.js"; // Orders that are no longer in queue. Remove rocket with id's that match id's in this aray

// GSAP ANIMATIONS, exported as functions:

// Moon animation (floating slowly up and down)
export function animMoon() {
    const moon = qs('#moon');
    gsap.to(moon, { duration: 5, y: 10, yoyo: true, repeat: -1, ease: 'power1.inOut' })
}

// The rocket arrives at the moon...
export function animMoonOrbit(elemClass) { // elemClass = class name of the order ('.order34' fx)
    //console.log('Sending order ' + parseInt(elemClass.slice(6)) + ' into orbit!');
    const zOffsetModifier = (Math.random() * (1.3 - 0.45) + 0.45).toFixed(1); // Variable rotation radius
    const zOffset = "-" + 200 * zOffsetModifier + "px";
    const xDir = 'right';
    const yTransform = Math.floor(Math.random() * (14 - 2) + 2); // Degree of y-translate
    const yDir = Math.random() < 0.5 ? 'up' : 'down'; // y translate up/down or down/up
    const yFirst = yDir === 'up' ? `-${yTransform}vw` : `${yTransform}vw`; // Set 1st y translate according to yDir
    const ySecond = yDir === 'up' ? `${yTransform}vw` : `-${yTransform}vw`;
    // Adjust z-axis rotation according to y rotation and y translate
    const angle = xDir === 'left' && yDir === 'down' || xDir === 'right' && yDir === 'up' ? -(yTransform * 4) : yTransform * 4;
    // Timeline for rocket orbit animation
    const orbitPath = gsap.timeline({ repeat: -1, paused: true }); // Starts paused, so we can control playback
    orbitPath.set(elemClass, { transformOrigin: `center center ${zOffset}`, rotation: angle })
    orbitPath.to(elemClass, { duration: 8, ease: "none", rotationY: 360 }),
        orbitPath.set(elemClass, { zIndex: 3 }, 0),
        orbitPath.set(elemClass, { zIndex: 1 }, 2),
        orbitPath.set(elemClass, { zIndex: 3 }, 6),
        orbitPath.to(elemClass, { duration: 4, ease: "none", yoyo: true, repeat: 1, scale: 0.8 }, 0),
        orbitPath.to(elemClass, { duration: 2, yoyo: true, repeat: 1, y: yFirst }, 0),
        orbitPath.to(elemClass, { duration: 2, yoyo: true, repeat: 1, y: ySecond }, 4),
        orbitPath.to(elemClass, { duration: 1, onComplete: checkForOldOrder }, 6) // This is just a trigger for checkForOldOrder()
    const randomTime = (Math.random() * (1.3 - 0.8) + 0.8).toFixed(1); // Speed up/slow down the rocket a bit
    const randomPosition = (Math.floor(Math.random() * (8 - 0) + 0));

    orbitPath.seek(randomPosition).play().timeScale(randomTime); // Goes 4 secs into animations and starts playback from there (behind the moon)
    gsap.from(elemClass, { duration: 2, opacity: 0 })
    // Afer every completed orbit (onComplete above), check to see if order should be animated out
    function checkForOldOrder() {
        const getId = parseInt(elemClass.slice(6));
        if (ordersToRemove.includes(getId)) {
            orbitPath.kill(); // Stop the orbit animation
            //console.log(getId + ' is leaving orbit!');
            animOutOfOrbit(elemClass); // Call another animation
        }
    }
    // Leaving the orbit around the moon (Triggered by checkForOldOrder above)
    function animOutOfOrbit(elem) {
        // Animate rocket leaving the orbit around the mon
        const leaveOrbit = gsap.timeline();
        leaveOrbit.set(elem, { zIndex: 4 }),
            leaveOrbit.to(elem, { duration: 4, ease: 'none', scale: 7, x: 750, rotation: 0, onComplete: removeOrder });
        function removeOrder() {
            const elemToRemove = qs(elem); // Select the section element based on the order id
            elemToRemove.remove(); // Remove/delete the section completely from the DOM
            // console.log(parseInt(elem.slice(6)) + ' has ben rmoved from the DOM');
        }
    }
}

