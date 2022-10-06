const images = [];

const sprites = [
  {
    name: "halloweenTime",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/spritesheets/timer_v2.json",
  },
];

const sounds = [
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/sounds/tension_001.mp3",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/sounds/tension_002.mp3",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/sounds/tension_003.mp3",
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
let timeoutArray = [];
let timeout = false;

const { durationSkill, jumpscarePercentage, minRandom } = DX_INPUTS;

// PIXIJS INITILIZE

dixperPluginSample.onPixiLoad = () => {
  init();
};

// INIT CHALLENGE
const init = () => {
  setAmbientSound();
  ambientSFX.play({ volume: 0.3 });
  setRandomJumpscare();
  if (randomTime) {
    console.log("susto en el segundo", randomTime / 1000);
    setTimeout(() => jumpscare(), randomTime);
  } else {
    setTimeout(() => {
      dixperPluginSample.stopSkill();
    }, durationSkill);
  }
};

// const createTimer = () => {
//   const interval = 1000;

//   timer = new dxTimer(
//     DX_PIXI,
//     "halloweenTime",
//     DX_LAYERS.ui,
//     durationSkill,
//     interval,
//     {
//       position: {
//         x: -666,
//         y: DX_HEIGHT / 2 - 300,
//       },
//       scale: {
//         x: 1,
//         y: 1,
//       },
//       animationSpeed: 0.5,
//     }
//   );
//   timer.onTimerFinish = () => {
//     dixperPluginSample.stopSkill();
//     console.log("fin skill");
//   };
// };

const setAmbientSound = () => {
  const randomAmbient = Math.floor(Math.random() * sounds.length);
  ambientSFX = PIXI.sound.Sound.from(sounds[randomAmbient]);
};

const jumpscare = () => {
  dixperPluginSample.addParentSkill("2zQMEp3FcpirdrIKaFu3");
  setTimeout(() => ambientSFX.stop(), 1500);
};

const setRandomJumpscare = () => {
  const randomJumpscare = Math.floor(Math.random() * 100);
  // const randomJumpscare = 1;
  console.log("randomJumpscare", randomJumpscare);
  if (randomJumpscare <= jumpscarePercentage) {
    setRandomTimeJumpscare();
  }
};

const setRandomTimeJumpscare = () => {
  const maxRandom = durationSkill / 1000;
  const randomNumber = getRandomNumBetween2Num(minRandom, maxRandom);
  randomTime = randomNumber * 1000;
};

const getRandomNumBetween2Num = (min, max) => {
  const diff = max - min;
  const rand = Math.floor(Math.random() * diff) + min;
  return rand;
};
