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
    name: "runInSound",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/sounds/anime/RUN_FX_ANIME_01.mp3",
  },
  {
    name: "jumpInSound",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/sounds/anime/JUMP_SMASH_ANIME.mp3",
  },
  {
    name: "shotInSound",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/sounds/anime/SHOT_PUNCH_ANIME_3.mp3",
  },
  {
    name: "crouchInSound",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/sounds/anime/CROUCH_FX_ANIME_01.wav",
  },
  {
    name: "aimInSound",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/sounds/anime/AIM_FX_ANIME.wav",
  },
  {
    name: "reloadInSound",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/sounds/anime/RELOAD_FX_ANIME.wav",
  },
];

let onClickSub;
let onKeySub;
let clickKeys = [1, 2];
let actionKeys = [16, 29, 42, 57];
let buttonsGamePad = [
  "FACE_1",
  "FACE_2",
  "FACE_3",
  "FACE_4",
  "LEFT_SHOULDER",
  "RIGHT_SHOULDER",
  "LEFT_SHOULDER_BOTTOM",
  "RIGHT_SHOULDER_BOTTOM",
];

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
  if (DX_CONTROLLER_TYPE) {
    onKeySub = dixperPluginSample.onGamepadButtonPress$.subscribe(onGamepad);
  } else {
    onKeySub = dixperPluginSample.onKeyDown$.subscribe(onKeyboard);
    onClickSub = dixperPluginSample.onMouseDown$.subscribe(onClick);
  }
};

const createFloatingSprite = (spriteName, x, y) => {
  const randomRect = {
    min: DX_WIDTH / 2 - 500,
    max: DX_WIDTH / 2 + 300,
  };

  const coordinates = getRandomCoordinates(randomRect);

  const floatingSprite = new dxFloatingSprite(
    DX_PIXI,
    spriteName,
    DX_LAYERS.ui,
    kanjiMs,
    randomRect,
    {
      position: coordinates,
      scale: {
        x: kanjiScale,
        y: kanjiScale,
      },
      zIndex: 99,
    }
  );
  floatingSprite.start();
};

const getRandomCoordinates = (rect) => {
  let x = Math.random() * (rect.max - rect.min) + rect.min;
  let y = DX_HEIGHT / 2 - 100;
  return { x, y };
};

const onClick = (event) => {
  if (event.button === 1 && !event.repeat) {
    createFloatingSprite("shot");
    const shotSFX = PIXI.sound.Sound.from(sounds[2]);
    shotSFX.play({ volume: kanjiVolume });
  }
  if (event.button === 2 && !event.repeat) {
    createFloatingSprite("aim");
    const shotSFX = PIXI.sound.Sound.from(sounds[4]);
    shotSFX.play({ volume: kanjiVolume });
  }
};

const onKeyboard = (event) => {
  // console.log("keycode", event.keycode);
  if (event.keycode === 57 && !event.repeat) {
    createFloatingSprite("jump");
    const jumpSFX = PIXI.sound.Sound.from(sounds[1]);
    jumpSFX.play({ volume: kanjiVolume });
  }
  if (event.keycode === 42 && !event.repeat) {
    const runSFX = PIXI.sound.Sound.from(sounds[0]);
    runSFX.play({ volume: kanjiVolume });
    createFloatingSprite("run");
  }
  if (event.keycode === 29 && !event.repeat) {
    createFloatingSprite("crouch");
    const crouchSFX = PIXI.sound.Sound.from(sounds[3]);
    crouchSFX.play({ volume: kanjiVolume });
  }
  if (event.keycode === 16 && !event.repeat) {
    createFloatingSprite("reload");
    const crouchSFX = PIXI.sound.Sound.from(sounds[5]);
    crouchSFX.play({ volume: kanjiVolume });
  }
};

const onGamepad = (event) => {
  // console.log("button code", event.name);
  if (buttonsGamePad.includes(event.name)) {
    if (event.name === "FACE_1" || event.name === "LEFT_SHOULDER") {
      createFloatingSprite("jump");
      const jumpSFX = PIXI.sound.Sound.from(sounds[1]);
      jumpSFX.play({ volume: kanjiVolume });
    }
    if (event.name === "FACE_2" || event.name === "RIGHT_SHOULDER") {
      const runSFX = PIXI.sound.Sound.from(sounds[0]);
      runSFX.play({ volume: kanjiVolume });
      createFloatingSprite("run");
    }
    if (event.name === "FACE_3" || event.name === "LEFT_SHOULDER_BOTTOM") {
      createFloatingSprite("crouch");
      const crouchSFX = PIXI.sound.Sound.from(sounds[3]);
      crouchSFX.play({ volume: 1 });
    }
    if (event.name === "FACE_4" || event.name === "RIGHT_SHOULDER_BOTTOM") {
      createFloatingSprite("reload");
      const crouchSFX = PIXI.sound.Sound.from(sounds[5]);
      crouchSFX.play({ volume: kanjiVolume });
    }
  }
};
