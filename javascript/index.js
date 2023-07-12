const overlay = document.getElementById("overlay");
const button = document.getElementById("overlay-toggle");

let btnToggle = true;

button.addEventListener("click", function(){

    if (btnToggle === false){

        overlay.style.visibility = "visible";
        btnToggle = true;

    } else if (btnToggle === true){

        overlay.style.visibility = "hidden";
        btnToggle = false;

    }

});