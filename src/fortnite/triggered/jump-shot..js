const images = [];
const sprites = [];
const sounds = [];

let lastUse = 0;
let onClickSub, onKeySub;

// INPUTS PARAMS

let clickKey,
  delay,
  reminderTitle,
  jumpKey,
  aimKey,
  shotKey,
  jumpText,
  sprintText,
  squatText,
  aimText,
  shotText;

// DIXPER SDK INJECTED CLASS

const dixperPluginSample = new DixperSDKLib({
  pixi: {
    enable: true,
    files: [...images, ...sprites, ...sounds],
  },
});

// INPUTS

dixperPluginSample.inputs$.subscribe((inputs) => {
  reminderTitle = inputs.reminderTitle || 'Salta por tu vida!!';
  clickKey = inputs.clickKey || 2;
  delay = inputs.delay || 500;
  jumpKey = inputs.jumpKey || 57;
  aimKey = inputs.aimKey || 2;
  shotKey = inputs.shotKey || 1;
  shotText = inputs.shotText || 'Pew!';
  jumpText = inputs.jumpText || 'Fiuuum!';
  aimText = inputs.aimText || '!';
  sprintText = inputs.sprintText || 'Fiuuum!';
  squatText = inputs.squatText || 'Ouch!';
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
    init();
  };

  timer.onTimerFinish = () => {
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
    addFloatingText(jumpText);
  }, 500);
  sendKey(32);
};

const sprint = () => {
  setTimeout(() => {
    addFloatingText(sprintText);
  }, 500);
  sendKey(16);
};

const squat = () => {
  setTimeout(() => {
    addFloatingText(squatText);
  }, 500);
  sendKey(17);
};

const aim = () => {
  setTimeout(() => {
    addFloatingText(aimText);
  }, 500);
  setTimeout(() => {
    addFloatingText(aimText);
  }, 700);
  setTimeout(() => {
    addFloatingText(aimText);
  }, 900);
  sendKey(2);
};

const shot = () => {
  setTimeout(() => {
    addFloatingText(shotText);
  }, 500);
  setTimeout(() => {
    addFloatingText(shotText);
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
