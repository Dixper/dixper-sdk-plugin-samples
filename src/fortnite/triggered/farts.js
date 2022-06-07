// Cada vez que haces una acción suena un pedo y aparece una animación por encima del personaje, cada vez salen más más y se inunda la pantalla con "efecto gas"
const images = [];
const sprites = [
  {
    name: "reminder",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/spritesheets/challenge-reminder.json",
  },
  {
    name: "farts",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/spritesheets/farts.json",
  },
  {
    name: "clearSmoke",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/spritesheets/clear-smoke.json",

    // url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/spritesheets/clear-smoke.json",
  },
  {
    name: "smokeLevel1",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/spritesheets/smoke-level-1.json",
  },
  {
    name: "smokeLevel2",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/spritesheets/smoke-level-2.json",
  },
  {
    name: "smokeLevel3",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/spritesheets/smoke-level-3.json",
  },
  {
    name: "smokeLevel4",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/spritesheets/smoke-level-4.json",
  },
  {
    name: "smokeLevel5",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/spritesheets/smoke-level-5.json",
  },
  {
    name: "targetCounter",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/spritesheets/target-counter.json",
  },
  {
    name: "timerCountdown",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/spritesheets/countdown-challenge.json",
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

let onKeySub;
let onClickSub;
let clickKeys = [1, 2, 3];
let actionKeys = [15, 17, 29, 30, 31, 32, 42, 56, 57];
let countClick = 0;

// DIXPER SDK INJECTED CLASS

const dixperPluginSample = new DixperSDKLib({
  pixi: {
    enable: true,
    files: [...images, ...sprites, ...sounds],
  },
});

// PIXIJS INITILIZE

dixperPluginSample.onPixiLoad = () => {
  init();
  createReminder();
  const timestampUntilSkillFinish = dixperPluginSample.context.skillEnd;
  const millisecondsToFinish = timestampUntilSkillFinish - Date.now();
  const interval = 1000;

  const timer = new dxTimer(
    dixperPluginSample.pixi,
    "timerCountdown",
    dixperPluginSample.uiLayer,
    millisecondsToFinish,
    interval,
    {
      position: {
        x: DX_WIDTH / 2,
        y: 100,
      },
      animationSpeed: 0.3,
    }
  );

  timer.onTimerStart = () => {};

  timer.onTimerFinish = () => {
    onClickSub.unsubscribe();
    onKeySub.unsubscribe();
  };
};

const init = () => {
  onClickSub = dixperPluginSample.onMouseDown$.subscribe(onClick);
  onKeySub = dixperPluginSample.onKeyDown$.subscribe(onKeyboard);
};

createReminder = () => {
  const reminder = new dxPanel(
    dixperPluginSample.pixi,
    "reminder",
    dixperPluginSample.uiLayer,
    "Que cene anoche???",
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
  if (clickKeys.includes(event.button)) {
    countClick++;
    if (countClick % 3 === 0) {
      createFarts();
    }
    switch (countClick) {
      case 5:
        addSmoke(1);
        console.log("level 1");
        break;
      case 10:
        addSmoke(2);
        console.log("level 2");
        break;
      case 15:
        addSmoke(3);
        console.log("level 3");
        break;
      case 20:
        addSmoke(4);
        console.log("level 4");
        break;
      case 25:
        addSmoke(5);
        console.log("level 5");
        break;
      case 30:
        clearSmoke();
        console.log("limpia");
        break;
    }
  }
};

const onKeyboard = (event) => {
  // console.log("keycode", event.keycode);
  if (actionKeys.includes(event.keycode)) {
    countClick++;
    if (countClick % 3 === 0) {
      createFarts();
    }
    switch (countClick) {
      case 5:
        addSmoke(1);
        console.log("level 1");
        break;
      case 10:
        addSmoke(2);
        console.log("level 2");
        break;
      case 15:
        addSmoke(3);
        console.log("level 3");
        break;
      case 20:
        addSmoke(4);
        console.log("level 4");
        break;
      case 25:
        addSmoke(5);
        console.log("level 5");
        break;
      case 30:
        clearSmoke();
        console.log("limpia");
        break;
    }
  }
};

createFarts = () => {
  let farts = new dxAnimatedElement(
    dixperPluginSample.pixi,
    "farts",
    dixperPluginSample.uiLayer,
    "",
    {
      animationSpeed: 0.5,
      position: {
        x: DX_WIDTH / 2,
        y: DX_HEIGHT / 2,
      },
    }
  );
  farts.onInFinish = () => {
    farts.remove();
  };
  console.log("pedo", farts);
};

addSmoke = (level) => {
  let smoke = new dxAnimatedElement(
    dixperPluginSample.pixi,
    `smokeLevel${level}`,
    dixperPluginSample.uiLayer,
    "",
    {
      animationSpeed: 0.5,
      position: {
        x: DX_WIDTH / 2,
        y: DX_HEIGHT / 2,
      },
      // size: {
      //   width: DX_WIDTH,
      //   height: DX_HEIGHT,
      // },
    }
  );
  console.log("smoke", smoke);
};

clearSmoke = () => {
  let clear = new dxAnimatedElement(
    dixperPluginSample.pixi,
    "clearSmoke",
    dixperPluginSample.uiLayer,
    "",
    {
      animationSpeed: 0.5,
      position: {
        x: DX_WIDTH / 2,
        y: DX_HEIGHT / 2,
      },
      // size: {
      //   width: 1920,
      //   height: 1080,
      // },
    }
  );
  console.log("clear", clear);
};

// //SUSTO
// const sendJumpscare = () => {
//   dixperPluginSample.addActions(
//     JSON.stringify([
//       {
//         ttl: 10000,
//         actions: [
//           {
//             inputKey: "render-texture-0-0",
//             scope: "{{scope}}",
//             key: "render-texture",
//             component: "graphics",
//             type: "render-texture",
//             version: 1,
//             action: "start",
//             metadata: {
//               file: "{{file}}",
//               textureProperties: {
//                 width: "{{width}}",
//                 height: "{{height}}",
//                 position: "{{position}}",
//                 fadeIn: "{{fade}}",
//               },
//             },
//             tt0: "{{tt0}}",
//             ttl: "{{ttl}}",
//           },
//           {
//             inputKey: "sound-0-1",
//             scope: "{{scope}}",
//             key: "sound",
//             metadata: { file: "{{file}}", volume: "{{volume}}" },
//             tt0: "{{tt0}}",
//             ttl: "{{ttl}}",
//           },
//         ],
//       },
//     ]),
//     {
//       "file||sound-0-1":
//         "https://firebasestorage.googleapis.com/v0/b/dixper-abae2.appspot.com/o/skills%2FIUvnTvzg4RsRUwoll9pZ%2FAudio%20bicho%20cara%20fea.mp3?alt=media&token=a08c25ff-c138-4d2d-93f1-106106766ec0",
//       "ttl||sound-0-1": 10000,
//       "scope||sound-0-1": 100,
//       "file||render-texture-0-0":
//         "https://firebasestorage.googleapis.com/v0/b/dixper-abae2.appspot.com/o/skills%2FX46ap915je4GhT9iGHLT%2Fassets%2Fsusto-ligth-1.png?alt=media&token=c8db59a9-6bd5-463f-99b7-0dead27aec3f",
//       "ttl||render-texture-0-0": 10000,
//       "scope||render-texture-0-0": 100,
//     }
//   );
// };
