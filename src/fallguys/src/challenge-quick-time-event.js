const images = [];
const sprites = [
  // {
  //   name: "aXbox",
  //   url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/fallguys/src/fallguys/assets/spritesheets/A-xbox.json",
  // },
  // {
  //   name: "bXbox",
  //   url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/fallguys/src/fallguys/assets/spritesheets/B-xbox.json",
  // },
  // {
  //   name: "downArrow",
  //   url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/fallguys/src/fallguys/assets/spritesheets/down-arrow.json",
  // },
  // {
  //   name: "LbXbox",
  //   url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/fallguys/src/fallguys/assets/spritesheets/LB-xbox.json",
  // },
  // {
  //   name: "leftArrow",
  //   url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/fallguys/src/fallguys/assets/spritesheets/left-arrow.json",
  // },
  // {
  //   name: "LtXbox",
  //   url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/fallguys/src/fallguys/assets/spritesheets/LT-xbox.json",
  // },
  // {
  //   name: "RbXbox",
  //   url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/fallguys/src/fallguys/assets/spritesheets/RB-xbox.json",
  // },
  // {
  //   name: "rightArrow",
  //   url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/fallguys/src/fallguys/assets/spritesheets/right-arrow.json",
  // },
  // {
  //   name: "RtXbox",
  //   url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/fallguys/src/fallguys/assets/spritesheets/RT-xbox.json",
  // },
  // {
  //   name: "upArrow",
  //   url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/fallguys/src/fallguys/assets/spritesheets/up-arrow.json",
  // },
  // {
  //   name: "XXbox",
  //   url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/fallguys/src/fallguys/assets/spritesheets/X-xbox.json",
  // },
  // {
  //   name: "YXbox",
  //   url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/fallguys/src/fallguys/assets/spritesheets/Y-xbox.json",
  // },
  // {
  //   name: "L1Play",
  //   url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/fallguys/src/fallguys/assets/spritesheets/L1-play.json",
  // },
  // {
  //   name: "circlePlay",
  //   url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/fallguys/src/fallguys/assets/spritesheets/circle-play.json",
  // },
  // {
  //   name: "L2Play",
  //   url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/fallguys/src/fallguys/assets/spritesheets/L2-play.json",
  // },
  // {
  //   name: "R1Play",
  //   url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/fallguys/src/fallguys/assets/spritesheets/R1-play.json",
  // },
  // {
  //   name: "R2Play",
  //   url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/fallguys/src/fallguys/assets/spritesheets/R2-play.json",
  // },
  // {
  //   name: "squarePlay",
  //   url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/fallguys/src/fallguys/assets/spritesheets/square-play.json",
  // },
  // {
  //   name: "trianglePlay",
  //   url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/fallguys/src/fallguys/assets/spritesheets/triangle-play.json",
  // },
  // {
  //   name: "XPlay",
  //   url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/fallguys/src/fallguys/assets/spritesheets/X-play.json",
  // },
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
let onKeySub,
  reminder,
  initialScale = 1,
  failsCount = 0,
  counterPanel,
  checkError = true;

let currentIndex = 0,
  buttons = [];

// GAMEPAD
let buttonsModel = [
  {
    buttonSprite: "aXbox",
    key: "FACE_1",
  },
  {
    buttonSprite: "bXbox",
    key: "FACE_2",
  },
  {
    buttonSprite: "YXbox",
    key: "FACE_4",
  },
  {
    buttonSprite: "XXbox",
    key: "FACE_3",
  },
  // {
  //   buttonSprite: "upArrow",
  //   key: "DPAD_UP",
  // },
  // {
  //   buttonSprite: "downArrow",
  //   key: "DPAD_DOWN",
  // },
  // {
  //   buttonSprite: "rightArrow",
  //   key: "DPAD_RIGHT",
  // },
  // {
  //   buttonSprite: "leftArrow",
  //   key: "DPAD_LEFT",
  // },
  {
    buttonSprite: "RbXbox",
    key: "RIGHT_SHOULDER",
  },
  {
    buttonSprite: "RtXbox",
    key: "RIGHT_SHOULDER_BOTTOM",
  },
  {
    buttonSprite: "LbXbox",
    key: "LEFT_SHOULDER",
  },
  {
    buttonSprite: "LtXbox",
    key: "LEFT_SHOULDER_BOTTOM",
  },
];
//// PLAY CONTROLLER
// [
//   {
//     buttonSprite: "circlePlay",
//     key: "FACE_1",
//   },
//   {
//     buttonSprite: "circlePlay",
//     key: "FACE_1",
//   },
//   {
//     buttonSprite: "circlePlay",
//     key: "FACE_1",
//   },
//   {
//     buttonSprite: "circlePlay",
//     key: "FACE_1",
//   },
//   {
//     buttonSprite: "circlePlay",
//     key: "FACE_1",
//   },
//   {
//     buttonSprite: "circlePlay",
//     key: "FACE_1",
//   },
//   {
//     buttonSprite: "circlePlay",
//     key: "FACE_1",
//   },
//   {
//     buttonSprite: "circlePlay",
//     key: "FACE_1",
//   },
// ];

// KEYBOARD
let keysModel = [
  {
    key: "Q",
    keyCode: 16,
  },
  {
    key: "W",
    keyCode: 17,
  },
  {
    key: "E",
    keyCode: 18,
  },
  {
    key: "R",
    keyCode: 19,
  },
  {
    key: "A",
    keyCode: 30,
  },
  {
    key: "S",
    keyCode: 31,
  },
  {
    key: "D",
    keyCode: 32,
  },
  {
    key: "F",
    keyCode: 33,
  },
  {
    key: "Z",
    keyCode: 44,
  },
  {
    key: "X",
    keyCode: 45,
  },
  {
    key: "C",
    keyCode: 46,
  },
  {
    key: "Tab",
    keyCode: 15,
  },
  {
    key: "Caps_Lock",
    keyCode: 58,
  },
  {
    key: "Shift",
    keyCode: 42,
  },
  {
    key: "Ctrl",
    keyCode: 29,
  },
  {
    key: "Space",
    keyCode: 57,
  },
];

// DIXPER SDK INJECTED CLASS

const dixperPluginSample = new DixperSDKLib({
  pixi: {
    enable: true,
    files: [...images, ...sprites, ...sounds],
  },
});

// INPUTS

const { maxButtons, failsMax, challengeTitle, challengeTime, reminderTitle } =
  DX_INPUTS;
let { quantityButtons } = DX_INPUTS;

// PIXIJS INITILIZE

dixperPluginSample.onPixiLoad = () => {
  dixperPluginSample.initChallenge(challengeTitle, challengeTime);
};

// INIT CHALLENGE

dixperPluginSample.onChallengeCountDown = () => {};

dixperPluginSample.onChallengeAccepted = () => {
  init();
};

dixperPluginSample.onChallengeRejected = () => {
  dixperPluginSample.stopSkill();
};

dixperPluginSample.onChallengeFinish = () => {
  reminder.remove();
  counterPanel.remove();
  removeButtons();
  if (onKeySub) {
    onKeySub.unsubscribe();
  }

  if (quantityButtons < maxButtons) {
    dixperPluginSample.challengeFail();

    setTimeout(
      () => dixperPluginSample.addParentSkill("zmwKfnd7vzV7HZ07uK3s"),
      2000
    );
  }
};

const init = () => {
  console.log(
    "DX_CONTROLLER TYPE---------------------------------",
    DX_CONTROLLER_TYPE
  );
  if (DX_CONTROLLER_TYPE) {
    onKeySub =
      dixperPluginSample.onGamepadButtonPress$.subscribe(onPressGamepad);
  } else {
    onKeySub = dixperPluginSample.onKeyDown$.subscribe(onPressKeyboard);
  }

  generateButtons();
  createReminder();
  createCounterPanel();
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

const onPressGamepad = (event) => {
  if (event.name === buttons[currentIndex].key) {
    successSFX.play({ volume: 0.5 });
    const currentButton = buttons[currentIndex];
    currentButton.target.instance.alpha = 0.6;
    currentButton.target.instance.scale.x =
      currentButton.target.instance.scale.x * 0.9;
    currentButton.target.instance.scale.y =
      currentButton.target.instance.scale.y * 0.9;
    currentIndex++;

    if (currentIndex === buttons.length) {
      quantityButtons++;
      removeButtons();
      if (quantityButtons === maxButtons) {
        dixperPluginSample.challengeSuccess();
        counterPanel.remove();
        if (onKeySub) {
          onKeySub.unsubscribe();
        }
        reminder.remove();
        setTimeout(() => dixperPluginSample.stopSkill(), 2000);
      } else {
        setTimeout(() => generateButtons(), 500);
      }
    }
  } else {
    // dixperPluginSample.addParentSkill("4NEQ1jRHBeNbgjfeREGt");
    if (checkError) {
      buttons.forEach((button) => {
        button.target.shake();
      });
      checkError = false;
      failSFX.play({ volume: 0.5 });
      resetButtons();
      failsCount++;
      counterPanel.incrementCount();
      if (failsCount >= failsMax) {
        reminder.remove();
        counterPanel.remove();
        removeButtons();
        if (onKeySub) {
          onKeySub.unsubscribe();
        }
        dixperPluginSample.challengeFinish();
      }
    }
  }
};

const onPressKeyboard = (event) => {
  if (event.keycode === buttons[currentIndex].keyCode) {
    successSFX.play({ volume: 0.5 });
    const currentButton = buttons[currentIndex];
    currentButton.target.instance.alpha = 0.6;
    currentButton.target.instance.scale.x =
      currentButton.target.instance.scale.x * 0.9;
    currentButton.target.instance.scale.y =
      currentButton.target.instance.scale.y * 0.9;

    currentIndex++;

    if (currentIndex === buttons.length) {
      quantityButtons++;
      removeButtons();
      if (quantityButtons === maxButtons) {
        dixperPluginSample.challengeSuccess();
        counterPanel.remove();
        if (onKeySub) {
          onKeySub.unsubscribe();
        }
        setTimeout(() => dixperPluginSample.stopSkill(), 2000);
      } else {
        setTimeout(() => generateButtons(), 500);
      }
    }
  } else {
    buttons.forEach((button) => {
      button.target.shake();
    });
    // dixperPluginSample.addParentSkill("4NEQ1jRHBeNbgjfeREGt");
    failSFX.play({ volume: 0.5 });
    resetButtons();
    failsCount++;
    counterPanel.incrementCount();
    if (failsCount >= failsMax) {
      if (onKeySub) {
        onKeySub.unsubscribe();
      }
      reminder.remove();
      counterPanel.remove();
      removeButtons();
      dixperPluginSample.challengeFinish();
    }
  }
};

const createCounterPanel = () => {
  counterPanel = new dxCounter(
    DX_PIXI,
    "panelSmall",
    DX_LAYERS.ui,
    0,
    failsMax,
    {
      position: {
        x: (3 * DX_WIDTH) / 4 - 100,
        y: 100,
      },
      animationSpeed: 0.5,
    }
  );
};

const generateButtons = () => {
  createQuickly();
  setTimeout(() => displayButtons(), 800);
};

const displayButtons = () => {
  buttons = [];
  for (let index = 0; index < quantityButtons; index++) {
    const buttonAux = getRandomButton();
    const button = {
      ...buttonAux,
      target: createButton(
        DX_WIDTH / 2 - (quantityButtons / 2) * 100 + index * 120,
        DX_HEIGHT / 3,
        buttonAux.key
      ),
    };
    buttons = [...buttons, button];
  }
};

const getRandomButton = () => {
  console.log(
    "DX_CONTROLLER TYPE---------------------------------",
    DX_CONTROLLER_TYPE
  );
  if (DX_CONTROLLER_TYPE) {
    return buttonsModel[Math.floor(Math.random() * buttonsModel.length)];
  }
  return keysModel[Math.floor(Math.random() * keysModel.length)];
};

const createButton = (x, y, key) => {
  const controller = new dxControllerButton(key, {
    position: {
      x,
      y,
    },
    scale: {
      x: initialScale,
      y: initialScale,
    },
  });
  controller.start();
  return controller;
};

const resetButtons = () => {
  buttons.forEach((button) => {
    button.target.instance.alpha = 1;
    button.target.instance.scale.x = initialScale;
    button.target.instance.scale.y = initialScale;
  });
  currentIndex = 0;
  checkError = true;
};

const removeButtons = () => {
  buttons.forEach((button) => {
    button.target.remove();
  });
  currentIndex = 0;
};

const createQuickly = () => {
  new dxCountDown(DX_PIXI, "countDown", DX_LAYERS.ui, 0, "QUICKLY", {
    position: {
      x: DX_WIDTH / 2,
      y: DX_HEIGHT / 2,
    },
    scale: {
      x: 0.25,
      y: 0.25,
    },
    animationSpeed: 0.5,
  });
};

const failSFX = PIXI.sound.Sound.from(sounds[1]);

const successSFX = PIXI.sound.Sound.from(sounds[0]);
