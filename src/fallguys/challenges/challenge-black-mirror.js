const images = [];
const sprites = [
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

let cursor;
let mirror;

//INPUTS PARAMS
let topHUD, rightHUD, bottomHUD, leftHUD, reminder;

// DIXPER SDK INJECTED CLASS

const dixperPluginSample = new DixperSDKLib({
  pixi: {
    enable: true,
    files: [...images, ...sprites, ...sounds],
  },
});

// INPUTS

const {
  timeDark,
  timeLight,
  challengeTitle,
  challengeTime,
  reminderTitle,
  x,
  y,
} = DX_INPUTS;

// dixperPluginSample.inputs$.subscribe((inputs) => {
//   timeDark = inputs.timeDark || 1000;
//   timeLight = inputs.timeLight || 5000;
//   challengeTitle = inputs.challengeTitle || "Do you agree to play blind?";
//   challengeTime = inputs.challengeTime || 100000;
//   reminderTitle =
//     inputs.reminderTitle || "Every 5 seconds we turn off the lights";
// });

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
  dixperPluginSample.challengeSuccess();
  // dixperPluginSample.challengeFail();
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
  createBlackMirror();
  setTimeout(() => addBlackMirror(), 5000);
};

const createReminder = () => {
  reminder = new dxPanel(DX_PIXI, "reminder", DX_LAYERS.ui, reminderTitle, {
    position: DX_UTILS.transformRelativePosition(x, y),

    scale: {
      x: 0.5,
      y: 0.5,
    },
    animationSpeed: 0.5,
  });
};

const createBlackMirror = () => {
  mirror = new PIXI.Graphics();
  mirror.x = 0;
  mirror.y = 0;
  mirror.beginFill(0x1ecd4c, 0);
  mirror.drawRect(0, 0, DX_WIDTH, DX_HEIGHT);
  mirror.endFill();

  dixperPluginSample.uiLayer.addChild(mirror);
};

const addBlackMirror = () => {
  mirror.clear();
  mirror.beginFill(0x000000, 1);
  mirror.drawRect(0, 0, DX_WIDTH, DX_HEIGHT);
  mirror.endFill();
  setTimeout(() => removeBlackMirror(), timeDark);
};

const removeBlackMirror = () => {
  mirror.clear();
  mirror.beginFill(0x000000, 0);
  mirror.drawRect(0, 0, DX_WIDTH, DX_HEIGHT);
  mirror.endFill();
  setTimeout(() => addBlackMirror(), timeLight);
};
