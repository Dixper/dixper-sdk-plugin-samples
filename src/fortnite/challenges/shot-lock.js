const images = [];
const sprites = [
  {
    name: "targetCounter",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/spritesheets/counter-empty.json",
  },
];
const sounds = [
  {
    name: "countDownInSound",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/sounds/target-counter/counter-target-hit.mp3",
  },
  {
    name: "targetInSound",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/sounds/target-appear.mp3",
  },
  {
    name: "targetOutSound",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/sounds/shot.mp3",
  },
];

let targetCounterPanel;
let cursor;
let onClickSub;
let challengeFailed = false;

// INPUTS PARAMS

let clickKey, limitedShot, challengeTitle, challengeTime;

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
  clickKey = inputs.clickKey || 1;
  limitedShot = inputs.limitedShot || 5;
  challengeTitle = inputs.challengeTitle || "Shot-Lock!";
  challengeTime = inputs.challengeTime || 100000;
});

// INIT CHALLENGE

dixperPluginSample.onPixiLoad = () => {
  dixperPluginSample.initChallenge(challengeTitle, challengeTime);
};

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
  console.log("targetCounterPanel");
  targetCounterPanel._destroy();

  if (!challengeFailed) {
    dixperPluginSample.challengeSuccess();
  } else {
    jumpRepeat();
    dixperPluginSample.challengeFail();
  }
};

const init = () => {
  targetCounterPanel = new dxCounter(
    dixperPluginSample.pixi,
    "panelSmall",
    dixperPluginSample.uiLayer,
    limitedShot,
    {
      position: {
        x: DX_WIDTH / 2 - 100,
        y: 100,
      },
      animationSpeed: 0.5,
    }
  );

  setTimeout(() => {
    onClickSub = dixperPluginSample.onMouseDown$.subscribe(onClick);
  }, 1000);
};

const onClick = (event) => {
  if (clickKey === event.button) {
    if (targetCounterPanel) {
      if (targetCounterPanel.count === 1) {
        challengeFailed = true;
        dixperPluginSample.onChallengeFinish();
      }
      if (targetCounterPanel.count >= 1) {
        addFloatingText(`-1`);
        targetCounterPanel.decrementCount();
      }
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
        ttl: 30000,
        actions: [
          {
            inputKey: "key-repeater-0-0",
            scope: "{{scope}}",
            key: "key-repeater",
            component: "virtualkeys",
            type: "repeater",
            version: 1,
            action: "start",
            metadata: { "keys-repeat": "{{keys-repeat}}" },
            tt0: "{{tt0}}",
            ttl: "{{ttl}}",
          },
        ],
      },
    ]),
    {
      "scope||key-repeater-0-0": [0],
      "keys-repeat||key-repeater-0-0": [
        {
          t0: 0,
          tEnd: 30000,
          ttf: 500,
          ttp: 300,
          vkey: 32,
        },
      ],
      "tt0||key-repeater-0-0": 0,
      "ttl||key-repeater-0-0": 30000,
    }
  );
};
