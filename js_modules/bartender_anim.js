"use strict"

// All animations for he different bartender statuses

// This is just abbriviations to save writing time
const qs = (s) => document.querySelector(s);
const qsA = (s) => document.querySelectorAll(s);

import { gsap } from "gsap"; // Imports gsap library


const moveValues = { // Used as transform: translateX percentage values ('xPercent' in gsap)
    tap_0: 0,
    tap_1: 75,
    tap_2: 150,
    tap_3: 225,
    tap_4: 300,
    tap_5: 375,
    tap_6: 450,
    wait_1: 120,
    wait_2: 265,
    wait_3: 420,
    break: 600, // Off screen, to the right
    takePay: -34,
    below: 74 // Y value used for going below counter when changing a keg
}

const waitPosOccupied = {
    pos1: false,
    pos2: false,
    pos3: false
}

const lastPosition = {
    Peter: 0,
    Jonas: 0,
    Dannie: 0
}

// Move to tap and start pouring beer:
export function pourBeer(name, tap) {
    const allImg = qsA(`#${name} .robot_img`);
    allImg.forEach(img => img.classList.add('hide')); // Hide all img
    const frontImg = qs(`#${name} .front`);
    frontImg.classList.remove('hide'); // Show relevant img
    const target = `#${name}`; // Get the bartender to animate
    const tapPos = moveValues['tap_' + tap]; // Get pos to move to from moveValues
    lastPosition[name] = tapPos; // Save the pos for the releaseTap function below
    gsap.to(target, { duration: 1, ease: 'power1.inOut', xPercent: tapPos, onComplete: showPourImg });

    function showPourImg() { // Replace with pouring img
        const allImg = qsA(`#${name} .robot_img`);
        allImg.forEach(img => img.classList.add('hide'));
        const pourImg = qs(`#${name} .pouring`);
        pourImg.classList.remove('hide');
        gsap.set(target, { zIndex: 2 }); // When pouring, the bartender must be in front
    }
}
// Step away from tap after finished pouring (a bit to the left)
export function releaseTap(name, tap) {
    const allImg = qsA(`#${name} .robot_img`);
    allImg.forEach(img => img.classList.add('hide'));
    const frontImg = qs(`#${name} .front`);
    frontImg.classList.remove('hide');
    const target = `#${name}`;
    const lastPos = lastPosition[name];
    console.log(lastPos)
    const adjustFromLastPos = lastPos - 20;
    console.log(adjustFromLastPos)
    gsap.set(target, { zIndex: 1 });
    gsap.to(target, { duration: 1.5, ease: 'power1.inOut', xPercent: adjustFromLastPos });
}