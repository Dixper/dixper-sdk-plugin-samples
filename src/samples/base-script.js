const images = [];

const sprites = [];

const sounds = [];

// INPUTS PARAMS

// DIXPER SDK INJECTED CLASS

const dixperPluginSample = new DixperSDKLib({
  pixi: {
    enable: true,
    files: [...images, ...sprites, ...sounds],
  },
});

// INPUTS

const {} = DX_INPUTS;

// PIXIJS INITILIZE

dixperPluginSample.onPixiLoad = () => {
  init();
  //dixperPluginSample.initChallenge(challengeTitle, challengeTime);
};

// INIT CHALLENGE

dixperPluginSample.onChallengeAccepted = () => {
  init();
};

dixperPluginSample.onChallengeRejected = () => {
  dixperPluginSample.stopSkill();
};

dixperPluginSample.onChallengeFinish = () => {};

const init = () => {
  setTimeout(() => console.log("1"), 1000);
  setTimeout(() => console.log("2"), 3000);
  setTimeout(() => console.log("3"), 5000);
  setTimeout(() => console.log("4"), 200);
  setTimeout(() => console.log("5"), 50000);
  setTimeout(() => console.log("6"), 45000);
  setTimeout(() => console.log("7"), 40000);
  setTimeout(() => console.log("8"), 35000);
  setTimeout(() => console.log("9"), 30000);
  setTimeout(() => dixperPluginSample.stopSkill(), 20000);
  setTimeout(() => console.log("1"), 200);
};
