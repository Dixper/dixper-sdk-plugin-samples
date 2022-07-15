const images = [
  {
    name: "toxicBar",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/fallguys/src/fallguys/assets/images/farts-bar-fallguys.png",
  },
];
const sprites = [
  {
    name: "farts",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/spritesheets/farts.json",
  },
  {
    name: "clearSmoke",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/spritesheets/clear-smoke.json",
  },
];
const sounds = [
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/sounds/farts/FART1.mp3",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/sounds/farts/FART2.mp3",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/sounds/farts/FART4.mp3",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/sounds/farts/FART5.mp3",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/sounds/farts/FART6.mp3",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/sounds/farts/FART7.mp3",
];

let onKeySub;
let onJoystickSub;
let countClick = 0;
let smoke;
let alpha = 0;
let randomSFX;

// INPUTS PARAMS

let progressBar, reminder;

//GAMEPAD
let buttonsGamePad = [
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

const dixperPluginSample = new DixperSDKLib({
  pixi: {
    enable: true,
    files: [...images, ...sprites, ...sounds],
  },
});

// INPUTS

const {
  actionKeys,
  alphaIncrease,
  alphaMax,
  reminderTitle,
  maxFartSize,
  minFartSize,
} = DX_INPUTS;

// PIXIJS INITILIZE

dixperPluginSample.onPixiLoad = () => {
  init();
  createReminder();
  const timestampUntilSkillFinish = dixperPluginSample.context.skillEnd;
  const millisecondsToFinish = timestampUntilSkillFinish - Date.now() - 3000;
  const interval = 1000;

  const timer = new dxTimer(
    DX_PIXI,
    "timer",
    DX_LAYERS.ui,
    millisecondsToFinish,
    interval,
    {
      position: {
        x: (3 * DX_WIDTH) / 4,
        y: 100,
      },
      animationSpeed: 0.3,
      zIndex: 99,
    }
  );

  timer.onTimerStart = () => {};

  timer.onTimerFinish = () => {
    clearSmoke();
    onKeySub.unsubscribe();
    if (DX_CONTROLLER_TYPE) {
      onJoystickSub.unsubscribe();
    }
  };
};

const init = () => {
  createSmoke();
  createProgressBar();
  createToxicBar();
  console.log(
    "DX_CONTROLLER TYPE---------------------------------",
    DX_CONTROLLER_TYPE
  );
  if (DX_CONTROLLER_TYPE) {
    onKeySub = dixperPluginSample.onGamepadButtonPress$.subscribe(onGamepad);
    onJoystickSub =
      dixperPluginSample.onGamepadJoystickMoveStart$.subscribe(onJoystick);
  } else {
    onKeySub = dixperPluginSample.onKeyDown$.subscribe(onKeyboard);
  }
};

const onGamepad = (event) => {
  // console.log("button code", event.name);
  if (buttonsGamePad.includes(event.name)) {
    countClick++;
    if (countClick % 1 === 0) {
      createFarts(
        Math.floor(
          Math.random() * (DX_WIDTH / 2 + 40 - (DX_WIDTH / 2 - 40)) +
            (DX_WIDTH / 2 - 40)
        ),
        Math.floor(
          Math.random() * (DX_HEIGHT / 2 + 170 - (DX_HEIGHT / 2 + 70)) +
            (DX_HEIGHT / 2 + 70)
        ),
        Math.random() * (maxFartSize - minFartSize) + minFartSize,
        Math.floor(Math.random() * 6)
      );
    }
    addSmoke(alphaIncrease);
    createProgressBar();
    createToxicBar();
  }
};

const onJoystick = (event) => {
  // console.log("joystick", event);
  if (event.position.x !== 0 || event.position.y !== 0) {
    countClick++;
    if (countClick % 1 === 0) {
      createFarts(
        Math.floor(
          Math.random() * (DX_WIDTH / 2 + 40 - (DX_WIDTH / 2 - 40)) +
            (DX_WIDTH / 2 - 40)
        ),
        Math.floor(
          Math.random() * (DX_HEIGHT / 2 + 170 - (DX_HEIGHT / 2 + 70)) +
            (DX_HEIGHT / 2 + 70)
        ),
        Math.random() * (maxFartSize - minFartSize) + minFartSize,
        Math.floor(Math.random() * 6)
      );
    }
    addSmoke(alphaIncrease);
    createProgressBar();
    createToxicBar();
  }
};

const onKeyboard = (event) => {
  // console.log("keycode", event.keycode);
  if (actionKeys.includes(event.keycode) && !event.repeat) {
    countClick++;
    if (countClick % 1 === 0) {
      createFarts(
        Math.floor(
          Math.random() * (DX_WIDTH / 2 + 40 - (DX_WIDTH / 2 - 40)) +
            (DX_WIDTH / 2 - 40)
        ),
        Math.floor(
          Math.random() * (DX_HEIGHT / 2 + 170 - (DX_HEIGHT / 2 + 70)) +
            (DX_HEIGHT / 2 + 70)
        ),
        Math.random() * (maxFartSize - minFartSize) + minFartSize,
        Math.floor(Math.random() * 6)
      );
    }
    addSmoke(alphaIncrease);
    createProgressBar();
    createToxicBar();
  }
};

const createFarts = (posX, posY, size, randomSFX) => {
  let farts = new dxAnimatedElement(DX_PIXI, "farts", DX_LAYERS.ui, "", {
    animationSpeed: 0.5,
    position: {
      x: posX,
      y: posY,
    },
    scale: {
      x: size,
      y: size,
    },
    zIndex: 99,
  });
  farts.onInFinish = () => {
    farts._destroy();
  };

  const fartsSFX = PIXI.sound.Sound.from(sounds[randomSFX]);
  fartsSFX.play({ volume: 0.5 });
};

const createSmoke = () => {
  smoke = new PIXI.Graphics();
  smoke.x = 0;
  smoke.y = 0;
  smoke.beginFill(0x1ecd4c, 0);
  smoke.drawRect(0, 0, DX_WIDTH, DX_HEIGHT);
  smoke.endFill();

  DX_LAYERS.ui.addChild(smoke);
};

const addSmoke = (alphaParam) => {
  if (alpha < alphaMax) {
    alpha += alphaParam;
    smoke.clear();
    smoke.beginFill(0x1ecd4c, alpha);
    smoke.drawRect(0, 0, DX_WIDTH, DX_HEIGHT);
    smoke.endFill();
  }
};

const clearSmoke = () => {
  let clear = new dxAnimatedElement(DX_PIXI, "clearSmoke", DX_LAYERS.ui, "", {
    animationSpeed: 0.5,
    position: {
      x: DX_WIDTH / 2,
      y: DX_HEIGHT / 2,
    },
    scale: {
      x: 1.5,
      y: 1.5,
    },
  });
};

const createProgressBar = () => {
  let progress = 105;
  //min 105 max 480
  const conversionNumber = 416;
  progress += alpha * conversionNumber;
  const DX = DX_WIDTH / 2 - 256;
  const DY = 57;

  const coordinates = [
    DX + 69,
    DY + 21,
    DX + 93,
    DY + 11,
    DX + progress,
    DY + 11,
    DX + progress,
    DY + 65,
    DX + 105,
    DY + 63,
    DX + 70,
    DY + 21,
  ];
  progressBar = new PIXI.Graphics();
  progressBar.clear();
  progressBar.beginFill(0xea4e69);
  progressBar.drawPolygon(coordinates);
  progressBar.endFill();

  DX_LAYERS.ui.addChild(progressBar);
};

const createToxicBar = () => {
  const toxicBar = new PIXI.Sprite.from(DX_PIXI.resources.toxicBar.texture);
  toxicBar.x = DX_WIDTH / 2;
  toxicBar.y = 100;
  toxicBar.anchor.set(0.5);
  toxicBar.zIndex = 99;

  DX_LAYERS.ui.addChild(toxicBar);
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
