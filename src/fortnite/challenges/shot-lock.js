const images = [];
const sprites = [
  {
    name: "targetCounter",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/spritesheets/counter-empty.json",
  },
  {
    name: "topHUD",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/spritesheets/hud-top.json",
  },
  {
    name: "rightHUD",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/spritesheets/hud-right.json",
  },
  {
    name: "bottomHUD",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/spritesheets/hud-bottom.json",
  },
  {
    name: "leftHUD",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/spritesheets/hud-left.json",
  },
];
const sounds = [
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

let clickKey,
  limitedShot,
  challengeTitle,
  challengeTime,
  reminderTitle,
  topHUD,
  bottomHUD,
  rightHUD,
  leftHUD,
  reminder,
  failReminderTitle;

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
  challengeTime = inputs.challengeTime || 10000;
  jumpRepeatTime = inputs.jumpRepeatTime || 30000;
  reminderTitle = inputs.reminderTitle || "Si disparas...";
  failReminderTitle = inputs.failReminderTitle || "Salta peque canguro!!!";
});

// INIT CHALLENGE

dixperPluginSample.onPixiLoad = () => {
  dixperPluginSample.initChallenge(challengeTitle, challengeTime);
  createHUD();
};

dixperPluginSample.onChallengeAccepted = () => {
  destroyHUD();
  init();
  createReminder();
};

dixperPluginSample.onChallengeRejected = () => {
  destroyHUD();
  dixperPluginSample.stopSkill();
};

dixperPluginSample.onChallengeFinish = () => {
  targetCounterPanel._destroy();
  reminder._destroy();

  if (!challengeFailed) {
    dixperPluginSample.challengeSuccess();
  } else {
    createFailReminder();
    jumpRepeat();
    dixperPluginSample.challengeFail();
  }
};

const createHUD = () => {
  topHUD = new dxAnimatedElement(
    dixperPluginSample.pixi,
    "topHUD",
    dixperPluginSample.uiLayer,
    "",
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
    "bottomHUD",
    dixperPluginSample.uiLayer,
    "",
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
    "leftHUD",
    dixperPluginSample.uiLayer,
    "",
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
    "rightHUD",
    dixperPluginSample.uiLayer,
    "",
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

const init = () => {
  targetCounterPanel = new dxCounter(
    dixperPluginSample.pixi,
    "panelSmall",
    dixperPluginSample.uiLayer,
    5,
    null,
    {
      position: {
        x: (3 * DX_WIDTH) / 4 - 100,
        y: 100,
      },
      animationSpeed: 0.5,
    }
  );

  setTimeout(() => {
    onClickSub = dixperPluginSample.onMouseDown$.subscribe(onClick);
  }, 1000);
};

const createReminder = () => {
  reminder = new dxPanel(
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
};

const createFailReminder = () => {
  failReminder = new dxPanel(
    dixperPluginSample.pixi,
    "reminder",
    dixperPluginSample.uiLayer,
    failReminderTitle,
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

const getRandomCoordinates = (rect) => {
  let x = Math.random() * (rect.max - rect.min) + rect.min;
  let y = DX_HEIGHT / 2 - 100;
  return { x, y };
};

const jumpRepeat = () => {
  const timestampUntilSkillFinish = dixperPluginSample.context.skillEnd;
  const millisecondsToFinish = timestampUntilSkillFinish - Date.now();
  dixperPluginSample.addActions(
    JSON.stringify([
      {
        ttl: jumpRepeatTime,
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
          tEnd: jumpRepeatTime,
          ttf: 500,
          ttp: 300,
          vkey: 32,
        },
      ],
      "tt0||key-repeater-0-0": 0,
      "ttl||key-repeater-0-0": jumpRepeatTime,
    }
  );
};
