const images = [];
const sprites = [];
const sounds = [];

let onKeySub;
let squatEnable = true;
let squatCount = 0;

const squatKey = 29;
const squatDelay = 600;

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
};

const init = () => {
  onKeySub = dixperPluginSample.onKeyDown$.subscribe(addFloatingText);
  createTimer();
  createReminder();
};

const addFloatingText = (event) => {
  console.log(event);
  console.log(event.keycode === squatKey);
  console.log(squatEnable);

  if (squatEnable && event.keycode === squatKey) {
    console.log('as');

    squatEnable = false;
    setTimeout(() => {
      console.log('asD');
      squatEnable = true;
    }, squatDelay);

    squatCount++;

    const randomRect = {
      min: DX_WIDTH / 2 - 400,
      max: DX_WIDTH / 2,
    };

    const coordinates = getRandomCoordinates(randomRect);

    const floatingText = new dxFloatingText(
      dixperPluginSample.pixi,
      dixperPluginSample.uiLayer,
      `${squatCount}`,
      800,
      randomRect,
      {
        position: coordinates,
        random: true,
      }
    ).start();
  }
};

function getRandomCoordinates(rect) {
  let x = Math.random() * (rect.max - rect.min) + rect.min;
  let y = DX_HEIGHT / 2 - 100;
  return { x, y };
}

const createTimer = () => {
  const timestampUntilSkillFinish = dixperPluginSample.context.skillEnd;
  const millisecondsToFinish = timestampUntilSkillFinish - Date.now();
  const interval = 1000;

  const timer = new dxTimer(
    dixperPluginSample.pixi,
    'timer',
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

  timer.onTimerFinish = () => {
    onKeySub.unsubscribe();
  };
};

const createReminder = () => {
  const timestampUntilSkillFinish = dixperPluginSample.context.skillEnd;
  const millisecondsToFinish = timestampUntilSkillFinish - Date.now();
  const minutesToFinish = Math.floor(millisecondsToFinish / 60000);
  setTimeout(() => {
    const reminder = new dxPanel(
      dixperPluginSample.pixi,
      'reminder',
      dixperPluginSample.uiLayer,
      `100 sentadillas en ${minutesToFinish} minutos!!`,
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
