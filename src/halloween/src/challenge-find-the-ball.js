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
  {
    name: "halloweenChallengeSuccess",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/spritesheets/win_challenge.json",
  },
  {
    name: "halloweenChallengeFail",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/spritesheets/lose_challenge.json",
  },
  {
    name: "halloweenChallengeSuccessSpanish",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/spritesheets/win_challenge_es.json",
  },
  {
    name: "halloweenChallengeFailSpanish",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/spritesheets/lose_challenge_es.json",
  },
];

const sounds = [];

// INPUTS PARAMS

// let numberRounds = 1;
// let currentRounds = 1;
let currentMoves = 1;
let table = [];
let keysCubeArray = [];
let cube1, cube2;
let ball;
let cube;
let moving = true;
let keyCube;
let totalWidth;
let cupWidth;
let distanceBetweenCups;
let onKeySub;
let titleChallengePanel, acceptButton, declineButton, halloweenPanel;
let numberCubes;
let winnerArray = [];
let panelChallengeSuccess;
let panelChallengeFail;
let reminder;
let timer;
let cementeryPanel;
const finalPositionTimer = -666;

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
  speedTime,
  moves,
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

dixperPluginSample.onChallengeFinish = () => {
  createChallengeFail();
};

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
        x: 0,
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

const createChallengeSuccess = () => {
  panelChallengeSuccess = new dxPanel(
    DX_PIXI,
    "halloweenChallengeSuccess",
    DX_LAYERS.top,
    "",
    {
      position: {
        x: DX_WIDTH / 2,
        y: DX_HEIGHT / 2,
      },
      scale: {
        x: 1,
        y: 1,
      },
      animationSpeed: 0.5,
    }
  );
  setTimeout(() => panelChallengeSuccess.remove(), 500);
  setTimeout(() => dixperPluginSample.stopSkill(), 1000);
};

const createChallengeFail = () => {
  panelChallengeFail = new dxPanel(
    DX_PIXI,
    "halloweenChallengeFail",
    DX_LAYERS.top,
    "",
    {
      position: {
        x: DX_WIDTH / 2,
        y: DX_HEIGHT / 2,
      },
      scale: {
        x: 1,
        y: 1,
      },
      animationSpeed: 0.5,
    }
  );
  setTimeout(() => panelChallengeFail.remove(), 500);
  setTimeout(() => dixperPluginSample.stopSkill(), 1000);
};

const onChallengeAccepted = () => {
  const interval = 1000;

  timer = new dxTimer(
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
    dixperPluginSample.onChallengeFinish();
    console.log("finish time");
  };

  reminder = new dxPanel(
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

const removeHUD = () => {
  reminder.remove();
  cementeryPanel._destroy();
  timer.instance.x = finalPositionTimer;
};
const init = () => {
  setQuantityRandomCubes();
  // switch (level) {
  //   case 1:
  //     speedTime = 0.9;
  //     break;
  //   case 2:
  //     speedTime = 0.7;
  //     break;
  //   case 3:
  //     speedTime = 0.5;
  //     break;
  //   case 4:
  //     speedTime = 0.3;
  //     break;
  // }
  createFloor();
  roundStart(numberCubes, moves, speedTime);
};

const roundStart = (newCubes, newMovements, newSpeedTime) => {
  // resetScene(newCubes, newMovements, newSpeedTime);
  createCubes();
  hideBall();
};

const resetScene = (newCubes, newMovements, newSpeedTime) => {
  numberCubes = newCubes;
  // initialMoves = newMovements;
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
  winnerArray = [];
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
      console.warn("------ I have the ball", i);
      winnerArray.push(true);
      cube._options.winner = true;
      createBall(cube);
    } else {
      winnerArray.push(false);
    }

    table.push(cube);
  }
  console.warn(winnerArray);
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
  console.warn("----- Ball ", ball.x, ball.y);
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

  for (let i = 1; i < table.length; i++) {
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

const shuffleCubes = () => {
  let cube1Idx = Math.floor(Math.random() * table.length);
  let cube2Idx = cube1Idx;
  while (cube1Idx === cube2Idx) {
    cube2Idx = Math.floor(Math.random() * table.length);
  }
  moveCubes(cube1Idx, cube2Idx);
};

const moveCubes = (cube1Idx, cube2Idx) => {
  console.warn(cube1Idx + " and " + cube2Idx);
  moving = true;
  ball.alpha = 0;
  let prevPosCube1 = {
    x: table[cube1Idx].instance.x,
    y: table[cube1Idx].instance.y,
  };
  let prevPosCube2 = {
    x: table[cube2Idx].instance.x,
    y: table[cube2Idx].instance.y,
  };

  gsap.fromTo(
    table[cube1Idx].instance,
    { x: table[cube1Idx].instance.x, y: table[cube1Idx].instance.y },
    {
      x: prevPosCube2.x,
      y: prevPosCube2.y,
      duration: speedTime,
      onComplete: onComplete,
    }
  );
  gsap.fromTo(
    table[cube2Idx].instance,
    { x: table[cube2Idx].instance.x, y: table[cube2Idx].instance.y },
    { x: prevPosCube1.x, y: prevPosCube1.y, duration: speedTime }
  );
  function onComplete() {
    let tempCube = table[cube1Idx];
    table[cube1Idx] = table[cube2Idx];
    table[cube2Idx] = tempCube;

    let tempWinner = winnerArray[cube1Idx];
    winnerArray[cube1Idx] = winnerArray[cube2Idx];
    winnerArray[cube2Idx] = tempWinner;
    console.warn(winnerArray);
    if (currentMoves < moves) {
      shuffleCubes();
      currentMoves++;
    } else {
      table.forEach((element, idx) => {
        console.warn("------ Final pos: ", idx, element._options.winner);
        createPressableCubes(element._options.winner, element.instance.y, idx);
      });
      table.forEach((element) => {
        element.remove();
      });
      moving = false;
    }
  }
};

const createPressableCubes = (newWinner, posY, idx) => {
  keyCube = new DxButton(
    URL_BUTTON,
    buttonMessage,
    {
      isClickable: true,
      controller: {
        isPressable: true,
        button: gamepadButtons[idx],
        x: 0,
        y: 160,
      },
      keyboard: {
        isPressable: true,
        button: `${idx + 1}`,
        x: 0,
        y: 160,
      },
      position: {
        x:
          DX_WIDTH / 2 -
          totalWidth / 2 +
          idx * (distanceBetweenCups + cupWidth) +
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

  if (keyCube._options.winner) {
    console.warn("------- winner cube", idx);
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
      resetScene();
      setTimeout(() => removeHUD(), 500);
      setTimeout(() => createChallengeSuccess(), 1000);
    } else {
      resetScene();
      setTimeout(() => removeHUD(), 500);
      setTimeout(() => createChallengeFail(), 1000);
    }
    // dixperPluginSample.onChallengeFinish();
    // console.log("rondas terminadas");
    // cementeryPanel.remove();
    // if (currentRounds < numberRounds) {
    //   currentRounds++;
    //   if (level === 1) {
    //     switch (currentRounds) {
    //       case 2:
    //         moves = initialMoves + 2;
    //         roundStart(3, moves, speedTime - 0.05);
    //         break;
    //       case 3:
    //         moves = initialMoves + 4;
    //         roundStart(3, moves, speedTime - 0.1);
    //         break;
    //       default:
    //         moves = initialMoves + 6;
    //         roundStart(3, moves, speedTime - 0.15);
    //         break;
    //     }
    //   } else if (level === 2) {
    //     switch (currentRounds) {
    //       case 2:
    //         roundStart(3, initialMoves + 2, speedTime - 0.1);
    //         break;
    //       case 3:
    //         roundStart(3, initialMoves + 4, speedTime - 0.2);
    //         break;
    //       default:
    //         roundStart(3, initialMoves + 6, speedTime - 0.3);
    //         break;
    //     }
    //   } else if (level === 3) {
    //     switch (currentRounds) {
    //       case 2:
    //         roundStart(5, initialMoves + 2, speedTime - 0.1);
    //         break;
    //       case 3:
    //         roundStart(5, initialMoves + 4, speedTime - 0.2);
    //         break;
    //       default:
    //         roundStart(5, initialMoves + 6, speedTime - 0.3);
    //         break;
    //     }
    //   } else if (level === 4) {
    //     switch (currentRounds) {
    //       case 2:
    //         roundStart(5, initialMoves + 2, speedTime - 0.1);
    //         break;
    //       case 3:
    //         roundStart(5, initialMoves + 4, speedTime - 0.2);
    //         break;
    //       default:
    //         roundStart(5, initialMoves + 6, speedTime - 0.3);
    //         break;
    //     }
    //   }
  }
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

const setQuantityRandomCubes = () => {
  const randomOption = Math.floor(Math.random() * 2);
  if (randomOption === 0) {
    numberCubes = 3;
  } else {
    numberCubes = 5;
  }
};
