const images = [
  {
    name: "ghostTimer",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/phasmophobia/src/phasmophobia/assets/images/Timer.png",
  },
];
const sprites = [
  {
    name: "ghostReminder",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/phasmophobia/src/phasmophobia/assets/spritesheets/phasmoReminder.json",
  },
  {
    name: "ghostSelect",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/phasmophobia/src/phasmophobia/assets/spritesheets/phasmoReminder.json",
  },
  {
    name: "timerPhasmo",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/phasmophobia/assets/spritesheets/phasmoTimer.json",
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

let titleSelector, leftOption, rightOption, onKeySub;
const enterKeycode = 28;
const scapeKeycode = 1;
const buttonPhasmo =
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/phasmophobia/src/phasmophobia/assets/images/phasmoReminder.png";

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
  if (DX_CONTEXT.language === "es") {
    acceptPhasmo =
      "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/phasmophobia/assets/images/aceptar_button.png";
    declinePhasmo =
      "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/phasmophobia/assets/images/rechazar_button.png";
  } else {
    acceptPhasmo =
      "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/phasmophobia/assets/images/accept_button.png";
    declinePhasmo =
      "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/phasmophobia/assets/images/decline_button.png";
  }
  createSelectors();
};

const init = () => {
  createTimer();
};

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

  titleSelector = new dxPanel(
    DX_PIXI,
    "ghostPanel",
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
      fontSize: 20,
      lineHeight: 23,
      strokeThickness: 0,
      dropShadowDistance: 0,
    },
  });

  rightOption = new DxButton(buttonPhasmo, OptionB, {
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
      fontSize: 20,
      lineHeight: 23,
      strokeThickness: 0,
      dropShadowDistance: 0,
    },
  });

  leftOption.start();
  rightOption.start();

  const optionAcceptted = (event) => {
    if (
      DX_CONTROLLER_TYPE &&
      event.name === leftOption._options.controller.button
    ) {
      console.log("---------------------------");
      //   dixperPluginSample.addParentSkill("SVtn4zeXfYkJa1Vg8sJG");
      dixperPluginSample.cursor.remove();
      leftOption.isInteractive = false;
      leftOption.remove();
      rightOption.isInteractive = false;
      rightOption._destroy();
      titleSelector.remove();
      init();
      createReminder(optionAReminder);
      if (onKeySub) {
        onKeySub.unsubscribe();
      }
    } else if (event.keycode === enterKeycode) {
      console.log("---------------------------");
      //   dixperPluginSample.addParentSkill("SVtn4zeXfYkJa1Vg8sJG");
      dixperPluginSample.cursor.remove();
      leftOption.isInteractive = false;
      leftOption.remove();
      rightOption.isInteractive = false;
      rightOption._destroy();
      titleSelector.remove();
      init();
      createReminder(optionAReminder);
      if (onKeySub) {
        onKeySub.unsubscribe();
      }
    } else if (
      DX_CONTROLLER_TYPE &&
      event.name === rightOption._options.controller.button
    ) {
      dixperPluginSample.cursor.remove();
      leftOption.isInteractive = false;
      leftOption._destroy();
      rightOption.isInteractive = false;
      rightOption.remove();
      titleSelector.remove();
      //keyblock
      console.log("---------------------------");
      //   dixperPluginSample.addParentSkill("rJWWQirem7nI85DMgwAL");
      init();
      createReminder(optionBReminder);
      if (onKeySub) {
        onKeySub.unsubscribe();
      }
    } else if (event.keycode === scapeKeycode) {
      dixperPluginSample.cursor.remove();
      leftOption.isInteractive = false;
      leftOption._destroy();
      rightOption.isInteractive = false;
      rightOption.remove();
      titleSelector.remove();
      //keyblock
      console.log("---------------------------");
      //   dixperPluginSample.addParentSkill("rJWWQirem7nI85DMgwAL");
      init();
      createReminder(optionBReminder);
      if (onKeySub) {
        onKeySub.unsubscribe();
      }
    }
  };

  if (DX_CONTROLLER_TYPE) {
    onKeySub =
      dixperPluginSample.onGamepadButtonPress$.subscribe(optionAcceptted);
  } else {
    onKeySub = dixperPluginSample.onKeyDown$.subscribe(optionAcceptted);
  }
};

const createReminder = (reminderTitle) => {
  const reminder = new dxPanel(
    DX_PIXI,
    "ghostReminder",
    DX_LAYERS.ui,
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
