const images = [];
const sprites = [
  {
    name: "phasmoSelect",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/phasmophobia/assets/spritesheets/challenge_title_phasmo.json",
  },
  {
    name: "reminderPhasmo",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/phasmophobia/assets/spritesheets/phasmoReminder.json",
  },
  {
    name: "timerPhasmo",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/phasmophobia/assets/spritesheets/phasmoTimer.json",
  },
  {
    name: "cursorPhasmo",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/spritesheets/halloween-cursor.json",
  },
];

const sounds = [
  //   {
  //     name: "targetInSound",
  //     url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/sounds/target-appear.mp3",
  //   },
  //   {
  //     name: "targetOutSound",
  //     url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/sounds/shot.mp3",
  //   },
  //   {
  //     name: "targetCounterInSound",
  //     url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/sounds/counter-hit-in.mp3",
  //   },
  //   {
  //     name: "targetCounterOutSound",
  //     url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/sounds/counter-hit-out.mp3",
  //   },
  //   {
  //     name: "targetCounterHitSound",
  //     url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/sounds/counter-target-hit.mp3",
  //   },
];

// INPUTS PARAMS

let mouse, reminder, titleSelector, leftOption, rightOption, onKeySub;
const enterKeycode = 28;
const scapeKeycode = 1;
const buttonPhasmo =
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/phasmophobia/assets/images/button.png";

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
  selectorTitle,
  durationSkill,
} = DX_INPUTS;

// REMOTE

dixperPluginSample.onPixiLoad = () => {
  // if (DX_CONTEXT.language === "es") {
  //   acceptPhasmo =
  //     "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/phasmophobia/assets/images/aceptar_button.png";
  //   declinePhasmo =
  //     "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/phasmophobia/assets/images/rechazar_button.png";
  // } else {
  //   acceptPhasmo =
  //     "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/phasmophobia/assets/images/accept_button.png";
  //   declinePhasmo =
  //     "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/phasmophobia/assets/images/decline_button.png";
  // }
  createSelectors();
  createPhasmoCursor();
};

const init = () => {};

const createTimer = () => {
  const interval = 1000;

  const timer = new dxTimer(
    DX_PIXI,
    "timerPhasmo",
    DX_LAYERS.ui,
    durationSkill,
    interval,
    {
      position: {
        x: reminder._options.position.x,
        y: reminder._options.position.y + 105 * reminder._options.scale.y + 5,
      },
      scale: {
        x: (3.75 * reminder._options.scale.x) / 4,
        y: (3.75 * reminder._options.scale.y) / 4,
      },
      animationSpeed: 0.5,
    }
  );

  timer.onTimerStart = () => {};

  timer.onTimerFinish = () => {};
};

const createSelectors = () => {
  titleSelector = new dxPanel(
    DX_PIXI,
    "phasmoSelect",
    DX_LAYERS.ui,
    selectorTitle,
    {
      position: {
        x: DX_WIDTH / 2,
        y: 250,
      },
      scale: {
        x: 0.5,
        y: 0.5,
      },
      animationSpeed: 0.5,
      text: {
        fontSize: 35,
        lineHeight: 36,
        strokeThickness: 1,
        dropShadowDistance: 4,
      },
    }
  );

  leftOption = new DxButton(buttonPhasmo, optionA, {
    isClickable: true,
    controller: {
      isPressable: true,
      button: "FACE_1",
      x: 0,
      y: 50,
    },
    keyboard: {
      isPressable: true,
      button: "Enter",
      x: 0,
      y: 50,
    },
    position: {
      x: DX_WIDTH / 2 - 185,
      y: 400,
    },
    scale: {
      x: 0.5,
      y: 0.5,
    },
    text: {
      fontSize: 26,
      strokeThickness: 1,
      dropShadowDistance: 3,
    },
  });

  rightOption = new DxButton(buttonPhasmo, optionB, {
    isClickable: true,
    controller: {
      isPressable: true,
      button: "FACE_2",
      x: 0,
      y: 50,
    },
    keyboard: {
      isPressable: true,
      button: "Esc",
      x: 0,
      y: 50,
    },
    position: {
      x: DX_WIDTH / 2 + 185,
      y: 400,
    },
    scale: {
      x: 0.5,
      y: 0.5,
    },
    text: {
      fontSize: 26,
      strokeThickness: 1,
      dropShadowDistance: 3,
    },
  });

  leftOption.start();
  rightOption.start();

  leftOption.onClick = (event) => {
    mouse.remove();
    leftOption.isInteractive = false;
    leftOption._destroy();
    rightOption.isInteractive = false;
    rightOption._destroy();
    titleSelector.remove();
    init();
    //   dixperPluginSample.addParentSkill("SVtn4zeXfYkJa1Vg8sJG");
    createReminder(optionAReminder);
    createTimer();
  };

  rightOption.onClick = () => {
    mouse.remove();
    leftOption.isInteractive = false;
    leftOption._destroy();
    rightOption.isInteractive = false;
    rightOption._destroy();
    titleSelector.remove();
    //   dixperPluginSample.addParentSkill("rJWWQirem7nI85DMgwAL");
    init();
    createReminder(optionBReminder);
    createTimer();
  };
};

const createReminder = (reminderTitle) => {
  reminder = new dxPanel(
    DX_PIXI,
    "reminderPhasmo",
    DX_LAYERS.ui,
    reminderTitle,
    {
      position: {
        x: 250,
        y: 300,
      },
      scale: {
        x: 0.5,
        y: 0.5,
      },
      animationSpeed: 0.5,
      text: {
        fontSize: 26,
        strokeThickness: 1,
        dropShadowDistance: 3,
      },
    }
  );
};

const createPhasmoCursor = () => {
  mouse = new dxCursor(DX_PIXI, "cursorPhasmo", DX_LAYERS.cursor, {
    parentLayer: DX_LAYERS.top,
    anchor: {
      x: 0.25,
      y: 0.25,
    },
  });
};
