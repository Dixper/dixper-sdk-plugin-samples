const images = [];

const sprites = [
  {
    name: "halloweenCementery",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/spritesheets/floor-trileros.json",
  },
];

const sounds = [];

// INPUTS PARAMS

let currentRounds = 1;
let currentMoves = 1;
let table = [];
let keysCubeArray = [];
let cube1, cube2;
let ball;
let cube;
let moving = true;
let halloweenPanel;
let keyCube;
let totalWidth;
let cupWidth;
let distanceBetweenCups;
let onKeySub;

const gamepadButtons = [
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
const URL_BUTTON =
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/images/Cup.png";

const buttonMessage = "";
const dixperPluginSample = new DixperSDKLib({
  pixi: {
    enable: true,
    files: [...images, ...sprites, ...sounds],
  },
});

// INPUTS

let { numberCubes, totalMoves, numberRounds, moveTime } = DX_INPUTS;

// INIT BUTTONS

const defaultButtonProps = {
  isClickable: true,
  scale: {
    x: 0.85,
    y: 0.85,
  },
  winner: false,
  position: {
    y: DX_HEIGHT / 2 + 50,
  },
};

const buttonPositionX = ({
  idx,
  totalWidth,
  distanceBetweenCups,
  cupWidth,
}) => {
  return (
    DX_WIDTH / 2 -
    totalWidth / 2 +
    idx * (distanceBetweenCups + cupWidth) +
    cupWidth / 2
  );
};
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
  createFloor();
  roundStart(numberCubes, totalMoves, moveTime);
};

const activateKey = () => {
  if (DX_CONTROLLER_TYPE) {
    onKeySub =
      dixperPluginSample.onGamepadButtonPress$.subscribe(checkKeyActivate);
  } else {
    onKeySub = dixperPluginSample.onKeyDown$.subscribe(checkKeyActivate);
  }
};

const createCubes = () => {
  cupWidth = 275;
  distanceBetweenCups = 100;
  totalWidth = 275 * numberCubes + 100 * (numberCubes - 1);
  const randWinner = Math.floor(Math.random() * numberCubes);

  //CREATE CUBES
  for (let i = 0; i < numberCubes; i++) {
    cube = new DxButton(
      URL_BUTTON,
      buttonMessage,
      {
        ...defaultButtonProps,
        position: {
          x: buttonPositionX({
            idx: i,
            totalWidth,
            distanceBetweenCups,
            cupWidth,
          }),
          y: defaultButtonProps.position.y,
        },
        id: i,
      },
      DX_PIXI,
      DX_LAYERS.top
    );
    cube.start();

    if (i === randWinner) {
      cube._options.winner = true;
      createBall(cube);
    }

    table.push(cube);
  }
};

const createBall = (cube) => {
  ball = new PIXI.Sprite.from(
    "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/images/Ball.png"
  );
  ball.x = cube.instance.x;
  ball.y = cube.instance.y + 400;
  ball.anchor.set(0.5);
  ball.zIndex = 0;
  ball.scale.x = 0.75;
  ball.scale.y = 0.75;

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
  // console.clear();
  resetScene(newCubes, newMovements, newMoveTime);
  createCubes();
  hideBall();
};

const hideBall = () => {
  moving = true;
  gsap.fromTo(
    table[0].instance,
    { x: table[0].instance.x, y: table[0].instance.y },
    {
      x: table[0].instance.x,
      y: table[0].instance.y + 250,
      duration: 2,
      onComplete: onComplete,
    }
  );

  for (let i = 0; i < table.length; i++) {
    gsap.fromTo(
      table[i].instance,
      { x: table[i].instance.x, y: table[i].instance.y },
      { x: table[i].instance.x, y: table[i].instance.y + 250, duration: 2 }
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

  let tempId = cube1._options.id;
  cube1._options.id = cube2._options.id;
  cube2._options.id = tempId;
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
      table.forEach((element, idx) => {
        createKeysController(element._options.winner, element.instance.y, idx);
        if (element._options.winner) {
          ball.position.x = element.instance.x;
        }
        element.remove();
      });
      table = [];
      cube = undefined;
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
      y: cubeRevealed.instance.y - 200,
      duration: 1.5,
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
  keysCubeArray.forEach((element) => {
    element.remove();
  });
  keyCube = undefined;
  keysCubeArray = [];
};

const createFloor = () => {
  halloweenPanel = new dxPanel(
    DX_PIXI,
    "halloweenCementery",
    DX_LAYERS.ui,
    "",
    {
      position: {
        x: DX_WIDTH / 2,
        y: DX_HEIGHT - 221,
      },
      scale: {
        x: 1,
        y: 1,
      },
      animationSpeed: 0.5,
      zIndex: 0,
    }
  );
};

const createKeysController = (newWinner, posY, i) => {
  keyCube = new DxButton(
    URL_BUTTON,
    buttonMessage,
    {
      isClickable: true,
      controller: {
        isPressable: true,
        button: gamepadButtons[i],
        x: 0,
        y: 160,
      },
      keyboard: {
        isPressable: true,
        button: `${i + 1}`,
        x: 0,
        y: 160,
      },
      position: {
        x:
          DX_WIDTH / 2 -
          totalWidth / 2 +
          i * (distanceBetweenCups + cupWidth) +
          cupWidth / 2,
        y: posY,
      },
      scale: {
        x: 0.85,
        y: 0.85,
      },
      winner: newWinner,
    },
    DX_PIXI,
    DX_LAYERS.top
  );
  keyCube.start();
  keysCubeArray.push(keyCube);

  keysCubeArray.forEach((keyCube) => {
    keyCube.onClick = (event) => {
      if (!moving) {
        revealCube(keyCube);
      }
    };
  });
};
const createCounterError = () => {
  const challengeMarker = new DxChallengeMarker(
    {
      success: {
        img: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/images/counter-error-correct.png",
        sound: "https://pixijs.io/sound/examples/resources/boing.mp3",
      },
      fail: {
        img: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/images/counter-error-incorrect.png",
        sound: "https://pixijs.io/sound/examples/resources/boing.mp3",
      },
      idle: {
        img: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/images/counter-error-empty.png",
        sound: "https://pixijs.io/sound/examples/resources/boing.mp3",
      },
    },
    4,
    100,
    {
      position: {
        x: DX_WIDTH / 2,
        y: 100,
      },
      scale: {
        x: 0.35,
        y: 0.35,
      },
    }
  );
};
