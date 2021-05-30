"use strict"

import { currentlyPrinting } from "./info_text_anim";

// This script will get and update the status of the bartenders and call the necessary task functions from the bartender_tasks.js file

// This is just abbriviations to save writing time
const qs = (s) => document.querySelector(s);
const qsA = (s) => document.querySelectorAll(s);

// Imports here




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

        // Compare currentStatus with newly fetched status
        //console.log(current.statusDetail, fresh.statusDetail)

        //current.statusDetail = fresh.statusDetail;
        if (current.statusDetail !== fresh.statusDetail) {
            console.log(name + 's changed from ' + current.statusDetail + ' to ' + fresh.statusDetail);
            current.statusDetail = fresh.statusDetail;
        }

        // If status is same, nothing happens

        // If status is different
        // -> set status to new status
        // Trigger the necessary animations and functions
    }
}