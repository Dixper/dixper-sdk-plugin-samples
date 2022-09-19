const images = [];
const sprites = [
  {
    name: "ghostPanel",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/phasmophobia/src/phasmophobia/assets/spritesheets/phasmoReminder.json",
  },
];
const sounds = [];

// DIXPER SDK INJECTED CLASS

const dixperPluginSample = new DixperSDKLib({
  pixi: {
    enable: true,
    files: [...images, ...sprites, ...sounds],
  },
});

// INPUTS

const { kanjiScale, kanjiMs, kanjiVolume } = DX_INPUTS;

// PIXIJS INITILIZE

dixperPluginSample.onPixiLoad = () => {
  init();
};

const init = () => {
  //   if (DX_CONTROLLER_TYPE) {
  //     onKeySub = dixperPluginSample.onGamepadButtonPress$.subscribe(onGamepad);
  //   } else {
  //     onKeySub = dixperPluginSample.onKeyDown$.subscribe(onKeyboard);
  //     onClickSub = dixperPluginSample.onMouseDown$.subscribe(onClick);
  //   }
};

const createOuijaPanel = () => {
  rewardPanel = new dxPanel(
    DX_PIXI,
    "ghostPanel",
    DX_LAYERS.ui,
    rewardsRemainder,
    {
      position: {
        x: 200,
        y: DX_HEIGHT / 2 + 100,
      },
      scale: {
        x: 0.4,
        y: 0.8,
      },
      animationSpeed: 0.5,
    }
  );
};
