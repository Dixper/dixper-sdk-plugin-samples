const images = [];
const sprites = [];
const sounds = [];

// INPUTS PARAMS

let jumpKey, jumpText, reminderTitle;

// DIXPER SDK INJECTED CLASS

const dixperPluginSample = new DixperSDKLib({
  pixi: {
    enable: true,
    files: [...images, ...sprites, ...sounds],
  },
});

// INPUTS

dixperPluginSample.inputs$.subscribe((inputs) => {
  jumpKey = inputs.jumpKey || 32;
  jumpText = inputs.jumpText || `Boing!!!`;
  minVolume = inputs.minVolume || 0.3;
  maxVolume = inputs.maxVolume || 1;
  failDelay = inputs.failDelay || 400;
  reminderTitle = inputs.reminderTitle || "Boing...boing....boing!!!";
});

// PIXIJS INITILIZE

dixperPluginSample.onPixiLoad = () => {
  lockJump();
  setTimeout(() => {
    init();
    createTimer();
    createReminder();
  }, 1000);
};

const init = () => {
  const vumeter = new dxVumeter(
    dixperPluginSample.pixi,
    dixperPluginSample.uiLayer,
    {
      min: minVolume,
      max: maxVolume,
      delay: failDelay,
    },
    {
      position: {
        x: DX_WIDTH / 2 - 250,
        y: 100,
      },
    }
  );

  vumeter.start();

  vumeter.onVolumeMatch = (volume) => {
    jump();
    addFloatingText();
    console.log("onVolumeMatch", volume);
  };
};

const addFloatingText = () => {
  const randomRect = {
    min: DX_WIDTH / 2 - 200,
    max: DX_WIDTH / 2 + 100,
  };

  const coordinates = getRandomCoordinates(randomRect);

  const floatingText = new dxFloatingText(
    dixperPluginSample.pixi,
    dixperPluginSample.uiLayer,
    jumpText,
    800,
    randomRect,
    {
      position: coordinates,
      random: true,
    }
  ).start();
};

function getRandomCoordinates(rect) {
  let x = Math.random() * (rect.max - rect.min) + rect.min;
  let y = DX_HEIGHT / 2 - 100;
  return { x, y };
}

const createTimer = () => {
  const timestampUntilSkillFinish = dixperPluginSample.context.skillEnd;
  const millisecondsToFinish = timestampUntilSkillFinish - Date.now();
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

const createReminder = () => {
  setTimeout(() => {
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
  }, 1000);
};

const lockJump = () => {
  const timestampUntilSkillFinish = dixperPluginSample.context.skillEnd;
  const millisecondsToFinish = timestampUntilSkillFinish - Date.now();
  dixperPluginSample.addActions(
    JSON.stringify([
      {
        ttl: millisecondsToFinish,
        actions: [
          {
            inputKey: "swap-buttons||1655384671828-1",
            scope: "{{scope}}",
            key: "swap-buttons",
            component: "keyboard",
            type: "swap-buttons",
            action: "start",
            metadata: { swaps: "{{swaps}}" },
            tt0: "{{tt0}}",
            ttl: "{{ttl}}",
          },
        ],
      },
    ]),
    {
      "scope||swap-buttons||1655384671828-1": [0],
      "swaps||swap-buttons||1655384671828-1": [{ vkey: [32] }],
      "tt0||swap-buttons||1655384671828-1": 0,
      "ttl||swap-buttons||1655384671828-1": millisecondsToFinish,
    }
  );
};

const jump = () => {
  const tmp = Date.now();
  const inputs = {};

  inputs[`scope||key-presser||${tmp}`] = [0];
  inputs[`keypress||key-presser||${tmp}`] = [
    {
      vkey: 32,
      begin: 0,
      duration: 100,
      "force-press": true,
    },
  ];
  inputs[`tt0||key-presser||${tmp}`] = 0;
  inputs[`ttl||key-presser||${tmp}`] = 100;

  dixperPluginSample.addActions(
    JSON.stringify([
      {
        ttl: 200,
        actions: [
          {
            inputKey: `key-presser||${tmp}`,
            scope: "{{scope}}",
            key: "key-presser",
            component: "virtualkeys",
            type: "presser",
            action: "start",
            metadata: {
              "keys-press": "{{keypress}}",
            },
            tt0: "{{tt0}}",
            ttl: "{{ttl}}",
          },
        ],
      },
    ]),
    { ...inputs }
  );
};
