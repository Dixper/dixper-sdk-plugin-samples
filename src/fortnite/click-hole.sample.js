const images = [
  {
    name: 'bg',
    url: 'https://firebasestorage.googleapis.com/v0/b/dixper-abae2.appspot.com/o/sdk%2Fsamples%2Fbg-hole.png?alt=media&token=8c2221e5-e23b-4e65-9e72-fa9d7282d5df',
  },
];

const sprites = [
  {
    name: 'hole',
    url: 'https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/spritesheets/circle.json',
  },
];
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
    dixperPluginSample.pixi.resources.hole.spritesheet.animations['In']
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
        const tween = PIXI.tweenManager.createTween(bgHole);
        tween.time = 5;
        tween.repeat = 10;
        tween.easing();
        tween.on('repeat', (loopCount) => {
          bgHole.scale.x -= 0.05;
          bgHole.scale.y -= 0.05;
        });
        tween.on('end', (loopCount) => {
          hole.textures =
            dixperPluginSample.pixi.resources.hole.spritesheet.animations[
              'Hit'
            ];
          hole.play();
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
        const tween = PIXI.tweenManager.createTween(bgHole);
        tween.time = 5;
        tween.repeat = 10;
        tween.easing();
        tween.on('repeat', (loopCount) => {
          bgHole.scale.x += 0.05;
          bgHole.scale.y += 0.05;
        });
        tween.on('end', (loopCount) => {
          hole.textures =
            dixperPluginSample.pixi.resources.hole.spritesheet.animations[
              'HitInverse'
            ];
          hole.play();
        });

        tween.start();

        clicks--;
      }
    }
  };

  onClickSub = dixperPluginSample.onMouseDown$.subscribe(onClick);
  onKeySub = dixperPluginSample.onKeyDown$.subscribe(onJump);
};
