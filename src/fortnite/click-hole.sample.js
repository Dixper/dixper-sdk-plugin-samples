const images = [
  {
    name: 'hole',
    url: 'https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/spritesheets/scope-ring-challenge.json',
  },
  {
    name: 'bg',
    url: 'https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/images/bg-hole.png',
  },
];

const sprites = [];
const sounds = [];

const jumpKey = 57;
const clickKey = 1;

let clicks = 0;

let onClickSub;

// DIXPER SDK INJECTED CLASS

const dixperPluginSample = new DixperSDKLib({
  pixi: {
    enable: true,
    files: [...images, ...sprites, ...sounds],
  },
});

// PIXIJS INITILIZE

dixperPluginSample.onPixiLoad = () => {
  init();

  const timestampUntilSkillFinish = dixperPluginSample.context.skillEnd;
  const millisecondsToFinish = timestampUntilSkillFinish - Date.now();
  const interval = 1000;

  const timer = new dxTimer(
    dixperPluginSample.pixi,
    'panelSmall',
    dixperPluginSample.uiLayer,
    millisecondsToFinish,
    interval,
    {
      position: {
        x: DX_WIDTH / 2,
        y: 100,
      },
      animationSpeed: 0.5,
    }
  );

  timer.onTimerStart = () => {};

  timer.onTimerFinish = () => {
    onClickSub.unsubscribe();
  };
};

const init = () => {
  const bgHole = new PIXI.Sprite(dixperPluginSample.pixi.resources.bg.texture);
  bgHole.width = 1920;
  bgHole.height = 1080;
  bgHole.x = DX_WIDTH / 2;
  bgHole.y = DX_HEIGHT / 2;
  bgHole.scale.x = 4;
  bgHole.scale.y = 4;
  bgHole.anchor.set(0.5);

  const hole = new PIXI.AnimatedSprite(
    dixperPluginSample.pixi.resources.hole.spritesheet.animations['Loop']
  );
  //   const hole = new PIXI.Sprite(dixperPluginSample.pixi.resources.hole.texture);
  hole.loop = false;
  hole.width = 1000;
  hole.height = 1000;
  hole.scale.x *= 0.25;
  hole.scale.y *= 0.25;
  hole.anchor.set(0.5);
  hole.play();
  hole.animationSpeed = 0.5;

  dixperPluginSample.uiLayer.addChild(bgHole);
  bgHole.addChild(hole);

  const onClick = (event) => {
    if (clickKey === event.button) {
      if (clicks < 5) {
        // hole.textures =
        // dixperPluginSample.pixi.resources.hole.spritesheet.animations['Loop'];
        // hole.play();

        const tween = PIXI.tweenManager.createTween(bgHole);
        tween.time = 5;
        tween.repeat = 10;
        tween.easing();
        tween.on('repeat', (loopCount) => {
          bgHole.scale.x -= 0.05;
          bgHole.scale.y -= 0.05;
        });
        tween.start();

        clicks++;
      }
    }
  };

  const onJump = (event) => {
    console.log(event);
    console.log(jumpKey === event.keycode);
    if (jumpKey === event.keycode) {
      if (clicks > 0) {
        console.log('SCALEEE');

        const tween = PIXI.tweenManager.createTween(bgHole);
        tween.time = 5;
        tween.repeat = 10;
        tween.easing();
        tween.on('repeat', (loopCount) => {
          bgHole.scale.x += 0.05;
          bgHole.scale.y += 0.05;
        });
        tween.start();

        clicks--;
      }
    }
  };

  onClickSub = dixperPluginSample.onMouseDown$.subscribe(onClick);
  onKeySub = dixperPluginSample.onKeyDown$.subscribe(onJump);
};
