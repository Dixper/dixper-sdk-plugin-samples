// Cada vez que haces una acción suena un pedo y aparece una animación por encima del personaje, cada vez salen más más y se inunda la pantalla con "efecto gas"
const images = [];
const sprites = [
  {
    name: 'farts',
    url: 'https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/spritesheets/farts.json',
  },
  {
    name: 'clearSmoke',
    url: 'https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/spritesheets/clear-smoke.json',

    // url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/spritesheets/clear-smoke.json",
  },
  {
    name: 'smokeLevel1',
    url: 'https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/spritesheets/smoke-level-1.json',
  },
  {
    name: 'smokeLevel2',
    url: 'https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/spritesheets/smoke-level-2.json',
  },
  {
    name: 'smokeLevel3',
    url: 'https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/spritesheets/smoke-level-3.json',
  },
  {
    name: 'smokeLevel4',
    url: 'https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/spritesheets/smoke-level-4.json',
  },
  {
    name: 'smokeLevel5',
    url: 'https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/spritesheets/smoke-level-5.json',
  },
  {
    name: 'targetCounter',
    url: 'https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/spritesheets/target-counter.json',
  },
  {
    name: 'timerCountdown',
    url: 'https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/spritesheets/countdown-challenge.json',
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

let onKeySub;
let onClickSub;
let clickKeys = [1, 2, 3];
let actionKeys = [15, 17, 29, 30, 31, 32, 42, 56, 57];
let countClick = 0;
let smoke;

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

  smoke = new PIXI.Graphics();
  smoke.x = 0;
  smoke.y = 0;
  smoke.beginFill(0x00ff00, 0.1);
  smoke.drawRect(0, 0, DX_WIDTH, DX_HEIGHT);
  smoke.endFill();
};

const init = () => {
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
        Math.random() * (0.5 - 0.1) + 0.1
      );
    }
    switch (countClick) {
      case 10:
        createSmoke();
        break;
      case 20:
        addSmoke(0.3);
        break;
      case 29:
        addSmoke(0.5);
        break;
      case 40:
        addSmoke(0.7);
        break;
      case 50:
        addSmoke(0.9);
        break;
    }
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
        Math.random() * (0.5 - 0.1) + 0.1
      );
    }
    switch (countClick) {
      case 10:
        createSmoke();
        break;
      case 20:
        addSmoke(0.3);
        break;
      case 29:
        addSmoke(0.5);
        break;
      case 40:
        addSmoke(0.7);
        break;
      case 50:
        addSmoke(0.9);
        break;
    }
  }
};

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
