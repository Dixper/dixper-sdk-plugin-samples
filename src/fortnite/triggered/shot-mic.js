const images = [];
const sprites = [];
const sounds = [];

// INPUTS PARAMS

let shotKey, shotText, reminderTitle;

// DIXPER SDK INJECTED CLASS

const dixperPluginSample = new DixperSDKLib({
  pixi: {
    enable: true,
    files: [...images, ...sprites, ...sounds],
  },
});

// INPUTS

dixperPluginSample.inputs$.subscribe((inputs) => {
  shotKey = inputs.shotKey || 1;
  shotText = inputs.shotText || `Pew!`;
  minVolume = inputs.minVolume || 0.2;
  maxVolume = inputs.maxVolume || 0.8;
  failDelay = inputs.failDelay || 400;
  reminderTitle = inputs.reminderTitle || 'Salta por tu vida!!';
});

// PIXIJS INITILIZE

dixperPluginSample.onPixiLoad = () => {
  // lockShot();
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
    shotText,
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

  timer.onTimerFinish = () => {};
};

const createReminder = () => {
  setTimeout(() => {
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
            inputKey: 'mouse-filter||1654001460515-35',
            scope: '{{scope}}',
            key: 'mouse-filter',
            component: 'mouse',
            type: 'filter',
            version: 1,
            action: 'start',
            metadata: {
              x: '{{mulx_axis}}',
              y: '{{muly_axis}}',
              wheelForward: '{{wheelforward}}',
              wheelBackward: '{{wheelbackward}}',
              disable: [{ vkeys: '{{mouse-disabled-vkeys}}' }],
            },
            tt0: '{{tt0}}',
            ttl: '{{ttl}}',
          },
        ],
      },
    ]),
    {
      'scope||mouse-filter||1654001460515-35': [0],
      'mouse-disabled-vkeys||mouse-filter||1654001460515-35': [1],
      'tt0||mouse-filter||1654001460515-35': 0,
      'ttl||mouse-filter||1654001460515-35': millisecondsToFinish,
    }
  );
};

const shot = () => {
  const tmp = Date.now();
  const inputs = {};

  inputs[`scope||key-presser||${tmp}`] = [0];
  inputs[`keypress||key-presser||${tmp}`] = [
    {
      vkey: shotKey,
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
        ttl: 200,
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
