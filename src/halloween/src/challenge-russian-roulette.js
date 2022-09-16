const images = [];
const sprites = [
  {
    name: "ghostPanel",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/phasmophobia/src/phasmophobia/assets/spritesheets/phasmoReminder.json",
  },
  {
    name: "target",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/phasmophobia/src/fortnite/assets/spritesheets/definitive-target.json",
    // url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/spritesheets/definitive-target.json",
  },
];
const sounds = [
  {
    name: "writingInSound_01",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/phasmophobia/src/phasmophobia/assets/sounds/Writing_01.mp3",
  },
  {
    name: "writingInSound_02",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/phasmophobia/src/phasmophobia/assets/sounds/Writing_02.mp3",
  },
];

// INPUTS PARAMS

let reminder,
  randomBulletOrder,
  pumpkin,
  shootSFX,
  noShootSFX,
  counterShootPanel,
  counterRewardPanel,
  choiceOfBetPanel,
  acceptBetButton,
  declineBetButton,
  getRewardPanel,
  getQuantityPanel;

let jSONarray;
let parsed;

// DIXPER SDK INJECTED CLASS

const dixperPluginSample = new DixperSDKLib({
  pixi: {
    enable: true,
    files: [...images, ...sprites, ...sounds],
  },
});

// INPUTS

const {
  challengeTitle,
  challengeTime,
  reminderTitle,
  maxOrderBullet,
  minOrderBullet,
  choiceOfBetText,
  getRewardText,
} = DX_INPUTS;

// PIXIJS INITILIZE

dixperPluginSample.onPixiLoad = () => {
  // dixperPluginSample.initChallenge(challengeTitle, challengeTime);
  const url =
    "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/origin/halloween-rii/src/common/keys-mapping.json";
  try {
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        jSONarray = json;
        console.log("jsonArray", jSONarray);
        try {
          parsed = JSON.parse(jSONarray);
        } catch (e) {
          console.log("error", e);
        }
        console.log("parsed", parsed);
      });
  } catch (e) {
    console.log("error", e);
  }

  // $.getJSON(
  //   "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/origin/halloween-rii/src/common/keys-mapping.json",
  //   function (data) {
  //     // JSON result in data variable
  //     parsed = JSON.parse(data);
  //     console.log("parsed", parsed);
  //   }
  // );
};

// INIT CHALLENGE

dixperPluginSample.onChallengeAccepted = () => {
  init();
  createNoShootSFX();
  createShootSFX();
  setContainer();
};

dixperPluginSample.onChallengeRejected = () => {
  dixperPluginSample.stopSkill();
};

dixperPluginSample.onChallengeFinish = () => {
  dixperPluginSample.challengeFail();
  reminder.remove();
  setTimeout(() => dixperPluginSample.stopSkill(), 1500);
  //   setTimeout(
  //     () => dixperPluginSample.addParentSkill("zmwKfnd7vzV7HZ07uK3s"),
  //     2000
  //   );
};

const init = () => {
  console.log("init");
  createReminder();
  createRandom(maxOrderBullet, minOrderBullet);
  createPumpkin();
  createCounterShootPanel();
  createCounterRewardPanel();

  //   onClickSub = dixperPluginSample.onMouseDown$.subscribe(onKeyOrClick);
  //   onKeySub = dixperPluginSample.onKeyDown$.subscribe(onKeyOrClick);
};

// /*
// CREATE INIT FUNCTIONS - START
// */

const createRandom = (maxOrderBullet, minOrderBullet) => {
  // randomBulletOrder = Math.floor(
  //   Math.random() * (maxOrderBullet - minOrderBullet) + minOrderBullet
  // );
  randomBulletOrder = 6;
  console.log("random", randomBulletOrder);
  // console.log("randomPosition", randomPosition);
};

const createPumpkin = () => {
  pumpkin = new dxButton(
    dixperPluginSample.pixi,
    "target",
    dixperPluginSample.uiLayer,
    "",
    {
      position: {
        x: DX_WIDTH / 2,
        y: DX_HEIGHT / 2,
      },
      scale: {
        x: 6,
        y: 6,
      },
      animationSpeed: 0.5,
      zIndex: 1,
      hitbox: [-41, -5, -8, -28, 22, -25, 41, 13, 14, 38, -30, 25],
      debug: false,
    }
  );
  console.log("pumkpin", pumpkin);

  pumpkin.onClick = (event) => {
    if (!choiceOfBetPanel) {
      console.log("CLICK");
      counterShootPanel.incrementCount();
      if (counterShootPanel.count === randomBulletOrder) {
        console.log("FALLASTE");
        shootSFX.play({ volume: 0.75 });
        setTimeout(() => dixperPluginSample.challengeFail(), 2000);
      } else {
        checkReward();
        console.log("SIN BALA");
        noShootSFX.play({ volume: 0.75 });
      }
    }
  };
};

const createCounterShootPanel = () => {
  console.log("creo la apuesta");
  counterShootPanel = new dxCounter(
    DX_PIXI,
    "ghostPanel",
    DX_LAYERS.ui,
    0,
    "",
    {
      position: {
        x: (3 * DX_WIDTH) / 4 - 100,
        y: 100,
      },
      scale: {
        x: 0.4,
        y: 0.4,
      },
      animationSpeed: 0.5,
    }
  );
};

const createCounterRewardPanel = () => {
  counterRewardPanel = new dxCounter(
    DX_PIXI,
    "ghostPanel",
    DX_LAYERS.ui,
    0,
    "",
    {
      position: {
        x: (3 * DX_WIDTH) / 4 - 400,
        y: 100,
      },
      scale: {
        x: 0.4,
        y: 0.4,
      },
      animationSpeed: 0.5,
    }
  );
};

const createShootSFX = () => {
  shootSFX = PIXI.sound.Sound.from(sounds[0]);
};

const createNoShootSFX = () => {
  noShootSFX = PIXI.sound.Sound.from(sounds[1]);
};

const createReminder = () => {
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

const createChoiceOfBet = () => {
  choiceOfBetPanel = new dxPanel(
    DX_PIXI,
    "ghostPanel",
    DX_LAYERS.top,
    choiceOfBetText,
    {
      position: {
        x: DX_WIDTH / 2,
        y: 200,
      },
      scale: {
        x: 0.75,
        y: 0.75,
      },
      animationSpeed: 0.5,
      zIndex: 99,
    }
  );

  acceptBetButton = new dxButton(
    DX_PIXI,
    "ghostPanel",
    DX_LAYERS.top,
    "Disparo",
    {
      position: {
        x: DX_WIDTH / 2 - 350,
        y: 540,
      },
      scale: {
        x: 1,
        y: 1,
      },
      animationSpeed: 0.5,
      zIndex: 99,
      hitbox: [-292, -122, 292, -122, 292, 122, -292, 122],
      debug: true,
    }
  );

  declineBetButton = new dxButton(
    DX_PIXI,
    "ghostPanel",
    DX_LAYERS.top,
    `Me rindo con: ${counterRewardPanel.count}`,
    {
      position: {
        x: DX_WIDTH / 2 + 350,
        y: 540,
      },
      scale: {
        x: 1,
        y: 1,
      },
      animationSpeed: 0.5,
      zIndex: 99,
      hitbox: [-292, -122, 292, -122, 292, 122, -292, 122],
      debug: true,
    }
  );

  acceptBetButton.onClick = (event) => {
    console.log("aceptar");
    removeChoiceOfBet();
  };
  declineBetButton.onClick = (event) => {
    console.log("rechazar");
    removeChoiceOfBet();
    getReward();
  };
};

// /*
// CREATE INIT FUNCTIONS - END
// */

const checkReward = () => {
  switch (counterShootPanel.count) {
    case 1:
      counterRewardPanel.incrementCount(500);
      // pumpkin.instance.alpha = 0.3;
      pumpkin.instance._tint = 0x4c4c4c;
      createChoiceOfBet();
      break;
    case 2:
      counterRewardPanel.incrementCount(1000);
      pumpkin.instance.alpha = 0.3;
      createChoiceOfBet();
      break;
    case 3:
      counterRewardPanel.incrementCount(2000);
      pumpkin.instance.alpha = 0.3;
      createChoiceOfBet();
      break;
    case 4:
      counterRewardPanel.incrementCount(4000);
      pumpkin.instance.alpha = 0.3;
      createChoiceOfBet();
      break;
    case 5:
      counterRewardPanel.incrementCount(12500);
      getReward();
      break;
    default:
  }
};

const removeChoiceOfBet = () => {
  console.log("REMOVEEEEEEEEEEEEEEEEEEEEEE");
  choiceOfBetPanel.remove();
  acceptBetButton.remove();
  declineBetButton.remove();
  choiceOfBetPanel = null;
  acceptBetButton = null;
  declineBetButton = null;
};

const getReward = () => {
  getRewardPanel = new dxPanel(
    DX_PIXI,
    "ghostPanel",
    DX_LAYERS.top,
    getRewardText,
    {
      position: {
        x: DX_WIDTH / 2,
        y: 330,
      },
      scale: {
        x: 0.75,
        y: 0.75,
      },
      animationSpeed: 0.5,
      text: {
        fontSize: 80,
        fill: "#000000",
      },
    }
  );
  getQuantityPanel = new dxPanel(
    DX_PIXI,
    "ghostPanel",
    DX_LAYERS.top,
    `${counterRewardPanel.count}`,
    {
      position: {
        x: DX_WIDTH / 2,
        y: DX_HEIGHT / 2,
      },
      scale: {
        x: 1.0,
        y: 1.0,
      },
      animationSpeed: 0.5,
      text: {
        fontSize: 130,
        fill: "#000000",
      },
    }
  );
  removePumpkin();
};

const removePumpkin = () => {
  pumpkin.remove();
};

// const onKeyOrClick = (event) => {
//   console.log("event", event);
// };

// //   dixperPluginSample.challengeSuccess();
const setContainer = () => {
  DX_LAYERS.top.scale = {
    x: 0.6,
    y: 0.6,
  };
  DX_LAYERS.top.pivot = {
    x: DX_WIDTH / 2,
    y: DX_HEIGHT / 2,
  };
  DX_LAYERS.top.position = {
    x: DX_WIDTH / 2,
    y: DX_HEIGHT / 2,
  };
};
