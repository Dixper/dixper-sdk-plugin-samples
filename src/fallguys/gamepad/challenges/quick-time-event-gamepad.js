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
const sounds = [];

//INPUTS PARAMS
let challengeTitle,
  challengeTime,
  reminderTitle,
  topHUD,
  rightHUD,
  bottomHUD,
  leftHUD,
  onKeySub,
  reminder,
  initialScale = 0.25;

let currentIndex = 0,
  maxButtons,
  buttons = [];

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
// let buttonsModel = [
//   {
//     buttonSprite: 'circlePlay',
//     buttonKey: 45
//   },
// ]

// DIXPER SDK INJECTED CLASS

const dixperPluginSample = new DixperSDKLib({
  pixi: {
    enable: true,
    files: [...images, ...sprites, ...sounds],
  },
});

// INPUTS

dixperPluginSample.inputs$.subscribe((inputs) => {
  maxButtons = inputs.maxButtons || 5;
  challengeTitle = inputs.challengeTitle || "Quick Time Event!!!";
  challengeTime = inputs.challengeTime || 100000;
  reminderTitle =
    inputs.reminderTitle || "Press the correct keys in the correct order";
});

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
  if (maxButtons < 8) {
    dixperPluginSample.challengeFail();
  }

  reminder.remove();
  removeButtons();

  setTimeout(() => {
    dixperPluginSample.stopSkill();
  }, 3000);
};

const createHUD = () => {
  topHUD = new dxAnimatedElement(
    dixperPluginSample.pixi,
    "topHUD",
    dixperPluginSample.uiLayer,
    "",
    {
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
    }
  );

  bottomHUD = new dxAnimatedElement(
    dixperPluginSample.pixi,
    "bottomHUD",
    dixperPluginSample.uiLayer,
    "",
    {
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
    }
  );

  leftHUD = new dxAnimatedElement(
    dixperPluginSample.pixi,
    "leftHUD",
    dixperPluginSample.uiLayer,
    "",
    {
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
    }
  );

  rightHUD = new dxAnimatedElement(
    dixperPluginSample.pixi,
    "rightHUD",
    dixperPluginSample.uiLayer,
    "",
    {
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
    }
  );
};

const destroyHUD = () => {
  leftHUD.remove();
  topHUD.remove();
  rightHUD.remove();
  bottomHUD.remove();
};

const init = () => {
  generateButtons();
  createReminder();

  // GAMEPAD
  onKeySub = dixperPluginSample.onGamepadButtonPress$.subscribe(onGamepad);

  // KEYBOARD
  // onKeySub = dixperPluginSample.onKeyDown$.subscribe(onKeyboard);
};

const createReminder = () => {
  reminder = new dxPanel(
    dixperPluginSample.pixi,
    "reminder",
    dixperPluginSample.uiLayer,
    reminderTitle,
    {
      position: {
        x: 200,
        y: DX_HEIGHT / 2 - 100,
      },
      scale: {
        x: 0.5,
        y: 0.5,
      },
      animationSpeed: 0.5,
    }
  );
};

// -------------------------

const onGamepad = (event) => {
  console.log("button code", event.name);
  if (event.name === buttons[currentIndex].buttonKey) {
    const currentButton = buttons[currentIndex];
    currentButton.target.instance.alpha = 0.6;
    currentButton.target.instance.scale.x = 0.1;
    currentButton.target.instance.scale.y = 0.1;

    currentIndex++;

    if (currentIndex === buttons.length) {
      maxButtons++;
      removeButtons();
      if (maxButtons === 8) {
        dixperPluginSample.challengeSuccess();
      } else {
        setTimeout(() => generateButtons(), 500);
      }
    }
  } else {
    resetButtons();
  }
};

const onKeyboard = (event) => {
  console.log("keycode", event.keycode);
  if (event.keycode === buttons[currentIndex].buttonKey) {
    const currentButton = buttons[currentIndex];
    currentButton.instance.alpha = 0.2;
    currentButton.instance.scale.x = currentButton.instance.scale.x / 2;
    currentButton.instance.scale.y = currentButton.instance.scale.y / 2;

    currentIndex++;

    if (currentIndex === buttons.length) {
      dixperPluginSample.challengeSuccess();
    }
  } else {
    resetButtons();
  }
};

const generateButtons = () => {
  buttons = [];
  for (let index = 0; index < maxButtons; index++) {
    const buttonAux = getRandomButton();
    const button = {
      ...buttonAux,
      target: createButton(
        DX_WIDTH / 2 - (maxButtons / 2) * 100 + index * 120,
        DX_HEIGHT / 3,
        buttonAux.buttonSprite,
        buttonAux.buttonKey
      ),
    };
    buttons = [...buttons, button];
  }
};

const getRandomButton = () => {
  return buttonsModel[Math.floor(Math.random() * buttonsModel.length)];
};

const createButton = (x, y, sprite, key) => {
  return new dxButton(
    dixperPluginSample.pixi,
    sprite,
    dixperPluginSample.uiLayer,
    "",
    {
      position: {
        x,
        y,
      },
      scale: {
        x: initialScale,
        y: initialScale,
      },
      animationSpeed: 0.5,
    }
  );
};

const resetButtons = () => {
  buttons.forEach((button) => {
    button.target.instance.alpha = 1;
    button.target.instance.scale.x = initialScale;
    button.target.instance.scale.y = initialScale;
  });
  currentIndex = 0;
};

const removeButtons = () => {
  buttons.forEach((button) => {
    button.target.remove();
  });
  currentIndex = 0;
};
