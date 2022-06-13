const images = [];
const sprites = [
  {
    name: 'timerCountdown',
    url: 'https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/spritesheets/countdown-challenge.json',
  },
  {
    name: 'jump',
    url: 'https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/aim-blur/src/fortnite/assets/spritesheets/anime-jump.json',
  },
  {
    name: 'run',
    url: 'https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/aim-blur/src/fortnite/assets/spritesheets/anime-run.json',
  },
  {
    name: 'shot',
    url: 'https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/aim-blur/src/fortnite/assets/spritesheets/anime-shot.json',
  },
  {
    name: 'crouch',
    url: 'https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/aim-blur/src/fortnite/assets/images/anime/zu.png',
  },
];
const sounds = [
  'https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/aim-blur/src/fortnite/assets/sounds/anime/JUMP_FX_ANIME_01.mp3',
  'https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/aim-blur/src/fortnite/assets/sounds/anime/JUMP_FX_ANIME_02.mp3',
  'https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/aim-blur/src/fortnite/assets/sounds/anime/JUMP_FX_ANIME_03.mp3',
  'https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/aim-blur/src/fortnite/assets/sounds/anime/JUMP_FX_ANIME_04.wav',
  'https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/aim-blur/src/fortnite/assets/sounds/anime/RUN_SMASH_ANIME.mp3',
  'https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/aim-blur/src/fortnite/assets/sounds/anime/RUN_SMASH_ANIME_02.mp3',
  'https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/aim-blur/src/fortnite/assets/sounds/anime/SHOT_PUNCH_ANIME_1.mp3',
  'https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/aim-blur/src/fortnite/assets/sounds/anime/SHOT_PUNCH_ANIME_2.mp3',
  'https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/aim-blur/src/fortnite/assets/sounds/anime/SHOT_PUNCH_ANIME_3.mp3',
  'https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/aim-blur/src/fortnite/assets/sounds/anime/SHOT_PUNCH_ANIME_4.wav',
  'https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/aim-blur/src/fortnite/assets/sounds/anime/SHOT_PUNCH_ANIME_5.wav',
  'https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/aim-blur/src/fortnite/assets/sounds/anime/WTF_ANIME.mp3',
  'https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/aim-blur/src/fortnite/assets/sounds/anime/CROUCH_FX_ANIME_01.wav',
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
    'timerCountdown',
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
    console.log('Timer started');
  };

  timer.onTimerFinish = () => {
    onClickSub.unsubscribe();
    onKeySub.unsubscribe();
    console.log('Timer finished');
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
    min: DX_WIDTH / 2 - 200,
    max: DX_WIDTH / 2 + 100,
  };

  const coordinates = getRandomCoordinates(randomRect);

  const floatingSprite = new dxFloatingSprite(
    dixperPluginSample.pixi,
    spriteName,
    dixperPluginSample.uiLayer,
    2000,
    randomRect,
    {
      position: coordinates,
      scale: {
        x: 0.5,
        y: 0.5,
      },
      animationSpeed: 0.5,
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
    'reminder',
    dixperPluginSample.uiLayer,
    'Onomatopeyas',
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
    createFloatingSprite('shot');
  }
};

const onKeyboard = (event) => {
  console.log('keycode', event.keycode);
  if (event.keycode === 57 && !event.repeat) {
    createFloatingSprite('jump');
  }

  if (event.keycode === 42 && !event.repeat) {
    createFloatingSprite('run');
  }

  if (event.keycode === 11 && !event.repeat) {
    createFloatingSprite('crouch');
  }
};
