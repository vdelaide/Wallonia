const canvas = document.getElementById("canvas")

/* Set up relative positions and scales */
const VIEW = {};

VIEW.width    = window.innerWidth;
VIEW.height   = window.innerHeight;

VIEW.centerX  = VIEW.width / 2;
VIEW.centerY  = VIEW.height / 2;

// module aliases
const Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite;

// create an engine
const engine = Engine.create();

// create a renderer
const render = Render.create({

    canvas: document.getElementById("canvas"),
    element: document.getElementById("debug"),
    engine: engine,
    background: "rgb(255, 255, 255)", 

    options: {
        showDebug: false
    }

});

Composite.add(engine.world, [

    // ground & ceiling, set it at the center of the width, give it width of the canvas, put ground at the end of the canvas
    ceiling = Bodies.rectangle(VIEW.centerX, 0, VIEW.width, 10, {isStatic: true}),
    ground = Bodies.rectangle(VIEW.centerX, (VIEW.height*0.9), VIEW.width, 10, { isStatic: true }),

    // walls, set it at the center of the height, give it the height of the canvas, put wRight at the end of the canvas
    wallRight = Bodies.rectangle(VIEW.width, VIEW.centerY, 10, VIEW.height, {isStatic: true}),
    wallLeft = Bodies.rectangle(0, VIEW.centerY, 10, VIEW.height, {isStatic: true})

]);

// run the renderer
Render.run(render);
const runner = Runner.create();
Runner.run(runner, engine);

engine.gravity.y = 0.1;

function initializeCanvas(width, height) {

    const canvas = document.getElementById('canvas');

    canvas.width = width;
    canvas.height = height;

    render.options.width = width;
    render.options.height = height;

    render.canvas.width = render.options.width;
    render.canvas.height = render.options.height;

    Render.lookAt(render, {

        min: { x: 0, y: 0 },
        max: { x: width, y: height }

    });

    Render.setPixelRatio(render, "auto");
}

initializeCanvas(VIEW.width, VIEW.height*0.9) //Initializes the canvas to fit as a banner, and to not look low-quality

//My understanding of how to do the aenism stuff:
//Create 4 classes, one to distinguish all the matterbodies (that we'll use), another for an "article" or strip, another for the page nav,
//and a final one to 'disturb' the other matterbodies, to make the page look more lively
//All things that you want to move on the screen will be given matterbodies, then give it a strip class or a page nav to determine its shape,
//behavior, location, etc
//Then, loop through all the matterbodies and check what class it has and filter it accordingly to give it a certain shape, behavior, location, etc
//finally, push all those things into an object and adds it to the composite

//Credits to @Aentan on Github for the code below, i just arranged it to fit to my project :)

let bodiesDom = document.querySelectorAll('.matter-body');
let bodies = [];

for (let i = 0, l = bodiesDom.length; i < l; i++) {

    var body = Bodies.rectangle( //Use var or it just doesn't work :P

        VIEW.centerX + Math.floor(Math.random() * VIEW.width/2) - VIEW.width/4, // X-pos
        VIEW.centerY + Math.floor(Math.random() * VIEW.height / 2) - VIEW.height / 4, //Y-POS
        125, 75, //Width & Height, unresponsive for now

        {
            restitution:      0.5, //bounciness when bodies touch
            friction:         0, //friction between bodies

            frictionAir:      0.001,
            frictionStatic:   0,

            density:          1,
            chamfer:          { radius: 12 }, //Border radius

            angle:            (Math.random() * 2.000) - 1.000
        }

    );

    bodiesDom[i].id = body.id;
    bodies.push(body);
}

Composite.add(engine.world, bodies);

window.requestAnimationFrame(update); //Continually transforms the HTML elements to be exactly on the matterbodies

function update() {

    // strips
    for (let i = 0, l = bodiesDom.length; i < l; i++) {

        let bodyDom = bodiesDom[i];
        let body = null;

        for (let j = 0, k = bodies.length; j < k; j++) {

            if (bodies[j].id == bodyDom.id) {
                body = bodies[j];
                break;
            }

        }

        if (body === null) continue;

        //centers the element on top of the matterbody
        bodyDom.style.transform =
        "translate( " + (body.position.x- bodyDom.offsetWidth / 2) + "px, " + 
        (body.position.y - bodyDom.offsetHeight / 2) + "px )";

        //rotates the element the sape as the matterbody
        bodyDom.style.transform += "rotate( " + body.angle + "rad )";

    }

    window.requestAnimationFrame(update);

}