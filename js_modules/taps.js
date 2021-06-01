"use strict";
import { get } from 'lodash';
import sassVariables from '../sass/base/_colors.scss'

export function updateTaps(dataTaps) {
    updateLabels("#labels", dataTaps);
    updateLevels("#level_meters", dataTaps);
    //doTapAnimation("#taps", dataTaps);
}

//get all labels
function updateLabels(labels, dataTaps) {
    document.querySelector(labels).querySelectorAll(":scope > g").forEach(label => {
        if (dataTaps) {
            dataTaps.forEach((tap, index) => {
                //split the label and take only the number to match the id
                if (label.id.split("_")[1] == tap.id) {
                    replaceLabels(label, index, tap)
                }
            });
        }
    });
}

function replaceLabels(label, index, tap) {
    label.querySelectorAll(":scope > g").forEach(beerName => {
        //to fix ids with dash from the labels (from label_1, etc)
        let actualBeerId = beerName.id
        if (index != 0) {
            actualBeerId = actualBeerId.split("-")[0]
        }
        if (actualBeerId != tap.beer.split(" ").join("_")) {
            beerName.classList.add("hide")
        }
    });
}

const BEER_LEVEL_DIVIDER = 14;

function updateLevels(levels, dataTaps) {
    document.querySelector(levels).querySelectorAll(":scope > g").forEach(level => {
        if (dataTaps) {
            dataTaps.forEach(tap => {
                if (level.id.split("_")[1] == tap.id) {
                    level.querySelector("rect").setAttribute("y", (250 + (tap.capacity - tap.level) / BEER_LEVEL_DIVIDER));
                    switch (true) {
                        case tap.level <= 2500 && tap.level > 2000:
                            level.querySelector("rect").setAttribute("fill", "#fbb03b");
                            break;
                        case tap.level <= 2000 && tap.level > 1500:
                            level.querySelector("rect").setAttribute("fill", "#FFC634");
                            break;
                        case tap.level <= 1500 && tap.level > 1000:
                            level.querySelector("rect").setAttribute("fill", "#FFA216");
                            break;
                        case tap.level <= 1000 && tap.level > 500:
                            level.querySelector("rect").setAttribute("fill", "#F97B06");
                            break;
                        case tap.level <= 500:
                            level.querySelector("rect").setAttribute("fill", "#F94F06");
                            break;
                    };
                };
            });
        };
    });
};


// export function doTapAnimation(taps, dataTaps) {
//     document.querySelector(taps).querySelectorAll(":scope > g").forEach(tap => {
//         if (dataTaps) {
//             dataTaps.forEach((dataTap) => {
//                 //split the label and take only the number to match the id
//                 if(tap.id.split("_")[1] == dataTap.id) {
//                     if(dataTap.inUse) {
//                         //mother of gs
//                         tap.querySelector("g g g g g g g").classList.add("in-use");
//                     } else {
//                         tap.querySelector("g g g g g g g").classList.remove("in-use");

//                     }
//                 }
//             });
//         }
//     });
// }

export function doTapAnimation(tap) {
    const getTap = document.querySelector(`.tap${tap}`);
    getTap.classList.add("in-use");
    const gethandle = document.querySelector(`#handle${tap}`);
    gethandle.classList.add("hide");
}

export function stopTapAnimation(tap) {
    const getTap = document.querySelector(`.tap${tap}`);
    if (getTap === null) {
        console.log('Nothing should happen here')
    } else {
        getTap.classList.remove("in-use");
        const gethandle = document.querySelector(`#handle${tap}`);
        gethandle.classList.remove("hide");
    }
}




