"use strict"

// All animations for he different bartender statuses

// This is just abbriviations to save writing time
const qs = (s) => document.querySelector(s);
const qsA = (s) => document.querySelectorAll(s);

import { gsap } from "gsap"; // Imports gsap library
import { ordersToRemove } from "./queue";


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

const lastPosition = { // Saves last pos to calc if left/right img should be used on next move
    Peter: 0,
    Jonas: 0,
    Dannie: 0
}

let eyeDisplayVisible = { // Saves eye display visibility
    Jonas: true,
    Peter: true,
    Dannie: true
}

// Move to tap and start pouring beer:
export function pourBeer(name, tap) {
    const lastPos = lastPosition[name];
    const target = `#${name}`; // Get the bartender to animate
    const tapPos = moveValues['tap_' + tap]; // Get pos to move to from moveValues
    // const eyeDisplay = qs(`#${name} .eye_display`);
    // eyeDisplay.style.opacity = 0; // Hide the eye display text while seen from the side (hide class doesnt work??)
    toggleEyeDisplay(name);
    const leftOrRight = lastPos < tapPos ? 'right' : 'left';
    showImg(name, leftOrRight);
    lastPosition[name] = tapPos; // Save the pos for the releaseTap function below
    gsap.to(target, { duration: 1, ease: 'power1.inOut', xPercent: tapPos, onComplete: showPourImg });

    function showPourImg() { // Replace with pouring img
        showImg(name, 'front');
        toggleEyeDisplay(name);
        gsap.set(target, { zIndex: 2 }); // When pouring, the bartender must be in front
        setTimeout(function () { // Only show front img briefly before showing pouring img
            // frontImg.classList.add('hide');
            // pourImg.classList.remove('hide');
            showImg(name, 'pouring');
        }, 300);
    }
}
// Step away from tap after finished pouring (a bit to the left)
export function releaseTap(name, tap) {
    showImg(name, 'front');
    const target = `#${name}`;
    const lastPos = lastPosition[name];
    const adjustFromLastPos = lastPos - 15;
    gsap.set(target, { zIndex: 1 });
    gsap.to(target, { duration: 1.5, ease: 'power1.inOut', xPercent: adjustFromLastPos });
}
// Raise arms and put on a hapy face when getting to serve order
export function startServing(name, orderId) {
    const allImg = qsA(`#${name} .robot_img`);
    allImg.forEach(img => img.classList.add('hide'));
    const happyImg = qs(`#${name} .happy`);
    happyImg.classList.remove('hide');
    const eyeDisplay = qs(`#${name} .eye_display`);
    eyeDisplay.style.opacity = 0;
    setTimeout(armsDownAgain(), 1000);

    function armsDownAgain() {
        happyImg.classList.add('hide');
        const frontImg = qs(`#${name} .front`);
        frontImg.classList.remove('hide');
        if (orderId !== null) {
            eyeDisplay.textContent = orderId.toString(10);
        }
    }
}
// Shows the right img in the bartender container
function showImg(name, img) {
    const allImg = qsA(`#${name} .robot_img`); // Get all img
    allImg.forEach(img => img.classList.add('hide')); // Hide all img
    const imgToShow = qs(`#${name} .${img}`);
    imgToShow.classList.remove('hide');
}
// Toggles between opacity 0 and 1 for eye display everytime its called
function toggleEyeDisplay(name) {
    eyeDisplayVisible[name] ? eyeDisplayVisible[name] = false : eyeDisplayVisible[name] = true;
    console.log(eyeDisplayVisible[name])
    const eyeDisplay = qs(`#${name} .eye_display`);
    eyeDisplayVisible[name] ? eyeDisplay.style.opacity = 1 : eyeDisplay.style.opacity = 0;
}
