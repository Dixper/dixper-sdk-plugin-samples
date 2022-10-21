const images = [
  {
    name: "fissure",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/phasmophobia/assets/images/fissure.png",
  },
  {
    name: "hit1",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/phasmophobia/assets/images/Golpe1.png",
  },
  {
    name: "hit2",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/phasmophobia/assets/images/Golpe2.png",
  },
  {
    name: "hit3",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/phasmophobia/assets/images/Golpe3.png",
  },
  {
    name: "hit4",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/phasmophobia/assets/images/Golpe4.png",
  },
];

const sprites = [
  {
    name: "crucifix",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/phasmophobia/assets/spritesheets/crucifijo.json",
  },
  {
    name: "ice",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/phasmophobia/assets/spritesheets/freezing.json",
  },
  {
    name: "phasmoReminder",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/phasmophobia/assets/spritesheets/phasmoReminder.json",
  },
];
const sounds = [
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/phasmophobia/sounds/Congelacion_SFX.mp3",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/phasmophobia/sounds/Daruma%20Audio%20-%20Ice%20and%20Snow%20-%20Ice%20Axe,%20Crash.wav",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/phasmophobia/sounds/Daruma%20Audio%20-%20Ice%20and%20Snow%20-%20Ice%20Axe%2C%20Shatter%20.wav",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/phasmophobia/sounds/Daruma%20Audio%20-%20Ice%20and%20Snow%20-%20Ice%20Axe%2C%20Smash.wav",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/phasmophobia/sounds/Rotura_SFX.mp3",
];

//SKILL VARIABLES

let targetCounterPanel;
let cursor;
let cursorDownSub;
let cursorUpSub;
let challengeFailed = true;
let clickCount = 0;
let hitArray = [];
let iceArray = [];
let floatingSprite;
let iceBack;
let iceHitsIdx = 1;
let initialHitsNeededToRift, hitsNeededToRift, iceRift, riftCount;

// INPUTS PARAMS

let clickKey = 1;
let reminder, clicksToBreak;

// DIXPER SDK INJECTED CLASS

const dixperPluginSample = new DixperSDKLib({
  pixi: {
    enable: true,
    files: [...images, ...sprites, ...sounds],
  },
});

// INPUTS SUBSCRIPTION
const { reminderTitle } = DX_INPUTS;

// INIT SKILL

dixperPluginSample.onPixiLoad = () => {
  init();
  createReminder();
};

//SKILL FUNCTIONS

const createReminder = () => {
  reminder = new dxPanel(
    DX_PIXI,
    "phasmoReminder",
    DX_LAYERS.ui,
    reminderTitle,
    {
      position: {
        x: 250,
        y: 300,
      },
      scale: {
        x: 0.5,
        y: 0.5,
      },
      animationSpeed: 0.5,
      text: {
        fontSize: 36,
        lineHeight: 35,
        fill: ["#000000"],
        strokeThickness: 0,
        dropShadowDistance: 0,
      },
    }
  );
};

const init = () => {
  cursor = new dxCursor(DX_PIXI, "crucifix", DX_LAYERS.ui, {
    parentLayer: dixperPluginSample.topLayer,
    scale: {
      x: 1,
      y: 1,
    },
    anchor: {
      x: 0.5,
      y: 0.75,
    },
    zIndex: 99,
  });
  clicksToBreak = GetRandomNumBetween2Num();
  initialHitsNeededToRift = Math.floor((clicksToBreak - 1) / 4);
  hitsNeededToRift = initialHitsNeededToRift;
  createIceBackground();

  cursorDownSub = dixperPluginSample.onMouseDown$.subscribe(onClick);
  cursorUpSub = dixperPluginSample.onMouseUp$.subscribe(onRelease);
};

const createIceBackground = () => {
  iceBack = new dxPanel(DX_PIXI, "ice", DX_LAYERS.ui, "", {
    position: {
      x: DX_WIDTH / 2,
      y: DX_HEIGHT / 2,
    },
    scale: {
      x: 1,
      y: 1,
    },
    animationSpeed: 0.25,
    zIndex: 90,
  });
  const freezeSFX = PIXI.sound.Sound.from(sounds[0]);
  freezeSFX.play({ volume: 0.5 });
  setTimeout(() => freezeSFX.stop(), 3500); //pedir a azu o david
};

const onClick = (event) => {
  // console.log(event);
  if (clickKey === event.button && clickCount < clicksToBreak) {
    let idx = GetRandomNumBetween2Num(1, 3);
    const clickSFX = PIXI.sound.Sound.from(sounds[idx]);
    clickSFX.play({ volume: 0.5 });
    createCrashSprite(event);
    clickCount++;
    checkHits();
    checkIceBreak();
    cursor.instance.angle = 45;
  }
};

const onRelease = () => {
  cursor.instance.angle = 0;
};

const createCrashSprite = (event) => {
  const randomRect = {
    min: DX_WIDTH / 2 - 500,
    max: DX_WIDTH / 2 + 300,
  };

  const coordinates = {
    x: event.x + DX_PIXI.resources.crucifix.data.meta.size.w / 2 + 25,
    y: event.y - 50,
  };

  floatingSprite = new dxFloatingSprite(
    DX_PIXI,
    "fissure",
    DX_LAYERS.ui,
    200000,
    randomRect,
    {
      position: coordinates,
      anchor: {
        x: 0.5,
        y: 0.5,
      },
      zIndex: 95,
    }
  );
  floatingSprite.initialScale = 0.15;
  floatingSprite.start();
  hitArray.push(floatingSprite);
  iceHitsIdx;
};

const checkHits = () => {
  if (clickCount >= clicksToBreak) {
    hitArray.forEach((element) => {
      element.remove();
    });
    iceRift.destroy();
    iceBack.remove();
    const breakSFX = PIXI.sound.Sound.from(sounds[4]);
    breakSFX.play({ volume: 0.5 });
    setTimeout(() => dixperPluginSample.stopSkill(), 2000);
  }
};

const checkIceBreak = () => {
  if (clickCount === hitsNeededToRift && iceHitsIdx < 4) {
    if (iceRift != undefined) {
      iceRift.destroy();
    }
    iceRift = new PIXI.Sprite.from(
      dixperPluginSample.pixi.resources[images[iceHitsIdx].name].texture
    );
    iceRift.x = DX_WIDTH / 2;
    iceRift.y = DX_HEIGHT / 2;
    iceRift.anchor.set(0.5);
    iceRift.zIndex = 90;
    dixperPluginSample.uiLayer.addChild(iceRift);
    iceHitsIdx++;
    hitsNeededToRift += initialHitsNeededToRift;
  }
};

const GetRandomNumBetween2Num = (min = 5, max = 11) => {
  let diff = max - min;
  let rand = Math.floor(Math.random() * diff) + min;
  // console.log("CLICKS TO BREAK: ", rand);
  return rand;
};
