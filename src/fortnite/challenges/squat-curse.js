const images = [];
const sprites = [
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
let challengeFailed = false;
let counterPanel;

const squatKey = 29;
const squatTarget = 100;
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
  dixperPluginSample.initChallenge(`${squatTarget} squats challenge!`, 100000);
};

// INIT CHALLENGE

dixperPluginSample.onChallengeAccepted = () => {
  sendSquat();
  setTimeout(() => {
    init();
  }, 1000);
};

dixperPluginSample.onChallengeRejected = () => {
  dixperPluginSample.stopSkill();
};

dixperPluginSample.onChallengeFinish = () => {
  onKeySub.unsubscribe();

  if (!challengeFailed) {
    jumpRepeat();
    dixperPluginSample.challengeSuccess();
  } else {
    shotLock();
    dixperPluginSample.challengeFail();
  }
};

const init = () => {
  onKeySub = dixperPluginSample.onKeyDown$.subscribe(listenToSquat);
};

const listenToSquat = (event) => {
  if (!challengeFailed && event.keycode === squatKey) {
    challengeFailed = true;
    dixperPluginSample.onChallengeFinish();
  }
};

function getRandomCoordinates(rect) {
  let x = Math.random() * (rect.max - rect.min) + rect.min;
  let y = DX_HEIGHT / 2 - 100;
  return { x, y };
}
const shotLock = () => {
  const timestampUntilSkillFinish = dixperPluginSample.context.skillEnd;
  const millisecondsToFinish = timestampUntilSkillFinish - Date.now();
  dixperPluginSample.addActions(
    JSON.stringify([
      {
        ttl: 30000,
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
      'ttl||mouse-filter||1654001460515-35': 30000,
    }
  );
};

const sendSquat = () => {
  dixperPluginSample.addActions(
    JSON.stringify([
      {
        ttl: 500,
        actions: [
          {
            inputKey: `key-presser||22`,
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
    {
      'scope||key-presser||22': [0],
      'keypress||key-presser||22': [
        {
          vkey: 17,
          begin: 0,
          duration: 500,
          'force-press': true,
        },
      ],
      'tt0||key-presser||22': 0,
      'ttl||key-presser||22': 30000,
    }
  );
};
