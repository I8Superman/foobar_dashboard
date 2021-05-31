"use strict"

import { currentlyPrinting } from "./info_text_anim";

// This script will get and update the status of the bartenders and call the necessary task functions from the bartender_tasks.js file

// This is just abbriviations to save writing time
const qs = (s) => document.querySelector(s);
const qsA = (s) => document.querySelectorAll(s);

// Imports here
import * as anim from "./bartender_anim";

// Global bartender array (with bartender status objects)
let currentStatus = [{
    name: 'Peter',
    status: '',
    statusDetail: '',
    usingTap: 0,
    servingCustomer: 0
}, {
    name: 'Jonas',
    status: '',
    statusDetail: '',
    usingTap: 0,
    servingCustomer: 0
}, {
    name: 'Dannie',
    status: '',
    statusDetail: '',
    usingTap: 0,
    servingCustomer: 0
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
            // manageTasks(name, fresh.statusDetail) //
        }

        function manageActions(name, doing) {
            //console.log(name, doing);
            if (doing === 'startServing') {
                const orderId = current.servingCustomer;
                console.log(orderId)
                anim.startServing(name, orderId);
            } else if (doing === 'pourBeer') {
                const tap = current.usingTap;
                anim.pourBeer(name, tap); // Pass name and tap nr 
            } else if (doing === 'releaseTap') {
                anim.releaseTap(name);
            } else if (doing === 'waiting') {
                // console.log(name + ' is waiting ...')
                // waiting - for whatever reason - go to unoccupied waiting position
            } else if (doing === 'reserveTap') {
                // console.log(name + ' is reserving a tap')
                // reserveTap - waiting for a tap to be free for pouring
            } else if (doing === 'receivePayment') {
                // console.log(name + ' is receiving payment')
                // receivePayment - Order will fly to the customer! Robot moves to end of counter
            } else if (doing === 'replaceKeg') {
                // console.log(name + ' is replacing keg')
                // replaceKeg - got down behind
            } else if (doing === 'endServing') {
                // console.log(name + ' ends serving')
                // replaceKeg - got down behind
            } else {
                console.log(name + ' is doing nothing right now!');
            }

        }


    }
}