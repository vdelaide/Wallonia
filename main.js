//CURRENT BUGS: Mouseconstraint not working to allow for picking up the bodies

var Hero = Hero || {};
const canvasElem = document.getElementById("canvas");

Hero.banner = function(){

    /** Set up relative positions and scales **/
    var VIEW = {};

    VIEW.width    = window.innerWidth;
    VIEW.height   = window.innerHeight;

    VIEW.centerX  = VIEW.width / 2;
    VIEW.centerY  = VIEW.height / 2;

    VIEW.offsetX  = VIEW.width / 2;
    VIEW.offsetY  = VIEW.height / 2;

    // module aliases
    var Engine = Matter.Engine,
        Render = Matter.Render,
        Runner = Matter.Runner,
        Bodies = Matter.Bodies,
        Mouse  = Matter.Mouse,
        Composite = Matter.Composite,
        MouseConstraint = Matter.MouseConstraint;

    // create an engine
    var engine = Engine.create(), world = engine.world;

    // create a renderer
    var render = Render.create({

        canvas:  canvasElem, //assigns the canvas element
        element: document.getElementById("debug"), //assigns parent element of the canvas
        engine:  engine

    });

    //bodies.rectangle(x, y, width, height)
    Composite.add(world, [

        // ground & ceiling, set it at the center, width of the canvas
        ground    = Bodies.rectangle(VIEW.centerX, 100, VIEW.width, 10, { isStatic: true }),
        ceiling   = Bodies.rectangle(VIEW.centerX, 0, VIEW.width, 10, {isStatic: true}),


        // walls
        wallRight = Bodies.rectangle(0, 0, 80, 80, {isStatic: true}),
        wallLeft  = Bodies.rectangle(0, 200, 80, 80, {isStatic: true}),

        //testing purposes
        test      = Bodies.rectangle(0, 0, 20, 20)

      ]);

    // run the renderer, runner, and engine
    var runner = Runner.create();
    Render.run(render);
    Runner.run(runner, engine);

    // add mouse control
    var mouse = Mouse.create(render.canvas),
    mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
            stiffness: 0.2,
            render: {
                visible: false
            }
        }
    });

    Composite.add(world, mouseConstraint);

    render.mouse = mouse; // keep the mouse in sync with rendering

    

    //Resize Canvas so that the elements are crispy clear
    function initializeCanvas(width, height) {

        var canvas = document.getElementById('canvas');

        canvas.width = width;
        canvas.height = height;
    
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

    //Unhelpful for testing purposes, might have to update more often to have it be 'responsive'
    initializeCanvas(VIEW.width, (VIEW.height*0.75)) //Initializes the canvas to fit as a banner

}

Hero.banner()