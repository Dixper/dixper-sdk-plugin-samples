const images = [];

const sprites = [
  {
    name: "cursorHalloween",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/spritesheets/halloween-cursor.json",
  },
  {
    name: "rewardPanel",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/spritesheets/rewardPanel.json",
  },
  {
    name: "halloweenTime",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/spritesheets/timer_v2.json",
  },
  {
    name: "halloweenReminder",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/spritesheets/reminderHalloween.json",
  },
  {
    name: "halloweenCementery",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/spritesheets/cementery-illustration.json",
  },
  {
    name: "rewardTextPanel",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/spritesheets/trivial-question.json",
  },
  // {
  //   name: "newChallengeSuccess",
  //   url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/spritesheets/win_challenge.json",
  // },
  // {
  //   name: "newChallengeSuccessSpanish",
  //   url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/spritesheets/win_challenge_es.json",
  // },

  // {
  //   name: "newChallengeFail",
  //   url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/spritesheets/lose_challenge.json",
  // },
];

const sounds = [
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/sounds/openBoxSFX.wav",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/sounds/You_Win_SFX.mp3",
  // "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/sounds/You_Loose_SFX.mp3",
];

// INPUTS PARAMS

// DIXPER SDK INJECTED CLASS

const dixperPluginSample = new DixperSDKLib({
  pixi: {
    enable: true,
    files: [...images, ...sprites, ...sounds],
  },
});

// INPUTS

const { listPrices, volumeOpenSFX, reminderTitle, getRewardText } = DX_INPUTS;

let surpriseBox,
  openSFX,
  orderPrice,
  reminder,
  timer,
  halloweenPanel,
  mouse,
  totalWidth,
  distanceBetweeenCrate,
  crateWidth,
  getRewardPanel,
  panelQuantityPrice;
let checkReward = false;
let timeoutArray = [];
let timeout = false;
const finalPositionTimer = -666;

let gamepadButtons = [
  "FACE_1",
  "FACE_2",
  "FACE_3",
  "FACE_4",
  "RIGHT_SHOULDER",
  "RIGHT_SHOULDER_BOTTOM",
  "LEFT_SHOULDER",
  "LEFT_SHOULDER_BOTTOM",
  "DPAD_UP",
  "DPAD_DOWN",
  "DPAD_RIGHT",
  "DPAD_LEFT",
];
let cratesArray = [];

// PIXIJS INITILIZE

dixperPluginSample.onPixiLoad = () => {
  createOpenCrateSFX();
  init();
};

// INIT CHALLENGE

const init = () => {
  createHalloweenCursor();
  createBottomDecoration();
  createReminder();
  createRandomPrice();
  createCrate();
  createTimer();
};

const clearTimeouts = () => {
  timer.remove(false);
  console.log(timeoutArray.length);
  timeoutArray.forEach((element) => {
    clearTimeout(element);
    console.log("timeout id: " + element + " cleared");
  });
  dixperPluginSample.stopSkill();
};

const createHalloweenCursor = () => {
  mouse = new dxCursor(DX_PIXI, "cursorHalloween", DX_LAYERS.cursor, {
    parentLayer: DX_LAYERS.top,
    anchor: {
      x: 0.25,
      y: 0.25,
    },
  });
};

const createCrate = () => {
  if (orderPrice.length === 6) {
    crateWidth = 180;
    distanceBetweeenCrate = 50;
    totalWidth =
      crateWidth * orderPrice.length +
      distanceBetweeenCrate * (orderPrice.length - 1);
  } else {
    crateWidth = 200;
    distanceBetweeenCrate = 50;
    totalWidth =
      crateWidth * orderPrice.length +
      distanceBetweeenCrate * (orderPrice.length - 1);
  }
  orderPrice.forEach((price, index) => {
    surpriseBox = new DxButton(
      "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/images/box.png",
      "",
      {
        isClickable: true,
        controller: {
          isPressable: true,
          button: gamepadButtons[index],
          x: 0,
          y: 50,
        },
        keyboard: {
          isPressable: true,
          button: `${index + 1}`,
          x: 0,
          y: 50,
        },
        position: {
          x:
            DX_WIDTH / 2 -
            totalWidth / 2 +
            index * (distanceBetweeenCrate + crateWidth) +
            crateWidth / 2,
          y: DX_HEIGHT / 2,
        },
        scale: {
          x: 0.5,
          y: 0.5,
        },
        priceCrate: price,
      }
    );
    surpriseBox.start();
    cratesArray.push(surpriseBox);
  });

  cratesArray.forEach((crates) => {
    crates.onClick = (event) => {
      if (!checkReward) {
        halloweenPanel.remove();
        if (typeof crates._options.priceCrate === typeof String()) {
          timer.remove(false);
          dixperPluginSample.addParentSkill("2zQMEp3FcpirdrIKaFu3");
          cratesArray.forEach((element) => {
            element.remove();
          });
          reminder.remove();
          timer.instance.x = finalPositionTimer;
          // cambiar a nuevo script de luis para finalizar las skill en el momento correcto
        } else {
          openSFX.play({ volume: volumeOpenSFX });
          console.log("crates", crates);
          console.log("surpriseBox", crates._options.priceCrate);
          const reward = crates._options.priceCrate;
          let tempTimeout = setTimeout(
            () => createChallengeSuccess(reward),
            500
          );
          timeoutArray.push(tempTimeout);
          reminder.remove();
          // halloweenPanel.remove();
          timer.instance.x = finalPositionTimer;
          cratesArray.forEach((element) => {
            element.remove();
          });
        }
        checkReward = true;
      }
    };
  });
};

const createOpenCrateSFX = () => {
  openSFX = PIXI.sound.Sound.from(sounds[0]);
};

const createRandomPrice = () => {
  orderPrice = listPrices
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

  console.log("orderPrice", orderPrice);
  // orderPrice = listPrices;
};

const createTimer = () => {
  const timestampUntilSkillFinish = dixperPluginSample.context.skillEnd;
  const millisecondsToFinish = timestampUntilSkillFinish - Date.now();
  const interval = 1000;

  timer = new dxTimer(
    DX_PIXI,
    "halloweenTime",
    DX_LAYERS.ui,
    millisecondsToFinish,
    interval,
    {
      position: {
        x: reminder._options.position.x,
        y: reminder._options.position.y + 75 * reminder._options.scale.y,
      },
      scale: {
        x: reminder._options.scale.x / 2,
        y: reminder._options.scale.y / 2,
      },
      animationSpeed: 0.5,
    }
  );
  timer.onTimerFinish = () => {
    console.log("fin skill");
  };
};

const createReminder = () => {
  reminder = new dxPanel(
    DX_PIXI,
    "halloweenReminder",
    DX_LAYERS.ui,
    reminderTitle,
    {
      position: {
        x: 250,
        y: 300,
      },
      scale: {
        x: 0.8,
        y: 0.8,
      },
      animationSpeed: 0.5,
      text: {
        fontSize: 20,
        lineHeight: 20,
        strokeThickness: 0,
        dropShadowDistance: 0,
      },
    }
  );
};

const createBottomDecoration = () => {
  halloweenPanel = new dxPanel(
    DX_PIXI,
    "halloweenCementery",
    DX_LAYERS.ui,
    "",
    {
      position: {
        x: DX_WIDTH / 2,
        y: DX_HEIGHT - 195,
      },
      scale: {
        x: 1,
        y: 1,
      },
      animationSpeed: 0.5,
      zIndex: 99,
    }
  );
};

const createChallengeSuccess = (price) => {
  const challengeSuccessSFX = PIXI.sound.Sound.from(sounds[1]);
  challengeSuccessSFX.play({ volume: 0.75 });
  addXp(price);
  panelQuantityPrice = new dxPanel(
    DX_PIXI,
    "rewardPanel",
    DX_LAYERS.ui,
    `+${price}XP`,
    {
      position: {
        x: DX_WIDTH / 2,
        y: DX_HEIGHT / 2 + 50,
      },
      scale: {
        x: 1,
        y: 1,
      },
      animationSpeed: 0.5,
      text: {
        fontSize: 20,
        lineHeight: 20,
        strokeThickness: 0,
        dropShadowDistance: 0,
      },
    }
  );
  getRewardPanel = new dxPanel(
    DX_PIXI,
    "rewardTextPanel",
    DX_LAYERS.ui,
    getRewardText,
    {
      position: {
        x: DX_WIDTH / 2,
        y: 350,
      },
      scale: {
        x: 1,
        y: 1,
      },
      animationSpeed: 0.5,
      text: {
        fontSize: 20,
        lineHeight: 23,
        strokeThickness: 0,
        dropShadowDistance: 0,
      },
    }
  );

  let tempTimeout = setTimeout(() => removeSuccess(), 2500);
  timeoutArray.push(tempTimeout);
  tempTimeout = setTimeout(() => clearTimeouts(), 3000);
  timeoutArray.push(tempTimeout);
};

const removeSuccess = () => {
  panelQuantityPrice.remove();
  getRewardPanel.remove();
};

const addXp = (gainXP) => {
  console.log("expGanada", gainXP);
  dixperPluginSample.addActions(
    JSON.stringify([
      {
        ttl: 10000,
        actions: [
          {
            inputKey: "crafting-game-xp-01",
            scope: "{{scope}}",
            key: "crafting-game-xp",
            metadata: {
              userId: "{{userId}}",
              craftingGameId: "{{craftingGameId}}",
              amount: "{{amount}}",
            },
            tt0: "{{tt0}}",
            ttl: "{{ttl}}",
          },
        ],
      },
    ]),
    {
      "scope||crafting-game-xp-01": "",
      "craftingGameId||crafting-game-xp-01": "j0HbMaT54gjJTJdsOYix",
      "amount||crafting-game-xp-01": gainXP,
      "tt0||crafting-game-xp-01": 0,
      "ttl||crafting-game-xp-01": [0],
    }
  );
};
