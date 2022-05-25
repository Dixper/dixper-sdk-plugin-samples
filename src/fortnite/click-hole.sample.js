const images = [
  {
    name: 'hole',
    url: 'https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/games/assets/CIRCULO_00021.png',
  },
  {
    name: 'transparent',
    url: 'https://img.freepik.com/free-vector/abstract-banner-background-with-red-shapes_1361-3348.jpg',
  },
];
const sprites = [];
const sounds = [];

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
    dixperPluginSample.pixi.resources.transparent.texture
  );

  dixperPluginSample.pixi.stage.addChild(backgroundTransparent);

  backgroundTransparent.width = dixperPluginSample.pixi.screen.width;
  backgroundTransparent.height = dixperPluginSample.pixi.screen.height;

  //   const scope = new PIXI.Sprite(dixperPluginSample.pixi.resources.hole.texture);
  //   scope.width = 1000;
  //   scope.height = 1000;
  //   scope.x = DX_WIDTH / 2;
  //   scope.y = DX_HEIGHT / 2;
  //   scope.anchor.set(0.5);

  //   dixperPluginSample.pixi.stage.addChild(scope);

  const hole = new PIXI.Graphics()
    .beginFill(0xff0000)
    .drawRect(0, 0, 200, 200)
    .endFill();

  const texture = dixperPluginSample.pixi.renderer.generateTexture(
    hole,
    PIXI.SCALE_MODES.NEAREST,
    1
  );
  const focus = new PIXI.Sprite(texture);

  dixperPluginSample.pixi.stage.addChild(focus);

  backgroundTransparent.mask = focus;

  focus.position.x = DX_WIDTH / 2;
  focus.position.y = DX_HEIGHT / 2;
  focus.anchor.set(0.5);

  const onClick = (event) => {
    console.log(event);
    let increment = 0.75;

    if (event.button === 2) {
      increment = 1.25;
    }

    focus.scale.x *= increment;
    focus.scale.y *= increment;
    // scope.scale.x *= increment;
    // scope.scale.y *= increment;

    backgroundTransparent.mask = focus;
  };

  onClickSub = dixperPluginSample.onMouseDown$.subscribe(onClick);
};
