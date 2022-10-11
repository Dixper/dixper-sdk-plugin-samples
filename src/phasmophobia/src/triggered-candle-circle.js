const images = [];
const sprites = [
  {
    name: "candlesCircle",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/phasmophobia/assets/spritesheets/candles_circle.json",
  },
  {
    name: "flame",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/phasmophobia/assets/spritesheets/flame.json",
  },
  {
    name: "invisibleButton",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/phasmophobia/assets/spritesheets/invisible_sprite.json",
  },
  {
    name: "ghostPanel",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/phasmophobia/assets/spritesheets/phasmoReminder.json",
  },
  {
    name: "cursorPhasmo",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/spritesheets/halloween-cursor.json",
  },
  {
    name: "timerPhasmo",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/phasmophobia/assets/spritesheets/phasmoTimer.json",
  },
  {
    name: "reminderPhasmo",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/phasmophobia/assets/spritesheets/phasmoReminder.json",
  },
];
const sounds = [
  {
    name: "circleCandleIn",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/phasmophobia/assets/sounds/create_summoning_candles_SFX.mp3",
  },
];

let candleOne, candleFour, candleTwo, candleThree, leftLeg, candleFive;
let fireCandleOne,
  fireCandleTwo,
  fireCandleThree,
  fireCandleFour,
  fireCandleFive;
let currentX, currentY;
let candlesCircle;

// INPUTS PARAMS

let reminder, mouse;
const invisibleButton =
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/phasmophobia/assets/images/invisible_button.png";

const { reminderTitle, durationSkill } = DX_INPUTS;

// DIXPER SDK INJECTED CLASS

const dixperPluginSample = new DixperSDKLib({
  pixi: {
    enable: true,
    files: [...images, ...sprites, ...sounds],
  },
});

// REMOTE

dixperPluginSample.onPixiLoad = () => {
  init();
};

const init = () => {
  createReminder();
  createTimer();
  // createVoodooDoll(DX_WIDTH / 2, DX_HEIGHT / 2, 0.6);
  createPhasmoCursor();
  createCircleCandles();
  createCandles(DX_WIDTH / 2, DX_HEIGHT / 2, 1);
};

const createPhasmoCursor = () => {
  mouse = new dxCursor(DX_PIXI, "cursorPhasmo", DX_LAYERS.cursor, {
    parentLayer: DX_LAYERS.top,
    anchor: {
      x: 0.25,
      y: 0.25,
    },
  });
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

const createCandles = (initialX, initialY, candleScale) => {
  currentX = initialX - 421 * candleScale;
  currentY = initialY - 421 * candleScale;

  const firstCandle = () => {
    // candleOne = new dxButton(DX_PIXI, "invisibleButton", DX_LAYERS.ui, "", {
    //   position: {
    //     x: currentX,
    //     y: currentY,
    //   },
    //   anchor: {
    //     x: 0,
    //     y: 0,
    //   },
    //   scale: {
    //     x: 1,
    //     y: 1,
    //   },
    //   animationSpeed: 0.5,
    //   hitbox: [
    //     410 * candleScale,
    //     67 * candleScale,
    //     437 * candleScale,
    //     67 * candleScale,
    //     437 * candleScale,
    //     150 * candleScale,
    //     410 * candleScale,
    //     150 * candleScale,
    //   ],
    //   debug: false,
    // });
    candleOne = new DxButton(invisibleButton, "hola", {
      isClickable: true,
      controller: {
        isPressable: true,
        button: "FACE_1",
        x: 423,
        y: 160,
        scale: {
          x: 0.5,
          y: 0.5,
        },
      },
      keyboard: {
        isPressable: true,
        button: 1,
        x: 423,
        y: 160,
        scale: {
          x: 0.5,
          y: 0.5,
        },
      },
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
        410 * candleScale,
        67 * candleScale,
        437 * candleScale,
        67 * candleScale,
        437 * candleScale,
        150 * candleScale,
        410 * candleScale,
        150 * candleScale,
      ],
    });
    candleOne.start();

    candleOne.onClick = (event) => {
      fireCandleOne = new dxAnimatedElement(
        DX_PIXI,
        "flame",
        DX_LAYERS.ui,
        "",
        {
          loop: true,
          position: {
            x: DX_WIDTH / 2,
            y: 180,
          },
          scale: {
            x: 0.85,
            y: 0.85,
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
        690 * candleScale,
        275 * candleScale,
        720 * candleScale,
        275 * candleScale,
        720 * candleScale,
        365 * candleScale,
        690 * candleScale,
        365 * candleScale,
      ],
      debug: false,
    });

    candleTwo.onClick = (event) => {
      fireCandleTwo = new dxAnimatedElement(
        DX_PIXI,
        "flame",
        DX_LAYERS.ui,
        "",
        {
          loop: true,
          position: {
            x: DX_WIDTH / 2 + 285,
            y: DX_HEIGHT / 2 - 150,
          },
          scale: {
            x: 0.9,
            y: 0.9,
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
        585 * candleScale,
        600 * candleScale,
        610 * candleScale,
        600 * candleScale,
        610 * candleScale,
        685 * candleScale,
        585 * candleScale,
        685 * candleScale,
      ],
      debug: false,
    });

    candleThree.onClick = (event) => {
      fireCandleThree = new dxAnimatedElement(
        DX_PIXI,
        "flame",
        DX_LAYERS.ui,
        "",
        {
          loop: true,
          position: {
            x: DX_WIDTH / 2 + 175,
            y: DX_HEIGHT / 2 + 170,
          },
          scale: {
            x: 0.8,
            y: 0.8,
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
        235 * candleScale,
        580 * candleScale,
        265 * candleScale,
        580 * candleScale,
        265 * candleScale,
        685 * candleScale,
        235 * candleScale,
        685 * candleScale,
      ],
      debug: false,
    });

    candleFour.onClick = (event) => {
      fireCandleFour = new dxAnimatedElement(
        DX_PIXI,
        "flame",
        DX_LAYERS.ui,
        "",
        {
          loop: true,
          position: {
            x: DX_WIDTH / 2 - 170,
            y: DX_HEIGHT / 2 + 155,
          },
          scale: {
            x: 0.9,
            y: 0.9,
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
        125 * candleScale,
        290 * candleScale,
        150 * candleScale,
        290 * candleScale,
        150 * candleScale,
        365 * candleScale,
        125 * candleScale,
        365 * candleScale,
      ],
      debug: false,
    });

    candleFive.onClick = (event) => {
      fireCandleFive = new dxAnimatedElement(
        DX_PIXI,
        "flame",
        DX_LAYERS.ui,
        "",
        {
          loop: true,
          position: {
            x: DX_WIDTH / 2 - 285,
            y: DX_HEIGHT / 2 - 135,
          },
          scale: {
            x: 0.8,
            y: 0.8,
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
  reminder = new dxPanel(
    DX_PIXI,
    "reminderPhasmo",
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
        fontSize: 26,
        strokeThickness: 1,
        dropShadowDistance: 3,
      },
    }
  );
};

const createTimer = () => {
  const interval = 1000;

  const timer = new dxTimer(
    DX_PIXI,
    "timerPhasmo",
    DX_LAYERS.ui,
    durationSkill,
    interval,
    {
      position: {
        x: reminder._options.position.x,
        y: reminder._options.position.y + 105 * reminder._options.scale.y + 5,
      },
      scale: {
        x: (3.5 * reminder._options.scale.x) / 4,
        y: (3.5 * reminder._options.scale.y) / 4,
      },
      animationSpeed: 0.5,
    }
  );

  timer.onTimerStart = () => {};

  timer.onTimerFinish = () => {};
};
