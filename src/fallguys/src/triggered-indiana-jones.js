const images = [];
const sprites = [];
const sounds = [
  {
    name: "whipInSound",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fallguys/assets/sounds/whip-sfx.mp3",
  },
];

let onKeySub;

// DIXPER SDK INJECTED CLASS

const dixperPluginSample = new DixperSDKLib({
  pixi: {
    enable: true,
    files: [...images, ...sprites, ...sounds],
  },
});

// INPUTS

const { sfxVolume } = DX_INPUTS;

// PIXIJS INITILIZE

dixperPluginSample.onPixiLoad = () => {
  init();
};

const init = () => {
  if (DX_CONTROLLER_TYPE) {
    onKeySub = dixperPluginSample.onGamepadButtonPress$.subscribe(onGamepad);
  } else {
    onKeySub = dixperPluginSample.onKeyDown$.subscribe(onKeyboard);
  }
};

const onKeyboard = (event) => {
  // console.log("keycode", event.keycode);
  if (
    (event.keycode === 57 && !event.repeat) ||
    (event.keycode === 29 && !event.repeat)
  ) {
    const whipSFX = PIXI.sound.Sound.from(sounds[0]);
    whipSFX.play({ volume: sfxVolume });
  }
};

const onGamepad = (event) => {
  // console.log("button code", event.name);
  if (event.name === "FACE_1" || event.name === "FACE_3") {
    const whipSFX = PIXI.sound.Sound.from(sounds[0]);
    whipSFX.play({ volume: sfxVolume });
  }
};
