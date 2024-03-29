const images = [];
const sprites = [
  {
    name: "crosshair",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/spritesheets/crosshair.json",
  },
  {
    name: "target",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/spritesheets/definitive-target.json",
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
  {
    name: "targetCounterHitSound",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/sounds/counter-target-hit.mp3",
  },
];

let intervalSub;
let targetCounterPanel;
let cursor;

//INPUTS PARAMS
let reminder, goal, scaleTarget, challengeTitle, challengeTime, reminderTitle;

// DIXPER SDK INJECTED CLASS

const dixperPluginSample = new DixperSDKLib({
  pixi: {
    enable: true,
    files: [...images, ...sprites, ...sounds],
  },
});

// INPUTS

dixperPluginSample.inputs$.subscribe((inputs) => {
  goal = inputs.goal || 100;
  scaleTarget = inputs.scaleTarget || 1;
  challengeTitle =
    inputs.challengeTitle || "Destroy as many targets as possible!";
  challengeTime = 0;
  reminderTitle = inputs.reminderTitle || `Destroy at least ${goal} targets!`;
});

// PIXIJS INITILIZE

dixperPluginSample.onPixiLoad = () => {
  dixperPluginSample.initChallenge(challengeTitle, challengeTime);
};

// INIT CHALLENGE

dixperPluginSample.onChallengeAccepted = () => {
  init();
};

dixperPluginSample.onChallengeRejected = () => {
  dixperPluginSample.stopSkill();
};

dixperPluginSample.onChallengeFinish = () => {
  cursor.remove();
  intervalSub.unsubscribe();
  reminder.remove();
  if (targetCounterPanel.count >= goal) {
    dixperPluginSample.challengeSuccess();
  } else {
    setTimeout(() => sendCurse(), 2000);
    dixperPluginSample.challengeFail();
  }
  targetCounterPanel.remove();
};

const init = () => {
  createReminder();
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
    0,
    goal,
    {
      position: {
        x: (3 * DX_WIDTH) / 4 - 100,
        y: 100,
      },
      animationSpeed: 0.5,
    }
  );

  intervalSub = interval(1000).subscribe((x) => {
    createTarget(
      Math.floor(Math.random() * (DX_WIDTH - 50) + 30),
      Math.floor(Math.random() * (DX_HEIGHT - 50) + 30),
      scaleTarget
    );
  });
};

function createTarget(x, y, scaleTarget) {
  const target = new dxButton(
    dixperPluginSample.pixi,
    "target",
    dixperPluginSample.uiLayer,
    "",
    {
      position: {
        x,
        y,
      },
      scale: {
        x: scaleTarget,
        y: scaleTarget,
      },
      animationSpeed: 0.5,
      hitbox: [-41, -5, -8, -28, 22, -25, 41, 13, 14, 38, -30, 25],
    }
  );

  let removed = false;

  dixperPluginSample.pixi.ticker.add(() => {
    if (target && !removed) {
      if (target.instance.scale.x < 0.1) {
        removed = true;
        target._destroy();
      } else {
        // target.instance.rotation += 0.01;
        target.instance.scale.x *= 0.995;
        target.instance.scale.y *= 0.995;
      }
    }
  });

  target.onClick = (event) => {
    target.instance.interactive = false;
    target.instance.animationSpeed = 2;
    target.remove();

    targetCounterPanel.incrementCount();
  };
}

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

const sendCurse = () => {
  const randomNumber = Math.floor(Math.random() * 6) + 1;
  switch (randomNumber) {
    case 1:
      curse1();
      break;
    case 2:
      curse2();
      break;
    case 3:
      curse3();
      break;
    case 4:
      curse4();
      break;
    case 5:
      curse5();
      break;
    case 6:
      curse6();
      break;
    default:
      break;
  }
};

const curse1 = () => {
  const script = [
    {
      ttl: 0,
      actions: [
        {
          inputKey: "mouse-wind||1655455677607",
          scope: "{{scope}}",
          key: "mouse-wind",
          component: "mouse",
          type: "move",
          version: 1,
          action: "start",
          metadata: {
            module: "{{module}}",
            angle: "{{angle}}",
            "wheel-delta": "{{wheel-delta}}",
          },
          tt0: "{{tt0}}",
          ttl: "{{ttl}}",
        },
        {
          inputKey: "sound||1655455745539",
          scope: "{{scope}}",
          key: "sound",
          metadata: {
            file: "{{file}}",
            loop: "{{loop}}",
            volume: "{{volume}}",
          },
          tt0: "{{tt0}}",
          ttl: "{{ttl}}",
        },
        {
          inputKey: "sound||1655455824618",
          scope: "{{scope}}",
          key: "sound",
          metadata: {
            file: "{{file}}",
            loop: "{{loop}}",
            volume: "{{volume}}",
          },
          tt0: "{{tt0}}",
          ttl: "{{ttl}}",
        },
        {
          inputKey: "imagePostProcessing||1655458168857",
          scope: "{{scope}}",
          key: "imagePostProcessing",
          component: "graphicsPostProcessor",
          type: "imagePostProcessing",
          version: 1,
          action: "start",
          metadata: { effect: "{{effect}}" },
          tt0: "{{tt0}}",
          ttl: "{{ttl}}",
        },
        {
          inputKey: "render-texture||1655476336052",
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
              loop: "{{loop}}",
            },
          },
          tt0: "{{tt0}}",
          ttl: "{{ttl}}",
        },
      ],
    },
  ];
  const inputs = {
    "wheel-delta||mouse-wind||1655455677607": 0,
    "scope||mouse-wind||1655455677607": [0],
    "ttl||mouse-wind||1655455677607": 30000,
    "angle||mouse-wind||1655455677607": 0,
    "tt0||mouse-wind||1655455677607": 13000,
    "module||mouse-wind||1655455677607": 13,

    "ttl||sound||1655455745539": 32000,
    "loop||sound||1655455745539": false,
    "volume||sound||1655455745539": 0.3,
    "tt0||sound||1655455745539": 12000,
    "file||sound||1655455745539":
      "https://firebasestorage.googleapis.com/v0/b/dixper-abae2.appspot.com/o/collections%2FQEOEcFGD7UozNiRSVcob%2Fskills%2F8J169p28kvr7VQ2KcdAx%2Finput-en-sound%7C%7C1655661171184.mp3?alt=media&token=4a3ae134-2889-428d-afb5-958c45f1a4a0",
    "scope||sound||1655455745539": [0],

    "loop||sound||1655455824618": false,
    "file||sound||1655455824618":
      "https://firebasestorage.googleapis.com/v0/b/dixper-abae2.appspot.com/o/collections%2FQEOEcFGD7UozNiRSVcob%2Fskills%2F8J169p28kvr7VQ2KcdAx%2Finput-en-sound%7C%7C1655661197944.mp3?alt=media&token=6dfb1cf3-1ea7-41b3-8dda-e5109e13b95e",
    "volume||sound||1655455824618": 0.4,
    "tt0||sound||1655455824618": 32000,
    "ttl||sound||1655455824618": 12000,
    "scope||sound||1655455824618": [0],

    "effect||imagepostprocessing||1655458168857":
      "CameraFilterPack_Atmosphere_Rain_Pro",
    "ttl||imagepostprocessing||1655458168857": 30000,
    "scope||imagepostprocessing||1655458168857": [0],
    "tt0||imagepostprocessing||1655458168857": 13000,

    "width||render-texture||1655476336052": 31.5,
    "file||render-texture||1655476336052":
      "https://firebasestorage.googleapis.com/v0/b/dixper-abae2.appspot.com/o/collections%2FQEOEcFGD7UozNiRSVcob%2Fskills%2F8J169p28kvr7VQ2KcdAx%2Finput-en-render-texture%7C%7C1655476336052.webm?alt=media&token=87fccc28-b381-4463-9d42-971ae738312e",
    "scope||render-texture||1655476336052": [0],
    "tt0||render-texture||1655476336052": 0,
    "loop||render-texture||1655476336052": false,
    "fade||render-texture||1655476336052": false,
    "ttl||render-texture||1655476336052": 13000,
    "height||render-texture||1655476336052": 56,
    "position||render-texture||1655476336052": [50, 20],
  };

  dixperPluginSample.addActions(JSON.stringify(script), inputs);
};

const curse2 = () => {
  const script = [
    {
      ttl: 0,
      actions: [
        {
          inputKey: "sound||1655455745539",
          scope: "{{scope}}",
          key: "sound",
          metadata: {
            file: "{{file}}",
            loop: "{{loop}}",
            volume: "{{volume}}",
          },
          tt0: "{{tt0}}",
          ttl: "{{ttl}}",
        },
        {
          inputKey: "sound||16554557455392",
          scope: "{{scope}}",
          key: "sound",
          metadata: {
            file: "{{file}}",
            loop: "{{loop}}",
            volume: "{{volume}}",
          },
          tt0: "{{tt0}}",
          ttl: "{{ttl}}",
        },
        {
          inputKey: "shake-texture||16554559776402",
          scope: "{{scope}}",
          key: "shake-texture",
          component: "graphics",
          type: "shake-texture",
          version: 1,
          action: "start",
          metadata: { alpha: "{{alpha}}", omega: "{{omega}}" },
          tt0: "{{tt0}}",
          ttl: "{{ttl}}",
        },
        {
          inputKey: "shake-texture||1655455977640",
          scope: "{{scope}}",
          key: "shake-texture",
          component: "graphics",
          type: "shake-texture",
          version: 1,
          action: "start",
          metadata: { alpha: "{{alpha}}", omega: "{{omega}}" },
          tt0: "{{tt0}}",
          ttl: "{{ttl}}",
        },
        {
          inputKey: "imagePostProcessing||1655456992808",
          scope: "{{scope}}",
          key: "imagePostProcessing",
          component: "graphicsPostProcessor",
          type: "imagePostProcessing",
          version: 1,
          action: "start",
          metadata: { effect: "{{effect}}" },
          tt0: "{{tt0}}",
          ttl: "{{ttl}}",
        },
        {
          inputKey: "imagePostProcessing||1655457121271",
          scope: "{{scope}}",
          key: "imagePostProcessing",
          component: "graphicsPostProcessor",
          type: "imagePostProcessing",
          version: 1,
          action: "start",
          metadata: { effect: "{{effect}}" },
          tt0: "{{tt0}}",
          ttl: "{{ttl}}",
        },
        {
          inputKey: "render-texture||1655476446398",
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
              loop: "{{loop}}",
            },
          },
          tt0: "{{tt0}}",
          ttl: "{{ttl}}",
        },
      ],
    },
  ];
  const inputs = {
    "ttl||sound||16554557455392": 2000,
    "loop||sound||16554557455392": false,
    "volume||sound||16554557455392": 1,
    "tt0||sound||16554557455392": 27000,
    "file||sound||16554557455392":
      "https://firebasestorage.googleapis.com/v0/b/dixper-abae2.appspot.com/o/collections%2FQEOEcFGD7UozNiRSVcob%2Fskills%2F8J169p28kvr7VQ2KcdAx%2Finput-en-sound%7C%7C1655658905049.mp3?alt=media&token=70afb57c-9c2d-4090-adc7-8c4279cd4ce9",
    "scope||sound||16554557455392": [0],

    "ttl||sound||1655455745539": 14000,
    "loop||sound||1655455745539": false,
    "volume||sound||1655455745539": 0.3,
    "tt0||sound||1655455745539": 13000,
    "file||sound||1655455745539":
      "https://firebasestorage.googleapis.com/v0/b/dixper-abae2.appspot.com/o/collections%2FQEOEcFGD7UozNiRSVcob%2Fskills%2F8J169p28kvr7VQ2KcdAx%2Finput-en-sound%7C%7C1655658580098.mp3?alt=media&token=166c28bd-9180-4825-a629-a1df1f9fb5ad",
    "scope||sound||1655455745539": [0],

    "ttl||shake-texture||16554559776402": 8000,
    "tt0||shake-texture||16554559776402": 13000,
    "alpha||shake-texture||16554559776402": 0.01,
    "scope||shake-texture||16554559776402": [0],
    "omega||shake-texture||16554559776402": 6,

    "ttl||shake-texture||1655455977640": 6000,
    "tt0||shake-texture||1655455977640": 21000,
    "alpha||shake-texture||1655455977640": 0.12,
    "scope||shake-texture||1655455977640": [0],
    "omega||shake-texture||1655455977640": 6,

    "tt0||imagepostprocessing||1655456992808||": 14000,
    "scope||imagepostprocessing||1655456992808||": [0],
    "effect||imagepostprocessing||1655456992808||":
      "CameraFilterPack_FX_EarthQuake",
    "ttl||imagepostprocessing||1655456992808||": 13000,

    "tt0||imagepostprocessing||1655457121271": 27000,
    "scope||imagepostprocessing||1655457121271": [0],
    "effect||imagepostprocessing||1655457121271":
      "CameraFilterPack_Broken_Screen",
    "ttl||imagepostprocessing||1655457121271": 2000,

    "file||render-texture||1655476446398":
      "https://firebasestorage.googleapis.com/v0/b/dixper-abae2.appspot.com/o/collections%2FQEOEcFGD7UozNiRSVcob%2Fskills%2F8J169p28kvr7VQ2KcdAx%2Finput-en-render-texture%7C%7C1655476446398.webm?alt=media&token=d5a2a9f3-19e0-44b6-bd5b-624468b96a72",
    "loop||render-texture||1655476446398": false,
    "tt0||render-texture||1655476446398": 0,
    "scope||render-texture||1655476446398": [0],
    "position||render-texture||1655476446398": [50, 20],
    "ttl||render-texture||1655476446398": 13000,
    "height||render-texture||1655476446398": 56,
    "width||render-texture||1655476446398": 31.5,
    "fade||render-texture||1655476446398": false,
  };

  dixperPluginSample.addActions(JSON.stringify(script), inputs);
};

const curse3 = () => {
  const script = [
    {
      ttl: 0,
      actions: [
        {
          inputKey: "imagePostProcessing||1655458793857",
          scope: "{{scope}}",
          key: "imagePostProcessing",
          component: "graphicsPostProcessor",
          type: "imagePostProcessing",
          version: 1,
          action: "start",
          metadata: { effect: "{{effect}}" },
          tt0: "{{tt0}}",
          ttl: "{{ttl}}",
        },
        {
          inputKey: "render-texture||1655458872441",
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
              loop: "{{loop}}",
            },
          },
          tt0: "{{tt0}}",
          ttl: "{{ttl}}",
        },
        {
          inputKey: "render-texture||1655476531159",
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
              loop: "{{loop}}",
            },
          },
          tt0: "{{tt0}}",
          ttl: "{{ttl}}",
        },
      ],
    },
  ];
  const inputs = {
    "ttl||imagepostprocessing||1655458793857": 30000,
    "effect||imagepostprocessing||1655458793857": "CameraFilterPack_FX_Drunk",
    "scope||imagepostprocessing||1655458793857": [0],
    "tt0||imagepostprocessing||1655458793857": 16000,

    "fade||render-texture||1655458872441": false,
    "tt0||render-texture||1655458872441": 11000,
    "ttl||render-texture||1655458872441": 16000,
    "loop||render-texture||1655458872441": false,
    "scope||render-texture||1655458872441": [0],
    "width||render-texture||1655458872441": 100,
    "position||render-texture||1655458872441": [0, 0],
    "height||render-texture||1655458872441": 100,
    "file||render-texture||1655458872441":
      "https://firebasestorage.googleapis.com/v0/b/dixper-abae2.appspot.com/o/collections%2FPzlHPiN27He1A32pu6c3%2Fskills%2FvutD3bKTwIS5GgZ7atXK%2Finput-en-render-texture%7C%7C1642610359788.webm?alt=media&token=9be4252f-6fbe-4dee-9124-2040572d5c54",

    "position||render-texture||1655476531159": [50, 20],
    "file||render-texture||1655476531159":
      "https://firebasestorage.googleapis.com/v0/b/dixper-abae2.appspot.com/o/collections%2FQEOEcFGD7UozNiRSVcob%2Fskills%2F8J169p28kvr7VQ2KcdAx%2Finput-en-render-texture%7C%7C1655476701698.webm?alt=media&token=3fbfc9d5-ae4f-4458-9ae7-21b3cb261c94",
    "height||render-texture||1655476531159": 56,
    "fade||render-texture||1655476531159": false,
    "width||render-texture||1655476531159": 31.5,
    "scope||render-texture||1655476531159": [0],
    "tt0||render-texture||1655476531159": 0,
    "ttl||render-texture||1655476531159": 13000,
    "loop||render-texture||1655476531159": false,
  };

  dixperPluginSample.addActions(JSON.stringify(script), inputs);
};

const curse4 = () => {
  const script = [
    {
      ttl: 0,
      actions: [
        {
          inputKey: "render-texture||1655459354410",
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
              loop: "{{loop}}",
            },
          },
          tt0: "{{tt0}}",
          ttl: "{{ttl}}",
        },
        {
          inputKey: "sound||1655561100886",
          scope: "{{scope}}",
          key: "sound",
          metadata: {
            file: "{{file}}",
            loop: "{{loop}}",
            volume: "{{volume}}",
          },
          tt0: "{{tt0}}",
          ttl: "{{ttl}}",
        },
      ],
    },
  ];
  const inputs = {
    "height||render-texture||1655459354410": 56,
    "loop||render-texture||1655459354410": false,
    "width||render-texture||1655459354410": 31.5,
    "fade||render-texture||1655459354410": false,
    "ttl||render-texture||1655459354410": 13000,
    "position||render-texture||1655459354410": [50, 20],
    "tt0||render-texture||1655459354410": 0,
    "file||render-texture||1655459354410":
      "https://firebasestorage.googleapis.com/v0/b/dixper-abae2.appspot.com/o/collections%2FQEOEcFGD7UozNiRSVcob%2Fskills%2F8J169p28kvr7VQ2KcdAx%2Finput-en-render-texture%7C%7C1655459354410.webm?alt=media&token=7c3ee377-2e42-4e67-8d3e-26b59c86d757",
    "scope||render-texture||1655459354410": [0],

    "file||sound||1655561100886":
      "https://firebasestorage.googleapis.com/v0/b/dixper-abae2.appspot.com/o/collections%2FQEOEcFGD7UozNiRSVcob%2Fskills%2F8J169p28kvr7VQ2KcdAx%2Finput-en-sound%7C%7C1655561100886.mp3?alt=media&token=a95009c6-eab2-4a14-8a2b-a27f5d816aef",
    "scope||sound||1655561100886": [0],
    "volume||sound||1655561100886": 0.2,
    "loop||sound||1655561100886": false,
    "tt0||sound||1655561100886": 13000,
    "ttl||sound||1655561100886": 32000,
  };

  dixperPluginSample.addActions(JSON.stringify(script), inputs);
};

const curse5 = () => {
  const script = [
    {
      ttl: 0,
      actions: [
        {
          inputKey: "sound||1655455745539",
          scope: "{{scope}}",
          key: "sound",
          metadata: {
            file: "{{file}}",
            loop: "{{loop}}",
            volume: "{{volume}}",
          },
          tt0: "{{tt0}}",
          ttl: "{{ttl}}",
        },
        {
          inputKey: "rotate-texture||1655460704247",
          scope: "{{scope}}",
          key: "rotate-texture",
          component: "graphics",
          type: "rotate-texture",
          version: 1,
          action: "start",
          metadata: {
            alpha: "{{alpha}}",
            omega: "{{omega}}",
            cursor: { file: "{{file}}" },
          },
          tt0: "{{tt0}}",
          ttl: "{{ttl}}",
        },
        {
          inputKey: "render-texture||1655461077470",
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
              loop: "{{loop}}",
            },
          },
          tt0: "{{tt0}}",
          ttl: "{{ttl}}",
        },
        {
          inputKey: "imagePostProcessing||1655461092402",
          scope: "{{scope}}",
          key: "imagePostProcessing",
          component: "graphicsPostProcessor",
          type: "imagePostProcessing",
          version: 1,
          action: "start",
          metadata: { effect: "{{effect}}" },
          tt0: "{{tt0}}",
          ttl: "{{ttl}}",
        },
        {
          inputKey: "swap-buttons||1655461113575",
          scope: "{{scope}}",
          key: "swap-buttons",
          component: "keyboard",
          type: "swap-buttons",
          version: 1,
          action: "start",
          metadata: { swaps: "{{swaps}}" },
          tt0: "{{tt0}}",
          ttl: "{{ttl}}",
        },
        {
          inputKey: "axis-multiplier||1655461135447",
          scope: "{{scope}}",
          key: "axis-multiplier",
          component: "mouse",
          type: "axis-multiplier",
          version: 1,
          action: "start",
          tt0: "{{tt0}}",
          ttl: "{{ttl}}",
          metadata: { x: "{{x_factor}}", y: "{{y_factor}}" },
        },
        {
          inputKey: "render-texture||1655476638634",
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
              loop: "{{loop}}",
            },
          },
          tt0: "{{tt0}}",
          ttl: "{{ttl}}",
        },
      ],
    },
  ];
  const inputs = {
    "ttl||sound||1655455745539": 32000,
    "loop||sound||1655455745539": false,
    "volume||sound||1655455745539": 0.4,
    "tt0||sound||1655455745539": 13000,
    "file||sound||1655455745539":
      "https://firebasestorage.googleapis.com/v0/b/dixper-abae2.appspot.com/o/collections%2FQEOEcFGD7UozNiRSVcob%2Fskills%2F8J169p28kvr7VQ2KcdAx%2Finput-en-sound%7C%7C1655660010664.mp3?alt=media&token=6a4e17ee-7e93-4bb6-9757-119f86f8c986",
    "scope||sound||1655455745539": [0],

    "ttl||rotate-texture||1655460704247": 30000,
    "omega||rotate-texture||1655460704247": 0,
    "tt0||rotate-texture||1655460704247": 12500,
    "file||rotate-texture||1655460704247": null,
    "alpha||rotate-texture||1655460704247": 3.14,
    "scope||rotate-texture||1655460704247": [0],

    "tt0||render-texture||1655461077470": 11000,
    "fade||render-texture||1655461077470": false,
    "file||render-texture||1655461077470":
      "https://firebasestorage.googleapis.com/v0/b/dixper-abae2.appspot.com/o/collections%2FQEOEcFGD7UozNiRSVcob%2Fskills%2FQgQuedE9Dml9Z2EfNc0f%2Finput-en-render-texture%7C%7C1654243334364.webm?alt=media&token=85fb7049-1cf6-445d-bff5-d521bd1e9e21",
    "height||render-texture||1655461077470": 100,
    "loop||render-texture||1655461077470": false,
    "ttl||render-texture||1655461077470": 30000,
    "width||render-texture||1655461077470": 100,
    "position||render-texture||1655461077470": [0, 0],
    "scope||render-texture||1655461077470": [0],

    "scope||imagepostprocessing||1655461092402": [0],
    "ttl||imagepostprocessing||1655461092402": 30000,
    "effect||imagepostprocessing||1655461092402": "CameraFilterPack_TV_Horror",
    "tt0||imagepostprocessing||1655461092402": 12500,

    "ttl||swap-buttons||1655461113575": 30000,
    "swaps||swap-buttons||1655461113575": [
      {
        vkey: [65, 68],
      },
    ],
    "scope||swap-buttons||1655461113575": [0],
    "tt0||swap-buttons||1655461113575": 12500,

    "x_factor||axis-multiplier||1655461135447": -1,
    "scope||axis-multiplier||1655461135447": [0],
    "ttl||axis-multiplier||1655461135447": 30000,
    "y_factor||axis-multiplier||1655461135447": -1,
    "tt0||axis-multiplier||1655461135447": 12500,

    "position||render-texture||1655476638634": [50, 20],
    "tt0||render-texture||1655476638634": 0,
    "height||render-texture||1655476638634": 56,
    "file||render-texture||1655476638634":
      "https://firebasestorage.googleapis.com/v0/b/dixper-abae2.appspot.com/o/collections%2FQEOEcFGD7UozNiRSVcob%2Fskills%2F8J169p28kvr7VQ2KcdAx%2Finput-en-render-texture%7C%7C1655476638634.webm?alt=media&token=50877fbc-c943-477b-bb2f-d9ed5b8503e9",
    "scope||render-texture||1655476638634": [0],
    "loop||render-texture||1655476638634": false,
    "ttl||render-texture||1655476638634": 13000,
    "width||render-texture||1655476638634": 31.5,
    "fade||render-texture||1655476638634": false,
  };

  dixperPluginSample.addActions(JSON.stringify(script), inputs);
};

const curse6 = () => {
  const script = [
    {
      ttl: 0,
      actions: [
        {
          inputKey: "swap-buttons||1655461423564",
          scope: "{{scope}}",
          key: "swap-buttons",
          component: "keyboard",
          type: "swap-buttons",
          version: 1,
          action: "start",
          metadata: { swaps: "{{swaps}}" },
          tt0: "{{tt0}}",
          ttl: "{{ttl}}",
        },
        {
          inputKey: "swap-buttons||1655461429770",
          scope: "{{scope}}",
          key: "swap-buttons",
          component: "keyboard",
          type: "swap-buttons",
          version: 1,
          action: "start",
          metadata: { swaps: "{{swaps}}" },
          tt0: "{{tt0}}",
          ttl: "{{ttl}}",
        },
        {
          inputKey: "axis-multiplier||1655461581590",
          scope: "{{scope}}",
          key: "axis-multiplier",
          component: "mouse",
          type: "axis-multiplier",
          version: 1,
          action: "start",
          tt0: "{{tt0}}",
          ttl: "{{ttl}}",
          metadata: { x: "{{x_factor}}", y: "{{y_factor}}" },
        },
        {
          inputKey: "render-texture||1655476701698",
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
              loop: "{{loop}}",
            },
          },
          tt0: "{{tt0}}",
          ttl: "{{ttl}}",
        },
        {
          inputKey: "sound||1655567147620",
          scope: "{{scope}}",
          key: "sound",
          metadata: {
            file: "{{file}}",
            loop: "{{loop}}",
            volume: "{{volume}}",
          },
          tt0: "{{tt0}}",
          ttl: "{{ttl}}",
        },
        {
          inputKey: "imagePostProcessing||1655568272537",
          scope: "{{scope}}",
          key: "imagePostProcessing",
          component: "graphicsPostProcessor",
          type: "imagePostProcessing",
          version: 1,
          action: "start",
          metadata: { effect: "{{effect}}" },
          tt0: "{{tt0}}",
          ttl: "{{ttl}}",
        },
      ],
    },
  ];
  const inputs = {
    "tt0||swap-buttons||1655461423564": 15000,
    "swaps||swap-buttons||1655461423564": [
      {
        vkey: [65, 68],
      },
    ],
    "scope||swap-buttons||1655461423564": [0],
    "ttl||swap-buttons||1655461423564": 20000,

    "scope||swap-buttons||1655461429770": [0],
    "tt0||swap-buttons||1655461429770": 15000,
    "swaps||swap-buttons||1655461429770": [
      {
        vkey: [87, 83],
      },
    ],
    "ttl||swap-buttons||1655461429770": 20000,

    "y_factor||axis-multiplier||1655461581590": -1,
    "tt0||axis-multiplier||1655461581590": 15000,
    "scope||axis-multiplier||1655461581590": [0],
    "ttl||axis-multiplier||1655461581590": 20000,
    "x_factor||axis-multiplier||1655461581590": -1,

    "file||render-texture||1655476701698":
      "https://firebasestorage.googleapis.com/v0/b/dixper-abae2.appspot.com/o/collections%2FQEOEcFGD7UozNiRSVcob%2Fskills%2F8J169p28kvr7VQ2KcdAx%2Finput-en-render-texture%7C%7C1655476531159.webm?alt=media&token=d7045ef1-a24e-473b-8d5d-40db19db63d4",
    "width||render-texture||1655476701698": 31.5,
    "height||render-texture||1655476701698": 56,
    "ttl||render-texture||1655476701698": 13000,
    "scope||render-texture||1655476701698": [0],
    "loop||render-texture||1655476701698": false,
    "position||render-texture||1655476701698": [50, 20],
    "tt0||render-texture||1655476701698": 0,
    "fade||render-texture||1655476701698": false,

    "loop||sound||1655567147620": false,
    "ttl||sound||1655567147620": 20000,
    "tt0||sound||1655567147620": 12000,
    "file||sound||1655567147620":
      "https://firebasestorage.googleapis.com/v0/b/dixper-abae2.appspot.com/o/collections%2FQEOEcFGD7UozNiRSVcob%2Fskills%2F8J169p28kvr7VQ2KcdAx%2Finput-en-sound%7C%7C1655567147620.mp3?alt=media&token=47e4fa2e-ad1d-47ff-ac85-1dc1758c9887",
    "scope||sound||1655567147620": [0],
    "volume||sound||1655567147620": 0.4,

    "scope||imagepostprocessing||1655568272537": [0],
    "tt0||imagepostprocessing||1655568272537": 15000,
    "effect||imagepostprocessing||1655568272537": "CameraFilterPack_FX_Drunk2",
    "ttl||imagepostprocessing||1655568272537": 20000,
  };

  dixperPluginSample.addActions(JSON.stringify(script), inputs);
};
