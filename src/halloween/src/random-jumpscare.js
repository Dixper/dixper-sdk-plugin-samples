const images = [];

const sprites = [
  {
    name: "halloweenTime",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/spritesheets/timer.json",
  },
];

const sounds = [
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/sounds/You_Win_SFX.mp3",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/sounds/You_Loose_SFX.mp3",
];

// INPUTS PARAMS

// DIXPER SDK INJECTED CLASS

const dixperPluginSample = new DixperSDKLib({
  pixi: {
    enable: true,
    files: [...images, ...sprites, ...sounds],
  },
});

// INPUTS
let timer, ambientSFX, jumpscareSFX;

const { durationSkill } = DX_INPUTS;

// PIXIJS INITILIZE

dixperPluginSample.onPixiLoad = () => {
  init();
  setAmbientSound();
  setJumpscareSFX();
};

// INIT CHALLENGE

const init = () => {
  createTimer();
  ambientSFX.play({ volume: 0.75 });
};

const createTimer = () => {
  const interval = 1000;

  timer = new dxTimer(
    DX_PIXI,
    "halloweenTime",
    DX_LAYERS.ui,
    durationSkill,
    interval,
    {
      position: {
        x: 140,
        y: DX_HEIGHT / 2 - 300,
      },
      scale: {
        x: 1,
        y: 1,
      },
      animationSpeed: 0.5,
    }
  );
  timer.onTimerFinish = () => {
    dixperPluginSample.stopSkill();
    console.log("fin skill");
  };

  console.log("interval", timer.currentTime);
};

const setAmbientSound = () => {
  ambientSFX = PIXI.sound.Sound.from(sounds[0]);
};

const setJumpscareSFX = () => {
  jumpscareSFX = PIXI.sound.Sound.from(sounds[1]);
  //   challengeFailSFX.play({ volume: 0.75 });
};
