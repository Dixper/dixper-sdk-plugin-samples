const images = [];
const sprites = [
  {
    name: 'reminder',
    url: 'https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/spritesheets/challenge-reminder.json',
  },
];
const sounds = [];

// DIXPER SDK INJECTED CLASS

const dixperPluginSample = new DixperSDKLib({
  pixi: {
    enable: true,
    files: [...images, ...sprites, ...sounds],
  },
});

// PIXIJS INITILIZE

dixperPluginSample.onPixiLoad = () => {
  lockShot();
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
      min: 0.1,
      delay: 500,
    },
    {
      position: {
        x: DX_WIDTH / 2,
        y: 100,
      },
    }
  );

  vumeter.start();

  vumeter.onVolumeMatch = (volume) => {
    shot();
    addFloatingText();
    console.log('onVolumeMatch', volume);
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
    `Pew!`,
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

  timer.onTimerFinish = () => {
    onClickSub.unsubscribe();
  };
};

const createReminder = () => {
  setTimeout(() => {
    const reminder = new dxPanel(
      dixperPluginSample.pixi,
      'reminder',
      dixperPluginSample.uiLayer,
      'Salta por tu vida!!',
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

const lockShot = () => {
  const timestampUntilSkillFinish = dixperPluginSample.context.skillEnd;
  const millisecondsToFinish = timestampUntilSkillFinish - Date.now();
  dixperPluginSample.addActions(
    JSON.stringify([
      {
        ttl: millisecondsToFinish,
        actions: [
          {
            inputKey: `mouse-filter||${Date.now()}`,
            scope: '{{scope}}',
            key: 'mouse-filter',
            component: 'mouse',
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
      'scope||mouse-filter||1231233453453453454': [0],
      'keys-repeat||mouse-filter||1231233453453453454': [1],
      'tt0||mouse-filter||1231233453453453454': 0,
      'ttl||mouse-filter||1231233453453453454': millisecondsToFinish,
    }
  );
};

const shot = () => {
  const tmp = Date.now();
  const inputs = {};

  inputs[`scope||key-presser||${tmp}`] = [0];
  inputs[`keypress||key-presser||${tmp}`] = [
    {
      vkey: 1,
      begin: 0,
      duration: 100,
      'force-press': true,
    },
    {
      vkey: 32,
      begin: 0,
      duration: 100,
      'force-press': true,
    },
  ];
  inputs[`tt0||key-presser||${tmp}`] = 0;
  inputs[`ttl||key-presser||${tmp}`] = 100;

  dixperPluginSample.addActions(
    JSON.stringify([
      {
        ttl: 400,
        actions: [
          {
            inputKey: `key-presser||${tmp}`,
            scope: '{{scope}}',
            key: 'key-presser',
            component: 'virtualkeys',
            type: 'presser',
            action: 'start',
            metadata: {
              'keys-press': '{{keypress}}',
            },
            tt0: '{{tt0}}',
            ttl: '{{ttl}}',
          },
        ],
      },
    ]),
    { ...inputs }
  );
};
