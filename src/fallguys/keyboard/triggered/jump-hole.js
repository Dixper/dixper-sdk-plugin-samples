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

// INPUTS PARAMS

let closeHoleKey,
  reminderTitle,
  initialScale,
  scaleIncrement,
  animationMs,
  initialInnerScale,
  repeatTimes;

// DIXPER SDK INJECTED CLASS

const dixperPluginSample = new DixperSDKLib({
  pixi: {
    enable: true,
    files: [...images, ...sprites, ...sounds],
  },
});

// INPUTS

dixperPluginSample.inputs$.subscribe((inputs) => {
  console.log(inputs);
  closeHoleKey = inputs.closeHoleKey || 57;
  initialScale = inputs.initialScale || 4;
  initialInnerScale = inputs.initialInnerScale || 0.25;
  scaleIncrement = inputs.scaleIncrement || 0.1;
  repeatTimes = inputs.repeatTimes || 10;
  animationMs = inputs.animationMs || 5;
  reminderTitle = inputs.reminderTitle || "If you jump you will not see";
});

// PIXIJS INITILIZE

dixperPluginSample.onPixiLoad = () => {
  init();
  createTimer();
  createReminder();
};

const init = () => {
  const bgHole = new PIXI.Sprite(dixperPluginSample.pixi.resources.bg.texture);
  bgHole.width = 1920;
  bgHole.height = 1080;
  bgHole.x = DX_WIDTH / 2;
  bgHole.y = DX_HEIGHT / 2;
  bgHole.scale.x = initialScale;
  bgHole.scale.y = initialScale;
  bgHole.anchor.set(0.5);

  const hole = new PIXI.AnimatedSprite(
    dixperPluginSample.pixi.resources.hole.spritesheet.animations["In"]
  );
  //   const hole = new PIXI.Sprite(dixperPluginSample.pixi.resources.hole.texture);
  hole.loop = false;
  hole.width = 1000;
  hole.height = 1000;
  hole.scale.x *= initialInnerScale;
  hole.scale.y *= initialInnerScale;
  hole.anchor.set(0.5);
  hole.animationSpeed = 0.5;

  dixperPluginSample.uiLayer.addChild(bgHole);
  bgHole.addChild(hole);

  setTimeout(() => {
    hole.play();
  }, 500);

  const onJump = (event) => {
    if (closeHoleKey === event.keycode) {
      if (bgHole.scale.x > 1.2 && bgHole.scale.y > 1.2) {
        const tween = PIXI.tweenManager.createTween(bgHole);
        tween.time = animationMs;
        tween.repeat = repeatTimes;
        tween.on("repeat", (loopCount) => {
          bgHole.scale.x -= scaleIncrement / animationMs;
          bgHole.scale.y -= scaleIncrement / animationMs;
        });
        tween.start();
      }
      setTimeout(() => {
        incrementHole();
      }, 250);
    }
  };

  const incrementHole = () => {
    dixperPluginSample.pixi.ticker.add(() => {
      if (bgHole.scale.x < 4 && bgHole.scale.y < 4) {
        bgHole.scale.x *= 1.0001;
        bgHole.scale.y *= 1.0001;
      }
    });
  };

  onKeySub = dixperPluginSample.onKeyDown$.subscribe(onJump);
};

const createTimer = () => {
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

  timer.onTimerStart = () => {};

  timer.onTimerFinish = () => {
    onKeySub.unsubscribe();
  };
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
    }
  );
};
