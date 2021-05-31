"use strict"

import { currentlyPrinting } from "./info_text_anim";

// This script will get and update the status of the bartenders and call the necessary task functions from the bartender_tasks.js file

// This is just abbriviations to save writing time
const qs = (s) => document.querySelector(s);
const qsA = (s) => document.querySelectorAll(s);

// Imports here
import * as anim from "./bartender_anim";
import { infoQueue } from "./info_text_anim.js";

// Global bartender array (with bartender status objects)
let currentStatus = [{
    name: 'Peter',
    status: '',
    statusDetail: '',
    usingTap: 0,
    servingCustomer: null
}, {
    name: 'Jonas',
    status: '',
    statusDetail: '',
    usingTap: 0,
    servingCustomer: null
}, {
    name: 'Dannie',
    status: '',
    statusDetail: '',
    usingTap: 0,
    servingCustomer: null
}];

export function manageBartenders(bartenderData) {
    bartenderData.forEach(bartender => {
        checkForStatusUpdates(bartender);
        //console.log(bartender.name, bartender.statusDetail, bartender.usingTap);
    });

    function checkForStatusUpdates(fresh) {
        // Get the existing bartender object from currentStatus array:
        const name = fresh.name;
        let current = currentStatus.find(bartender => bartender.name === name);

        // Compare currentStatus with newly fetched status
        if (current.usingTap !== fresh.usingTap) { // Check to see if the tap has changed
            current.usingTap = fresh.usingTap; // Update the tap
        }
        if (current.statusDetail !== fresh.statusDetail) { // Check to see if statusDetail has changed
            current.statusDetail = fresh.statusDetail; // Set statusDetail to the new(fresh) value
            manageActions(name, current.statusDetail) //
        }
        if (current.status !== fresh.status) { // Check to see if status has changed
            current.statusDetail = fresh.statusDetail; // Set status to the new(fresh) value
            //manageStatus(name, fresh.status) //
        }
        if (current.servingCustomer !== fresh.servingCustomer) { // Check to see if the servingCustomer id has changed
            current.servingCustomer = fresh.servingCustomer; // Set id to new(fresh) value
            // If no order, then add loading dots
            if (current.servingCustomer === null) {
                const eyeDisplay = qs(`#${name} .eye_display`);
                eyeDisplay.textContent = '';
                const loadingDots = qs(`#${name} .loading-dots`);
                loadingDots.style.opacity = 1;
            } else { // Show order id on eye display
                const loadingDots = qs(`#${name} .loading-dots`);
                loadingDots.style.opacity = 0;
                const idToString = current.servingCustomer.toString(10);
                anim.eyeDisplayTxt(name, idToString);
            }
        }

        function manageActions(name, doing) {
            //console.log(name, doing);
            if (doing === 'startServing') {
                anim.startServing(name);
            } else if (doing === 'pourBeer') {
                const tap = current.usingTap;
                anim.pourBeer(name, tap); // Pass name and tap nr 
            } else if (doing === 'releaseTap') {
                anim.releaseTap(name);
            } else if (doing === 'waiting') {
                anim.waiting(name);
            } else if (doing === 'reserveTap') {
                anim.reserveTap(name);
            } else if (doing === 'receivePayment') {
                //anim.receivePayment(name)
            } else if (doing === 'replaceKeg') {
                const tap = current.usingTap;
                console.log(name + ' is replacing tap' + tap)
                anim.replaceKeg(name, tap);
            } else if (doing === 'endServing') {
                // console.log(name + ' ends serving')
                // replaceKeg - got down behind
            } else {
                console.log(name + ' is doing nothing right now!');
            }

        }


    }
}