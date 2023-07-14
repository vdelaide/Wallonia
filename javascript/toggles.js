const themeButton = document.getElementById("toggle-theme")
const overlayButton = document.getElementById("toggle-overlay")
const blobsButton = document.getElementById("toggle-blobs")

const root = document.querySelector(':root')
const blobs = document.querySelectorAll(".matter-body")

let themeState = "light";
let overlayState = true;
let blobsState = true;

overlayButton.addEventListener("click", function(){

    if (overlayState === false){

        overlay.style.visibility = "visible";
        overlayState = true;

    } else if (overlayState === true){

        overlay.style.visibility = "hidden";
        overlayState = false;

    }

});

themeButton.addEventListener("click", function(){

    if (themeState === "dark"){

        root.style.setProperty('--primary-color', "rgb(19, 155, 19)")
        root.style.setProperty('--primary-contrast-weak', "rgb(255, 255, 255, 0.9)")

        root.style.setProperty('--secondary-color', "rgb(255, 255, 255)")

        root.style.setProperty('--text', "rgb(103, 103, 103)")
        root.style.setProperty('--green-text', 'rgb(19, 155, 19)')

        themeState = "light";

    } else if (themeState === "light"){

        root.style.setProperty('--primary-color', 'rgb(32, 34, 36)');
        root.style.setProperty('--primary-contrast-weak', 'rgb(30, 30, 30)');

        root.style.setProperty('--secondary-color', 'rgb(25, 25, 25)')
                
        root.style.setProperty('--text', 'rgb(255, 255, 255)');
        root.style.setProperty('--green-text', 'rgb(255, 255, 255)')

        themeState = "dark";

    }

});

blobsButton.addEventListener("click", function (){

    if (blobsState === true){

        blobs.forEach(elem => {

            elem.style.display = "none";

        });
        blobsState = false;

    } else if (blobsState === false){

        blobs.forEach(elem => {

            elem.style.display = "flex";

        });
        blobsState = true;

    }

});