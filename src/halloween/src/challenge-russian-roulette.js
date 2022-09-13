const images = [];
const sprites = [
  {
    name: "ghostPanel",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/phasmophobia/src/phasmophobia/assets/spritesheets/phasmoReminder.json",
  },
  {
    name: "target",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/spritesheets/definitive-target.json",
  },
];
const sounds = [];

// INPUTS PARAMS

let reminder, randomBulletOrder, pumpkin;

// DIXPER SDK INJECTED CLASS

const dixperPluginSample = new DixperSDKLib({
  pixi: {
    enable: true,
    files: [...images, ...sprites, ...sounds],
  },
});

// INPUTS

const {
  challengeTitle,
  challengeTime,
  reminderTitle,
  maxOrderBullet,
  minOrderBullet,
} = DX_INPUTS;

// PIXIJS INITILIZE

dixperPluginSample.onPixiLoad = () => {
  dixperPluginSample.initChallenge(challengeTitle, challengeTime);
};

// INIT CHALLENGE

dixperPluginSample.onChallengeAccepted = () => {
  init();
};

dixperPluginSample.onChallengeRejected = () => {
  dixperPluginSample.stopSkill();
};

dixperPluginSample.onChallengeFinish = () => {
  dixperPluginSample.challengeFail();
  reminder.remove();
  setTimeout(() => dixperPluginSample.stopSkill(), 1500);
  //   setTimeout(
  //     () => dixperPluginSample.addParentSkill("zmwKfnd7vzV7HZ07uK3s"),
  //     2000
  //   );
};

const init = () => {
  console.log("init");
  createReminder();
  createRandom(maxOrderBullet, minOrderBullet);
  createPumpkin();

  //   onClickSub = dixperPluginSample.onMouseDown$.subscribe(onKeyOrClick);
  //   onKeySub = dixperPluginSample.onKeyDown$.subscribe(onKeyOrClick);
};

// /*
// CREATE INIT FUNCTIONS - START
// */

const createRandom = (maxOrderBullet, minOrderBullet) => {
  randomBulletOrder = Math.floor(
    Math.random() * (maxOrderBullet - minOrderBullet) + minOrderBullet
  );
  console.log("random", randomBulletOrder);
  // console.log("randomPosition", randomPosition);
};

const createPumpkin = () => {
  pumpkin = new dxButton(
    dixperPluginSample.pixi,
    "target",
    dixperPluginSample.uiLayer,
    "",
    {
      position: {
        x: DX_WIDTH / 2,
        y: DX_HEIGHT / 2,
      },
      scale: {
        x: 1,
        y: 1,
      },
      animationSpeed: 0.5,
      hitbox: [-41, -5, -8, -28, 22, -25, 41, 13, 14, 38, -30, 25],
      debug: true,
    }
  );
};

// const createSoundsSFX = () => {
//   let randomSFX = Math.floor(Math.random() * sounds.length);
//   let writingSFX = PIXI.sound.Sound.from(sounds[randomSFX]);
//   writingSFX.play({ volume: 0.75 });
// };

const createReminder = () => {
  reminder = new dxPanel(DX_PIXI, "ghostPanel", DX_LAYERS.ui, reminderTitle, {
    position: {
      x: 200,
      y: DX_HEIGHT / 2 - 100,
    },
    scale: {
      x: 0.5,
      y: 0.5,
    },
    animationSpeed: 0.5,
  });
};

// /*
// CREATE INIT FUNCTIONS - END
// */

// const onKeyOrClick = (event) => {
//   console.log("event", event);
// };

// //   dixperPluginSample.challengeSuccess();
