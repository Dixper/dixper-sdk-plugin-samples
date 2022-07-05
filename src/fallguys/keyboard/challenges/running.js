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
    name: "sweat",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fallguys/assets/spritesheets/sweat-fallguys.json",
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
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/sounds/farts/FART1.mp3",
];

let onKeySub;
let countClick = 0;
let progressBar;

// INPUTS PARAMS

let reminderTitle,
  actionKeys,
  clickKeys,
  incrementBar,
  incrementMax,
  challengeTitle,
  challengeTime,
  topHUD,
  bottomHUD,
  rightHUD,
  leftHUD;

// DIXPER SDK INJECTED CLASS

const dixperPluginSample = new DixperSDKLib({
  pixi: {
    enable: true,
    files: [...images, ...sprites, ...sounds],
  },
});

// INPUTS

dixperPluginSample.inputs$.subscribe((inputs) => {
  challengeTitle =
    inputs.challengeTitle || "Hasta donde seras capaz de llegar???";
  challengeTime = inputs.challengeTime || 100000;
  actionKeys = inputs.actionKeys || 17;
  incrementBar = inputs.incrementBar || 0.01;
  incrementMax = inputs.incrementMax || 0.9;
  reminderTitle = inputs.reminderTitle || "Run 500 yards!!!";
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
  if (incrementBar >= incrementMax) {
    dixperPluginSample.challengeSuccess();
    onKeySub.unsubscribe();
  } else {
    dixperPluginSample.challengeFail();
  }
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
  leftHUD._destroy();
  topHUD._destroy();
  rightHUD._destroy();
  bottomHUD._destroy();
};

const init = () => {
  createReminder();
  const timestampUntilSkillFinish = dixperPluginSample.context.skillEnd;
  const millisecondsToFinish = timestampUntilSkillFinish - Date.now() - 3000;
  const interval = 1000;

  createProgressBar();
  createToxicBar();
  onKeySub = dixperPluginSample.onKeyDown$.subscribe(onKeyboard);
};

const onKeyboard = (event) => {
  // console.log("keycode", event.keycode);
  if (actionKeys === event.keycode) {
    countClick++;
    if (countClick % 2 === 0 && incrementBar < incrementMax) {
      incrementBar += 0.005;
    }
    createProgressBar();
    createToxicBar();
    createSweat();
  }
};

const createProgressBar = () => {
  let progress = 105;
  //min 105 max 480
  const conversionNumber = 416;
  progress += incrementBar * conversionNumber;
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

const createSweat = () => {
  const sweat = new dxPanel(
    dixperPluginSample.pixi,
    "sweat",
    dixperPluginSample.uiLayer,
    "",
    {
      position: {
        x: DX_WIDTH / 2,
        y: DX_HEIGHT / 2,
      },
    }
  );
};
