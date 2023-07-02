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
    Mouse = Matter.Mouse, 
    MouseConstraint = Matter.MouseConstraint,
    Composite = Matter.Composite;

// create an engine
const engine = Engine.create();

// create a renderer
const render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        showDebug: true
    }
});

Composite.add(engine.world, [
    // ground & ceiling, set it at the center of the width, give it width of the canvas, put ground at the end of the canvas
    ceiling = Bodies.rectangle(VIEW.centerX, 0, VIEW.width, 10, {isStatic: true}),
    ground = Bodies.rectangle(VIEW.centerX, (VIEW.height*0.9), VIEW.width, 10, { isStatic: true }),

    // walls, set it at the center of the height, give it the height of the canvas, put wRight at the end of the canvas
    wallRight = Bodies.rectangle(VIEW.width, VIEW.centerY, 10, VIEW.height, {isStatic: true}),
    wallLeft = Bodies.rectangle(0, VIEW.centerY, 10, VIEW.height, {isStatic: true}),
]);

// run the renderer
Render.run(render);
const runner = Runner.create();
Runner.run(runner, engine);

engine.gravity.y = 0;

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

initializeCanvas(VIEW.width, (VIEW.height*0.9)) //Initializes the canvas to fit as a banner

//My understanding of how to do the aenism stuff:
//Create 4 classes, one to distinguish all the matterbodies (that we'll use), another for an "article" or strip, another for the page nav,
//and a final one to 'disturb' the other matterbodies, to make the page look more lively
//All things that you want to move on the screen will be given matterbodies, then give it a strip class or a page nav to determine its shape,
//behavior, location, etc
//Then, loop through all the matterbodies and check what class it has and filter it accordingly to give it a certain shape, behavior, location, etc
//finally, push all those things into an object and adds it to the composite

const bodiesDom = document.querySelectorAll('.matter-body');
let bodies = [];

console.log(bodiesDom)

for(
    let i = 0,
    l = bodiesDom.length;
    i < l; i++
    ){
    
    // if (bodiesDom[i].classList.contains('strip')) {

    // Strip
    let body = Bodies.rectangle(

    VIEW.centerX + Math.floor(Math.random() * VIEW.width/2) - VIEW.width/4,
    VIEW.centerY + Math.floor(Math.random() * VIEW.height / 2) - VIEW.height / 4,

    VIEW.width * bodiesDom[i] / window.innerWidth,
    VIEW.height * bodiesDom[i] / window.innerHeight, {
        restitution:      0.5,
        friction:         0,
        frictionAir:      0.001,
        frictionStatic:   0,
        density:          1,
        chamfer:          { radius: 24 },
        angle:            (Math.random() * 2.000) - 1.000
        }

    );
    // }
    bodiesDom[i].id = body.id;
    bodies.push(body);
}

console.log(bodies) //Undefined, maybe because i'm not filtering out classes anymore
//HIGH PRIORITY BUG ^

Composite.add(engine.world, bodies)