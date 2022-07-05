const images = [];
const sprites = [
  {
    name: 'circlePlay',
    url: 'https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fallguys/assets/spritesheets/circle-play-pulsation.json',
  },
  {
    name: 'topHUD',
    url: 'https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/spritesheets/hud-top.json',
  },
  {
    name: 'rightHUD',
    url: 'https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/spritesheets/hud-right.json',
  },
  {
    name: 'bottomHUD',
    url: 'https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/spritesheets/hud-bottom.json',
  },
  {
    name: 'leftHUD',
    url: 'https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/spritesheets/hud-left.json',
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
  onKeySub;

let maxButtons,
  buttons = [],
  currentButtons = [];

// GAMEPAD
let buttonsModel = [
  {
    buttonSprite: 'circlePlay',
    buttonKey: 'FACE_1',
  },
];

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
  challengeTitle = inputs.challengeTitle || '';
  challengeTime = inputs.challengeTime || 100000;
  reminderTitle = inputs.reminderTitle || '';
});

// PIXIJS INITILIZE

dixperPluginSample.onPixiLoad = () => {
  dixperPluginSample.initChallenge(challengeTitle, challengeTime);
  createHUD();
};

// INIT CHALLENGE

dixperPluginSample.onChallengeAccepted = () => {
  destroyHUD();
  init();
};

dixperPluginSample.onChallengeRejected = () => {
  destroyHUD();
  dixperPluginSample.stopSkill();
};

dixperPluginSample.onChallengeFinish = () => {
  dixperPluginSample.challengeFail();
};

const createHUD = () => {
  topHUD = new dxAnimatedElement(
    dixperPluginSample.pixi,
    'topHUD',
    dixperPluginSample.uiLayer,
    '',
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
    'bottomHUD',
    dixperPluginSample.uiLayer,
    '',
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
    'leftHUD',
    dixperPluginSample.uiLayer,
    '',
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
    'rightHUD',
    dixperPluginSample.uiLayer,
    '',
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
  leftHUD._destroy();
  topHUD._destroy();
  rightHUD._destroy();
  bottomHUD._destroy();
};

const init = () => {
  createReminder();

  // GAMEPAD
  onKeySub = dixperPluginSample.onGamepadButtonPress$.subscribe(onGamepad);

  // KEYBOARD
  // onKeySub = dixperPluginSample.onKeyDown$.subscribe(onKeyboard);
};

const createReminder = () => {
  const reminder = new dxPanel(
    dixperPluginSample.pixi,
    'reminder',
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
  console.log('button code', event.name);
  if (event.name === currentButtons[0].buttonKey) {
    const currentButton = currentButtons.shift();
    currentButton.instance.alpha = 0.2;
    currentButton.instance.scale.x = currentButton.instance.scale.x / 2;
    currentButton.instance.scale.y = currentButton.instance.scale.y / 2;

    if (currentButtons.length === 0) {
      dixperPluginSample.challengeSuccess();
    }
  } else {
    resetButtons();
  }
};

const onKeyboard = (event) => {
  console.log('keycode', event.keycode);
  if (event.keycode === currentButtons[0].buttonKey) {
    const currentButton = currentButtons.shift();
    currentButton.instance.alpha = 0.2;
    currentButton.instance.scale.x = currentButton.instance.scale.x / 2;
    currentButton.instance.scale.y = currentButton.instance.scale.y / 2;

    if (currentButtons.length === 0) {
      dixperPluginSample.challengeSuccess();
    }
  } else {
    resetButtons();
  }
};

const generateButtons = () => {
  buttons = [];
  for (let index = 0; index < maxButtons; index++) {
    const button = {
      ...getRandomButton(),
      target: createButton(
        index * 100,
        100,
        button.buttonSprite,
        button.buttonKey
      ),
    };
    buttons = [...buttons, button];
  }
  currentButtons = buttons;
};

const getRandomButton = () => {
  return buttonsModel[Math.floor(Math.random() * buttonsModel.length)];
};

const createButton = (x, y, sprite, key) => {
  return new dxButton(
    dixperPluginSample.pixi,
    sprite,
    dixperPluginSample.uiLayer,
    '',
    {
      position: {
        x,
        y,
      },
      scale: {
        x: scaleTarget,
        y: scaleTarget,
      },
      animationSpeed: 0.5,
    }
  );
};

const resetButtons = () => {
  currentButtons = buttons;
  currentButtons.forEach((button) => {
    button.instance.alpha = 1;
    button.instance.scale.x = button.instance.scale.x * 2;
    button.instance.scale.y = button.instance.scale.y * 2;
  });
};
