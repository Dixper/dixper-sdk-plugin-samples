const images = [];
const sprites = [
  {
    name: 'topHUD',
    url: 'https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/spritesheets/hud-top.json',
  },
  {
    name: 'rightHUD',
    url: 'https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/spritesheets/hud-right.json',
  },
  {
    name: 'bottomHUD',
    url: 'https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/spritesheets/hud-bottom.json',
  },
  {
    name: 'leftHUD',
    url: 'https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/spritesheets/hud-left.json',
  },
];
const sounds = [];

let onKeySub;
let challengeFailed = false;
let counterPanel;

// INPUTS PARAMS

let squatKey,
  jumpKey,
  sprintKey,
  reminderTitle,
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
  console.log(inputs);
  squatKey = inputs.squatKey || 29;
  jumpKey = inputs.jumpKey || 57;
  sprintKey = inputs.sprintKey || 42;
  challengeTitle = inputs.challengeTitle || `Crouch challenge!`;
  challengeTime = inputs.challengeTime || 100000;
  reminderTitle = inputs.reminderTitle || 'Squats go go go!!!';
});

// PIXIJS INITILIZE

dixperPluginSample.onPixiLoad = () => {
  dixperPluginSample.initChallenge(challengeTitle, challengeTime);
  createHUD();
};

// INIT CHALLENGE

dixperPluginSample.onChallengeAccepted = () => {
  destroyHUD();
  createReminder();
  sendSquat();
  setTimeout(() => {
    init();
  }, 1000);
};

dixperPluginSample.onChallengeRejected = () => {
  destroyHUD();
  dixperPluginSample.stopSkill();
};

dixperPluginSample.onChallengeFinish = () => {
  onKeySub.unsubscribe();

  if (!challengeFailed) {
    dixperPluginSample.challengeSuccess();
  } else {
    shotLock();
    dixperPluginSample.challengeFail();
  }
};

const init = () => {
  onKeySub = dixperPluginSample.onKeyDown$.subscribe(listenToSquat);
};

const createHUD = () => {
  topHUD = new dxAnimatedElement(
    dixperPluginSample.pixi,
    'topHUD',
    dixperPluginSample.uiLayer,
    '',
    {
      animationSpeed: 0.5,
      position: {
        x: DX_WIDTH / 2,
        y: 140,
      },
      scale: {
        x: 1,
        y: 1,
      },
      zIndex: 99,
    }
  );

  bottomHUD = new dxAnimatedElement(
    dixperPluginSample.pixi,
    'bottomHUD',
    dixperPluginSample.uiLayer,
    '',
    {
      animationSpeed: 0.5,
      position: {
        x: DX_WIDTH / 2,
        y: DX_HEIGHT - 90,
      },
      scale: {
        x: 1,
        y: 1,
      },
      zIndex: 80,
    }
  );

  leftHUD = new dxAnimatedElement(
    dixperPluginSample.pixi,
    'leftHUD',
    dixperPluginSample.uiLayer,
    '',
    {
      animationSpeed: 0.5,
      position: {
        x: 195,
        y: DX_HEIGHT / 2,
      },
      scale: {
        x: 1,
        y: 1,
      },
      zIndex: 60,
    }
  );

  rightHUD = new dxAnimatedElement(
    dixperPluginSample.pixi,
    'rightHUD',
    dixperPluginSample.uiLayer,
    '',
    {
      animationSpeed: 0.5,
      position: {
        x: DX_WIDTH - 160,
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

const destroyHUD = () => {
  leftHUD._destroy();
  topHUD._destroy();
  rightHUD._destroy();
  bottomHUD._destroy();
};

const listenToSquat = (event) => {
  if (
    !event.repeat &&
    !challengeFailed &&
    (event.keycode === squatKey ||
      event.keycode === jumpKey ||
      event.keycode === sprintKey)
  ) {
    challengeFailed = true;
    dixperPluginSample.onChallengeFinish();
  }
};

function getRandomCoordinates(rect) {
  let x = Math.random() * (rect.max - rect.min) + rect.min;
  let y = DX_HEIGHT / 2 - 100;
  return { x, y };
}

createReminder = () => {
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

const shotLock = () => {
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
        ttl: 600,
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
          begin: 300,
          duration: 300,
          'force-press': true,
        },
        {
          vkey: 32,
          begin: 0,
          duration: 300,
          'force-press': true,
        },
      ],
      'tt0||key-presser||22': 0,
      'ttl||key-presser||22': 30000,
    }
  );
};
