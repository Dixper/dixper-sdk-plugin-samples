const images = [];
const sprites = [
  {
    name: "selectorButton",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/spritesheets/button.json",
  },
];

const sounds = [];

let millisecondsToFinish;

// INPUTS PARAMS

let optionA,
  optionAReminder,
  optionB,
  optionBReminder,
  reloadKey,
  jumpKey,
  selectorTitle,
  topHUD,
  rightHUD,
  bottomHUD,
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
  optionA = inputs.optionA || "!Reload";
  optionAReminder = inputs.optionAReminder || "!Reload";
  optionB = inputs.optionB || "!Jump";
  optionBReminder = inputs.optionBReminder || "!Jump";
  jumpKey = inputs.jumpKey || 32;
  reloadKey = inputs.reloadKey || 82;
  selectorTitle = inputs.selectorTitle || "Choose";
});

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
      animationSpeed: 0.5,
    }
  );

  timer.onTimerStart = () => {};

  timer.onTimerFinish = () => {};
};

const createSelectors = () => {
  dixperPluginSample.drawCursor();

  const titleSelector = new dxPanel(
    dixperPluginSample.pixi,
    "challengeFrameCommunication",
    dixperPluginSample.uiLayer,
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
    dixperPluginSample.pixi,
    "selectorButton",
    dixperPluginSample.uiLayer,
    optionA,
    {
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

  const jump = new dxButton(
    dixperPluginSample.pixi,
    "selectorButton",
    dixperPluginSample.uiLayer,
    optionB,
    {
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

  reload.onClick = (event) => {
    millisecondsToFinish = dixperPluginSample.context.skillEnd - Date.now();

    dixperPluginSample.cursor.remove();
    reload.instance.interactive = false;
    reload.remove();
    jump.instance.interactive = false;
    jump.remove();
    titleSelector.remove();
    keyBlock(millisecondsToFinish, reloadKey);
    init();
    createReminder(optionAReminder);
  };

  jump.onClick = (event) => {
    millisecondsToFinish = dixperPluginSample.context.skillEnd - Date.now();

    dixperPluginSample.cursor.remove();
    reload.instance.interactive = false;
    reload.remove();
    jump.instance.interactive = false;
    jump.remove();
    titleSelector.remove();
    keyBlock(millisecondsToFinish, jumpKey);
    init();
    createReminder(optionBReminder);
  };
};

const createReminder = (reminderTitle) => {
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

const keyBlock = (millisecondsToFinish, key) => {
  dixperPluginSample.addActions(
    JSON.stringify([
      {
        ttl: millisecondsToFinish,
        actions: [
          {
            inputKey: `keyboard-filter||1654001460515`,
            scope: "{{scope}}",
            key: "keyboard-filter",
            component: "keyboard",
            type: "filter",
            version: 1,
            action: "start",
            metadata: { disable: [{ vkeys: "{{vkeys}}" }] },
            tt0: "{{tt0}}",
            ttl: "{{ttl}}",
          },
        ],
      },
    ]),
    {
      "scope||keyboard-filter||1654001460515": [0],
      "vkeys||keyboard-filter||1654001460515": [key],
      "tt0||keyboard-filter||1654001460515": 0,
      "ttl||keyboard-filter||1654001460515": millisecondsToFinish,
    }
  );
};
