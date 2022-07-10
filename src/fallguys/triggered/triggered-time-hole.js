const images = [
  {
    name: "bg",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/images/bg-hole.png",
  },
];

const sprites = [
  {
    name: "hole",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/spritesheets/circle.json",
  },
];
const sounds = [];

let onKeySub;

// DIXPER SDK INJECTED CLASS

const dixperPluginSample = new DixperSDKLib({
  pixi: {
    enable: true,
    files: [...images, ...sprites, ...sounds],
  },
});

// INPUTS

const {
  openHoleGamepad,
  openHoleKey,
  initialScale,
  initialInnerScale,
  scaleIncrement,
  repeatTimes,
  animationMs,
  reminderTitle,
  inputType,
} = DX_INPUTS;

// PIXIJS INITILIZE

dixperPluginSample.onPixiLoad = () => {
  init();
  createTimer();
  createReminder();
};

const init = () => {
  const bgHole = new PIXI.Sprite(DX_PIXI.resources.bg.texture);
  bgHole.width = 1920;
  bgHole.height = 1080;
  bgHole.x = DX_WIDTH / 2;
  bgHole.y = DX_HEIGHT / 2;
  bgHole.scale.x = initialScale;
  bgHole.scale.y = initialScale;
  bgHole.anchor.set(0.5);

  const hole = new PIXI.AnimatedSprite(
    DX_PIXI.resources.hole.spritesheet.animations["In"]
  );
  //   const hole = new PIXI.Sprite(DX_PIXI.resources.hole.texture);
  hole.loop = false;
  hole.width = 1000;
  hole.height = 1000;
  hole.scale.x *= initialInnerScale;
  hole.scale.y *= initialInnerScale;
  hole.anchor.set(0.5);
  hole.animationSpeed = 0.5;

  DX_LAYERS.ui.addChild(bgHole);
  bgHole.addChild(hole);

  setTimeout(() => {
    hole.play();
  }, 500);

  const onJumpKeyboard = (event) => {
    if (openHoleKey === event.keycode) {
      if (bgHole.scale.x < 5 && bgHole.scale.y < 5) {
        const tween = PIXI.tweenManager.createTween(bgHole);
        tween.time = animationMs;
        tween.repeat = repeatTimes;
        tween.on("repeat", (loopCount) => {
          bgHole.scale.x += scaleIncrement / animationMs;
          bgHole.scale.y += scaleIncrement / animationMs;
        });
        tween.start();
      }
    }
  };

  const onJumpGamepad = (event) => {
    console.log("button code", event.name);
    if (openHoleGamepad === event.name) {
      if (bgHole.scale.x < 5 && bgHole.scale.y < 5) {
        const tween = PIXI.tweenManager.createTween(bgHole);
        tween.time = animationMs;
        tween.repeat = repeatTimes;
        tween.on("repeat", (loopCount) => {
          bgHole.scale.x += scaleIncrement / animationMs;
          bgHole.scale.y += scaleIncrement / animationMs;
        });
        tween.start();
      }
    }
  };

  const reduceHole = () => {
    DX_PIXI.ticker.add(() => {
      if (bgHole.scale.x > 1.1 && bgHole.scale.y > 1.1) {
        bgHole.scale.x *= 0.998;
        bgHole.scale.y *= 0.998;
      } else {
        bgHole.scale.x = bgHole.scale.x;
        bgHole.scale.y = bgHole.scale.y;
      }
    });
  };

  reduceHole();

  if (inputType === "gamepad") {
    onKeySub =
      dixperPluginSample.onGamepadButtonPress$.subscribe(onJumpGamepad);
  }
  if (inputType === "keyboard") {
    onKeySub = dixperPluginSample.onKeyDown$.subscribe(onJumpKeyboard);
  }
};

const createTimer = () => {
  const timestampUntilSkillFinish = dixperPluginSample.context.skillEnd;
  const millisecondsToFinish = timestampUntilSkillFinish - Date.now();
  const interval = 1000;

  const timer = new dxTimer(
    DX_PIXI,
    "timer",
    DX_LAYERS.ui,
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

  timer.onTimerStart = () => {};

  timer.onTimerFinish = () => {
    onKeySub.unsubscribe();
  };
};

const createReminder = () => {
  const reminder = new dxPanel(
    DX_PIXI,
    "reminder",
    DX_LAYERS.ui,
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
    }
  );
};
