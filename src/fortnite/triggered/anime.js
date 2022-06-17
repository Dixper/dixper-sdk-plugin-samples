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
  // 'https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/aim-blur/src/fortnite/assets/sounds/anime/JUMP_FX_ANIME_02.mp3',
  // 'https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/aim-blur/src/fortnite/assets/sounds/anime/JUMP_FX_ANIME_03.mp3',
  // 'https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/aim-blur/src/fortnite/assets/sounds/anime/JUMP_FX_ANIME_04.wav',
  // 'https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/aim-blur/src/fortnite/assets/sounds/anime/RUN_SMASH_ANIME.mp3',
  // 'https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/aim-blur/src/fortnite/assets/sounds/anime/RUN_SMASH_ANIME_02.wav',
  // 'https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/aim-blur/src/fortnite/assets/sounds/anime/SHOT_PUNCH_ANIME_1.mp3',
  // 'https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/aim-blur/src/fortnite/assets/sounds/anime/SHOT_PUNCH_ANIME_2.mp3',
  // 'https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/aim-blur/src/fortnite/assets/sounds/anime/SHOT_PUNCH_ANIME_3.mp3',
  // 'https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/aim-blur/src/fortnite/assets/sounds/anime/SHOT_PUNCH_ANIME_4.wav',
  // 'https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/aim-blur/src/fortnite/assets/sounds/anime/WTF_ANIME.mp3',
  // 'https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/aim-blur/src/fortnite/assets/sounds/anime/CROUCH_FX_ANIME_01.wav',
  // 'https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/aim-blur/src/fortnite/assets/sounds/anime/SHOT_PUNCH_ANIME_5.wav',
  // "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/aim-blur/src/fortnite/assets/sounds/anime/CROUCH_FX_ANIME_02.wav",
];

let onClickSub;
let onKeySub;

let clickKeys = [1, 2];
let actionKeys = [16, 29, 42, 57];

let jumpRandom;
let reminderTitle;

// DIXPER SDK INJECTED CLASS

const dixperPluginSample = new DixperSDKLib({
  pixi: {
    enable: true,
    files: [...images, ...sprites, ...sounds],
  },
});

// INPUTS

dixperPluginSample.inputs$.subscribe((inputs) => {
  kanjiScale = inputs.kanjiScale || 1;
  kanjiMs = inputs.kanjiMs || 2000;
  reminderTitle = inputs.reminderTitle || "Naniiiiiiiii!";
});

// PIXIJS INITILIZE

dixperPluginSample.onPixiLoad = () => {
  const timestampUntilSkillFinish = dixperPluginSample.context.skillEnd;
  const millisecondsToFinish = timestampUntilSkillFinish - Date.now();
  const interval = 1000;

  const timer = new dxTimer(
    dixperPluginSample.pixi,
    "timer",
    dixperPluginSample.uiLayer,
    millisecondsToFinish,
    interval,
    {
      position: {
        x: (3 * DX_WIDTH) / 4,
        y: 100,
      },
      animationSpeed: 0.5,
    }
  );

  timer.onTimerStart = () => {
    console.log("Timer started");
  };

  timer.onTimerFinish = () => {
    onClickSub.unsubscribe();
    onKeySub.unsubscribe();
    console.log("Timer finished");
  };

  init();
};

const init = () => {
  createReminder();

  onClickSub = dixperPluginSample.onMouseDown$.subscribe(onClick);
  onKeySub = dixperPluginSample.onKeyDown$.subscribe(onKeyboard);
};

const createFloatingSprite = (spriteName, x, y) => {
  const randomRect = {
    min: DX_WIDTH / 2 - 500,
    max: DX_WIDTH / 2 + 300,
  };

  const coordinates = getRandomCoordinates(randomRect);

  const floatingSprite = new dxFloatingSprite(
    dixperPluginSample.pixi,
    spriteName,
    dixperPluginSample.uiLayer,
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

const createReminder = () => {
  const reminder = new dxPanel(
    dixperPluginSample.pixi,
    "reminder",
    dixperPluginSample.uiLayer,
    reminderTitle,
    {
      position: {
        x: 200,
        y: DX_HEIGHT / 2 - 100,
      },
      scale: {
        x: 0.5,
        y: 0.5,
      },
      animationSpeed: 0.5,
      zIndex: 99,
    }
  );
};

const onClick = (event) => {
  if (event.button === 1 && !event.repeat) {
    createFloatingSprite("shot");
    const shotSFX = PIXI.sound.Sound.from(sounds[2]);
    shotSFX.play({ volume: 0.5 });
  }
  if (event.button === 2 && !event.repeat) {
    createFloatingSprite("aim");
    const shotSFX = PIXI.sound.Sound.from(sounds[4]);
    shotSFX.play({ volume: 0.5 });
  }
};

const onKeyboard = (event) => {
  console.log("keycode", event.keycode);
  if (event.keycode === 57 && !event.repeat) {
    createFloatingSprite("jump");
    const jumpSFX = PIXI.sound.Sound.from(sounds[1]);
    jumpSFX.play({ volume: 0.5 });
  }
  if (event.keycode === 42 && !event.repeat) {
    const runSFX = PIXI.sound.Sound.from(sounds[0]);
    runSFX.play({ volume: 0.5 });
    createFloatingSprite("run");
  }
  if (event.keycode === 29 && !event.repeat) {
    createFloatingSprite("crouch");
    const crouchSFX = PIXI.sound.Sound.from(sounds[3]);
    crouchSFX.play({ volume: 0.5 });
  }
  if (event.keycode === 16 && !event.repeat) {
    createFloatingSprite("reload");
    const crouchSFX = PIXI.sound.Sound.from(sounds[5]);
    crouchSFX.play({ volume: 0.5 });
  }
};
