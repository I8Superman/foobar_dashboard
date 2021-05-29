"use strict"
// This is the animation function for displaying various messages on the display on the wall behind the robots
// It is important for providing the customersL/users with relevant feedback on what is going on with their order
// Instead of calling the animation function directly, we add messages to the infoQueue array, and the function will check for new messages on every data update

import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(TextPlugin);

// This is just abbriviations to save writing time
const qs = (s) => document.querySelector(s);
const qsA = (s) => document.querySelectorAll(s);

// Store messages to be displayed int his array 
export let infoQueue = [];
export let currentlyPrinting = false;

export function animInfoText() { // message = string to be displayed
    const display = qs('#info_display');
    if (infoQueue.length > 0) { // If messages in queue...
        currentlyPrinting = true;
        const newMessage = infoQueue.shift(); // ...then get the first one...
        const txtChange = gsap.timeline();
        txtChange.to(display, { // ...and display it.
            duration: 0.5,
            ease: 'none',
            onComplete: pauseToRead,
            text: {
                value: newMessage
            }
        });
        function pauseToRead() {
            setTimeout(removeText, 3000); // Let the message linger on screen for 2 secs
        }
    }

    function removeText() { // Remove message again
        gsap.to(display, {
            duration: 0.5,
            ease: 'none',
            onComplete: checkQueue,
            text: {
                value: ""
            }
        });

        function checkQueue() { // Check if more messages in queue
            if (infoQueue.length > 0) {
                animInfoText();
            } else {
                currentlyPrinting = false; // Setting to false so animInfoText in main.js can trigger again
            }
        }
    }
}