const images = [
  {
    name: "runBar",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/fallguys/src/fallguys/assets/images/run-meter.png",
  },
];

const sprites = [
  {
    name: "sweat",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/fallguys/src/fallguys/assets/spritesheets/sweat-fallguys.json",
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

let onJoystickSub;
let onKeySub;
let countClick = 0;

// INPUTS PARAMS

let reminderTitle,
  runKey,
  clickKeys,
  incrementBar,
  incrementMax,
  challengeTitle,
  challengeTime,
  topHUD,
  bottomHUD,
  rightHUD,
  leftHUD,
  inputType,
  reminder,
  sweat,
  runBar,
  progressBar;

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
    inputs.challengeTitle || "YOU WILL BE ABLE TO RUN 1500 METERS";
  challengeTime = inputs.challengeTime || 100000;
  runKey = inputs.runKey || 17;
  incrementBar = inputs.incrementBar || 0.01;
  incrementMax = inputs.incrementMax || 0.9;
  reminderTitle = inputs.reminderTitle || "Run 1500 METERS!!!";
  inputType = inputs.inputType || "gamepad";
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
  if (sweat) {
    sweat.remove();
  }

  if (incrementBar >= incrementMax) {
    dixperPluginSample.challengeSuccess();
    if (inputType === "gamepad") {
      onJoystickSub.unsubscribe();
    }
    if (inputType === "keyboard") {
      onKeySub.unsubscribe();
    }
  } else {
    dixperPluginSample.challengeFail();
    if (inputType === "gamepad") {
      onJoystickSub.unsubscribe();
    }
    if (inputType === "keyboard") {
      onKeySub.unsubscribe();
    }
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
  leftHUD.remove();
  topHUD.remove();
  rightHUD.remove();
  bottomHUD.remove();
};

const init = () => {
  createReminder();
  const timestampUntilSkillFinish = dixperPluginSample.context.skillEnd;
  const millisecondsToFinish = timestampUntilSkillFinish - Date.now() - 3000;
  const interval = 1000;
  createProgressBar();
  createToxicBar();
  const onRunKeyboard = (event) => {
    console.log("event", event);
    if (runKey === event.keycode) {
      countClick++;
      if (countClick % 2 === 0 && incrementBar < incrementMax) {
        incrementBar += 0.0027;
      }
      if (countClick === 20) {
        createSweat();
      }
      createProgressBar();
      createToxicBar();
    }
  };

  const onJoystick = (event) => {
    console.log("joystick", event);
    if (event.position.x !== 0 || event.position.y !== 0) {
      countClick++;
      if (countClick % 5 === 0 && incrementBar < incrementMax) {
        incrementBar += 0.0033;
      }
      if (countClick === 100) {
        createSweat();
      }
      createProgressBar();
      createToxicBar();
    }
  };
  if (inputType === "gamepad") {
    onJoystickSub =
      dixperPluginSample.onGamepadJoystickMoveHold$.subscribe(onJoystick);
  }
  if (inputType === "keyboard") {
    onKeySub = dixperPluginSample.onKeyDown$.subscribe(onRunKeyboard);
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
  progressBar.beginFill(0x1ecd4c);
  progressBar.drawPolygon(coordinates);
  progressBar.endFill();

  dixperPluginSample.uiLayer.addChild(progressBar);
};

const createToxicBar = () => {
  runBar = new PIXI.Sprite.from(
    dixperPluginSample.pixi.resources.runBar.texture
  );
  runBar.x = DX_WIDTH / 2;
  runBar.y = 100;
  runBar.anchor.set(0.5);
  runBar.zIndex = 99;

  dixperPluginSample.uiLayer.addChild(runBar);
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

const createSweat = () => {
  sweat = new dxPanel(
    dixperPluginSample.pixi,
    "sweat",
    dixperPluginSample.uiLayer,
    "",
    {
      position: {
        x: DX_WIDTH / 2,
        y: DX_HEIGHT / 2 + 100,
      },
      scale: {
        x: 0.5,
        y: 0.5,
      },
      animationSpeed: 0.3,
    }
  );
};
