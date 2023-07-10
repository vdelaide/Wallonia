const overlay = document.getElementById("overlay");
const button = document.getElementById("toggle");

let toggle = true;

button.addEventListener("click", function(){
    if (toggle === false){
        console.log("hi")
        overlay.style.visibility = "visible";
        toggle = true;
    } else if (toggle === true){
        console.log("yo")
        overlay.style.visibility = "hidden";
        toggle = false;
    }
});