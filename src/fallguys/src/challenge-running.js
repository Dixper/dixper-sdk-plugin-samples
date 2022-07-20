const images = [
  {
    name: "runBar",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/fallguys/src/fallguys/assets/images/running-bar.png",
  },
];

const sprites = [
  {
    name: "sweat",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/fallguys/src/fallguys/assets/spritesheets/sweat-fallguys.json",
  },
];
const sounds = [];

let onJoystickSub;
let onKeySub;
let countClick = 0;

// INPUTS PARAMS

let clickKeys, reminder, sweat, runBar, progressBar;

// DIXPER SDK INJECTED CLASS

const dixperPluginSample = new DixperSDKLib({
  pixi: {
    enable: true,
    files: [...images, ...sprites, ...sounds],
  },
});

// INPUTS

const { challengeTitle, challengeTime, runKey, incrementMax, reminderTitle } =
  DX_INPUTS;

let { incrementBar } = DX_INPUTS;

// PIXIJS INITILIZE

dixperPluginSample.onPixiLoad = () => {
  dixperPluginSample.initChallenge(challengeTitle, challengeTime);
};

// INIT CHALLENGE

dixperPluginSample.onChallengeAccepted = () => {
  init();
};

dixperPluginSample.onChallengeRejected = () => {
  dixperPluginSample.stopSkill();
};

dixperPluginSample.onChallengeFinish = () => {
  if (sweat) {
    sweat.remove();
  }
  progressBar.clear();
  runBar.destroy();
  reminder.remove();
  if (incrementBar >= incrementMax) {
    dixperPluginSample.challengeSuccess();
    setTimeout(() => dixperPluginSample.stopSkill(), 2000);
    if (DX_CONTROLLER_TYPE) {
      onJoystickSub.unsubscribe();
    } else {
      onKeySub.unsubscribe();
    }
  } else {
    dixperPluginSample.challengeFail();
    if (DX_CONTROLLER_TYPE) {
      onJoystickSub.unsubscribe();
    } else {
      onKeySub.unsubscribe();
    }
    setTimeout(
      () => dixperPluginSample.addParentSkill("zmwKfnd7vzV7HZ07uK3s"),
      2000
    );
  }
};

const init = () => {
  createReminder();
  const timestampUntilSkillFinish = dixperPluginSample.context.skillEnd;
  const millisecondsToFinish = timestampUntilSkillFinish - Date.now() - 3000;
  const interval = 1000;
  createProgressBar();
  createToxicBar();
  const onRunKeyboard = (event) => {
    // console.log("event", event);
    if (runKey === event.keycode) {
      countClick++;
      if (countClick % 2 === 0 && incrementBar < incrementMax) {
        incrementBar += 0.0025;
      }
      if (countClick === 20) {
        createSweat();
      }
      createProgressBar();
      createToxicBar();
    }
  };

  const onJoystick = (event) => {
    // console.log("joystick", event);
    if (event.position.x !== 0 || event.position.y !== 0) {
      countClick++;
      if (countClick % 5 === 0 && incrementBar < incrementMax) {
        incrementBar += 0.0028;
      }
      if (countClick === 100) {
        createSweat();
      }
      createProgressBar();
      createToxicBar();
    }
  };
  if (DX_CONTROLLER_TYPE) {
    onJoystickSub =
      dixperPluginSample.onGamepadJoystickMoveHold$.subscribe(onJoystick);
  } else {
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

  DX_LAYERS.ui.addChild(progressBar);
};

const createToxicBar = () => {
  runBar = new PIXI.Sprite.from(DX_PIXI.resources.runBar.texture);
  runBar.x = DX_WIDTH / 2;
  runBar.y = 100;
  runBar.anchor.set(0.5);
  runBar.zIndex = 99;

  DX_LAYERS.ui.addChild(runBar);
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

const createSweat = () => {
  sweat = new dxPanel(DX_PIXI, "sweat", DX_LAYERS.ui, "", {
    position: {
      x: DX_WIDTH / 2,
      y: DX_HEIGHT / 2 + 50,
    },
    scale: {
      x: 0.5,
      y: 0.5,
    },
    animationSpeed: 0.3,
  });
};
