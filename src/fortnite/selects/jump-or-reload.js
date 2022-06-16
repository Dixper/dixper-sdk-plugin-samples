const images = [];
const sprites = [
  {
    name: 'selectorButton',
    url: 'https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/spritesheets/button.json',
  },
  {
    name: 'top',
    url: 'https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/spritesheets/hud-top.json',
  },
  {
    name: 'right',
    url: 'https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/aim-blur/src/fortnite/assets/spritesheets/hud-right.json',
  },
  {
    name: 'bottom',
    url: 'https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/spritesheets/hud-bottom.json',
  },
  {
    name: 'left',
    url: 'https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/spritesheets/hud-left.json',
  },
];

const sounds = [
  {
    name: 'targetInSound',
    url: 'https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/sounds/target-appear.mp3',
  },
  {
    name: 'targetOutSound',
    url: 'https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/sounds/shot.mp3',
  },
  {
    name: 'targetCounterInSound',
    url: 'https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/sounds/counter-hit-in.mp3',
  },
  {
    name: 'targetCounterOutSound',
    url: 'https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/sounds/counter-hit-out.mp3',
  },
  {
    name: 'targetCounterHitSound',
    url: 'https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/sounds/counter-target-hit.mp3',
  },
];

let millisecondsToFinish;

// INPUTS PARAMS

let optionA, optionB, reloadKey, jumpKey, selectorTitle;

// DIXPER SDK INJECTED CLASS

const dixperPluginSample = new DixperSDKLib({
  pixi: {
    enable: true,
    files: [...images, ...sprites, ...sounds],
  },
});

// INPUTS

dixperPluginSample.inputs$.subscribe((inputs) => {
  optionA = inputs.optionA || '!Reload';
  optionAReminder = inputs.optionAReminder || '!Reload';
  optionB = inputs.optionB || '!Jump';
  optionBReminder = inputs.optionBReminder || '!Jump';
  jumpKey = inputs.jumpKey || 32;
  reloadKey = inputs.reloadKey || 16;
  selectorTitle = inputs.selectorTitle || 'Choose';
});

// REMOTE

dixperPluginSample.onPixiLoad = () => {
  createSelectors();
  createTitle();
  createHUD();
};

const init = () => {
  createTimer();
};

const createTimer = () => {
  const interval = 1000;

  const timer = new dxTimer(
    dixperPluginSample.pixi,
    'timer',
    dixperPluginSample.uiLayer,
    millisecondsToFinish,
    interval,
    {
      position: {
        x: DX_WIDTH / 2,
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

  const reload = new dxButton(
    dixperPluginSample.pixi,
    'selectorButton',
    dixperPluginSample.uiLayer,
    optionA,
    {
      position: {
        x: DX_WIDTH / 2 - 200,
        y: 320,
      },
      scale: {
        x: 0.7,
        y: 0.5,
      },
      animationSpeed: 0.5,
      hitbox: [-175, -45, 175, -45, 175, 45, -175, 46],
    }
  );

  const jump = new dxButton(
    dixperPluginSample.pixi,
    'selectorButton',
    dixperPluginSample.uiLayer,
    optionB,
    {
      position: {
        x: DX_WIDTH / 2 + 200,
        y: 320,
      },
      scale: {
        x: 0.7,
        y: 0.5,
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

createTitle = () => {
  const titleSelector = new dxPanel(
    dixperPluginSample.pixi,
    'challengeFrameCommunication',
    dixperPluginSample.uiLayer,
    selectorTitle,
    {
      position: {
        x: DX_WIDTH / 2,
        y: 120,
      },
      scale: {
        x: 1,
        y: 1,
      },
      animationSpeed: 0.5,
    }
  );
};

createReminder = (reminderTitle) => {
  const reminder = new dxPanel(
    dixperPluginSample.pixi,
    'reminder',
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

const createHUD = () => {
  let top = new dxAnimatedElement(
    dixperPluginSample.pixi,
    'top',
    dixperPluginSample.uiLayer,
    '',
    {
      animationSpeed: 0.5,
      position: {
        x: DX_WIDTH / 2,
        y: 50,
      },
      scale: {
        x: 1,
        y: 1,
      },
      zIndex: 99,
    }
  );

  let bottom = new dxAnimatedElement(
    dixperPluginSample.pixi,
    'bottom',
    dixperPluginSample.uiLayer,
    '',
    {
      animationSpeed: 0.5,
      position: {
        x: DX_WIDTH / 2,
        y: DX_HEIGHT - 30,
      },
      scale: {
        x: 1,
        y: 1,
      },
      zIndex: 80,
    }
  );

  let left = new dxAnimatedElement(
    dixperPluginSample.pixi,
    'left',
    dixperPluginSample.uiLayer,
    '',
    {
      animationSpeed: 0.5,
      position: {
        x: 50,
        y: DX_HEIGHT / 2,
      },
      scale: {
        x: 1,
        y: 1,
      },
      zIndex: 60,
    }
  );

  let right = new dxAnimatedElement(
    dixperPluginSample.pixi,
    'right',
    dixperPluginSample.uiLayer,
    '',
    {
      animationSpeed: 0.5,
      position: {
        x: DX_WIDTH - 20,
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

const keyBlock = (millisecondsToFinish, key) => {
  dixperPluginSample.addActions(
    JSON.stringify([
      {
        ttl: millisecondsToFinish,
        actions: [
          {
            inputKey: `keyboard-filter||1654001460515`,
            scope: '{{scope}}',
            key: 'keyboard-filter',
            component: 'keyboard',
            type: 'filter',
            version: 1,
            action: 'start',
            metadata: { disable: [{ vkeys: '{{vkeys}}' }] },
            tt0: '{{tt0}}',
            ttl: '{{ttl}}',
          },
        ],
      },
    ]),
    {
      'scope||keyboard-filter||1654001460515': [0],
      'vkeys||keyboard-filter||1654001460515': [key],
      'tt0||keyboard-filter||1654001460515': 0,
      'ttl||keyboard-filter||1654001460515': millisecondsToFinish,
    }
  );
};
