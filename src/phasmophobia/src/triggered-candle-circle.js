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

const gamepadButtons = [
  "FACE_1",
  "FACE_2",
  "FACE_3",
  "FACE_4",
  "DPAD_UP",
  "DPAD_DOWN",
  "DPAD_RIGHT",
  "DPAD_LEFT",
  "RIGHT_SHOULDER",
  "RIGHT_SHOULDER_BOTTOM",
  "LEFT_SHOULDER",
  "LEFT_SHOULDER_BOTTOM",
  "DPAD_UP",
  "DPAD_DOWN",
  "DPAD_RIGHT",
  "DPAD_LEFT",
];

let candleOne, candleFour, candleTwo, candleThree, leftLeg, candleFive;
let fireCandleOne,
  fireCandleTwo,
  fireCandleThree,
  fireCandleFour,
  fireCandleFive;
let timer;
let random;
let currentX, currentY;
let candlesCircle;
let timeoutArray = [];
let timeout = false;
let countCandles = 0;
let checkFinish = false;

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

const createCandles = (initialX, initialY, candleScale) => {
  currentX = initialX - 421 * candleScale;
  currentY = initialY - 421 * candleScale;

  const firstCandle = () => {
    candleOne = new DxButton(invisibleButton, "", {
      isClickable: true,
      controller: {
        isPressable: true,
        button: gamepadButtons[0],
        x: 0,
        y: 55,
        scale: {
          x: 0.5,
          y: 0.5,
        },
      },
      keyboard: {
        isPressable: true,
        button: 1,
        x: 0,
        y: 55,
        scale: {
          x: 0.5,
          y: 0.5,
        },
      },
      position: {
        x: currentX + 423 * candleScale,
        y: currentY + 109 * candleScale,
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
        -14 * candleScale,
        -42 * candleScale,
        14 * candleScale,
        -42 * candleScale,
        14 * candleScale,
        42 * candleScale,
        -14 * candleScale,
        42 * candleScale,
      ],
    });
    candleOne.start();

    let clicked = false;
    candleOne.onClick = (event) => {
      if (!clicked) {
        countCandles++;
        clicked = true;
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
        checkCounter();
      }
    };
  };

  const secondCandle = () => {
    candleTwo = new DxButton(invisibleButton, "", {
      isClickable: true,
      controller: {
        isPressable: true,
        button: gamepadButtons[1],
        x: 0,
        y: 55,
        scale: {
          x: 0.5,
          y: 0.5,
        },
      },
      keyboard: {
        isPressable: true,
        button: 2,
        x: 0,
        y: 55,
        scale: {
          x: 0.5,
          y: 0.5,
        },
      },
      position: {
        x: currentX + 705 * candleScale,
        y: currentY + 320 * candleScale,
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
        -15 * candleScale,
        -45 * candleScale,
        15 * candleScale,
        -45 * candleScale,
        15 * candleScale,
        45 * candleScale,
        -15 * candleScale,
        45 * candleScale,
      ],
      debug: false,
    });
    candleTwo.start();

    let clicked = false;
    candleTwo.onClick = (event) => {
      if (!clicked) {
        countCandles++;
        clicked = true;
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
        checkCounter();
      }
    };
  };

  const thirdCandle = () => {
    candleThree = new DxButton(invisibleButton, "", {
      isClickable: true,
      controller: {
        isPressable: true,
        button: gamepadButtons[2],
        x: 0,
        y: 50,
        scale: {
          x: 0.5,
          y: 0.5,
        },
      },
      keyboard: {
        isPressable: true,
        button: 3,
        x: 0,
        y: 50,
        scale: {
          x: 0.5,
          y: 0.5,
        },
      },
      position: {
        x: currentX + 598 * candleScale,
        y: currentY + 643 * candleScale,
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
        -13 * candleScale,
        -43 * candleScale,
        13 * candleScale,
        -43 * candleScale,
        13 * candleScale,
        43 * candleScale,
        -13 * candleScale,
        43 * candleScale,
      ],
      debug: false,
    });
    candleThree.start();

    let clicked = false;
    candleThree.onClick = (event) => {
      if (!clicked) {
        countCandles++;
        clicked = true;
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
        checkCounter();
      }
    };
  };

  const fourthCandle = () => {
    candleFour = new DxButton(invisibleButton, "", {
      isClickable: true,
      controller: {
        isPressable: true,
        button: gamepadButtons[3],
        x: 0,
        y: 60,
        scale: {
          x: 0.5,
          y: 0.5,
        },
      },
      keyboard: {
        isPressable: true,
        button: 4,
        x: 0,
        y: 60,
        scale: {
          x: 0.5,
          y: 0.5,
        },
      },
      position: {
        x: currentX + 250 * candleScale,
        y: currentY + 633 * candleScale,
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
        -15 * candleScale,
        -53 * candleScale,
        15 * candleScale,
        -53 * candleScale,
        15 * candleScale,
        53 * candleScale,
        -15 * candleScale,
        53 * candleScale,
      ],
      debug: false,
    });
    candleFour.start();

    let clicked = false;
    candleFour.onClick = (event) => {
      if (!clicked) {
        countCandles++;
        clicked = true;
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
        checkCounter();
      }
    };
  };

  const fiveCandle = () => {
    candleFive = new DxButton(invisibleButton, "", {
      isClickable: true,
      controller: {
        isPressable: true,
        button: gamepadButtons[4],
        x: 0,
        y: 50,
        scale: {
          x: 0.5,
          y: 0.5,
        },
      },
      keyboard: {
        isPressable: true,
        button: 5,
        x: 0,
        y: 50,
        scale: {
          x: 0.5,
          y: 0.5,
        },
      },
      position: {
        x: currentX + 138 * candleScale,
        y: currentY + 328 * candleScale,
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
        -13 * candleScale,
        -38 * candleScale,
        13 * candleScale,
        -38 * candleScale,
        13 * candleScale,
        38 * candleScale,
        -13 * candleScale,
        38 * candleScale,
      ],
      debug: false,
    });
    candleFive.start();

    let clicked = false;
    candleFive.onClick = (event) => {
      if (!clicked) {
        countCandles++;
        clicked = true;
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
        checkCounter();
      }
    };
  };

  firstCandle();
  secondCandle();
  thirdCandle();
  fourthCandle();
  fiveCandle();
};

const createReminder = () => {
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
        fontSize: 35,
        fill: ["#000000"],
        stroke: "#000",
        strokeThickness: 0,
        dropShadowDistance: 0,
      },
    }
  );
};

const createTimer = () => {
  const interval = 1000;

  timer = new dxTimer(
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
        x: (3.75 * reminder._options.scale.x) / 4,
        y: (3.75 * reminder._options.scale.y) / 4,
      },
      animationSpeed: 0.5,
      text: {
        strokeThickness: 0,
        dropShadowDistance: 0,
        fill: ["#000000"],
      },
    }
  );

  timer.onTimerStart = () => {};

  timer.onTimerFinish = () => {
    if (!checkFinish) {
      timer.remove(false);
      // dixperPluginSample.DX_LAYERS.ui.clear();
      destroyCircle();
      removeHUD();
      clearTimeouts();

      dixperPluginSample.addParentSkill("5OVEL0VCNy1HhlVCyIhL");
    }
  };
};

const clearTimeouts = () => {
  console.log(timeoutArray.length);
  timer.remove(false);
  timeoutArray.forEach((element) => {
    clearTimeout(element);
    console.log("timeout id: " + element + " cleared");
  });
  // dixperPluginSample.addParentSkill("2zQMEp3FcpirdrIKaFu3");
  // dixperPluginSample.stopSkill();
};

const checkCounter = () => {
  console.log("countCandles", countCandles);
  if (countCandles === 5) {
    checkFinish = true;
    removeHUD();
    if (random < 7) {
      let tempTimeout = setTimeout(
        () => dixperPluginSample.addParentSkill("kPYTZd58Hd4qBeCLczx3"),
        5000
      );
      timeoutArray.push(tempTimeout);
    } else {
      let tempTimeout = setTimeout(
        () => dixperPluginSample.addParentSkill("5OVEL0VCNy1HhlVCyIhL"),
        5000
      );
      timeoutArray.push(tempTimeout);
    }

    tempTimeout = setTimeout(() => clearTimeouts(), 5050);
    timeoutArray.push(tempTimeout);
  }
};

const removeHUD = () => {
  if (timer) {
    timer.remove(false);
  }
  if (reminder) {
    reminder.remove();
  }
  if (candleOne) {
    candleOne.remove();
  }
  if (candleTwo) {
    candleTwo.remove();
  }
  if (candleThree) {
    candleThree.remove();
  }
  if (candleFour) {
    candleFour.remove();
  }
  if (candleFive) {
    candleFive.remove();
  }
  if (candlesCircle) {
    candlesCircle.remove();
  }
  if (fireCandleOne) {
    let tempTimeout = setTimeout(() => fireCandleOne.remove(), 595);
    timeoutArray.push(tempTimeout);
  }
  if (fireCandleTwo) {
    let tempTimeout = setTimeout(() => fireCandleTwo.remove(), 950);
    timeoutArray.push(tempTimeout);
  }
  if (fireCandleThree) {
    let tempTimeout = setTimeout(() => fireCandleThree.remove(), 800);
    timeoutArray.push(tempTimeout);
  }
  if (fireCandleFour) {
    let tempTimeout = setTimeout(() => fireCandleFour.remove(), 1400);
    timeoutArray.push(tempTimeout);
  }
  if (fireCandleFive) {
    let tempTimeout = setTimeout(() => fireCandleFive.remove(), 1200);
    timeoutArray.push(tempTimeout);
  }
};

const destroyCircle = () => {
  if (candleOne) {
    candleOne._destroy();
  }
  if (candleTwo) {
    candleTwo._destroy();
  }
  if (candleThree) {
    candleThree._destroy();
  }
  if (candleFour) {
    candleFour._destroy();
  }
  if (candleFive) {
    candleFive._destroy();
  }
  if (candlesCircle) {
    candlesCircle._destroy();
  }
  if (fireCandleOne) {
    fireCandleOne._destroy();
  }
  if (fireCandleTwo) {
    fireCandleTwo._destroy();
  }
  if (fireCandleThree) {
    fireCandleThree._destroy();
  }
  if (fireCandleFour) {
    fireCandleFour._destroy();
  }
  if (fireCandleFive) {
    fireCandleFive._destroy();
  }
};

const createRandomSummon = () => {
  random = Math.floor(Math.random() * 10);
};
