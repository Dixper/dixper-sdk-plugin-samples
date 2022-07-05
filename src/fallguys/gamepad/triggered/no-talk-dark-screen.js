const images = [];
const sprites = [];
const sounds = [];

// INPUTS PARAMS

let smoke,
  minVolume,
  maxVolume,
  failDelay,
  matchText,
  reminderTitle,
  alphaMax,
  alphaIncrease;
let alpha = 0;

// DIXPER SDK INJECTED CLASS

const dixperPluginSample = new DixperSDKLib({
  pixi: {
    enable: true,
    files: [...images, ...sprites, ...sounds],
  },
});

// INPUTS

dixperPluginSample.inputs$.subscribe((inputs) => {
  matchText = inputs.matchText || `Boing!!!`;
  minVolume = inputs.minVolume || 0.3;
  maxVolume = inputs.maxVolume || 1;
  failDelay = inputs.failDelay || 400;
  alphaIncrease = inputs.alphaIncrease || 0.02;
  alphaMax = inputs.alphaMax || 0.9;
  reminderTitle = inputs.reminderTitle || 'Boing...boing....boing!!!';
});

// PIXIJS INITILIZE

dixperPluginSample.onPixiLoad = () => {
  init();
};

const init = () => {
  createSmoke();
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
        x: DX_WIDTH / 2 - 250,
        y: 100,
      },
    }
  );

  vumeter.start();

  vumeter.onVolumeNotMatch = (volume) => {
    addSmoke(alphaIncrease);
    addFloatingText();
    console.log('onVolumeNotMatch', volume);
  };

  vumeter.onVolumeMatch = (volume) => {
    removeSmoke(alphaIncrease);
    addFloatingText();
    console.log('onVolumeMatch', volume);
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
  smoke.beginFill(0x1ecd4c, 0);
  smoke.drawRect(0, 0, DX_WIDTH, DX_HEIGHT);
  smoke.endFill();

  dixperPluginSample.uiLayer.addChild(smoke);
};

const removeSmoke = (alphaParam) => {
  if (alpha > alphaParam) {
    alpha -= alphaParam;
    smoke.clear();
    smoke.beginFill(0x1ecd4c, alpha);
    smoke.drawRect(0, 0, DX_WIDTH, DX_HEIGHT);
    smoke.endFill();
  }
};

const addSmoke = (alphaParam) => {
  if (alpha < alphaMax) {
    alpha += alphaParam;
    smoke.clear();
    smoke.beginFill(0x1ecd4c, alpha);
    smoke.drawRect(0, 0, DX_WIDTH, DX_HEIGHT);
    smoke.endFill();
  }
};
