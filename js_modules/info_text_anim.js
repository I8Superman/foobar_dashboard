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
export let infoQueue = ['Welcome to Moon Bar!'];
export let currentlyPrinting = false;
let lingerTime = {
    // Code to adjust reading time of display messages
}

export function animInfoText() { // message = string to be displayed
    const display = qs('#info_display');
    if (infoQueue.length > 0) { // If messages in queue...
        currentlyPrinting = true;
        const newMessage = infoQueue.shift(); // ...then get the first one...
        const txtChange = gsap.timeline();
        txtChange.to(display, { // ...and display it.
            duration: 0.3,
            ease: 'none',
            onComplete: pauseToRead,
            text: {
                value: newMessage
            }
        });
        function pauseToRead() {
            const queueSize = infoQueue.length;
            switch (queueSize) { // Variable message display time based on queue length
                case 0:
                    setTimeout(removeText, 2500);
                    break;
                case 1:
                    setTimeout(removeText, 2000);
                    break;
                case 2:
                    setTimeout(removeText, 1500);
                    break;
                case 3:
                    setTimeout(removeText, 1300);
                    break;
                default:
                    setTimeout(removeText, 1000);
            }
        }
    }

    function removeText() { // Remove message again
        gsap.to(display, {
            duration: 0.3,
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