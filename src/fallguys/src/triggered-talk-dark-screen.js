const images = [];
const sprites = [];
const sounds = [];

// INPUTS PARAMS

let smoke,
  alpha = 0;

// DIXPER SDK INJECTED CLASS

const dixperPluginSample = new DixperSDKLib({
  pixi: {
    enable: true,
    files: [...images, ...sprites, ...sounds],
  },
});

// INPUTS

const {
  matchText,
  minVolume,
  maxVolume,
  failDelay,
  alphaIncrease,
  alphaDecrease,
  alphaMax,
  reminderTitle,
} = DX_INPUTS;

// PIXIJS INITILIZE

dixperPluginSample.onPixiLoad = () => {
  init();
};

const init = () => {
  createReminder();
  createSmoke();
  const vumeter = new dxVumeter(
    DX_PIXI,
    DX_LAYERS.ui,
    {
      min: minVolume,
      max: maxVolume,
      delay: failDelay,
    },
    {
      position: {
        x: DX_WIDTH / 2 - 250,
        y: 100,
      },
    }
  );

  vumeter.start();

  vumeter.onVolumeNotMatch = (volume) => {
    removeSmoke(alphaDecrease);
    // console.log("onVolumeNotMatch", volume);
  };

  vumeter.onVolumeMatch = (volume) => {
    switch (true) {
      case alpha < 0.5 && alpha >= 0:
        addSmoke(alphaIncrease);
        break;
      case alpha >= 0.5 && alpha < 0.7:
        addSmoke(alphaIncrease - 0.1);
        break;
      case alpha >= 0.7 && alpha < 0.8:
        addSmoke(alphaIncrease - 0.15);
        break;
      case 0.95 > alpha && alpha >= 0.8:
        addSmoke(alphaIncrease - 0.2);
        break;
    }
    addFloatingText();
    // console.log("onVolumeMatch", volume);
  };
};

const addFloatingText = () => {
  const randomRect = {
    min: DX_WIDTH / 2 - 200,
    max: DX_WIDTH / 2 + 100,
  };

  const coordinates = getRandomCoordinates(randomRect);

  const floatingText = new dxFloatingText(
    DX_PIXI,
    DX_LAYERS.ui,
    matchText,
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

const createSmoke = () => {
  smoke = new PIXI.Graphics();
  smoke.x = 0;
  smoke.y = 0;
  smoke.beginFill(0x12141a, 0);
  smoke.drawRect(0, 0, DX_WIDTH, DX_HEIGHT);
  smoke.endFill();

  DX_LAYERS.ui.addChild(smoke);
};

const removeSmoke = (alphaParam) => {
  if (alpha > alphaParam) {
    alpha -= alphaParam;
    smoke.clear();
    smoke.beginFill(0x12141a, alpha);
    smoke.drawRect(0, 0, DX_WIDTH, DX_HEIGHT);
    smoke.endFill();
  }
};

const addSmoke = (alphaParam) => {
  if (alpha < alphaMax) {
    alpha += alphaParam;
    smoke.clear();
    smoke.beginFill(0x12141a, alpha);
    smoke.drawRect(0, 0, DX_WIDTH, DX_HEIGHT);
    smoke.endFill();
  }
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
      zIndex: 80,
    }
  );
};
