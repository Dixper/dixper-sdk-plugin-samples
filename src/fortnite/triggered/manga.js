const images = [];
const sprites = [
  {
    name: "timerCountdown",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/spritesheets/countdown-challenge.json",
  },
  {
    name: "jump",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/aim-blur/src/fortnite/assets/spritesheets/anime-jump.json",
  },
  {
    name: "run",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/aim-blur/src/fortnite/assets/spritesheets/anime-run.json",
  },
  {
    name: "shot",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/aim-blur/src/fortnite/assets/spritesheets/anime-shot.json",
  },
];
const sounds = [
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/aim-blur/src/fortnite/assets/sounds/anime/JUMP_FX_ANIME_01.mp3",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/aim-blur/src/fortnite/assets/sounds/anime/JUMP_FX_ANIME_02.mp3",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/aim-blur/src/fortnite/assets/sounds/anime/JUMP_FX_ANIME_03.mp3",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/aim-blur/src/fortnite/assets/sounds/anime/RUN_SMASH_ANIME.mp3",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/aim-blur/src/fortnite/assets/sounds/anime/SHOT_PUNCH_ANIME_1.mp3",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/aim-blur/src/fortnite/assets/sounds/anime/SHOT_PUNCH_ANIME_2.mp3",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/aim-blur/src/fortnite/assets/sounds/anime/SHOT_PUNCH_ANIME_3.mp3",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/aim-blur/src/fortnite/assets/sounds/anime/WTF_ANIME.mp3",
];

let onClickSub;
let onKeySub;

let clickKeys = 1;
let actionKeys = [42, 57];

let jumpRandom;
// DIXPER SDK INJECTED CLASS

const dixperPluginSample = new DixperSDKLib({
  pixi: {
    enable: true,
    files: [...images, ...sprites, ...sounds],
  },
});

// PIXIJS INITILIZE

dixperPluginSample.onPixiLoad = () => {
  const timestampUntilSkillFinish = dixperPluginSample.context.skillEnd;
  const millisecondsToFinish = timestampUntilSkillFinish - Date.now();
  const interval = 1000;

  const timer = new dxTimer(
    dixperPluginSample.pixi,
    "timerCountdown",
    dixperPluginSample.uiLayer,
    millisecondsToFinish,
    interval,
    {
      position: {
        x: DX_WIDTH / 2 + 100,
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

createReminder = () => {
  const reminder = new dxPanel(
    dixperPluginSample.pixi,
    "reminder",
    dixperPluginSample.uiLayer,
    "Onomatopeyas",
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
  if (clickKeys === event.button) {
    console.log("shot");
    createShot(Math.floor(Math.random() * (8 - 4) + 4));
  }
};

const onKeyboard = (event) => {
  console.log("keycode", event.keycode);
  if (event.keycode === 57 && !event.repeat) {
    createJump(Math.floor(Math.random() * 3));
    console.log("jump");
  }

  if (event.keycode === 42 && !event.repeat) {
    createRun();
    console.log("run");
  }
};

createJump = (jumpRandom) => {
  let jump = new dxAnimatedElement(
    dixperPluginSample.pixi,
    "jump",
    dixperPluginSample.uiLayer,
    "",
    {
      animationSpeed: 0.5,
      position: {
        x: DX_WIDTH / 2,
        y: DX_HEIGHT / 2,
      },
    }
  );
  jump.onInFinish = () => {
    jump._destroy();
  };

  const jumpSFX = PIXI.sound.Sound.from(sounds[jumpRandom]);
  jumpSFX.play({ volume: 0.5 });
};

createRun = () => {
  let run = new dxAnimatedElement(
    dixperPluginSample.pixi,
    "run",
    dixperPluginSample.uiLayer,
    "",
    {
      animationSpeed: 0.5,
      position: {
        x: DX_WIDTH / 2,
        y: DX_HEIGHT / 2,
      },
    }
  );
  run.onInFinish = () => {
    run._destroy();
  };

  const runSFX = PIXI.sound.Sound.from(sounds[3]);
  runSFX.play({ volume: 0.5 });
};

createShot = (shotRandom) => {
  let shot = new dxAnimatedElement(
    dixperPluginSample.pixi,
    "shot",
    dixperPluginSample.uiLayer,
    "",
    {
      animationSpeed: 0.5,
      position: {
        x: DX_WIDTH / 2,
        y: DX_HEIGHT / 2,
      },
    }
  );
  shot.onInFinish = () => {
    shot._destroy();
  };

  const shotSFX = PIXI.sound.Sound.from(sounds[shotRandom]);
  shotSFX.play({ volume: 0.5 });
  console.log("shotRandom", shotRandom);
};
