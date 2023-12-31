const canvas = document.getElementById("canvas")
const main = document.getElementById("main")
const bodiesDom = document.querySelectorAll(".matter-body")

// Options for matterbodies
const boundariesOpts = {

    isStatic:      true,
    restitution:   1,
    render: {
        fillStyle: "transparent"
    }

}

const bodyOpts = {

    restitution:      1, // bounciness when bodies touch
    friction:         0, // friction between bodies

    frictionAir:      0, //prevents them from getting too fast
    frictionStatic:   0,

    density:          0.5,
    chamfer:          { radius: 7 }, // border radius

    render:           {fillStyle: "transparent"} // prevents the matterbodies from showing in case of lag

}

function initialize(){
    const dimensions   = {};

    dimensions.width   = main.clientWidth;
    dimensions.height  = main.clientHeight;

    dimensions.centerX = dimensions.width / 2;
    dimensions.centerY = dimensions.height / 2;

    // module aliases
    const Engine  = Matter.Engine,
        Render    = Matter.Render,
        Runner    = Matter.Runner,
        Body      = Matter.Body,
        Bodies    = Matter.Bodies,
        Composite = Matter.Composite;

    // create an engine & runner
    const engine  = Engine.create();
    const runner  = Runner.create();

    // create a renderer
    const render  = Render.create({

        canvas:   canvas,
        element:  document.querySelector("main"), //parent element of the canvas
        engine:   engine,

        options: {
            showDebug:  false,
            wireframes: false,
            background: "transparent"
        }

    });

    engine.gravity.scale = 0;

    // run the renderer & the engine
    Render.run(render);
    Runner.run(runner, engine);

    Composite.add(engine.world, [
        // Bodies.rectangle(x-pos, y-pos, width, height, options)

        // ground & ceiling, set it at the center of the width, give it width of the canvas, put ground at the end of the canvas
        ceiling   = Bodies.rectangle(dimensions.centerX, 0, dimensions.width, 1, boundariesOpts),
        ground    = Bodies.rectangle(dimensions.centerX, dimensions.height, dimensions.width, 1, boundariesOpts),

        // walls, set it at the center of the height, give it the height of the canvas, put wRight at the end of the canvas
        wallRight = Bodies.rectangle(dimensions.width, dimensions.centerY, 1, dimensions.height, boundariesOpts),
        wallLeft  = Bodies.rectangle(0, dimensions.centerY, 1, dimensions.height, boundariesOpts)

    ]);

    let bodies = [];
    let body;

    let bodyWidth;
    let bodyHeight;

    function organizeBodies(type){

        // random number between 7 and -7, necessary to not have bodies go in 1 direction
        let randX = Math.ceil(Math.random() * 7) * (Math.round(Math.random()) ? 1 : -1);
        let randY = Math.ceil(Math.random() * 7) * (Math.round(Math.random()) ? 1 : -1);

        // necessary to have different angles for each body
        let newBodyOpts = Object.assign({}, bodyOpts, { angle: (Math.random() * 2.000) - 1.000 });

        switch(type){

            case "strip":
                bodyWidth  = 125;
                bodyHeight = 75;
                break;

            case "socials":
                bodyWidth  = 50;
                bodyHeight = 50;
                break;

            case "large-matter":
                bodyWidth  = 100;
                bodyHeight = 100;
                break;

            default:
                return console.error("No class given for type");
                
        };

        body = Bodies.rectangle(

            dimensions.centerX + Math.floor(Math.random() * dimensions.width/2) - dimensions.width/4, // X-pos
            dimensions.centerY + Math.floor(Math.random() * dimensions.height / 2) - dimensions.height / 4, //Y-POS
            bodyWidth, bodyHeight, newBodyOpts

        );

        Body.applyForce(body, body.position, { x: randX, y: randY });

    }

    for (let i = 0, l = bodiesDom.length; i < l; i++) {

        organizeBodies(bodiesDom[i].classList.item(1));

        bodiesDom[i].id = body.id;
        bodies.push(body);
    }

    Composite.add(engine.world, bodies);
   
    function initializeCanvas(width, height) {

        canvas.width          = width;
        canvas.height         = height;

        render.options.width  = width;
        render.options.height = height;

        render.canvas.width   = render.options.width;
        render.canvas.height  = render.options.height;

        Render.lookAt(render, {

            min: { x: 0, y: 0 },
            max: { x: width, y: height }

        });

        Render.setPixelRatio(render, "auto");
    }

    initializeCanvas(dimensions.width, dimensions.height) // Initializes the canvas to fit as a banner, and to not look low-quality

    window.requestAnimationFrame(update); // Continually transforms the HTML elements to be exactly on the matterbodies

    function update() {

        //Matches the elements & matterbodies together
        for (let i = 0, l = bodiesDom.length; i < l; i++) {

            let bodyDom = bodiesDom[i];
            let body    = null;

            for (let j = 0, k = bodies.length; j < k; j++) {

                if (bodies[j].id == bodyDom.id) {
                    body = bodies[j];
                    break;
                }

            }

            if (body === null) continue;

            // centers the element on top of the matterbody
            bodyDom.style.transform =
            "translate( " + (body.position.x- bodyDom.offsetWidth / 2) + "px, "
            + (body.position.y - bodyDom.offsetHeight / 2) + "px )";

            // rotates the element the same as the matterbody
            bodyDom.style.transform += "rotate( " + body.angle + "rad )";

        }

        window.requestAnimationFrame(update);

    }

};

initialize();

function debounce(func, wait, immediate) {

    let timeout;

    return function() {

        let context = this, args = arguments;
        clearTimeout(timeout);

        timeout = setTimeout(function(){

            timeout = null;
            if (!immediate){func.apply(context, args)};

        }, wait);

        if (immediate && !timeout){func.apply(context, args)};

    };
}
  
let refreshWorld = debounce(function() {location.reload();}, 500);

window.addEventListener("resize", refreshWorld)