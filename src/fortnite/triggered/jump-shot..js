const images = [];
const sprites = [];
const sounds = [];

const jumpKey = 57;
const aimKey = 2;
const shotKey = 1;
const squatKey = 2;
const sprintKey = 1;

const delay = 500;

let lastUse = 0;
let onClickSub, onKeySub;

// DIXPER SDK INJECTED CLASS

const dixperPluginSample = new DixperSDKLib({
  pixi: {
    enable: true,
    files: [...images, ...sprites, ...sounds],
  },
});

// PIXIJS INITILIZE

dixperPluginSample.onPixiLoad = () => {
  const timestampUntilSkillFinish = dixperPluginSample.context.skillEnd;
  const millisecondsToFinish = timestampUntilSkillFinish - Date.now();
  const interval = 1000;

  createReminder();

  const timer = new dxTimer(
    dixperPluginSample.pixi,
    'timer',
    dixperPluginSample.uiLayer,
    millisecondsToFinish,
    interval,
    {
      position: {
        x: DX_WIDTH / 2 + 100,
        y: 100,
      },
      animationSpeed: 0.5,
    }
  );

  timer.onTimerStart = () => {
    console.log('Timer started');
    init();
  };

  timer.onTimerFinish = () => {
    console.log('Timer finished');

    onClickSub.unsubscribe();
    onKeySub.unsubscribe();
  };
};

const init = () => {
  onClickSub = dixperPluginSample.onMouseDown$.subscribe(onShot);
  onKeySub = dixperPluginSample.onKeyDown$.subscribe(onJump);
};

const onJump = (event) => {
  console.log(event.keycode);
  console.log(event.repeat);
  if (
    !event.repeat &&
    jumpKey === event.keycode &&
    Date.now() > lastUse + delay
  ) {
    lastUse = Date.now();
    const random = Math.floor(Math.random() * 4);
    switch (random) {
      case 0:
        shot();
        break;
      case 1:
        squat();
        break;
      case 2:
        sprint();
        break;
      case 3:
        aim();
        break;
      default:
        break;
    }
  }
};

const onShot = (event) => {
  console.log(event);
  if (Date.now() > lastUse + delay) {
    if (shotKey === event.button) {
      lastUse = Date.now();
      const random = Math.floor(Math.random() * 4);
      switch (random) {
        case 0:
          jump();
          break;
        case 1:
          squat();
          break;
        case 2:
          sprint();
          break;
        case 3:
          aim();
          break;
        default:
          break;
      }
    } else if (aimKey === event.button) {
      lastUse = Date.now();
      const random = Math.floor(Math.random() * 4);
      switch (random) {
        case 0:
          jump();
          break;
        case 1:
          squat();
          break;
        case 2:
          sprint();
          break;
        case 3:
          shot();
          break;
        default:
          break;
      }
    }
  }
};

const jump = () => {
  setTimeout(() => {
    addFloatingText(`Fiuuum!`);
  }, 500);
  sendKey(32);
};

const sprint = () => {
  setTimeout(() => {
    addFloatingText(`Fiuuum!`);
  }, 500);
  sendKey(16);
};

const squat = () => {
  setTimeout(() => {
    addFloatingText(`Ouch!`);
  }, 500);
  sendKey(17);
};

const aim = () => {
  setTimeout(() => {
    addFloatingText(`!`);
  }, 500);
  setTimeout(() => {
    addFloatingText(`!`);
  }, 700);
  setTimeout(() => {
    addFloatingText(`!`);
  }, 900);
  sendKey(2);
};

const shot = () => {
  setTimeout(() => {
    addFloatingText(`Pew!`);
  }, 500);
  setTimeout(() => {
    addFloatingText(`Pew!`);
  }, 700);
  sendKey(1);
};

const sendKey = (vkey) => {
  const tmp = Date.now();
  const inputs = {};

  inputs[`scope||key-presser||${tmp}`] = [0];
  inputs[`keypress||key-presser||${tmp}`] = [
    {
      vkey,
      begin: 0,
      duration: 400,
      'force-press': true,
    },
  ];
  inputs[`tt0||key-presser||${tmp}`] = 0;
  inputs[`ttl||key-presser||${tmp}`] = 400;

  dixperPluginSample.addActions(
    JSON.stringify([
      {
        ttl: 400,
        actions: [
          {
            inputKey: `key-presser||${tmp}`,
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
    { ...inputs }
  );
};

const createReminder = () => {
  setTimeout(() => {
    const reminder = new dxPanel(
      dixperPluginSample.pixi,
      'reminder',
      dixperPluginSample.uiLayer,
      'Salta por tu vida!!',
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
  }, 1000);
};

const addFloatingText = (text) => {
  const randomRect = {
    min: DX_WIDTH / 2 - 200,
    max: DX_WIDTH / 2 + 100,
  };

  const coordinates = getRandomCoordinates(randomRect);

  const floatingText = new dxFloatingText(
    dixperPluginSample.pixi,
    dixperPluginSample.uiLayer,
    `${text}`,
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
