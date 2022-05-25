const images = [];
const sprites = [];
const sounds = [];

let challenge = {
  title: 'Challenge name',
  completed:false,
  timetoAccept:1000
}

// DIXPER SDK INJECTED CLASS

const dixperPluginSample = new DixperSDKLib({
  pixi: {
    enable: true,
    files: [...images, ...sprites, ...sounds],
  },
});

// PIXIJS INITILIZE

dixperPluginSample.onPixiLoad = () => {
  dixperPluginSample.drawCursor();
  dixperPluginSample.initChallenge(challenge.title, challenge.timetoAccept);
};

// INIT CHALLENGE

dixperPluginSample.onChallengeAccepted = () => {
  init();
};

dixperPluginSample.onChallengeRejected = () => {
    dixperPluginSample.stopSkill();
};

dixperPluginSample.onChallengeFinish = () => {
  if(challenge.completed){ // someCondition
    dixperPluginSample.challengeSuccess()
  } else {
    dixperPluginSample.challengeFail()
  }
};

const init = () => {};
