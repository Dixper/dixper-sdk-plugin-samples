const images = [];
const sprites = [
  {
    name: "reminder",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/spritesheets/challenge-reminder.json",
  },
];
const sounds = [];

let onKeySub;
let counterPanel;

// DIXPER SDK INJECTED CLASS

const dixperPluginSample = new DixperSDKLib({
  pixi: {
    enable: true,
    files: [...images, ...sprites, ...sounds],
  },
});

// PIXIJS INITILIZE

dixperPluginSample.onPixiLoad = () => {
  createReminder();
  addCountdown();
  idiotizer();
};

const init = () => {
  const vumeter = new dxVumeter(
    dixperPluginSample.pixi,
    dixperPluginSample.uiLayer,
    {
      min: 0.5, //what???
      max: 1,
      delay: 1000, //i dont understand?
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
    if (volume < 0.1) {
      console.log("Demasiado bajo!");
      addFloatingText();
    } else if (volume <= 0.3 && volume > 0.1) {
      console.log("perfect");
      addFloatingText2();
    } else if (volume > 0.4) {
      console.log("no grites");
      addFloatingText3();
    }
  };

  vumeter.onVolumeMatch = (volume) => {};

  vumeter.onVolumeChange = (volume) => {};
};

const addCountdown = () => {
  const countdown = new dxCountDown(
    dixperPluginSample.pixi,
    "countDown",
    dixperPluginSample.uiLayer,
    3,
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

  countdown.onOutFinish = () => {
    init();
    createTimer();
  };
};

const addFloatingText = () => {
  const randomRect = {
    min: DX_WIDTH / 2 - 200,
    max: DX_WIDTH / 2 + 100,
  };

  const coordinates = getRandomCoordinates(randomRect);

  const floatingText = new dxFloatingText(
    dixperPluginSample.pixi,
    dixperPluginSample.uiLayer,
    "Keep talking!!!",
    800,
    randomRect,
    {
      position: coordinates,
      random: true,
    }
  ).start();
};

const addFloatingText2 = () => {
  const randomRect = {
    min: DX_WIDTH / 2 - 200,
    max: DX_WIDTH / 2 + 100,
  };

  const coordinates = getRandomCoordinates(randomRect);

  const floatingText = new dxFloatingText(
    dixperPluginSample.pixi,
    dixperPluginSample.uiLayer,
    "Good job!!!",
    600,
    randomRect,
    {
      position: coordinates,
      random: true,
    }
  ).start();
};

const addFloatingText3 = () => {
  const randomRect = {
    min: DX_WIDTH / 2 - 200,
    max: DX_WIDTH / 2 + 100,
  };

  const coordinates = getRandomCoordinates(randomRect);

  const floatingText = new dxFloatingText(
    dixperPluginSample.pixi,
    dixperPluginSample.uiLayer,
    "Why screaming???",
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

const createReminder = () => {
  const reminder = new dxPanel(
    dixperPluginSample.pixi,
    "reminder",
    dixperPluginSample.uiLayer,
    "Si dejas de hablar...QUIETO!!!!",
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
        x: DX_WIDTH / 2,
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

const idiotizer = () => {
  dixperPluginSample.addActions(
    JSON.stringify([
      {
        actions: [
          {
            inputKey: "micDuplicator||1612973133021",
            scope: "{{scope}}",
            key: "micDuplicator",
            component: "audio",
            type: "micDuplicator",
            version: 1,
            action: "start",
            metadata: { volume: "{{volume}}", delay: "{{delay}}" },
            tt0: "{{tt0}}",
            ttl: "{{ttl}}",
          },
        ],
        ttl: 0,
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
