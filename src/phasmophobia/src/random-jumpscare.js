const images = [];

const sprites = [];

const sounds = [
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/phasmophobia/assets/sounds/Chimes_1.mp3",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/phasmophobia/assets/sounds/Drone_1.mp3",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/phasmophobia/assets/sounds/Stinger_1.mp3",
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

const setAmbientSound = () => {
  const randomAmbient = Math.floor(Math.random() * sounds.length);
  ambientSFX = PIXI.sound.Sound.from(sounds[randomAmbient]);
};

const jumpscare = () => {
  dixperPluginSample.addParentSkill("5OVEL0VCNy1HhlVCyIhL");
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
