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
            //console.log(name, doing);
            switch (doing) {
                case 'startServing':
                    // console.log(name + ' starts serving!')
                    // startServing - begins seving a new order - change order id on eye_display - raise arms!
                    break;
                case 'pourBeer':
                    // console.log(name + ' is pouring beer!')
                    // pourBeer - pours beer from a tap! Move to tap, using left/right img, then pouring img
                    const getTap = fresh.usingTap;
                    //console.log(name, getTap)
                    anim.pourBeer(name, getTap);
                    break;
                case 'releaseTap':
                    // console.log(name + ' is releasing tap!')
                    // releaseTap - when finished pouring from a tap - go back to front img
                    break;
                case 'waiting':
                    // console.log(name + ' is waiting ...')
                    // waiting - for whatever reason - go to unoccupied waiting position
                    break;
                case 'reserveTap':
                    // console.log(name + ' is reserving a tap')
                    // reserveTap - waiting for a tap to be free for pouring
                    break;
                case 'receivePayment':
                    // console.log(name + ' is receiving payment')
                    // receivePayment - Order will fly to the customer! Robot moves to end of counter
                    break;
                case 'replaceKeg':
                    // console.log(name + ' is replacing keg')
                    // replaceKeg - got down behind
                    break;
                case 'endServing':
                    // console.log(name + ' ends serving')
                    // replaceKeg - got down behind
                    break;
                default:
                // code block
            }
        }


    }
}