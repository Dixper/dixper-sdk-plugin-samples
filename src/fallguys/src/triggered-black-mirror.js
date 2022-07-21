const images = [];
const sprites = [];
const sounds = [];

//INPUTS PARAMS
let mirror;

// DIXPER SDK INJECTED CLASS

const dixperPluginSample = new DixperSDKLib({
  pixi: {
    enable: true,
    files: [...images, ...sprites, ...sounds],
  },
});

// INPUTS

const { timeDark, timeLight, reminderTitle, x, y } = DX_INPUTS;

// PIXIJS INITILIZE

dixperPluginSample.onPixiLoad = () => {
  init();
};

const init = () => {
  createReminder();
  createBlackMirror();
  createCountdown();
  setTimeout(() => addBlackMirror(), 4000);
};

const createReminder = () => {
  const reminder = new dxPanel(
    DX_PIXI,
    "reminder",
    DX_LAYERS.ui,
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

const createBlackMirror = () => {
  mirror = new PIXI.Graphics();
  mirror.x = 0;
  mirror.y = 0;
  mirror.beginFill(0x1ecd4c, 0);
  mirror.drawRect(0, 0, DX_WIDTH, DX_HEIGHT);
  mirror.endFill();

  DX_LAYERS.ui.addChild(mirror);
};

const addBlackMirror = () => {
  mirror.clear();
  mirror.beginFill(0x000000, 1);
  mirror.drawRect(0, 0, DX_WIDTH, DX_HEIGHT);
  mirror.endFill();
  setTimeout(() => removeBlackMirror(), timeDark);
};

const removeBlackMirror = () => {
  mirror.clear();
  mirror.beginFill(0x000000, 0);
  mirror.drawRect(0, 0, DX_WIDTH, DX_HEIGHT);
  mirror.endFill();
  setTimeout(() => addBlackMirror(), timeLight);
  createCountdown();
};

const createCountdown = () => {
  const countdown = new dxCountDown(
    DX_PIXI,
    "countDown",
    DX_LAYERS.ui,
    3,
    "OOPS...",
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
};
