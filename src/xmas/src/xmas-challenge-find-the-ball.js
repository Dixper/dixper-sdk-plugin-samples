const images = [];

const sprites = [
  {
    name: "cursorHalloween",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/spritesheets/halloween-cursor.json",
  },
  {
    name: "xmasFloor",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/xmas-andres/src/xmas/assets/spritesheets/snow-floor-small.json",
  },
  { 
    name: "xmasChallenge",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/xmas-andres/src/xmas/assets/spritesheets/challenge_desc.json",
  },
  {
    name: "xmasTime",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/xmas-andres/src/xmas/assets/spritesheets/Timer_alone.json",
  },
  {
    name: "xmasReminder",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/xmas-andres/src/xmas/assets/spritesheets/ReminderS_No_timer.json",
  },
  {
    name: "xmasBaseFloor",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/xmas-andres/src/xmas/assets/spritesheets/xmas-baseline.json",
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
  {
    name: "rewardTextPanel",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/xmas-andres/src/xmas/assets/spritesheets/2xPanel16.json",
  },
  {
    name: "rewardPanel",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/xmas-andres/src/xmas/assets/spritesheets/prize_counter.json",
  },
];

const sounds = [
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/sounds/You_Win_SFX.mp3",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/sounds/You_Loose_SFX.mp3",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/sounds/Mover-Tumba.mp3",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/sounds/soundforchallenge.mp3",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/sounds/xpwinning.wav",
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
let winnerArray = [];
let panelChallengeSuccess;
let panelChallengeFail;
let reminder;
let timer;
let cementeryPanel;
let assetFail, assetSuccess;
let timeoutArray = [];
let timeout = false;
const finalPositionTimer = -666;
let cursorPosSub;
let tolerance = 200;
let refresh = true;
let prevMouseX = 100;
let prevMouseY = 100;
let mouse;
let challengeSFX, gainXpSFX;
let getRewardPanel, getQuantityPanel;
let clickedChallenge = false;

const gamepadButtons = [
  "FACE_1",
  "FACE_2",
  "FACE_3",
  "FACE_4",
  "DPAD_UP",
  "DPAD_DOWN",
  "DPAD_RIGHT",
  "DPAD_LEFT",
  "RIGHT_SHOULDER",
  "RIGHT_SHOULDER_BOTTOM",
  "LEFT_SHOULDER",
  "LEFT_SHOULDER_BOTTOM",
  "DPAD_UP",
  "DPAD_DOWN",
  "DPAD_RIGHT",
  "DPAD_LEFT",
];

// DIXPER SDK INJECTED CLASS
const URL_BUTTON =
  "https://github.com/Dixper/dixper-sdk-plugin-samples/blob/xmas-andres/src/xmas/assets/images/Present.png?raw=true";

const buttonMessage = "";
const dixperPluginSample = new DixperSDKLib({
  pixi: {
    enable: true,
    files: [...images, ...sprites, ...sounds],
  },
});

// INPUTS

let {
  numberCubes,
  speedTime,
  moves,
  challengeTitle,
  challengeTime,
  reminderTitle,
  acceptButtonText,
  declineButtonText,
  textCountdown,
  xpToGain,
  getRewardText,
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
  createHalloweenCursor();
  createSoundsSFX();
  cursorPosSub = dixperPluginSample.onMouseMove$.subscribe(onMove);
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
  clearTimeouts();
};

const clearTimeouts = () => {
  console.log(timeoutArray.length);
  timeoutArray.forEach((element) => {
    clearTimeout(element);
    console.log("timeout id: " + element + " cleared");
  });
  dixperPluginSample.stopSkill();
};

dixperPluginSample.onChallengeFinish = () => {
  createChallengeFail();
};

const createSoundsSFX = () => {
  challengeSFX = PIXI.sound.Sound.from(sounds[3]);
  gainXpSFX = PIXI.sound.Sound.from(sounds[4]);
};

const createChallenge = () => {
  challengeSFX.play({ volume: 0.75 });
  titleChallengePanel = new dxPanel(
    DX_PIXI,
    "xmasChallenge",
    DX_LAYERS.ui,
    challengeTitle,
    {
      position: {
        x: DX_WIDTH / 2,
        y: 250,
      },
      scale: {
        x: 0.8,
        y: 0.8,
      },
      animationSpeed: 0.5,
      text: {
        fontSize: 35,
        lineHeight: 36,
        strokeThickness: 1,
        dropShadowDistance: 4,
      },
    }
  );

  acceptButton = new DxButton(
    "https://github.com/Dixper/dixper-sdk-plugin-samples/blob/main/src/xmas/assets/images/shared-assets/Accept_button_clear.png?raw=true",
    acceptButtonText,
    {
      isClickable: true,
      controller: {
        isPressable: true,
        button: "FACE_1",
        x: 0,
        y: 50,
      },
      keyboard: {
        isPressable: true,
        button: "Enter",
        text: {
          fontSize: 20,
        },
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
      text: {
        fontSize: 20,
        lineHeight: 23,
        strokeThickness: 0,
        dropShadowDistance: 0,
      },
    }
  );

  declineButton = new DxButton(
    "https://github.com/Dixper/dixper-sdk-plugin-samples/blob/main/src/xmas/assets/images/shared-assets/Decline_button_clear.png?raw=true",
    declineButtonText,
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
        button: "Esc",
        text: {
          fontSize: 20,
        },
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
      text: {
        fontSize: 20,
        lineHeight: 23,
        strokeThickness: 0,
        dropShadowDistance: 0,
      },
    }
  );

  halloweenPanel = new dxPanel(
    DX_PIXI,
    "xmasBaseFloor",
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
    if (!clickedChallenge) {
      clickedChallenge = true;
      removeChallenge();
      dixperPluginSample.initCountdown();
    }
  };
  declineButton.onClick = (event) => {
    if (!clickedChallenge) {
      clickedChallenge = true;
      dixperPluginSample.onChallengeRejected();
    }
  };
};

const createChallengeSuccess = async () => {
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
  let tempTimeout = setTimeout(() => panelChallengeSuccess.remove(), 1500);
  timeoutArray.push(tempTimeout);
};

const createChallengeFail = () => {
  const challengeFailSFX = PIXI.sound.Sound.from(sounds[1]);
  challengeFailSFX.play({ volume: 0.75 });

  panelChallengeFail = new dxPanel(DX_PIXI, assetFail, DX_LAYERS.top, "", {
    position: {
      x: DX_WIDTH / 2,
      y: DX_HEIGHT / 2,
    },
    scale: {
      x: 1,
      y: 1,
    },
    animationSpeed: 0.5,
  });
  removeHUD();
  let tempTimeout = setTimeout(() => panelChallengeFail.remove(), 1500);
  timeoutArray.push(tempTimeout);
  setTimeout(() => clearTimeouts(), 3000);
};

const onChallengeAccepted = () => {
  createHalloweenCursor();
  createReminder();
  createTimer();
  init();
};

const createTimer = () => {
  const interval = 1000;

  timer = new dxTimer(
    DX_PIXI,
    "xmasTime",
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
    console.log("fin skill");
    timeout = true;
    let tempTimeout = setTimeout(() => createChallengeFail(), 1000);
    timeoutArray.push(tempTimeout);
  };
};

const createReminder = () => {
  reminder = new dxPanel(
    DX_PIXI,
    "xmasReminder",
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
        dropShadowDistance: 0,
      },
    }
  );
  console.log(reminder);
};

const removeChallenge = () => {
  titleChallengePanel._destroy();
  acceptButton.remove();
  declineButton.remove();
  halloweenPanel._destroy();
};

const removeHUD = () => {
  if (!timeout) {
    timer.onTimerFinish = () => {};
    timer.remove();
  }
  resetScene();
  reminder.remove();
  cementeryPanel._destroy();
  timer.instance.x = finalPositionTimer;
};

const addXp = (gainXP) => {
  console.log("gainXP", gainXP);
  dixperPluginSample.addActions(
    JSON.stringify([
      {
        ttl: 10000,
        actions: [
          {
            inputKey: "crafting-game-xp-01",
            scope: "{{scope}}",
            key: "crafting-game-xp",
            metadata: {
              userId: "{{userId}}",
              craftingGameId: "{{craftingGameId}}",
              amount: "{{amount}}",
            },
            tt0: "{{tt0}}",
            ttl: "{{ttl}}",
          },
        ],
      },
    ]),
    {
      "scope||crafting-game-xp-01": "",
      "craftingGameId||crafting-game-xp-01": "j0HbMaT54gjJTJdsOYix",
      "amount||crafting-game-xp-01": gainXP,
      "tt0||crafting-game-xp-01": 0,
      "ttl||crafting-game-xp-01": 0,
    }
  );
};

const giveReward = () => {
  addXp(xpToGain);
  gainXpSFX.play({ volume: 0.75 });
  getRewardPanel = new dxPanel(
    DX_PIXI,
    "rewardTextPanel",
    DX_LAYERS.ui,
    getRewardText,
    {
      position: {
        x: DX_WIDTH / 2,
        y: 350,
      },
      scale: {
        x: 1,
        y: 1,
      },
      animationSpeed: 0.5,
      text: {
        fontSize: 20,
        lineHeight: 23,
        strokeThickness: 0,
        dropShadowDistance: 0,
      },
    }
  );
  getQuantityPanel = new dxPanel(
    DX_PIXI,
    "rewardPanel",
    DX_LAYERS.ui,
    `+${xpToGain} XP`,
    {
      position: {
        x: DX_WIDTH / 2,
        y: DX_HEIGHT / 2 + 50,
      },
      scale: {
        x: 1,
        y: 1,
      },
      animationSpeed: 0.5,
      text: {
        fontSize: 20,
        lineHeight: 23,
        strokeThickness: 0,
        dropShadowDistance: 0,
      },
    }
  );
};

const clearReward = () => {
  getRewardPanel.remove();
  getQuantityPanel.remove();
};

const init = () => {
  if (DX_CONTEXT.language === "es") {
    assetFail = "newChallengeFailSpanish";
    assetSuccess = "newChallengeSuccessSpanish";
  } else {
    assetFail = "newChallengeFail";
    assetSuccess = "newChallengeSuccess";
  }

  //setQuantityRandomCubes();
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
      winnerArray.push(true);
      cube._options.winner = true;
      createBall(cube);
    } else {
      winnerArray.push(false);
    }

    table.push(cube);
  }
};

const createBall = (cube) => {
  ball = new PIXI.Sprite.from(
    "https://github.com/Dixper/dixper-sdk-plugin-samples/blob/xmas-andres/src/xmas/assets/images/xmas_ball.png?raw=true"
  );
  ball.x = cube.instance.x;
  ball.y = cube.instance.y + 350;
  ball.anchor.set(0.5);
  ball.zIndex = 0;
  ball.scale.x = 0.5;
  ball.scale.y = 0.5;

  DX_LAYERS.ui.addChild(ball);
};

const hideBall = () => {
  moving = true;
  gsap.fromTo(
    table[0].instance,
    { x: table[0].instance.x, y: table[0].instance.y },
    {
      x: table[0].instance.x,
      y: table[0].instance.y + 250,
      duration: 3,
      onComplete: onComplete,
    }
  );

  for (let i = 1; i < table.length; i++) {
    gsap.fromTo(
      table[i].instance,
      { x: table[i].instance.x, y: table[i].instance.y },
      { x: table[i].instance.x, y: table[i].instance.y + 250, duration: 3 }
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
    if (currentMoves < moves) {
      shuffleCubes();
      currentMoves++;
    } else {
      table.forEach((element, idx) => {
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
      removeHUD();
      createChallengeSuccess();

      let tempTimeout = setTimeout(() => {
        giveReward();
        gainXpSFX.play({ volume: 0.75 });
        setTimeout(() => clearTimeouts(), 4000);
      }, 3000);
      timeoutArray.push(tempTimeout);
      tempTimeout = setTimeout(() => clearReward(), 7000);
      timeoutArray.push(tempTimeout);
    } else {
      let tempTimeout = setTimeout(() => {
        keysCubeArray.forEach((element) => {
          if (element._options.winner) {
            revealWinnerCube(element);
          }
        });
      }, 500);
      timeoutArray.push(tempTimeout);
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
    let tempTimeout = setTimeout(() => createChallengeFail(), 1000);
    timeoutArray.push(tempTimeout);
  }
};

const createFloor = () => {
  cementeryPanel = new dxPanel(DX_PIXI, "xmasFloor", DX_LAYERS.ui, "", {
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
  const randomOption = getRandomNumBetween2Num(1, 5);
  numberCubes = randomOption;
};

const getRandomNumBetween2Num = (min = 5, max = 11) => {
  let diff = max - min;
  let rand = Math.floor(Math.random() * diff) + min;
  console.log("CLICKS TO BREAK: ", rand);
  return rand;
};

const onMove = (event) => {
  if (refresh) {
    refresh = false;
    setTimeout(() => {
      checkMove(event);
    }, 1000);
  }
};

const checkMove = (event) => {
  console.log("-------------------", mouse);
  if (
    tolerance > Math.abs(event.x - prevMouseX) &&
    tolerance > Math.abs(event.y - prevMouseY)
  ) {
    mouse.instance.alpha = 0;
  } else {
    mouse.instance.alpha = 1;
  }
  prevMouseX = event.x;
  prevMouseY = event.y;
};

const createHalloweenCursor = () => {
  mouse = new dxCursor(DX_PIXI, "cursorHalloween", DX_LAYERS.cursor, {
    parentLayer: DX_LAYERS.top,
    anchor: {
      x: 0.25,
      y: 0.25,
    },
  });
  refresh = true;
};
