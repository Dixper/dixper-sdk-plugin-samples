const images = [
  {
    name: "fissure",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/images/anime/bw_fu_run.png",
  }];
const sprites = [
  {
    name: "crucifix",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/phasmophobia/src/phasmophobia/assets/spritesheets/crucifijo.json",
  },

];
const sounds = [
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/sounds/target-appear.mp3"
];

let targetCounterPanel;
let cursor;
let cursorDownSub;
let cursorUpSub;
let challengeFailed = true;
let clickCount = 0;
let breakArray = [];
let floatingSprite;

// INPUTS PARAMS

let clickKey,
  reminderTitle,
  reminder,
  clicksToBreak;

// DIXPER SDK INJECTED CLASS

const dixperPluginSample = new DixperSDKLib({
  pixi: {
    enable: true,
    files: [...images, ...sprites, ...sounds],
  },
});

// INPUTS

dixperPluginSample.inputs$.subscribe((inputs) => {
  console.log("inputs", inputs);
  clickKey = inputs.clickKey || 1;
  reminderTitle = inputs.reminderTitle || "frio...";
  clicksToBreak = inputs.clicksToBreak || 5;
});

// INIT CHALLENGE

dixperPluginSample.onPixiLoad = () => {
  createReminder();
  init();
};

const init = () => {
  cursor = new dxCursor(
    DX_PIXI,
    "crucifix",
    DX_LAYERS.ui,
    {
      parentLayer: dixperPluginSample.topLayer,
      anchor: {
        x: 1,
        y: 0.25,
      },
      zIndex: 99,
    }
  );

  cursorDownSub = dixperPluginSample.onMouseDown$.subscribe(onClick);
  cursorUpSub = dixperPluginSample.onMouseUp$.subscribe(onRelease);
};

const createReminder = (scale_x = 0.5, scale_y = 0.5) => {
  reminder = new dxPanel(
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
        x: scale_x,
        y: scale_y,
      },
      animationSpeed: 0.5,
    }
  );
};

const onClick = (event) => {
  console.log(event);
  if (clickKey === event.button && clickCount < clicksToBreak) {
    console.log("Click!", cursor);
    const clickSFX = PIXI.sound.Sound.from(sounds[0]);
    clickSFX.play({ volume: 0.5 });
    createCrashSprite(event);
    clickCount++;
    checkHits();
    cursor.instance.angle = 45;
  }
};

const onRelease = () => {
  cursor.instance.angle = 0;
}

const createCrashSprite = (event) => {
  const randomRect = {
    min: DX_WIDTH / 2 - 500,
    max: DX_WIDTH / 2 + 300,
  };

  const coordinates = {
    x: event.x,
    y: event.y
  };

  floatingSprite = new dxFloatingSprite(
    DX_PIXI,
    "fissure",
    DX_LAYERS.ui,
    200000,
    randomRect,
    {
      position: coordinates,
      scale: {
        x: 1,
        y: 1,
      },
      zIndex: 95,
    }
  );
  console.log("SPRITE", floatingSprite._options.width);
  floatingSprite.start();
  breakArray.push(floatingSprite);
};

const checkHits = () => {
  if (clickCount >= clicksToBreak) {
    //animacion romper hielo
    console.log("Romper hielo");
    breakArray.forEach(element => {
      element.remove();
    });
    setTimeout(() => dixperPluginSample.stopSkill(), 2000);
  }
}

