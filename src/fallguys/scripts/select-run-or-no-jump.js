const images = [];
const sprites = [
  {
    name: "selectorButton",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/spritesheets/button.json",
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
  {
    name: "targetInSound",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/sounds/target-appear.mp3",
  },
  {
    name: "targetOutSound",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/sounds/shot.mp3",
  },
  {
    name: "targetCounterInSound",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/sounds/counter-hit-in.mp3",
  },
  {
    name: "targetCounterOutSound",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/sounds/counter-hit-out.mp3",
  },
  {
    name: "targetCounterHitSound",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/sounds/counter-target-hit.mp3",
  },
];

let millisecondsToFinish;

// INPUTS PARAMS

let topHUD, rightHUD, bottomHUD, leftHUD;

// DIXPER SDK INJECTED CLASS

const dixperPluginSample = new DixperSDKLib({
  pixi: {
    enable: true,
    files: [...images, ...sprites, ...sounds],
  },
});

// INPUTS

const {
  optionA,
  optionAReminder,
  optionB,
  optionBReminder,
  jumpKey,
  reloadKey,
  selectorTitle,
  inputType,
} = DX_INPUTS;

// dixperPluginSample.inputs$.subscribe((inputs) => {
//   optionA = inputs.optionA || "!Reload";
//   optionAReminder = inputs.optionAReminder || "!Reload";
//   optionB = inputs.optionB || "!Jump";
//   optionBReminder = inputs.optionBReminder || "!Jump";
//   jumpKey = inputs.jumpKey || 32;
//   reloadKey = inputs.reloadKey || 82;
//   selectorTitle = inputs.selectorTitle || "Choose";
// });

// REMOTE

dixperPluginSample.onPixiLoad = () => {
  createSelectors();
  createHUD();
};

const init = () => {
  createTimer();
};

const createTimer = () => {
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
      animationSpeed: 0.5,
    }
  );

  timer.onTimerStart = () => {};

  timer.onTimerFinish = () => {};
};

const createSelectors = () => {
  dixperPluginSample.drawCursor();

  const titleSelector = new dxPanel(
    DX_PIXI,
    "challengeFrameCommunication",
    DX_LAYERS.ui,
    selectorTitle,
    {
      position: {
        x: DX_WIDTH / 2,
        y: 250,
      },
      scale: {
        x: 1,
        y: 1,
      },
      animationSpeed: 0.5,
    }
  );

  const reload = new dxButton(
    DX_PIXI,
    "selectorButton",
    DX_LAYERS.ui,
    optionA,
    {
      controller: { button: "FACE_1" },
      position: {
        x: DX_WIDTH / 2 - 185,
        y: 400,
      },
      scale: {
        x: 0.75,
        y: 0.75,
      },
      animationSpeed: 0.5,
      hitbox: [-175, -45, 175, -45, 175, 45, -175, 46],
    }
  );

  const jump = new dxButton(DX_PIXI, "selectorButton", DX_LAYERS.ui, optionB, {
    controller: { button: "FACE_2" },
    position: {
      x: DX_WIDTH / 2 + 185,
      y: 400,
    },
    scale: {
      x: 0.75,
      y: 0.75,
    },
    animationSpeed: 0.5,
    hitbox: [-175, -45, 175, -45, 175, 45, -175, 46],
  });

  reload.onClick = (event) => {
    millisecondsToFinish = dixperPluginSample.context.skillEnd - Date.now();
    dixperPluginSample.addParentSkill("SVtn4zeXfYkJa1Vg8sJG");
    dixperPluginSample.cursor.remove();
    reload.isInteractive = false;
    reload.remove();
    jump.isInteractive = false;
    jump.remove();
    titleSelector.remove();
    destroyHUD();
    init();
  };

  jump.onClick = (event) => {
    millisecondsToFinish = dixperPluginSample.context.skillEnd - Date.now();

    dixperPluginSample.cursor.remove();
    reload.isInteractive = false;
    reload.remove();
    jump.isInteractive = false;
    jump.remove();
    titleSelector.remove();
    destroyHUD();
    keyBlock(millisecondsToFinish, jumpKey);
    init();
    createReminder(optionBReminder);
  };
};

const createHUD = () => {
  topHUD = new dxAnimatedElement(DX_PIXI, "topHUD", DX_LAYERS.ui, "", {
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
  });

  bottomHUD = new dxAnimatedElement(DX_PIXI, "bottomHUD", DX_LAYERS.ui, "", {
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
  });

  leftHUD = new dxAnimatedElement(DX_PIXI, "leftHUD", DX_LAYERS.ui, "", {
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
  });

  rightHUD = new dxAnimatedElement(DX_PIXI, "rightHUD", DX_LAYERS.ui, "", {
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
  });
};

const destroyHUD = () => {
  leftHUD.remove();
  topHUD.remove();
  rightHUD.remove();
  bottomHUD.remove();
};
