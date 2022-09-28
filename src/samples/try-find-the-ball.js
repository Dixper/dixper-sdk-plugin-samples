const images = [];

const sprites = [
  {
    name: "halloweenFloor",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/spritesheets/floor-trileros.json",
  },
  {
    name: "halloweenChallenge",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/spritesheets/challenge-communication.json",
  },
  {
    name: "halloweenTime",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/spritesheets/timer.json",
  },
  {
    name: "halloweenReminder",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/spritesheets/reminderHalloween.json",
  },
  {
    name: "halloweenCementery",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/spritesheets/cementery-illustration.json",
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
let cementeryPanel;
let keyCube;
let totalWidth;
let cupWidth;
let distanceBetweenCups;
let onKeySub;
let counterMarker = 0;
let challengeMarker;
let titleChallengePanel, acceptButton, declineButton, halloweenPanel;
let numberCubes = 3;
let speedTime;
let roundMoves;

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

let {
  initialMoves,
  numberRounds,
  challengeTitle,
  challengeTime,
  reminderTitle,
  acceptButtonText,
  declineButtonText,
  textCountdown,
  level,
} = DX_INPUTS;

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
  createChallenge();
};

// INIT CHALLENGE

dixperPluginSample.initCountdown = () => {
  const countDown = new dxCountDown(
    DX_PIXI,
    "countDown",
    DX_LAYERS.ui,
    3,
    textCountdown,
    {
      position: {
        x: DX_WIDTH / 2,
        y: DX_HEIGHT / 2,
      },
      scale: {
        x: 0.25,
        y: 0.25,
      },
      animationSpeed: 0.5,
    }
  );

  countDown.onOutFinish = () => {
    onChallengeAccepted();
  };
};

dixperPluginSample.onChallengeRejected = () => {
  dixperPluginSample.stopSkill();
};

dixperPluginSample.onChallengeFinish = () => {};

const createChallenge = () => {
  titleChallengePanel = new dxPanel(
    DX_PIXI,
    "halloweenChallenge",
    DX_LAYERS.ui,
    challengeTitle,
    {
      position: {
        x: DX_WIDTH / 2,
        y: 250,
      },
      scale: {
        x: 1,
        y: 1,
      },
      animationSpeed: 0.5,
    }
  );

  acceptButton = new DxButton(
    "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/images/accept_challenge-button.png",
    acceptButtonText,
    {
      isClickable: true,
      controller: {
        isPressable: true,
        button: "FACE_2",
        x: 0,
        y: 50,
      },
      keyboard: {
        isPressable: true,
        button: "Enter",
        x: 0,
        y: 50,
      },
      position: {
        x: DX_WIDTH / 2 - 150,
        y: 450,
      },
      scale: {
        x: 1,
        y: 1,
      },
    }
  );

  declineButton = new DxButton(
    "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/images/decline-challenge-button.png",
    declineButtonText,
    {
      isClickable: true,
      controller: {
        isPressable: true,
        button: "FACE_2",
        x: 50,
        y: 50,
      },
      keyboard: {
        isPressable: true,
        button: "Esc",
        x: 50,
        y: 50,
      },
      position: {
        x: DX_WIDTH / 2 + 150,
        y: 450,
      },
      scale: {
        x: 1,
        y: 1,
      },
    }
  );

  halloweenPanel = new dxPanel(
    DX_PIXI,
    "halloweenCementery",
    DX_LAYERS.ui,
    "",
    {
      position: {
        x: DX_WIDTH / 2,
        y: DX_HEIGHT - 195,
      },
      scale: {
        x: 1,
        y: 1,
      },
      animationSpeed: 0.5,
      zIndex: 99,
    }
  );

  acceptButton.start();
  declineButton.start();

  acceptButton.onClick = (event) => {
    removeChallenge();
    dixperPluginSample.initCountdown();
  };
  declineButton.onClick = (event) => {
    dixperPluginSample.onChallengeRejected();
  };
};

const onChallengeAccepted = () => {
  const interval = 1000;

  const timer = new dxTimer(
    DX_PIXI,
    "halloweenTime",
    DX_LAYERS.ui,
    challengeTime,
    interval,
    {
      position: {
        x: 140,
        y: DX_HEIGHT / 2 - 300,
      },
      scale: {
        x: 1,
        y: 1,
      },
      animationSpeed: 0.5,
    }
  );
  timer.onTimerFinish = () => {
    dixperPluginSample.stopSkill();
    console.log("fin skill");
  };

  const reminder = new dxPanel(
    DX_PIXI,
    "halloweenReminder",
    DX_LAYERS.ui,
    reminderTitle,
    {
      position: {
        x: 200,
        y: DX_HEIGHT / 2 - 100,
      },
      scale: {
        x: 1,
        y: 1,
      },
      animationSpeed: 0.5,
    }
  );
  init();
};

const removeChallenge = () => {
  titleChallengePanel._destroy();
  acceptButton.remove();
  declineButton.remove();
  halloweenPanel._destroy();
};

const init = () => {
  switch (level) {
    case 1:
      speedTime = 1;
      break;
    case 2:
      speedTime = 0.9;
      break;
    case 3:
      speedTime = 0.8;
      break;
    case 4:
      speedTime = 0.7;
      break;
  }
  createFloor();
  createCounterError();
  roundMoves = initialMoves;
  roundStart(numberCubes, roundMoves, speedTime);
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

const roundStart = (newCubes, newMovements, newSpeedTime) => {
  resetScene(newCubes, newMovements, newSpeedTime);
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
      duration: speedTime,
      onComplete: onComplete,
    }
  );
  gsap.fromTo(
    cube2.instance,
    { x: cube2.instance.x, y: cube2.instance.y },
    { x: prevPosCube1.x, y: prevPosCube1.y, duration: speedTime }
  );
  function onComplete() {
    if (currentMoves < roundMoves) {
      shuffleCubes();
      currentMoves++;
    } else {
      table.forEach((element, idx) => {
        createKeysController(element._options.winner, element.instance.y, idx);
        console.log("element", element._options.winner);
        element.remove();
      });
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
      challengeMarker.changeStatus(counterMarker, "success");
      counterMarker += 1;
    } else {
      challengeMarker.changeStatus(counterMarker, "fail");
      counterMarker += 1;
    }
    if (currentRounds < numberRounds) {
      currentRounds++;
      if (level === 1) {
        switch (currentRounds) {
          case 2:
            roundMoves = initialMoves + 2;
            roundStart(3, roundMoves, speedTime - 0.05);
            break;
          case 3:
            roundMoves = initialMoves + 4;
            roundStart(3, roundMoves, speedTime - 0.1);
            break;
          default:
            roundMoves = initialMoves + 6;
            roundStart(3, roundMoves, speedTime - 0.15);
            break;
        }
      } else if (level === 2) {
        switch (currentRounds) {
          case 2:
            roundStart(3, initialMoves + 2, speedTime - 0.1);
            break;
          case 3:
            roundStart(3, initialMoves + 4, speedTime - 0.2);
            break;
          default:
            roundStart(3, initialMoves + 6, speedTime - 0.3);
            break;
        }
      } else if (level === 3) {
        switch (currentRounds) {
          case 2:
            roundStart(5, initialMoves + 2, speedTime - 0.1);
            break;
          case 3:
            roundStart(5, initialMoves + 4, speedTime - 0.2);
            break;
          default:
            roundStart(5, initialMoves + 6, speedTime - 0.3);
            break;
        }
      } else if (level === 4) {
        switch (currentRounds) {
          case 2:
            roundStart(5, initialMoves + 2, speedTime - 0.1);
            break;
          case 3:
            roundStart(5, initialMoves + 4, speedTime - 0.2);
            break;
          default:
            roundStart(5, initialMoves + 6, speedTime - 0.3);
            break;
        }
      }
    } else {
      setTimeout(() => dixperPluginSample.stopSkill(), 2000);
    }
  }
};

const resetScene = (newCubes, newMovements, newSpeedTime) => {
  numberCubes = newCubes;
  initialMoves = newMovements;
  speedTime = newSpeedTime;
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
  keysCubeArray = [];
  table = [];
};

const createFloor = () => {
  cementeryPanel = new dxPanel(DX_PIXI, "halloweenFloor", DX_LAYERS.ui, "", {
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
  });
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

  console.log("keyCubeWin", keyCube._options.winner);

  if (keyCube._options.winner) {
    console.log("creo la bola");
    ball.position.x = keyCube.instance.x;
    ball.alpha = 1;
  }

  keysCubeArray.forEach((keyCube) => {
    keyCube.onClick = (event) => {
      if (!moving) {
        revealCube(keyCube);
      }
    };
  });
};
const createCounterError = () => {
  challengeMarker = new DxChallengeMarker(
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
    150,
    {
      position: {
        x: DX_WIDTH / 2,
        y: 100,
      },
      scale: {
        x: 1,
        y: 1,
      },
    }
  );
  challengeMarker.start();
  //bug scale
};
