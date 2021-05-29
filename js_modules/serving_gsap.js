"use strict"

// This is just abbriviations to save writing time
const qs = (s) => document.querySelector(s);
const qsA = (s) => document.querySelectorAll(s);

import _ from "lodash/array"; // Imports array methods from lodash library

//import { } from "./serving_gsap.js";


// window.animInfoText(message) {
//     const display = qs('#info_display');
//     const txtChange = gsap.timeline();
//     txtChange.to(display, {
//         duration: 1, text: {
//             value: message
//         }
//     })
// }