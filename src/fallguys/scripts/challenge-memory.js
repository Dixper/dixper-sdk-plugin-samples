const images = [];
const sprites = [
  {
    name: "circlePlay",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/fallguys/src/fallguys/assets/spritesheets/circle-play.json",
  },
  {
    name: "aXbox",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/fallguys/src/fallguys/assets/spritesheets/A-xbox.json",
  },
  {
    name: "bXbox",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/fallguys/src/fallguys/assets/spritesheets/B-xbox.json",
  },
  {
    name: "downArrow",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/fallguys/src/fallguys/assets/spritesheets/down-arrow.json",
  },
  {
    name: "L1Play",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/fallguys/src/fallguys/assets/spritesheets/L1-play.json",
  },
  {
    name: "L2Play",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/fallguys/src/fallguys/assets/spritesheets/L2-play.json",
  },
  {
    name: "LbXbox",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/fallguys/src/fallguys/assets/spritesheets/LB-xbox.json",
  },
  {
    name: "leftArrow",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/fallguys/src/fallguys/assets/spritesheets/left-arrow.json",
  },
  {
    name: "LtXbox",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/fallguys/src/fallguys/assets/spritesheets/LT-xbox.json",
  },
  {
    name: "R1Play",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/fallguys/src/fallguys/assets/spritesheets/R1-play.json",
  },
  {
    name: "R2Play",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/fallguys/src/fallguys/assets/spritesheets/R2-play.json",
  },
  {
    name: "RbXbox",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/fallguys/src/fallguys/assets/spritesheets/RB-xbox.json",
  },
  {
    name: "rightArrow",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/fallguys/src/fallguys/assets/spritesheets/right-arrow.json",
  },
  {
    name: "RtXbox",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/fallguys/src/fallguys/assets/spritesheets/RT-xbox.json",
  },
  {
    name: "squarePlay",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/fallguys/src/fallguys/assets/spritesheets/square-play.json",
  },
  {
    name: "trianglePlay",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/fallguys/src/fallguys/assets/spritesheets/triangle-play.json",
  },
  {
    name: "upArrow",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/fallguys/src/fallguys/assets/spritesheets/up-arrow.json",
  },
  {
    name: "XPlay",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/fallguys/src/fallguys/assets/spritesheets/X-play.json",
  },
  {
    name: "XXbox",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/fallguys/src/fallguys/assets/spritesheets/X-xbox.json",
  },
  {
    name: "YXbox",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/fallguys/src/fallguys/assets/spritesheets/Y-xbox.json",
  },
  {
    name: "topHUD",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/spritesheets/hud-top.json",
  },
  {
    name: "rightHUD",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/spritesheets/hud-right.json",
  },
  {
    name: "bottomHUD",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/spritesheets/hud-bottom.json",
  },
  {
    name: "leftHUD",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/spritesheets/hud-left.json",
  },
];
const sounds = [
  {
    name: "successInSound",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/fallguys/src/fallguys/assets/sounds/sfx-succes.mp3",
  },
  {
    name: "failInSound",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/fallguys/src/fallguys/assets/sounds/sfx-fail.mp3",
  },
];

//INPUTS PARAMS
let topHUD,
  rightHUD,
  bottomHUD,
  leftHUD,
  onKeySub,
  reminder,
  initialScale = 0.25,
  currentIndex = 0,
  buttons = [],
  initialNumber = 1;

// GAMEPAD
let buttonsModel = [
  {
    buttonSprite: "aXbox",
    buttonKey: "FACE_1",
  },
  {
    buttonSprite: "bXbox",
    buttonKey: "FACE_2",
  },
  {
    buttonSprite: "YXbox",
    buttonKey: "FACE_4",
  },
  {
    buttonSprite: "XXbox",
    buttonKey: "FACE_3",
  },
  {
    buttonSprite: "upArrow",
    buttonKey: "DPAD_UP",
  },
  {
    buttonSprite: "downArrow",
    buttonKey: "DPAD_DOWN",
  },
  {
    buttonSprite: "rightArrow",
    buttonKey: "DPAD_RIGHT",
  },
  {
    buttonSprite: "leftArrow",
    buttonKey: "DPAD_LEFT",
  },
  {
    buttonSprite: "RbXbox",
    buttonKey: "RIGHT_SHOULDER",
  },
  {
    buttonSprite: "RtXbox",
    buttonKey: "RIGHT_SHOULDER_BOTTOM",
  },
  {
    buttonSprite: "LbXbox",
    buttonKey: "LEFT_SHOULDER",
  },
  {
    buttonSprite: "LtXbox",
    buttonKey: "LEFT_SHOULDER_BOTTOM",
  },
];
//// PLAY CONTROLLER
// [
//   {
//     buttonSprite: "circlePlay",
//     buttonKey: "FACE_1",
//   },
//   {
//     buttonSprite: "circlePlay",
//     buttonKey: "FACE_1",
//   },
//   {
//     buttonSprite: "circlePlay",
//     buttonKey: "FACE_1",
//   },
//   {
//     buttonSprite: "circlePlay",
//     buttonKey: "FACE_1",
//   },
//   {
//     buttonSprite: "circlePlay",
//     buttonKey: "FACE_1",
//   },
//   {
//     buttonSprite: "circlePlay",
//     buttonKey: "FACE_1",
//   },
//   {
//     buttonSprite: "circlePlay",
//     buttonKey: "FACE_1",
//   },
//   {
//     buttonSprite: "circlePlay",
//     buttonKey: "FACE_1",
//   },
// ];

// KEYBOARD
// let keysModel = [
//   {
//     key: 'circlePlay',
//     buttonKey: 45
//   },
// ]
// [16 "Q",17 "W",18 "E",19 "R",20 "T",21 "Y",22 "U",23 'I',24 'O',25 "P",30 'A',31 "S",32 'D' ,33 'F',34 'G',35 'H',36 'J',37 'K',38 'L',44 'Z',45 'X',46 'C',47 'V',48 'B',49 'N',50 'M',15 'TAB',58 'MAYUS',42 'SHIFT' ,29 'CONTROL',56 'ALT' ,57 'SPACE'],

// DIXPER SDK INJECTED CLASS

const dixperPluginSample = new DixperSDKLib({
  pixi: {
    enable: true,
    files: [...images, ...sprites, ...sounds],
  },
});

// INPUTS

const {
  objetiveNumber,
  challengeTitle,
  challengeTime,
  reminderTitle,
  inputType,
} = DX_INPUTS;

// PIXIJS INITILIZE

dixperPluginSample.onPixiLoad = () => {
  dixperPluginSample.initChallenge(challengeTitle, challengeTime);
  createHUD();
};

// INIT CHALLENGE

dixperPluginSample.onChallengeCountDown = () => {
  destroyHUD();
};

dixperPluginSample.onChallengeAccepted = () => {
  init();
};

dixperPluginSample.onChallengeRejected = () => {
  destroyHUD();
  dixperPluginSample.stopSkill();
};

dixperPluginSample.onChallengeFinish = () => {
  reminder.remove();
  removeButtons();

  if (initialNumber !== objetiveNumber) {
    dixperPluginSample.challengeFail();
    setTimeout(
      () => dixperPluginSample.addParentSkill("KVW33uWFGZUcEgaVqO6d"),
      2000
    );
    setTimeout(() => dixperPluginSample.stopSkill(), 30000);
  }
};

const createHUD = () => {
  topHUD = new dxAnimatedElement(DX_PIXI, "topHUD", DX_LAYERS.ui, "", {
    animationSpeed: 0.5,
    position: {
      x: DX_WIDTH / 2,
      y: 140,
    },
    scale: {
      x: 1,
      y: 1,
    },
    zIndex: 99,
  });

  bottomHUD = new dxAnimatedElement(DX_PIXI, "bottomHUD", DX_LAYERS.ui, "", {
    animationSpeed: 0.5,
    position: {
      x: DX_WIDTH / 2,
      y: DX_HEIGHT - 90,
    },
    scale: {
      x: 1,
      y: 1,
    },
    zIndex: 80,
  });

  leftHUD = new dxAnimatedElement(DX_PIXI, "leftHUD", DX_LAYERS.ui, "", {
    animationSpeed: 0.5,
    position: {
      x: 195,
      y: DX_HEIGHT / 2,
    },
    scale: {
      x: 1,
      y: 1,
    },
    zIndex: 60,
  });

  rightHUD = new dxAnimatedElement(DX_PIXI, "rightHUD", DX_LAYERS.ui, "", {
    animationSpeed: 0.5,
    position: {
      x: DX_WIDTH - 160,
      y: DX_HEIGHT / 2,
    },
    scale: {
      x: 1,
      y: 1,
    },
    zIndex: 70,
  });
};

const destroyHUD = () => {
  leftHUD.remove();
  topHUD.remove();
  rightHUD.remove();
  bottomHUD.remove();
};

const init = () => {
  createReminder();
  generateButtons();
};

const createReminder = () => {
  reminder = new dxPanel(DX_PIXI, "reminder", DX_LAYERS.ui, reminderTitle, {
    position: {
      x: 200,
      y: DX_HEIGHT / 2 - 100,
    },
    scale: {
      x: 0.5,
      y: 0.5,
    },
    animationSpeed: 0.5,
  });
};

const onGamepad = (event) => {
  // console.log("button code", event.name);
  if (event.name === buttons[currentIndex].buttonKey) {
    successSFX.play({ volume: 0.5 });
    const currentButton = buttons[currentIndex];
    currentButton.target.instance.alpha = 1;

    currentIndex++;

    if (currentIndex === buttons.length) {
      onKeySub.unsubscribe();
      initialNumber++;
      removeButtons();
      if (initialNumber === objetiveNumber) {
        dixperPluginSample.challengeSuccess();
      } else {
        setTimeout(() => generateButtons(), 1000);
      }
    }
  } else {
    failSFX.play({ volume: 0.5 });
    dixperPluginSample.addParentSkill("4NEQ1jRHBeNbgjfeREGt");
    setTimeout(() => showButtons(), 1000);
    setTimeout(() => hideButtons(), 2500);
    currentIndex = 0;
  }
};

const onKeyboard = (event) => {
  console.log("keycode", event.keycode);
  if (event.keycode === buttons[currentIndex].buttonKey) {
    successFX.play({ volume: 0.5 });
    const currentButton = buttons[currentIndex];
    currentButton.instance.alpha = 1;

    currentIndex++;

    if (currentIndex === buttons.length) {
      onKeySub.unsubscribe();
      initialNumber++;
      removeButtons();
      if (initialNumber === objetiveNumber) {
        dixperPluginSample.challengeSuccess();
      } else {
        setTimeout(() => generateButtons(), 1000);
      }
    }
  } else {
    failSFX.play({ volume: 0.5 });
    dixperPluginSample.addParentSkill("4NEQ1jRHBeNbgjfeREGt");
    setTimeout(() => showButtons(), 1000);
    setTimeout(() => hideButtons(), 2500);
    currentIndex = 0;
  }
};

const generateButtons = () => {
  createMemorize();
  buttons = [];
  for (let index = 0; index < initialNumber; index++) {
    const buttonAux = getRandomButton();
    const button = {
      ...buttonAux,
      target: createButton(
        DX_WIDTH / 2 - (initialNumber / 2) * 100 + index * 120,
        DX_HEIGHT / 3,
        buttonAux.buttonSprite,
        buttonAux.buttonKey
      ),
    };
    buttons = [...buttons, button];
  }
  setTimeout(() => createYourTurn(), 2250);
  setTimeout(() => hideButtons(), 3000);
};

const getRandomButton = () => {
  return buttonsModel[Math.floor(Math.random() * buttonsModel.length)];
};

const createButton = (x, y, sprite, key) => {
  return new dxButton(DX_PIXI, sprite, DX_LAYERS.ui, "", {
    position: {
      x,
      y,
    },
    scale: {
      x: initialScale,
      y: initialScale,
    },
    animationSpeed: 0.5,
  });
};

const resetButtons = () => {
  onKeySub.unsubscribe();
  buttons.forEach((button) => {
    button.target.instance.alpha = 1;
    button.target.instance.scale.x = initialScale;
    button.target.instance.scale.y = initialScale;
  });
  currentIndex = 0;
};

const hideButtons = () => {
  activateKey();
  buttons.forEach((button) => {
    button.target.instance.alpha = 0;
  });
};

const showButtons = () => {
  onKeySub.unsubscribe();
  buttons.forEach((button) => {
    button.target.instance.alpha = 1;
  });
};

const removeButtons = () => {
  onKeySub.unsubscribe();
  buttons.forEach((button) => {
    button.target.remove();
  });
  currentIndex = 0;
};

const createMemorize = () => {
  const countdown = new dxCountDown(
    DX_PIXI,
    "countDown",
    DX_LAYERS.ui,
    0,
    "MEMORIZE",
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
};

const createYourTurn = () => {
  const countdown = new dxCountDown(
    DX_PIXI,
    "countDown",
    DX_LAYERS.ui,
    0,
    "YOUR TURN",
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
};

const activateKey = () => {
  if (inputType === "gamepad") {
    onKeySub = dixperPluginSample.onGamepadButtonPress$.subscribe(onGamepad);
  }
  if (inputType === "keyboard") {
    onKeySub = dixperPluginSample.onKeyDown$.subscribe(onKeyboard);
  }
};

const failSFX = PIXI.sound.Sound.from(sounds[1]);

const successSFX = PIXI.sound.Sound.from(sounds[0]);

// const createFail = () => {
//   console.log("fallaste");
//   const countdown = new dxCountDown(
//     DX_PIXI,
//     "countDown",
//     DX_LAYERS.ui,
//     0,
//     "YOU FAILED",
//     {
//       position: {
//         x: DX_WIDTH / 2,
//         y: DX_HEIGHT / 2,
//       },
//       scale: {
//         x: 0.25,
//         y: 0.25,
//       },
//       animationSpeed: 0.5,
//     }
//   );
// };

// const createSucces = () => {
//   console.log("siguiente");
//   const countdown = new dxCountDown(
//     DX_PIXI,
//     "countDown",
//     DX_LAYERS.ui,
//     0,
//     "NEXT",
//     {
//       position: {
//         x: DX_WIDTH / 2,
//         y: DX_HEIGHT / 2,
//       },
//       scale: {
//         x: 0.25,
//         y: 0.25,
//       },
//       animationSpeed: 0.5,
//     }
//   );
// };
