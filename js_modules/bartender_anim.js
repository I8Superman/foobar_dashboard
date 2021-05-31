"use strict"

// All animations for he different bartender statuses

// This is just abbriviations to save writing time
const qs = (s) => document.querySelector(s);
const qsA = (s) => document.querySelectorAll(s);

import { gsap } from "gsap";
import { ordersToRemove } from "./queue";
import { infoQueue } from "./info_text_anim.js";


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
    toggleEyeDisplay(name); // Hides the eye display while left/right img is showing
    const leftOrRight = lastPos < tapPos ? 'right' : 'left';
    showImg(name, leftOrRight);
    lastPosition[name] = tapPos; // Save the pos for the releaseTap function below
    gsap.to(target, { duration: 1, ease: 'power1.inOut', xPercent: tapPos, onComplete: showPourImg });

    function showPourImg() { // Replace with pouring img
        showImg(name, 'front');
        toggleEyeDisplay(name);
        gsap.set(target, { zIndex: 2 }); // When pouring, the bartender must be in front
        setTimeout(function () { // Only show front img briefly before showing pouring img
            showImg(name, 'pouring');
        }, 300);
    }
}
// Step away from tap after finished pouring (a bit to the left)
export function releaseTap(name) {
    showImg(name, 'front');
    const target = `#${name}`;
    const lastPos = lastPosition[name];
    const adjustFromLastPos = lastPos - 15;
    gsap.set(target, { zIndex: 1 });
    gsap.to(target, { duration: 1.5, ease: 'power1.inOut', xPercent: adjustFromLastPos });
}
// Raise arms and put on a hapy face when getting to serve order
export function startServing(name) {
    showImg(name, 'happy');
    setTimeout(function () { // Only show happy img for 1 sec
        showImg(name, 'front');
    }, 1000);
}


// Shows the right img in the bartender container
function showImg(name, img) {
    const allImg = qsA(`#${name} .robot_img`); // Get all img
    allImg.forEach(img => img.classList.add('hide')); // Hide all img
    const imgToShow = qs(`#${name} .${img}`);
    imgToShow.classList.remove('hide');
}

// Toggles between opacity 0 and 1 for eye display everytime its called
export function toggleEyeDisplay(name) {
    eyeDisplayVisible[name] ? eyeDisplayVisible[name] = false : eyeDisplayVisible[name] = true;
    const eyeDisplay = qs(`#${name} .eye_display`);
    eyeDisplayVisible[name] ? eyeDisplay.style.opacity = 1 : eyeDisplay.style.opacity = 0;
}

// Display new text in eye display of robot
export function eyeDisplayTxt(name, string) { // Expects a string. Numbers must be converted before being passed
    const eyeDisplay = qs(`#${name} .eye_display`);
    const txtChange = gsap.timeline();
    txtChange.to(eyeDisplay, { // ...and display it.
        duration: 1,
        ease: 'none',
        text: {
            value: string
        }
    });
}

