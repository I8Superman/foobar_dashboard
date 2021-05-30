"use strict"

// All animations for he different bartender statuses

// This is just abbriviations to save writing time
const qs = (s) => document.querySelector(s);
const qsA = (s) => document.querySelectorAll(s);

import { gsap } from "gsap"; // Imports gsap library


const moveValues = { // Used as transform: translateX percentage values
    tap0: 0,
    tap1: 75,
    tap2: 150,
    tap3: 225,
    tap4: 300,
    tap5: 375,
    tap6: 450,
    wait1: 120,
    wait2: 265,
    wait3: 420,
    break: 600, // Off screen, to the right
    takePay: -34,
    below: 74 // Y value used for going below counter when changing a keg
}

