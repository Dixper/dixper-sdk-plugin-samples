const images = [
  {
    name: "inventory",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/images/8bit/Inventory_overlay_8bit.png",
  },
  {
    name: "lifeCount",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/images/8bit/LifeCount_overlay_8bit.png",
  },
  {
    name: "mapOverlay",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/images/8bit/Map_overlay_8bit.png",
  },
];
const sprites = [];
const sounds = [];

let onKeySub;
let onClickSub;
let clickKeys = [1, 2, 3];
let actionKeys = [15, 17, 29, 30, 31, 32, 42, 56, 57];

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
  // createReminder();
  const timestampUntilSkillFinish = dixperPluginSample.context.skillEnd;
  const millisecondsToFinish = timestampUntilSkillFinish - Date.now() - 3000;
  const interval = 1000;

  const timer = new dxTimer(
    dixperPluginSample.pixi,
    "timerCountdown",
    dixperPluginSample.uiLayer,
    millisecondsToFinish,
    interval,
    {
      position: {
        x: DX_WIDTH / 2,
        y: 100,
      },
      animationSpeed: 0.3,
      zIndex: 99,
    }
  );

  timer.onTimerStart = () => {};

  timer.onTimerFinish = () => {
    onClickSub.unsubscribe();
    onKeySub.unsubscribe();
  };
};

const init = () => {
  onClickSub = dixperPluginSample.onMouseDown$.subscribe(onClick);
  onKeySub = dixperPluginSample.onKeyDown$.subscribe(onKeyboard);

  const inventory = new PIXI.Sprite(
    dixperPluginSample.pixi.resources.inventory.texture
  );
  inventory.width = 300;
  inventory.height = 300;
  inventory.x = 1000;
  inventory.y = 900;
  inventory.anchor.set(0.5);

  const lifeCount = new PIXI.Sprite(
    dixperPluginSample.pixi.resources.lifeCount.texture
  );
  lifeCount.width = 300;
  lifeCount.height = 300;
  lifeCount.x = 300;
  lifeCount.y = 900;
  lifeCount.anchor.set(0.5);

  const mapOverlay = new PIXI.Sprite(
    dixperPluginSample.pixi.resources.mapOverlay.texture
  );
  mapOverlay.width = 300;
  mapOverlay.height = 300;
  mapOverlay.x = 900;
  mapOverlay.y = 100;
  mapOverlay.anchor.set(0.5);

  dixperPluginSample.uiLayer.addChild(inventory);
  dixperPluginSample.uiLayer.addChild(lifeCount);
  dixperPluginSample.uiLayer.addChild(mapOverlay);
};

const onClick = (event) => {
  //   event.button;
};

const onKeyboard = (event) => {
  // console.log("keycode", event.keycode);
  //   event.keycode && !event.repeat;
};
