const images = [];

const sprites = [];

const sounds = [];

// INPUTS PARAMS

let numberCubes = 3;
let totalMoves = 6;
let numberRounds = 4;
let currentRounds = 1;
let currentMoves = 0;
let moveTime = 1;
let table = [];
let cube1, cube2;
let ball;
let moving = true;

const gamePadButtons = [
  "FACE_1",
  "FACE_2",
  "FACE_3",
  "FACE_4",
  "RIGHT_SHOULDER",
  "RIGHT_SHOULDER_BOTTOM",
  "LEFT_SHOULDER",
  "LEFT_SHOULDER_BOTTOM",
];

// DIXPER SDK INJECTED CLASS

const dixperPluginSample = new DixperSDKLib({
  pixi: {
    enable: true,
    files: [...images, ...sprites, ...sounds],
  },
});

// INPUTS

const {} = DX_INPUTS;

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

dixperPluginSample.onChallengeFinish = () => {};

const init = () => {
  roundStart(numberCubes, totalMoves, moveTime);
};

const createCubes = () => {
  //CREATE CUBES
  for (let i = 0; i < numberCubes; i++) {
    let cube = new DxButton(
      "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/origin/halloween-rii/src/halloween/assets/images/Target_INOUT_00017.png",
      ``,
      {
        isClickable: true,
        controller: {
          isPressable: true,
          button: `FACE_1`,
          x: 0,
          y: 40,
        },
        keyboard: {
          isPressable: true,
          button: `${1}`,
          x: 0,
          y: 40,
          scale: {
            x: 0,
            y: 0,
          },
        },
        position: {
          x: DX_WIDTH / 2 - 200 + i * 200,
          y: DX_HEIGHT / 2,
        },
        scale: {
          x: 1,
          y: 1,
        },
        winner: false,
        id: i,
      },
      DX_PIXI,
      DX_LAYERS.top
    );

    cube.start();
    table.push(cube);
    cube.onClick = (event) => {
      if (!moving) {
        revealCube(cube);
      }
    };
  }

  //SET WINNER CUP
  let randWinner = Math.floor(Math.random() * table.length);
  table[randWinner]._options.winner = true;
};

const createBall = () => {
  ball = new PIXI.Sprite.from(
    "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/origin/halloween-rii/src/halloween/assets/images/Target_INOUT_00017.png"
  );
  table.forEach((element) => {
    if (element._options.winner) {
      ball.x = element.instance.x;
      ball.y = element.instance.y + 120;
    }
  });

  ball.anchor.set(0.5);
  ball.zIndex = 0;
  ball.scale.x = 0.5;
  ball.scale.y = 0.5;

  DX_LAYERS.ui.addChild(ball);
};

const shuffleCubes = () => {
  cube1 = table[Math.floor(Math.random() * table.length)];
  cube2 = cube1;
  while (cube1 === cube2) {
    cube2 = table[Math.floor(Math.random() * table.length)];
  }
  moveCubes(cube1, cube2);
};

const roundStart = (newCubes, newMovements, newMoveTime) => {
  console.clear();
  resetScene(newCubes, newMovements, newMoveTime);
  createCubes();
  createBall();
  hideBall();
};

const hideBall = () => {
  moving = true;
  gsap.fromTo(
    table[0].instance,
    { x: table[0].instance.x, y: table[0].instance.y },
    {
      x: table[0].instance.x,
      y: table[0].instance.y + 100,
      duration: 3,
      onComplete: onComplete,
    }
  );

  for (let i = 1; i < table.length; i++) {
    gsap.fromTo(
      table[i].instance,
      { x: table[i].instance.x, y: table[i].instance.y },
      { x: table[i].instance.x, y: table[i].instance.y + 100, duration: 3 }
    );
  }
  function onComplete() {
    shuffleCubes();
  }
};

const moveCubes = (cube1, cube2) => {
  moving = true;
  ball.alpha = 0;
  let prevPosCube1 = {
    x: cube1.instance.x,
    y: cube1.instance.y,
  };
  let prevPosCube2 = {
    x: cube2.instance.x,
    y: cube2.instance.y,
  };
  gsap.fromTo(
    cube1.instance,
    { x: cube1.instance.x, y: cube1.instance.y },
    {
      x: prevPosCube2.x,
      y: prevPosCube2.y,
      duration: moveTime,
      onComplete: onComplete,
    }
  );
  gsap.fromTo(
    cube2.instance,
    { x: cube2.instance.x, y: cube2.instance.y },
    { x: prevPosCube1.x, y: prevPosCube1.y, duration: moveTime }
  );

  function onComplete() {
    if (currentMoves < totalMoves) {
      shuffleCubes();
      currentMoves++;
    } else {
      table.forEach((element) => {
        if (element._options.winner) {
          ball.position.x = element.instance.x;
        }
      });
      console.log("---------------", table[0]);
      for (let i = 0; i < table.length; i++) {
        table[i]._controllerButtonsIntance._button = `${i + 1}`;
      }
      ball.alpha = 1;
      moving = false;
    }
  }
};

const revealCube = (cubeRevealed) => {
  moving = true;
  gsap.fromTo(
    cubeRevealed.instance,
    { x: cubeRevealed.instance.x, y: cubeRevealed.instance.y },
    {
      x: cubeRevealed.instance.x,
      y: cubeRevealed.instance.y - 60,
      duration: 2,
      onComplete: onComplete,
    }
  );

  function onComplete() {
    if (cubeRevealed._options.winner) {
      console.log("WINNER");
    } else {
      console.log("LOSER");
    }
    if (currentRounds < numberRounds) {
      currentRounds++;
      switch (currentRounds) {
        case 2:
          roundStart(5, 8, 0.7);
          break;
        case 3:
          roundStart(5, 10, 0.5);
          break;
        default:
          roundStart(5, totalMoves + 2, 0.4);
          break;
      }
    } else {
      dixperPluginSample.stopSkill();
    }
  }
};

const resetScene = (newCubes, newMovements, newMoveTime) => {
  numberCubes = newCubes;
  totalMoves = newMovements;
  moveTime = newMoveTime;
  currentMoves = 0;
  cube1 = undefined;
  cube2 = undefined;
  if (ball != undefined) {
    ball.destroy();
  }
  moving = true;
  table.forEach((element) => {
    element.remove();
  });
  table = [];
};
