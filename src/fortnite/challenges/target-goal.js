const images = [];
const sprites = [
  {
    name: 'crosshair',
    url: 'https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/spritesheets/crosshair.json',
  },
  {
    name: 'target',
    url: 'https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/spritesheets/target.json',
  },
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
  {
    name: 'targetCounterHitSound',
    url: 'https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/sounds/counter-target-hit.mp3',
  },
];

let intervalSub;
let targetCounterPanel;
let cursor;

const dixperPluginSample = new DixperSDKLib({
  pixi: {
    enable: true,
    files: [...images, ...sprites, ...sounds],
  },
});

// REMOTE

dixperPluginSample.onPixiLoad = () => {
  dixperPluginSample.initChallenge('Jump challenge!', 100000);
};

// INIT CHALLENGE

dixperPluginSample.onChallengeAccepted = () => {
  init();
};

dixperPluginSample.onChallengeRejected = () => {
  sendJumpscare();
  setTimeout(() => {
    dixperPluginSample.stopSkill();
  }, 10000);
};

dixperPluginSample.onChallengeFinish = () => {
  targetCounterPanel.remove();
  cursor.remove();

  intervalSub.unsubscribe();
  if (targetCounterPanel.count > 10) {
    dixperPluginSample.challengeSuccess();
  } else {
    dixperPluginSample.challengeFail();
  }
};

// //SUSTO
const sendJumpscare = () => {
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

const init = () => {
  cursor = new dxCursor(
    dixperPluginSample.pixi,
    'crosshair',
    dixperPluginSample.cursorLayer,
    {
      parentLayer: dixperPluginSample.topLayer,
      anchor: {
        x: 0.5,
        y: 0.5,
      },
    }
  );

  targetCounterPanel = new dxCounter(
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

  intervalSub = interval(1000).subscribe((x) => {
    createTarget(
      Math.floor(Math.random() * (DX_WIDTH - 50) + 30),
      Math.floor(Math.random() * (DX_HEIGHT - 50) + 30)
    );
  });
};

function createTarget(x, y) {
  const target = new dxButton(
    dixperPluginSample.pixi,
    'target',
    dixperPluginSample.uiLayer,
    '',
    {
      position: {
        x,
        y,
      },
      animationSpeed: 0.5,
      hitbox: [-41, -5, -8, -28, 22, -25, 41, 13, 14, 38, -30, 25],
    }
  );

  dixperPluginSample.pixi.ticker.add(() => {
    target.rotation += 0.01;
  });

  target.onClick = (event) => {
    target.instance.interactive = false;
    target.remove();

    targetCounterPanel.incrementCount();
  };
}