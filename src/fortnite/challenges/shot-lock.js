const images = [];
const sprites = [
  {
    name: 'targetCounter',
    url: 'https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/spritesheets/target-counter.json',
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
];

let targetCounterPanel;
let cursor;
let clickKey = 1;
let onClickSub;
let challengeFailed = false;

const dixperPluginSample = new DixperSDKLib({
  pixi: {
    enable: true,
    files: [...images, ...sprites, ...sounds],
  },
});

// REMOTE

dixperPluginSample.onPixiLoad = () => {
  dixperPluginSample.initChallenge('Shot-Lock!', 100000);
};

// INIT CHALLENGE

dixperPluginSample.onChallengeAccepted = () => {
  init();
};

dixperPluginSample.onChallengeRejected = () => {
  jumpRepeat();
  setTimeout(() => {
    dixperPluginSample.stopSkill();
  }, 10000);
};

dixperPluginSample.onChallengeFinish = () => {
  targetCounterPanel.remove();
  cursor.remove();

  intervalSub.unsubscribe();
  if (targetCounterPanel.count === 0) {
    dixperPluginSample.challengeFail();
  } else {
    dixperPluginSample.challengeSuccess();
  }
};

const init = () => {
  targetCounterPanel = new dxCounter(
    dixperPluginSample.pixi,
    'targetCounter',
    dixperPluginSample.uiLayer,
    5,
    {
      position: {
        x: DX_WIDTH / 2 - 100,
        y: 100,
      },
      animationSpeed: 0.5,
    }
  );

  onClickSub = dixperPluginSample.onMouseDown$.subscribe(onClick);

  dixperPluginSample.onChallengeFinish = () => {
    if (!challengeFailed) {
      dixperPluginSample.challengeSuccess();
    }
  };
};

const onClick = (event) => {
  if (clickKey === event.button) {
    if (targetCounterPanel.count === 1) {
      jumpRepeat();
      challengeFailed = true;
      dixperPluginSample.challengeFail();
      targetCounterPanel.remove();
    }
    if (targetCounterPanel.count >= 1) {
      addFloatingText(`-1`);
      targetCounterPanel.decrementCount();
    }
  }
};

const addFloatingText = (label) => {
  const randomRect = {
    min: DX_WIDTH / 2 - 200,
    max: DX_WIDTH / 2 + 100,
  };

  const coordinates = getRandomCoordinates(randomRect);

  const floatingText = new dxFloatingText(
    dixperPluginSample.pixi,
    dixperPluginSample.uiLayer,
    label,
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

const jumpRepeat = () => {
  const timestampUntilSkillFinish = dixperPluginSample.context.skillEnd;
  const millisecondsToFinish = timestampUntilSkillFinish - Date.now();
  dixperPluginSample.addActions(
    JSON.stringify([
      {
        ttl: millisecondsToFinish,
        actions: [
          {
            inputKey: 'key-repeater-0-0',
            scope: '{{scope}}',
            key: 'key-repeater',
            component: 'virtualkeys',
            type: 'repeater',
            version: 1,
            action: 'start',
            metadata: { 'keys-repeat': '{{keys-repeat}}' },
            tt0: '{{tt0}}',
            ttl: '{{ttl}}',
          },
        ],
      },
    ]),
    {
      'scope||key-repeater-0-0': [0],
      'keys-repeat||key-repeater-0-0': [
        {
          t0: 300,
          tEnd: 100,
          ttf: 100,
          ttp: 100,
          vkey: 32,
        },
      ],
      'tt0||key-repeater-0-0': 0,
      'ttl||key-repeater-0-0': millisecondsToFinish,
    }
  );
};
