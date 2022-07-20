const images = [];
const sprites = [];
const sounds = [];

let onKeySub;
let counterPanel;
let countFault = 0;

let isRunning = false;

// INPUTS PARAMS

let reminderTitle,
  lowText,
  highText,
  blahText,
  countDownText1,
  countDownText2,
  minVolume,
  maxVolume,
  failDelay,
  maxFail;

// DIXPER SDK INJECTED CLASS

const dixperPluginSample = new DixperSDKLib({
  pixi: {
    enable: true,
    files: [...images, ...sprites, ...sounds],
  },
});

// INPUTS

dixperPluginSample.inputs$.subscribe((inputs) => {
  minVolume = inputs.minVolume || 0.3;
  maxVolume = inputs.maxVolume || 1;
  failDelay = inputs.failDelay || 400;
  countDownText1 = inputs.countDownText1 || "No dejes de hablar!!!";
  countDownText2 = inputs.countDownText2 || "No dejes de hablar!!!";
  lowText = inputs.lowText || "mas alto!";
  highText = inputs.highText || "No me grites!!!";
  blahText = inputs.blahText || "Blah";
  maxFail = inputs.maxFail || 10;
  moveLockDelay = inputs.moveLockDelay || 5000;
  reminderTitle = inputs.reminderTitle || "Si dejas de hablar...QUIETO!!!!";
});

// PIXIJS INITILIZE

dixperPluginSample.onPixiLoad = () => {
  createVumeter();

  const initialCountdown = addCountdown(countDownText1);
  initialCountdown.onOutFinish = () => {
    createReminder();
    createTimer();
    isRunning = true;
  };
};

const createVumeter = () => {
  const vumeter = new dxVumeter(
    dixperPluginSample.pixi,
    dixperPluginSample.uiLayer,
    {
      min: minVolume,
      max: maxVolume,
      delay: failDelay,
    },
    {
      position: {
        x: DX_WIDTH / 2,
        y: 100,
      },
    }
  );

  vumeter.start();

  vumeter.onVolumeNotMatch = (volume) => {
    if (isRunning) {
      console.log("count", countFault);

      if (countFault >= maxFail) {
        moveLock();
        isRunning = false;
        setTimeout(() => {
          countFault = 0;
          isRunning = true;
        }, 6000);
        setTimeout(() => {
          addCountdown(countDownText2);
        }, 3500);
      } else {
        if (volume <= minVolume) {
          addFloatingText(lowText, 600);
        } else if (volume > maxVolume) {
          addFloatingText(highText, 600);
        }
        countFault++;
      }
    }
  };

  vumeter.onVolumeMatch = (volume) => {
    addFloatingText(blahText, 350);
    // const random = Math.floor(Math.random() * 3);
    // switch (random) {
    //   case 0:
    //     addFloatingText('♩', 350);
    //     break;
    //   case 1:
    //     addFloatingText('♪', 350);
    //     break;
    //   case 2:
    //     addFloatingText('♫', 350);
    //     break;

    //   default:
    //     break;
    // }
  };

  vumeter.onVolumeChange = (volume) => {};
};

const addCountdown = (text) => {
  const countdown = new dxCountDown(
    dixperPluginSample.pixi,
    "countDown",
    dixperPluginSample.uiLayer,
    3,
    text,
    {
      position: {
        x: DX_WIDTH / 2,
        y: DX_HEIGHT / 2,
      },
      scale: {
        x: 0.25,
        y: 0.25,
      },
      animationSpeed: 0.5,
    }
  );
  return countdown;
};

const addFloatingText = (label, size) => {
  const randomRect = {
    min: DX_WIDTH / 2 - 200,
    max: DX_WIDTH / 2 + 100,
  };

  const coordinates = getRandomCoordinates(randomRect);

  const floatingText = new dxFloatingText(
    dixperPluginSample.pixi,
    dixperPluginSample.uiLayer,
    label,
    size,
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

const createReminder = () => {
  const reminder = new dxPanel(
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

const createTimer = () => {
  const timestampUntilSkillFinish = dixperPluginSample.context.skillEnd;
  const millisecondsToFinish = timestampUntilSkillFinish - Date.now();
  const interval = 1000;

  const timer = new dxTimer(
    dixperPluginSample.pixi,
    "timer",
    dixperPluginSample.uiLayer,
    millisecondsToFinish,
    interval,
    {
      position: {
        x: (3 * DX_WIDTH) / 4,
        y: 100,
      },
      animationSpeed: 0.5,
    }
  );

  timer.onTimerStart = () => {};

  timer.onTimerFinish = () => {};
};

const moveLock = () => {
  dixperPluginSample.addActions(
    JSON.stringify([
      {
        ttl: 5000,
        actions: [
          {
            inputKey: "keyboard-filter-0-2",
            scope: "{{scope}}",
            key: "keyboard-filter",
            component: "keyboard",
            type: "filter",
            version: 1,
            action: "start",
            metadata: { disable: [{ vkeys: "{{vkeys}}" }] },
            tt0: "{{tt0}}",
            ttl: "{{ttl}}",
          },
        ],
      },
    ]),
    {
      "scope||keyboard-filter-0-2": [0],
      "tt0||keyboard-filter-0-2": 0,
      "ttl||keyboard-filter-0-2": moveLockDelay,
      "vkeys||keyboard-filter-0-2": ["w", "a", "s", "d"],
    }
  );
};

// const punishment = () => {
//   dixperPluginSample.addActions(
//     JSON.stringify([
//       {
//         ttl: 3000,
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
