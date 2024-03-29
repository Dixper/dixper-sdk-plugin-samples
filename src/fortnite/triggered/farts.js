const images = [
  {
    name: "toxicBar",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/images/bar-toxic-progress-v2.png",
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

let onKeySub, onClickSub;
let countClick = 0;
let smoke;
let alpha = 0;
let randomSFX;

// INPUTS PARAMS

let clickKeys,
  actionKeys,
  alphaIncrease,
  alphaMax,
  reminderTitle,
  maxFartSize,
  minFartSize;

// DIXPER SDK INJECTED CLASS

const dixperPluginSample = new DixperSDKLib({
  pixi: {
    enable: true,
    files: [...images, ...sprites, ...sounds],
  },
});

// INPUTS

dixperPluginSample.inputs$.subscribe((inputs) => {
  clickKeys = inputs.clickKeys || [1, 2, 3];
  actionKeys = inputs.actionKeys || [15, 17, 29, 30, 31, 32, 42, 56, 57];
  alphaIncrease = inputs.alphaIncrease || 0.02;
  alphaMax = inputs.alphaMax || 0.9;
  reminderTitle = inputs.reminderTitle || "Que cene anoche???";
  maxFartSize = inputs.maxFartSize || 0.5;
  minFartSize = inputs.minFartSize || 0.2;
});

// PIXIJS INITILIZE

dixperPluginSample.onPixiLoad = () => {
  init();
  createReminder();
  const timestampUntilSkillFinish = dixperPluginSample.context.skillEnd;
  const millisecondsToFinish = timestampUntilSkillFinish - Date.now() - 3000;
  const interval = 1000;

  const timer = new dxTimer(
    dixperPluginSample.pixi,
    "timer",
    dixperPluginSample.uiLayer,
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
    onClickSub.unsubscribe();
    onKeySub.unsubscribe();
  };
};

const init = () => {
  createSmoke();
  createProgressBar();
  createToxicBar();
  onClickSub = dixperPluginSample.onMouseDown$.subscribe(onClick);
  onKeySub = dixperPluginSample.onKeyDown$.subscribe(onKeyboard);
};

const onClick = (event) => {
  if (clickKeys.includes(event.button)) {
    countClick++;
    if (countClick % 3 === 0) {
      createFarts(
        Math.floor(
          Math.random() * (DX_WIDTH / 2 - 50 - (DX_WIDTH / 2 - 280)) +
            (DX_WIDTH / 2 - 280)
        ),
        Math.floor(
          Math.random() * (DX_HEIGHT - 350 - (DX_HEIGHT - 200)) +
            (DX_HEIGHT - 200)
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
          Math.random() * (DX_WIDTH / 2 - 50 - (DX_WIDTH / 2 - 280)) +
            (DX_WIDTH / 2 - 280)
        ),
        Math.floor(
          Math.random() * (DX_HEIGHT - 300 - (DX_HEIGHT - 200)) +
            (DX_HEIGHT - 200)
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
  let farts = new dxAnimatedElement(
    dixperPluginSample.pixi,
    "farts",
    dixperPluginSample.uiLayer,
    "",
    {
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
    }
  );
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
  smoke.beginFill(0x16f5c1, 0);
  smoke.drawRect(0, 0, DX_WIDTH, DX_HEIGHT);
  smoke.endFill();

  dixperPluginSample.uiLayer.addChild(smoke);
};

const addSmoke = (alphaParam) => {
  if (alpha < alphaMax) {
    alpha += alphaParam;
    smoke.clear();
    smoke.beginFill(0x16f5c1, alpha);
    smoke.drawRect(0, 0, DX_WIDTH, DX_HEIGHT);
    smoke.endFill();
  }
};

const clearSmoke = () => {
  let clear = new dxAnimatedElement(
    dixperPluginSample.pixi,
    "clearSmoke",
    dixperPluginSample.uiLayer,
    "",
    {
      animationSpeed: 0.5,
      position: {
        x: DX_WIDTH / 2,
        y: DX_HEIGHT / 2,
      },
      scale: {
        x: 1.5,
        y: 1.5,
      },
    }
  );
};

const createProgressBar = () => {
  let progress = 105;
  //min 105 max 480
  const conversionNumber = 416;
  progress += alpha * conversionNumber;

  const DX = DX_WIDTH / 2 - 256;
  const DY = 57;

  const coordinates = [
    DX + 74,
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
  let progressBar = new PIXI.Graphics();
  progressBar.clear();
  progressBar.beginFill(0xea4e69);
  progressBar.drawPolygon(coordinates);
  progressBar.endFill();

  dixperPluginSample.uiLayer.addChild(progressBar);
};

const createToxicBar = () => {
  const toxicBar = new PIXI.Sprite.from(
    dixperPluginSample.pixi.resources.toxicBar.texture
  );
  toxicBar.x = DX_WIDTH / 2;
  toxicBar.y = 100;
  toxicBar.anchor.set(0.5);
  toxicBar.zIndex = 99;

  dixperPluginSample.uiLayer.addChild(toxicBar);
};

const createReminder = () => {
  const reminder = new dxPanel(
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
