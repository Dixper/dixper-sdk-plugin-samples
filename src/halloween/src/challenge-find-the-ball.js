const images = [];

const sprites = [];

const sounds = [];


// INPUTS PARAMS

let numberCubes = 3;
let movesLeft = 6;
let numberRounds = 3;
let moveTime = 1;
let table = [];
let cube1, cube2;

// DIXPER SDK INJECTED CLASS

const dixperPluginSample = new DixperSDKLib({
    pixi: {
        enable: true,
        files: [...images, ...sprites, ...sounds],
    },
});

// INPUTS

const { } =
    DX_INPUTS;

// PIXIJS INITILIZE

dixperPluginSample.onPixiLoad = () => {
    init();
    //dixperPluginSample.initChallenge(challengeTitle, challengeTime);
};

// INIT CHALLENGE

dixperPluginSample.onChallengeAccepted = () => {
    init();
};

dixperPluginSample.onChallengeRejected = () => {
    dixperPluginSample.stopSkill();
};

dixperPluginSample.onChallengeFinish = () => {
};

const init = () => {
    console.clear();

    createCubes();
    roundLogic();
    console.log("table", table);
}

const createCubes = () => {
    //CREATE CUBES
    for (let i = 0; i < numberCubes; i++) {
        let cube = new DxButton("https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/origin/halloween-rii/src/halloween/assets/images/Target_INOUT_00017.png", ``, {
            isClickable: true,
            controller: {
                isPressable: true,
                button: "FACE_1",
                x: 0,
                y: 40,
            },
            keyboard: {
                isPressable: true,
                button: `Q`,
                x: 0,
                y: 40,
            },
            position: {
                x: DX_WIDTH / 2 - 200 + i * 100,
                y: DX_HEIGHT / 2,
            },
            scale: {
                x: 0.5,
                y: 0.5,
            },
            winner: false,
            id: i
        });

        cube.start();
        table.push(cube);
    }

    //SET WINNER CUP
    let randWinner = Math.floor(Math.random() * table.length);
    table[randWinner]._options.winner = true;
    console.log("WINNER IS: ", table[randWinner]);
}

const shuffleCubes = () => {
    cube1 = table[Math.floor(Math.random() * table.length)];
    cube2 = cube1;
    while (cube1 === cube2) {
        cube2 = table[Math.floor(Math.random() * table.length)];
    }
    moveCubes(cube1, cube2);
}

const roundLogic = () => {
    shuffleCubes();
};


const moveCubes = (cube1, cube2) => {
    console.log("START MOVE", cube1);
    console.log("START MOVE", cube2);
    let prevPosCube1 = {
        x: cube1.instance.x,
        y: cube1.instance.y,
    }
    let prevPosCube2 = {
        x: cube2.instance.x,
        y: cube2.instance.y,
    }
    gsap.fromTo(
        cube1.instance,
        { x: cube1.instance.x, y: cube1.instance.y },
        { x: prevPosCube2.x, y: prevPosCube2.y, duration: moveTime, onComplete: onComplete }
    );
    gsap.fromTo(
        cube2.instance,
        { x: cube2.instance.x, y: cube2.instance.y },
        { x: prevPosCube1.x, y: prevPosCube1.y, duration: moveTime }
    );

    // cube1._options.x = prevPosCube2.x;
    // cube1._options.y = prevPosCube2.y;

    // cube2._options.x = prevPosCube1.x;
    // cube2._options.y = prevPosCube1.y;

    function onComplete() {
        console.log("completado");
        if (movesLeft > 0) {
            shuffleCubes();
            movesLeft--;
        }
    }
}
