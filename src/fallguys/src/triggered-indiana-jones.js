const images = [];
const sprites = [
  {
    name: "run",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/images/anime/bw_fu_run.png",
  },
  {
    name: "jump",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/images/anime/bw_gogo_jump.png",
  },
  {
    name: "shot",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/images/anime/bw_papapa_shot.png",
  },
  {
    name: "crouch",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/images/anime/bw_zu_crouch_1.png",
  },
  {
    name: "aim",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/images/anime/bw_gan_aim.png",
  },
  {
    name: "reload",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/images/anime/bw_rerere_reload.png",
  },
];
const sounds = [
  {
    name: "whipInSound",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/fallguys/src/fallguys/assets/sounds/whip-sfx.mp3",
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

const { kanjiVolume } = DX_INPUTS;

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
  console.log("keycode", event.keycode);
  if (
    (event.keycode === 57 && !event.repeat) ||
    (event.keycode === 29 && !event.repeat)
  ) {
    const whipSFX = PIXI.sound.Sound.from(sounds[0]);
    whipSFX.play({ volume: kanjiVolume });
  }
};

const onGamepad = (event) => {
  // console.log("button code", event.name);
  if (event.name === "FACE_1" || event.name === "FACE_3") {
    const whipSFX = PIXI.sound.Sound.from(sounds[0]);
    whipSFX.play({ volume: kanjiVolume });
  }
};
