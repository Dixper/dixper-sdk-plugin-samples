const images = [];
const sprites = [
  {
    name: "farts",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/spritesheets/farts.json",
  },
  {
    name: "clearSmoke",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/spritesheets/clear-smoke.json",
  },
  {
    name: 'timerCountdown',
    url: 'https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/spritesheets/countdown-challenge.json',
  },
];
const sounds = [
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/sounds/farts/FART1.mp3",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/sounds/farts/FART2.mp3",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/sounds/farts/FART3.mp3",
];

let onKeySub;
let onClickSub;
let clickKeys = [1, 2, 3];
let actionKeys = [15, 17, 29, 30, 31, 32, 42, 56, 57];
let countClick = 0;
let smoke;
let alpha = 0;
let alphaIncrease = 0.02;
let randomSFX;

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
  const millisecondsToFinish = timestampUntilSkillFinish - Date.now() - 3000;
  const interval = 1000;

  const timer = new dxTimer(
    dixperPluginSample.pixi,
    'timerCountdown',
    dixperPluginSample.uiLayer,
    millisecondsToFinish,
    interval,
    {
      position: {
        x: DX_WIDTH / 2,
        y: 100,
      },
      animationSpeed: 0.3,
      zIndex: 99,
    }
  );

  timer.onTimerStart = () => {};

  timer.onTimerFinish = () => {
    clearSmoke();
    onClickSub.unsubscribe();
    onKeySub.unsubscribe();
  };
};

const init = () => {
  createSmoke();

  onClickSub = dixperPluginSample.onMouseDown$.subscribe(onClick);
  onKeySub = dixperPluginSample.onKeyDown$.subscribe(onKeyboard);
};

const onClick = (event) => {
  if (clickKeys.includes(event.button)) {
    countClick++;
    if (countClick % 1 === 0) {
      createFarts(
        Math.floor(
          Math.random() * (DX_WIDTH / 2 - 50 - (DX_WIDTH / 2 - 280)) +
            (DX_WIDTH / 2 - 280)
        ),
        Math.floor(
          Math.random() * (DX_HEIGHT - 350 - (DX_HEIGHT - 200)) +
            (DX_HEIGHT - 200)
        ),
        Math.random() * (0.5 - 0.1) + 0.1,
        Math.floor(Math.random() * 3)
      );
    }
    addSmoke(alphaIncrease);
  }
};

const onKeyboard = (event) => {
  // console.log("keycode", event.keycode);
  if (actionKeys.includes(event.keycode) && !event.repeat) {
    countClick++;
    if (countClick % 1 === 0) {
      createFarts(
        Math.floor(
          Math.random() * (DX_WIDTH / 2 - 50 - (DX_WIDTH / 2 - 280)) +
            (DX_WIDTH / 2 - 280)
        ),
        Math.floor(
          Math.random() * (DX_HEIGHT - 350 - (DX_HEIGHT - 200)) +
            (DX_HEIGHT - 200)
        ),
        Math.random() * (0.5 - 0.2) + 0.2,
        Math.floor(Math.random() * 3)
      );
    }
    addSmoke(alphaIncrease);
  }
};

<<<<<<< HEAD
createFarts = (posX, posY, size) => {
  let farts = new dxAnimatedElement(
    dixperPluginSample.pixi,
    'farts',
    dixperPluginSample.uiLayer,
    '',
    {
      animationSpeed: 0.5,
      position: {
        x: posX,
        y: posY,
      },
      scale: {
        x: size,
        y: size,
      },
      zIndex: 99,
    }
  );
  farts.onInFinish = () => {
    farts._destroy();
  };
};

// addSmoke = (level) => {
//   let smoke = new dxAnimatedElement(
//     dixperPluginSample.pixi,
//     `smokeLevel${level}`,
//     dixperPluginSample.uiLayer,
//     "",
//     {
//       animationSpeed: 0.5,
//       position: {
//         x: DX_WIDTH / 2,
//         y: DX_HEIGHT / 2,
//       },
//       scale: {
//         x: 1.5,
//         y: 1.5,
//       },
//     }
//   );
// };

createSmoke = () => {
  dixperPluginSample.uiLayer.addChild(smoke);
};

addSmoke = (alpha) => {
  smoke.clear();
  smoke.beginFill(0x00ff00, alpha);
  smoke.drawRect(0, 0, DX_WIDTH, DX_HEIGHT);

  smoke.endFill();
};

=======
>>>>>>> origin/aim-blur
createReminder = () => {
  const reminder = new dxPanel(
    dixperPluginSample.pixi,
    'reminder',
    dixperPluginSample.uiLayer,
    'Que cene anoche???',
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
      zIndex: 99,
    }
  );
};

createFarts = (posX, posY, size, randomSFX) => {
  let farts = new dxAnimatedElement(
    +-dixperPluginSample.pixi,
    "farts",
    dixperPluginSample.uiLayer,
    "",
    {
      animationSpeed: 0.5,
      position: {
        x: posX,
        y: posY,
      },
      scale: {
        x: size,
        y: size,
      },
      zIndex: 99,
    }
  );
  farts.onInFinish = () => {
    farts._destroy();
  };

  const fartsSFX = PIXI.sound.Sound.from(sounds[randomSFX]);
  fartsSFX.play();
};

createSmoke = () => {
  smoke = new PIXI.Graphics();
  smoke.x = 0;
  smoke.y = 0;
  smoke.beginFill(0x16f5c1, 0);
  smoke.drawRect(0, 0, DX_WIDTH, DX_HEIGHT);
  smoke.endFill();

  dixperPluginSample.uiLayer.addChild(smoke);
};

addSmoke = (alphaParam) => {
  alpha += alphaParam;
  smoke.clear();
  smoke.beginFill(0x16f5c1, alpha);
  smoke.drawRect(0, 0, DX_WIDTH, DX_HEIGHT);
  smoke.endFill();
};

clearSmoke = () => {
  let clear = new dxAnimatedElement(
    dixperPluginSample.pixi,
    'clearSmoke',
    dixperPluginSample.uiLayer,
    '',
    {
      animationSpeed: 0.5,
      position: {
        x: DX_WIDTH / 2,
        y: DX_HEIGHT / 2,
      },
      scale: {
        x: 1.5,
        y: 1.5,
      },
    }
  );
};
