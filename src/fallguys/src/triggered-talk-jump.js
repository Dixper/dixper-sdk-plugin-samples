const images = [];
const sprites = [];
const sounds = [];

// DIXPER SDK INJECTED CLASS

const dixperPluginSample = new DixperSDKLib({
  pixi: {
    enable: true,
    files: [...images, ...sprites, ...sounds],
  },
});

// INPUTS

const { jumpText, minVolume, maxVolume, failDelay, reminderTitle } = DX_INPUTS;

// PIXIJS INITILIZE

dixperPluginSample.onPixiLoad = () => {
  setTimeout(() => {
    init();
    createTimer();
    createReminder();
  }, 1000);
};

const init = () => {
  const vumeter = new dxVumeter(
    DX_PIXI,
    DX_LAYERS.ui,
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
    // console.log("onVolumeMatch", volume);
  };
};

const addFloatingText = () => {
  const randomRect = {
    min: DX_WIDTH / 2 - 200,
    max: DX_WIDTH / 2 + 100,
  };

  const coordinates = getRandomCoordinates(randomRect);

  const floatingText = new dxFloatingText(
    DX_PIXI,
    DX_LAYERS.ui,
    jumpText,
    800,
    randomRect,
    {
      position: coordinates,
      random: true,
    }
  ).start();
};

const getRandomCoordinates = (rect) => {
  let x = Math.random() * (rect.max - rect.min) + rect.min;
  let y = DX_HEIGHT / 2 - 100;
  return { x, y };
};

const createTimer = () => {
  const timestampUntilSkillFinish = dixperPluginSample.context.skillEnd;
  const millisecondsToFinish = timestampUntilSkillFinish - Date.now();
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

const createReminder = () => {
  setTimeout(() => {
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
  }, 1000);
};

const jump = () => {
  const tmp = Date.now();
  const inputs = {};

  inputs[`scope||key-presser||${tmp}`] = [0];
  inputs[`keypress||key-presser||${tmp}`] = [
    {
      vkey: 76,
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
