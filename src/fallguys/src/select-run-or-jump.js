const images = [];
const sprites = [
  {
    name: "selectorButton",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/spritesheets/button.json",
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

let leftOption, rightOption, onKeySub;
const enterKeycode = 28;
const spaceKeycode = 57;

// DIXPER SDK INJECTED CLASS

const dixperPluginSample = new DixperSDKLib({
  pixi: {
    enable: true,
    files: [...images, ...sprites, ...sounds],
  },
});

// INPUTS

const { optionA, optionAReminder, optionB, optionBReminder, selectorTitle } =
  DX_INPUTS;

// REMOTE

dixperPluginSample.onPixiLoad = () => {
  createSelectors();
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

  if (DX_CONTROLLER_TYPE) {
    const createLeftOption = () => {
      leftOption = new dxButton(
        DX_PIXI,
        "selectorButton",
        DX_LAYERS.ui,
        optionA,
        {
          controller: { button: "FACE_1", type: DX_CONTROLLER_TYPE },
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
      return leftOption;
    };
    const createRightOption = () => {
      rightOption = new dxButton(
        DX_PIXI,
        "selectorButton",
        DX_LAYERS.ui,
        optionB,
        {
          controller: { button: "FACE_2", type: DX_CONTROLLER_TYPE },
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
        }
      );
      return rightOption;
    };
    createLeftOption();
    createRightOption();
  } else {
    const createLeftOption = () => {
      leftOption = new dxButton(
        DX_PIXI,
        "selectorButton",
        DX_LAYERS.ui,
        optionA,
        {
          controller: { button: "Enter", type: "keyboard" },
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
      return leftOption;
    };
    const createRightOption = () => {
      rightOption = new dxButton(
        DX_PIXI,
        "selectorButton",
        DX_LAYERS.ui,
        optionB,
        {
          controller: { button: "Space", type: "keyboard" },
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
        }
      );
      return rightOption;
    };
    createLeftOption();
    createRightOption();
  }

  const optionAcceptted = (event) => {
    if (
      DX_CONTROLLER_TYPE &&
      event.name === leftOption._options.controller.button
    ) {
      millisecondsToFinish = dixperPluginSample.context.skillEnd - Date.now();
      //keyblock run
      dixperPluginSample.addParentSkill("OORLt4mIf26FfEnakAwr");
      console.log("correr sin parar------------------");
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
      millisecondsToFinish = dixperPluginSample.context.skillEnd - Date.now();
      //keyblock run
      dixperPluginSample.addParentSkill("OORLt4mIf26FfEnakAwr");
      console.log("correr sin parar------------------");
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
      millisecondsToFinish = dixperPluginSample.context.skillEnd - Date.now();
      //keyblock jump
      dixperPluginSample.addParentSkill("kWkKb2CTDXEv1Nl2Ohwk");
      console.log("salta sin parar------------------");
      dixperPluginSample.cursor.remove();
      leftOption.isInteractive = false;
      leftOption._destroy();
      rightOption.isInteractive = false;
      rightOption.remove();
      titleSelector.remove();
      init();
      createReminder(optionBReminder);
      if (onKeySub) {
        onKeySub.unsubscribe();
      }
    } else if (event.keycode === spaceKeycode) {
      millisecondsToFinish = dixperPluginSample.context.skillEnd - Date.now();
      //keyblock jump
      dixperPluginSample.addParentSkill("kWkKb2CTDXEv1Nl2Ohwk");
      console.log("salta sin parar------------------");
      dixperPluginSample.cursor.remove();
      leftOption.isInteractive = false;
      leftOption._destroy();
      rightOption.isInteractive = false;
      rightOption.remove();
      titleSelector.remove();
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
    "reminder",
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
