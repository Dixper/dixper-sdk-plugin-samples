const images = [];
const sprites = [
  {
    name: "crosshair",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/spritesheets/crosshair.json",
  },
  {
    name: "targetCounter",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/spritesheets/target-counter.json",
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
  {
    name: "targetCounterInSound",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/sounds/counter-hit-in.mp3",
  },
  {
    name: "targetCounterOutSound",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/sounds/counter-hit-out.mp3",
  },
];

let targetCounterPanel;
let cursor;
let clickKey = 1;
let onClickSub;

const dixperPluginSample = new DixperSDKLib({
  pixi: {
    enable: true,
    files: [...images, ...sprites, ...sounds],
  },
});

// REMOTE

dixperPluginSample.onPixiLoad = () => {
  dixperPluginSample.initChallenge("Shot-Lock!", 100000);
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
  if (targetCounterPanel.count === 0) {
    dixperPluginSample.challengeFail();
  } else {
    dixperPluginSample.challengeSuccess();
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
            inputKey: "render-texture-0-0",
            scope: "{{scope}}",
            key: "render-texture",
            component: "graphics",
            type: "render-texture",
            version: 1,
            action: "start",
            metadata: {
              file: "{{file}}",
              textureProperties: {
                width: "{{width}}",
                height: "{{height}}",
                position: "{{position}}",
                fadeIn: "{{fade}}",
              },
            },
            tt0: "{{tt0}}",
            ttl: "{{ttl}}",
          },
          {
            inputKey: "sound-0-1",
            scope: "{{scope}}",
            key: "sound",
            metadata: { file: "{{file}}", volume: "{{volume}}" },
            tt0: "{{tt0}}",
            ttl: "{{ttl}}",
          },
        ],
      },
    ]),
    {
      "file||sound-0-1":
        "https://firebasestorage.googleapis.com/v0/b/dixper-abae2.appspot.com/o/skills%2FIUvnTvzg4RsRUwoll9pZ%2FAudio%20bicho%20cara%20fea.mp3?alt=media&token=a08c25ff-c138-4d2d-93f1-106106766ec0",
      "ttl||sound-0-1": 10000,
      "scope||sound-0-1": 100,
      "file||render-texture-0-0":
        "https://firebasestorage.googleapis.com/v0/b/dixper-abae2.appspot.com/o/skills%2FX46ap915je4GhT9iGHLT%2Fassets%2Fsusto-ligth-1.png?alt=media&token=c8db59a9-6bd5-463f-99b7-0dead27aec3f",
      "ttl||render-texture-0-0": 10000,
      "scope||render-texture-0-0": 100,
    }
  );
};

const init = () => {
  cursor = new dxCursor(
    dixperPluginSample.pixi,
    "crosshair",
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
    "targetCounter",
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

  const onClick = (event) => {
    if (clickKey === event.button) {
      targetCounterPanel.decrementCount();
      if (targetCounterPanel.count === 0) {
        sendJumpscare();
        dixperPluginSample.onChallengeFinish();
      }
    }
  };

  onClickSub = dixperPluginSample.onMouseDown$.subscribe(onClick);
};
