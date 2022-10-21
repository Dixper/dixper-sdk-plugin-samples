const images = [
  // {
  //   name: "darkScreen",
  //   url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/phasmophobia/src/phasmophobia/assets/images/dark-screen.png",
  // },
  {
    name: "toxicBar",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fallguys/assets/images/farts-bar-fallguys.png",
  },
];
const sprites = [
  {
    name: "ghostReminder",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/phasmophobia/assets/spritesheets/phasmoReminder.json",
  },
];
const sounds = [
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/phasmophobia/assets/sounds/SwitchGrito.mp3",
];

// INPUTS PARAMS

let smoke;
let alpha = 1;
let lightOutSFX;

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
  setTimeout(() => init(), 1000);
  // init();
};

const init = () => {
  createLightOutSFX();
  lightOutSFX.play({ volume: 3 });
  createSmoke();
  // createToxicBar();
  createReminder();
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
        x: DX_WIDTH / 2 - 200,
        y: 100,
      },
    },
    "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/phasmophobia/assets/images/vumeter.png",

    "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/phasmophobia/assets/images/arrow.png"
  );

  vumeter.start();

  // console.log("vumeter", vumeter);

  vumeter.onVolumeNotMatch = (volume) => {
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
      case alpha >= 0.8:
        addSmoke(alphaIncrease - 0.2);
        break;
    }
    addFloatingText();
    // console.log("onVolumeNotMatch", volume);
  };

  vumeter.onVolumeMatch = (volume) => {
    removeSmoke(alphaDecrease);
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
  smoke.beginFill(0x000000, 1);
  smoke.drawRect(0, 0, DX_WIDTH, DX_HEIGHT);
  smoke.endFill();

  DX_LAYERS.ui.addChild(smoke);
};

const removeSmoke = (alphaParam) => {
  if (alpha > alphaParam) {
    alpha -= alphaParam;
    smoke.clear();
    smoke.beginFill(0x000000, alpha);
    smoke.drawRect(0, 0, DX_WIDTH, DX_HEIGHT);
    smoke.endFill();
  }
};

const addSmoke = (alphaParam) => {
  if (alpha < alphaMax) {
    alpha += alphaParam;
    smoke.clear();
    smoke.beginFill(0x000000, alpha);
    smoke.drawRect(0, 0, DX_WIDTH, DX_HEIGHT);
    smoke.endFill();
  }
};

// const createToxicBar = () => {
//   const toxicBar = new PIXI.Sprite.from(DX_PIXI.resources.toxicBar.texture);
//   toxicBar.x = DX_WIDTH / 2 - 250;
//   toxicBar.y = 100;
//   toxicBar.anchor.set(0.5);
//   toxicBar.zIndex = 99;

//   DX_LAYERS.top.addChild(toxicBar);
// };

const createReminder = () => {
  const reminder = new dxPanel(
    DX_PIXI,
    "ghostReminder",
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
      text: {
        fontSize: 36,
        lineHeight: 35,
        fill: ["#000000"],
        strokeThickness: 0,
        dropShadowDistance: 0,
      },
    }
  );
};

const createLightOutSFX = () => {
  lightOutSFX = PIXI.sound.Sound.from(sounds[0]);
};
