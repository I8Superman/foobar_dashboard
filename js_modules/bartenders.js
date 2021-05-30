"use strict"

import { currentlyPrinting } from "./info_text_anim";

// This script will get and update the status of the bartenders and call the necessary task functions from the bartender_tasks.js file

// This is just abbriviations to save writing time
const qs = (s) => document.querySelector(s);
const qsA = (s) => document.querySelectorAll(s);

// Imports here



// Global bartender array (with bartender status objects)
let currentStatus = [{
    name: 'Peter',
    status: 'WORKING',
    statusDetail: 'pourBeer',
    usingTap: 3,
    servingCustomer: 200
}, {
    name: 'Jonas',
    status: 'WORKING',
    statusDetail: 'pourBeer',
    usingTap: 3,
    servingCustomer: 200
}, {
    name: 'Dannie',
    status: 'WORKING',
    statusDetail: 'pourBeer',
    usingTap: 3,
    servingCustomer: 200
}];

export function manageBartenders(bartenderData) {
    bartenderData.forEach(bartender => {
        checkForStatusUpdates(bartender);
    });

    function checkForStatusUpdates(fresh) {
        // Get the existing bartender object from currentStatus array:
        const name = fresh.name;
        let current = currentStatus.find(bartender => bartender.name === name);

        //console.table(fresh)
        // Compare currentStatus with newly fetched status
        if (current.statusDetail !== fresh.statusDetail) { // Check to see if statusDetail has changed
            current.statusDetail = fresh.statusDetail; // Set statusDetail to the new(fresh) value
            manageActions(name, fresh.statusDetail) //
        }
        if (current.status !== fresh.status) { // Check to see if status has changed
            current.statusDetail = fresh.statusDetail; // Set status to the new(fresh) value
            //manageStatus(name, fresh.status) //
        }
        if (current.servingCustomer !== fresh.servingCustomer) { // Check to see if the servingCustomer id has changed
            current.servingCustomer = fresh.servingCustomer; // Set id to new(fresh) value
            // manageTasks(name, fresh.statusDetail) //
        }

        function manageActions(name, doing) {
            console.log(name, doing);
            switch (doing) {
                case x:
                    // code block
                    break;
                case y:
                    // code block
                    break;
                default:
                // code block
            }

            // waiting - for whatever reason - go to unoccupied waiting position
            // startServing - begins seving a new order - change order id on eye_display
            // reserveTap - waiting for a tap to be free for pouring
            // releaseTap - when finished pouring from a tap
            // pourBeer - pours beer from a tap!
            // receivePayment - Order will fly to the customer! Robot moves to end of counter
            // replaceKeg - got down behind
            // endServing - nothing should happen here as this statusDetail is very rare and only lasts a split second
        }


    }
}