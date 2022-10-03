const images = [];

const sprites = [
  {
    name: "halloweenTime",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/spritesheets/timer.json",
  },
];

const sounds = [
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/sounds/ambientSound_1min.mp3",
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
let timer, ambientSFX, randomTime;

const { durationSkill } = DX_INPUTS;

// PIXIJS INITILIZE

dixperPluginSample.onPixiLoad = () => {
  init();
};

// INIT CHALLENGE
const init = () => {
  setRandomJumpscare();
  setAmbientSound();
  createTimer();
  ambientSFX.play({ volume: 0.75 });
  if (randomTime) {
    console.log("susto en el segundo", randomTime / 1000);
    setTimeout(() => jumpscare(), randomTime);
  }
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
};

const setAmbientSound = () => {
  ambientSFX = PIXI.sound.Sound.from(sounds[0]);
};

const jumpscare = () => {
  dixperPluginSample.addParentSkill("2zQMEp3FcpirdrIKaFu3");
};

const setRandomJumpscare = () => {
  // const randomJumpscare = Math.floor(Math.random() * 10);
  const randomJumpscare = 1;
  console.log("randomJumpscare", randomJumpscare);
  if (randomJumpscare <= 3) {
    setRandomTimeJumpscare();
  }
};

const setRandomTimeJumpscare = () => {
  const randomNumber = Math.floor(Math.random() * 20);
  console.log("randomTime", randomNumber);
  randomTime = randomNumber * 1000;
};
