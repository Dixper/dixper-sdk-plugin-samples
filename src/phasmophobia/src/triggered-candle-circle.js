const images = [];
const sprites = [
  {
    name: "candlesCircle",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/phasmophobia/src/phasmophobia/assets/spritesheets/candles_circle.json",
  },
  {
    name: "invisibleButton",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/phasmophobia/src/phasmophobia/assets/spritesheets/invisible_sprite.json",
  },
  {
    name: "target",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/spritesheets/definitive-target.json",
  },
  {
    name: "ghostPanel",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/phasmophobia/src/phasmophobia/assets/spritesheets/phasmoReminder.json",
  },
];
const sounds = [
  {
    name: "circleCandleIn",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/phasmophobia/src/phasmophobia/assets/sounds/create_summoning_candles_SFX.mp3",
  },
];

let millisecondsToFinish;

let candleOne, candleFour, candleTwo, candleThree, leftLeg, candleFive;
let fireCandleOne,
  fireCandleTwo,
  fireCandleThree,
  fireCandleFour,
  fireCandleFive;
let currentX, currentY;
let cursorDownSub;
let candlesCircle;
let curseDoll;
// INPUTS PARAMS

let clickKey, reminderTitle, reminder;

const enterKeycode = 28;
const scapeKeycode = 1;

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
  reminderTitle = inputs.reminderTitle || "voodoo doll";
});

// REMOTE

dixperPluginSample.onPixiLoad = () => {
  init();
};

const init = () => {
  createReminder();
  dixperPluginSample.drawCursor();
  // createVoodooDoll(DX_WIDTH / 2, DX_HEIGHT / 2, 0.6);

  createCircleCandles();
  createCandles(DX_WIDTH / 2, DX_HEIGHT / 2, 1);
};

const createCircleCandles = () => {
  candlesCircle = new dxPanel(DX_PIXI, "candlesCircle", DX_LAYERS.ui, "", {
    position: {
      x: DX_WIDTH / 2,
      y: DX_HEIGHT / 2,
    },
    scale: {
      x: 1,
      y: 1,
    },
    animationSpeed: 0.5,
  });
  createCircleCandlesSFX();
};

const createCircleCandlesSFX = () => {
  let createCircleSFX = PIXI.sound.Sound.from(sounds[0]);
  createCircleSFX.play({ volume: 1 });
};

const createCandles = (initialX, initialY, voodooScale) => {
  currentX = initialX - 421 * voodooScale;
  currentY = initialY - 421 * voodooScale;

  const firstCandle = () => {
    candleOne = new dxButton(DX_PIXI, "invisibleButton", DX_LAYERS.ui, "", {
      position: {
        x: currentX,
        y: currentY,
      },
      anchor: {
        x: 0,
        y: 0,
      },
      scale: {
        x: 1,
        y: 1,
      },
      animationSpeed: 0.5,
      hitbox: [
        410 * voodooScale,
        67 * voodooScale,
        437 * voodooScale,
        67 * voodooScale,
        437 * voodooScale,
        150 * voodooScale,
        410 * voodooScale,
        150 * voodooScale,
      ],
      debug: true,
    });
    candleOne.onClick = (event) => {
      console.log("CLICK HEAD");
      fireCandleOne = new dxAnimatedElement(
        DX_PIXI,
        "target",
        DX_LAYERS.ui,
        "",
        {
          position: {
            x: DX_WIDTH / 2,
            y: 180,
          },
          scale: {
            x: 0.5,
            y: 0.5,
          },
          animationSpeed: 0.5,
        }
      );
    };
  };

  const secondCandle = () => {
    candleTwo = new dxButton(DX_PIXI, "invisibleButton", DX_LAYERS.ui, "", {
      position: {
        x: currentX,
        y: currentY,
      },
      anchor: {
        x: 0,
        y: 0,
      },
      scale: {
        x: 1,
        y: 1,
      },
      animationSpeed: 0.5,
      hitbox: [
        690 * voodooScale,
        275 * voodooScale,
        720 * voodooScale,
        275 * voodooScale,
        720 * voodooScale,
        365 * voodooScale,
        690 * voodooScale,
        365 * voodooScale,
      ],
      debug: true,
    });

    candleTwo.onClick = (event) => {
      console.log("CLICK RIGHT ARM");
      fireCandleTwo = new dxAnimatedElement(
        DX_PIXI,
        "target",
        DX_LAYERS.ui,
        "",
        {
          position: {
            x: DX_WIDTH / 2 + 285,
            y: DX_HEIGHT / 2 - 150,
          },
          scale: {
            x: 0.5,
            y: 0.5,
          },
          animationSpeed: 0.5,
        }
      );
    };
  };

  const thirdCandle = () => {
    candleThree = new dxButton(DX_PIXI, "invisibleButton", DX_LAYERS.ui, "", {
      position: {
        x: currentX,
        y: currentY,
      },
      anchor: {
        x: 0,
        y: 0,
      },
      scale: {
        x: 1,
        y: 1,
      },
      animationSpeed: 0.5,
      hitbox: [
        585 * voodooScale,
        600 * voodooScale,
        610 * voodooScale,
        600 * voodooScale,
        610 * voodooScale,
        685 * voodooScale,
        585 * voodooScale,
        685 * voodooScale,
      ],
      debug: true,
    });

    candleThree.onClick = (event) => {
      console.log("CLICK BODY");
      fireCandleThree = new dxAnimatedElement(
        DX_PIXI,
        "target",
        DX_LAYERS.ui,
        "",
        {
          position: {
            x: DX_WIDTH / 2 + 175,
            y: DX_HEIGHT / 2 + 170,
          },
          scale: {
            x: 0.5,
            y: 0.5,
          },
          animationSpeed: 0.5,
        }
      );
    };

    // return candleThree;
  };

  const fourthCandle = () => {
    candleFour = new dxButton(DX_PIXI, "invisibleButton", DX_LAYERS.ui, "", {
      position: {
        x: currentX,
        y: currentY,
      },
      anchor: {
        x: 0,
        y: 0,
      },
      scale: {
        x: 1,
        y: 1,
      },
      animationSpeed: 0.5,
      hitbox: [
        235 * voodooScale,
        580 * voodooScale,
        265 * voodooScale,
        580 * voodooScale,
        265 * voodooScale,
        685 * voodooScale,
        235 * voodooScale,
        685 * voodooScale,
      ],
      debug: true,
    });

    candleFour.onClick = (event) => {
      console.log("CLICK LEFT ARM");
      fireCandleFour = new dxAnimatedElement(
        DX_PIXI,
        "target",
        DX_LAYERS.ui,
        "",
        {
          position: {
            x: DX_WIDTH / 2 - 170,
            y: DX_HEIGHT / 2 + 155,
          },
          scale: {
            x: 0.5,
            y: 0.5,
          },
          animationSpeed: 0.5,
        }
      );
    };
  };

  const fiveCandle = () => {
    candleFive = new dxButton(DX_PIXI, "invisibleButton", DX_LAYERS.ui, "", {
      position: {
        x: currentX,
        y: currentY,
      },
      anchor: {
        x: 0,
        y: 0,
      },
      scale: {
        x: 1,
        y: 1,
      },
      animationSpeed: 0.5,
      hitbox: [
        125 * voodooScale,
        290 * voodooScale,
        150 * voodooScale,
        290 * voodooScale,
        150 * voodooScale,
        365 * voodooScale,
        125 * voodooScale,
        365 * voodooScale,
      ],
      debug: true,
    });

    candleFive.onClick = (event) => {
      console.log("CLICK RIGHT LEG");
      fireCandleFive = new dxAnimatedElement(
        DX_PIXI,
        "target",
        DX_LAYERS.ui,
        "",
        {
          position: {
            x: DX_WIDTH / 2 - 285,
            y: DX_HEIGHT / 2 - 135,
          },
          scale: {
            x: 0.5,
            y: 0.5,
          },
          animationSpeed: 0.5,
        }
      );
    };
  };

  firstCandle();
  secondCandle();
  thirdCandle();
  fourthCandle();
  fiveCandle();
};

const createReminder = (reminderTitle) => {
  reminder = new dxPanel(DX_PIXI, "ghostPanel", DX_LAYERS.ui, reminderTitle, {
    position: {
      x: 200,
      y: DX_HEIGHT / 2 - 100,
    },
    scale: {
      x: 0.5,
      y: 0.5,
    },
    animationSpeed: 0.5,
  });
};
