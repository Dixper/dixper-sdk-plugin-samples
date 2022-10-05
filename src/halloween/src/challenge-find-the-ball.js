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
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/spritesheets/timer_v2.json",
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
    name: "newChallengeSuccess",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/spritesheets/win_challenge.json",
  },
  {
    name: "newChallengeFail",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/spritesheets/lose_challenge.json",
  },
  {
    name: "newChallengeSuccessSpanish",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/spritesheets/win_challenge_es.json",
  },
  {
    name: "newChallengeFailSpanish",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/spritesheets/lose_challenge_es.json",
  },
];

const sounds = [
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/sounds/You_Win_SFX.mp3",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/sounds/You_Loose_SFX.mp3",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/origin/halloween-skills-adri/src/halloween/assets/sounds/Mover-Tumba.mp3",
];

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
let assetFail, assetSuccess;
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
} = DX_INPUTS;

// INIT BUTTONS

const defaultButtonProps = {
  isClickable: true,
  scale: {
    x: 0.6,
    y: 0.6,
  },
  winner: false,
  position: {
    y: DX_HEIGHT / 2 + 100,
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
  const challengeSuccessSFX = PIXI.sound.Sound.from(sounds[0]);
  challengeSuccessSFX.play({ volume: 0.75 });

  panelChallengeSuccess = new dxPanel(
    DX_PIXI,
    assetSuccess,
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
  setTimeout(() => panelChallengeSuccess.remove(), 1500);
  setTimeout(() => dixperPluginSample.stopSkill(), 2500);
};

const createChallengeFail = () => {
  const challengeFailSFX = PIXI.sound.Sound.from(sounds[1]);
  challengeFailSFX.play({ volume: 0.75 });

  panelChallengeFail = new dxPanel(
    DX_PIXI,
    assetFail,
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
  setTimeout(() => panelChallengeFail.remove(), 1500);
  setTimeout(() => dixperPluginSample.stopSkill(), 2500);
};

const onChallengeAccepted = () => {
  createReminder();
  createTimer();
  init();
};

const createTimer = () => {
  const interval = 1000;

  timer = new dxTimer(
    DX_PIXI,
    "halloweenTime",
    DX_LAYERS.ui,
    challengeTime,
    interval,
    {
      position: {
        x: reminder._options.position.x,
        y: reminder._options.position.y + 75 * reminder._options.scale.y,
      },
      scale: {
        x: reminder._options.scale.x / 2,
        y: reminder._options.scale.y / 2,
      },
      animationSpeed: 0.5,
    }
  );
  timer.onTimerFinish = () => {
    removeHUD();
    setTimeout(() => createChallengeFail(), 1000);
    console.log("fin skill");
  };
};

const createReminder = () => {
  reminder = new dxPanel(
    DX_PIXI,
    "halloweenReminder",
    DX_LAYERS.ui,
    reminderTitle,
    {
      position: {
        x: 250,
        y: 300,
      },
      scale: {
        x: 0.8,
        y: 0.8,
      },
      animationSpeed: 0.5,
      text: {
        fontSize: 20,
        lineHeight: 20,
        strokeThickness: 0,
        dropShadowDistance: 0
      },
    }
  );
  console.log(reminder);
}


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
  if (DX_CONTEXT.language === "es") {
    assetFail = "newChallengeFailSpanish";
    assetSuccess = "newChallengeSuccessSpanish";

  } else {
    assetFail = "newChallengeFail";
    assetSuccess = "newChallengeSuccess";
  }

  setQuantityRandomCubes();
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
  ball.y = cube.instance.y + 350;
  ball.anchor.set(0.5);
  ball.zIndex = 0;
  ball.scale.x = 0.5;
  ball.scale.y = 0.5;

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
  const moveGraves = PIXI.sound.Sound.from(sounds[2]);
  moveGraves.play({ volume: 0.75 });

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
    moveGraves.stop();
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
        x: 0.6,
        y: 0.6,
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
  ball.alpha = 1;
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
      setTimeout(() => {
        keysCubeArray.forEach(element => {
          if (element._options.winner) {
            revealWinnerCube(element);
          }
        })
      }, 500);
    }
  }
};

const revealWinnerCube = (cubeRevealed) => {
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
    setTimeout(() => {
      removeHUD();
      resetScene();
    }, 500);
    setTimeout(() => createChallengeFail(), 1000);
  }
}

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
