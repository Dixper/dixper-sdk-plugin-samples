const images = [
  {
    name: 'hole',
    url: 'https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/games/assets/CIRCULO_00021.png',
  },
  {
    name: 'bg',
    url: 'https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/images/bg-hole.png',
  },
];

const sprites = [];
const sounds = [];

const clicks = 0;

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
        x: DX_WIDTH / 2 + 100,
        y: 100,
      },
      animationSpeed: 0.5,
    }
  );

  timer.onTimerStart = () => {
    init();
  };

  timer.onTimerFinish = () => {
    onClickSub.unsubscribe();
  };
};

const init = () => {
  const backgroundTransparent = new PIXI.Sprite(
    dixperPluginSample.pixi.resources.bg.texture
  );
  backgroundTransparent.width = 1920;
  backgroundTransparent.height = 1080;
  backgroundTransparent.x = DX_WIDTH / 2;
  backgroundTransparent.y = DX_HEIGHT / 2;
  backgroundTransparent.scale.x = 4;
  backgroundTransparent.scale.y = 4;
  backgroundTransparent.anchor.set(0.5);

  //   const backgroundTransparentChild = new PIXI.Sprite(
  //     dixperPluginSample.pixi.resources.bg.texture
  //   );
  //   backgroundTransparentChild.width = 1920;
  //   backgroundTransparentChild.height = 1080;
  //   backgroundTransparentChild.scale.x *= 0.5;
  //   backgroundTransparentChild.scale.y *= 0.5;
  //   backgroundTransparentChild.anchor.set(0.5);

  const scope = new PIXI.Sprite(dixperPluginSample.pixi.resources.hole.texture);
  scope.width = 1000;
  scope.height = 1000;
  scope.scale.x *= 0.25;
  scope.scale.y *= 0.25;
  scope.anchor.set(0.5);

  dixperPluginSample.pixi.stage.addChild(backgroundTransparent);
  //   backgroundTransparent.addChild(backgroundTransparentChild);
  backgroundTransparent.addChild(scope);

  const onClick = (event) => {
    if (clicks < 5) {
      console.log(event);
      let increment = 0.75;

      if (event.button === 2) {
        increment = 1.25;
      }

      backgroundTransparent.scale.x *= increment;
      backgroundTransparent.scale.y *= increment;

      clicks++;
    }
  };

  onClickSub = dixperPluginSample.onMouseDown$.subscribe(onClick);
};
