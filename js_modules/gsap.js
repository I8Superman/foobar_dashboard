// Here we make a general animation function that contains all possible animations for the dashboard

import { gsap } from "gsap"; // Imports gsap library

// GSAP ANIMATIONS, exported as functions:

// Makes the rockets fly around the moon
export function animateRocket(elem) {
    gsap.to(elem, { duration: 2, repeat: -1, yoyo: true, ease: 'power1.inOut', x: 200 });
}