const images = [];
const sprites = [];
const sounds = [
  {
    name: "successInSound",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fallguys/assets/sounds/sfx-succes.mp3",
  },
  {
    name: "failInSound",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fallguys/assets/sounds/sfx-fail.mp3",
  },
];

//INPUTS PARAMS
let onKeySub,
  reminder,
  initialScale = 1,
  currentIndex = 0,
  buttons = [],
  checkError = true;

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
  // {
  //   key: "Tab",
  //   keyCode: 15,
  // },
  // {
  //   key: "Caps_Lock",
  //   keyCode: 58,
  // },
  // {
  //   key: "Shift",
  //   keyCode: 42,
  // },
  {
    key: "Ctrl",
    keyCode: 29,
  },
  {
    key: "Space",
    keyCode: 57,
  },
  {
    key: "Q",
    keyCode: 16,
  },
];
// [17 "W",18 "E",19 "R",20 "T",21 "Y",22 "U",23 'I',24 'O',25 "P",30 'A',31 "S",32 'D' ,33 'F',34 'G',35 'H',36 'J',37 'K',38 'L',44 'Z',45 'X',46 'C',47 'V',48 'B',49 'N',50 'M',15 'TAB',58 'MAYUS',42 'SHIFT' ,29 'CONTROL',56 'ALT' ,57 'SPACE'],

// DIXPER SDK INJECTED CLASS

const dixperPluginSample = new DixperSDKLib({
  pixi: {
    enable: true,
    files: [...images, ...sprites, ...sounds],
  },
});

// INPUTS

const { objetiveNumber, challengeTitle, challengeTime, reminderTitle } =
  DX_INPUTS;

let { initialNumber } = DX_INPUTS;

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
  removeButtons();

  if (initialNumber !== objetiveNumber) {
    dixperPluginSample.challengeFail();
    setTimeout(
      () => dixperPluginSample.addParentSkill("zmwKfnd7vzV7HZ07uK3s"),
      2000
    );
  }
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

const onPressGamepad = (event) => {
  if (event.name === buttons[currentIndex].key) {
    successSFX.play({ volume: 0.5 });
    const currentButton = buttons[currentIndex];
    currentButton.target.instance.alpha = 1;

    currentIndex++;

    if (currentIndex === buttons.length) {
      if (onKeySub) {
        onKeySub.unsubscribe();
      }
      initialNumber++;
      setTimeout(() => removeButtons(), 500);
      if (initialNumber === objetiveNumber) {
        dixperPluginSample.challengeSuccess();
        setTimeout(() => dixperPluginSample.stopSkill(), 2000);
      } else {
        setTimeout(() => generateButtons(), 1000);
      }
    }
  } else {
    if (checkError) {
      checkError = false;
      failSFX.play({ volume: 0.5 });
      // dixperPluginSample.addParentSkill("4NEQ1jRHBeNbgjfeREGt");
      setTimeout(() => showButtons(), 1000);
      setTimeout(() => hideButtons(), 2500);
      currentIndex = 0;
    }
  }
};

const onPressKeyboard = (event) => {
  if (event.keycode === buttons[currentIndex].keyCode) {
    successSFX.play({ volume: 0.5 });
    const currentButton = buttons[currentIndex];
    currentButton.target.instance.alpha = 1;

    currentIndex++;

    if (currentIndex === buttons.length) {
      if (onKeySub) {
        onKeySub.unsubscribe();
      }
      initialNumber++;
      setTimeout(() => removeButtons(), 500);
      if (initialNumber === objetiveNumber) {
        dixperPluginSample.challengeSuccess();
        setTimeout(() => dixperPluginSample.stopSkill(), 2000);
      } else {
        setTimeout(() => generateButtons(), 1000);
      }
    }
  } else {
    if (checkError) {
      checkError = false;
      failSFX.play({ volume: 0.5 });
      // dixperPluginSample.addParentSkill("4NEQ1jRHBeNbgjfeREGt");
      setTimeout(() => showButtons(), 1000);
      setTimeout(() => hideButtons(), 2500);
      currentIndex = 0;
    }
  }
};

const generateButtons = () => {
  createMemorize();
  setTimeout(() => createAreYouReady(), 1000);
  buttons = [];
  for (let index = 0; index < initialNumber; index++) {
    const buttonAux = getRandomButton();
    const button = {
      ...buttonAux,
      target: createButton(
        DX_WIDTH / 2 - (initialNumber / 2) * 100 + index * 120,
        DX_HEIGHT / 3,
        buttonAux.key
      ),
    };
    buttons = [...buttons, button];
  }
  setTimeout(() => createYourTurn(), 2250);
  setTimeout(() => hideButtons(), 3000);
};

const getRandomButton = () => {
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
  if (onKeySub) {
    onKeySub.unsubscribe();
  }
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
  checkError = true;
};

const showButtons = () => {
  if (onKeySub) {
    onKeySub.unsubscribe();
  }
  buttons.forEach((button) => {
    button.target.instance.alpha = 1;
  });
};

const removeButtons = () => {
  if (onKeySub) {
    onKeySub.unsubscribe();
  }
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

const createAreYouReady = () => {
  const countdown = new dxCountDown(
    DX_PIXI,
    "countDown",
    DX_LAYERS.ui,
    0,
    "ARE YOU READY???",
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
  if (DX_CONTROLLER_TYPE) {
    onKeySub =
      dixperPluginSample.onGamepadButtonPress$.subscribe(onPressGamepad);
  } else {
    onKeySub = dixperPluginSample.onKeyDown$.subscribe(onPressKeyboard);
  }
};

const failSFX = PIXI.sound.Sound.from(sounds[1]);

const successSFX = PIXI.sound.Sound.from(sounds[0]);
