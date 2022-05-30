const images = [];
const sprites = [
  {
    name: 'reminder',
    url: 'https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/spritesheets/reminder-challenge.json',
  },
  {
    name: 'targetCounter',
    url: 'https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/spritesheets/target-counter.json',
  },
];
const sounds = [
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

let onKeySub;
let squatEnable = true;
let counterPanel;

const squatKey = 29;
const squatDelay = 600;

// DIXPER SDK INJECTED CLASS

const dixperPluginSample = new DixperSDKLib({
  pixi: {
    enable: true,
    files: [...images, ...sprites, ...sounds],
  },
});

// PIXIJS INITILIZE

dixperPluginSample.onPixiLoad = () => {
  dixperPluginSample.initChallenge('Squat challenge!', 100000);
};

// INIT CHALLENGE

dixperPluginSample.onChallengeAccepted = () => {
  init();
};

dixperPluginSample.onChallengeRejected = () => {
  squatBlock();
  setTimeout(() => {
    dixperPluginSample.stopSkill();
  }, 10000);
};

dixperPluginSample.onChallengeFinish = () => {
  counterPanel.remove();
  onKeySub.unsubscribe();

  if (counterPanel.count > 10) {
    dixperPluginSample.challengeSuccess();
  } else {
    dixperPluginSample.challengeFail();
  }
};

const init = () => {
  onKeySub = dixperPluginSample.onKeyDown$.subscribe(addFloatingText);
  createcounterPanel();
};

const addFloatingText = (event) => {
  if (squatEnable && event.keycode === squatKey) {
    squatEnable = false;
    setTimeout(() => {
      squatEnable = true;
    }, squatDelay);

    counterPanel.incrementCount();

    const randomRect = {
      min: DX_WIDTH / 2 - 400,
      max: DX_WIDTH / 2,
    };

    const coordinates = getRandomCoordinates(randomRect);

    const floatingText = new dxFloatingText(
      dixperPluginSample.pixi,
      dixperPluginSample.uiLayer,
      `${counterPanel.count}`,
      800,
      randomRect,
      {
        position: coordinates,
        random: true,
      }
    ).start();
  }
};

function getRandomCoordinates(rect) {
  let x = Math.random() * (rect.max - rect.min) + rect.min;
  let y = DX_HEIGHT / 2 - 100;
  return { x, y };
}

const createcounterPanel = () => {
  counterPanel = new dxCounter(
    dixperPluginSample.pixi,
    'targetCounter',
    dixperPluginSample.uiLayer,
    0,
    {
      position: {
        x: DX_WIDTH / 2 - 100,
        y: 100,
      },
      animationSpeed: 0.5,
    }
  );
};

const squatBlock = () => {
  dixperPluginSample.addActions(
    JSON.stringify([
      {
        ttl: 10000,
        actions: [
          {
            inputKey: 'render-texture-0-0',
            scope: '{{scope}}',
            key: 'render-texture',
            component: 'graphics',
            type: 'render-texture',
            version: 1,
            action: 'start',
            metadata: {
              file: '{{file}}',
              textureProperties: {
                width: '{{width}}',
                height: '{{height}}',
                position: '{{position}}',
                fadeIn: '{{fade}}',
              },
            },
            tt0: '{{tt0}}',
            ttl: '{{ttl}}',
          },
          {
            inputKey: 'sound-0-1',
            scope: '{{scope}}',
            key: 'sound',
            metadata: { file: '{{file}}', volume: '{{volume}}' },
            tt0: '{{tt0}}',
            ttl: '{{ttl}}',
          },
        ],
      },
    ]),
    {
      'file||sound-0-1':
        'https://firebasestorage.googleapis.com/v0/b/dixper-abae2.appspot.com/o/skills%2FIUvnTvzg4RsRUwoll9pZ%2FAudio%20bicho%20cara%20fea.mp3?alt=media&token=a08c25ff-c138-4d2d-93f1-106106766ec0',
      'ttl||sound-0-1': 10000,
      'scope||sound-0-1': 100,
      'file||render-texture-0-0':
        'https://firebasestorage.googleapis.com/v0/b/dixper-abae2.appspot.com/o/skills%2FX46ap915je4GhT9iGHLT%2Fassets%2Fsusto-ligth-1.png?alt=media&token=c8db59a9-6bd5-463f-99b7-0dead27aec3f',
      'ttl||render-texture-0-0': 10000,
      'scope||render-texture-0-0': 100,
    }
  );
};
