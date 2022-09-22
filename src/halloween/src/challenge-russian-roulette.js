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
  {
    name: "halloweenCementery",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/origin/halloween-rii/src/halloween/assets/spritesheets/cementery-illustration.json",
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
  getQuantityPanel,
  halloweenPanel,
  nextStepRewards,
  rewardPanel;

let countCreateChoiceOfBet = 0;

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
  defeatText,
  stepRewards,
  rewards,
  rewardsRemainder,
} = DX_INPUTS;

// PIXIJS INITILIZE

dixperPluginSample.onPixiLoad = () => {
  dixperPluginSample.initChallenge(challengeTitle, challengeTime);
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
  getReward();
};

const init = () => {
  console.clear();
  createReminder();
  createRandom(maxOrderBullet, minOrderBullet);
  createPumpkin();
  createCounterShootPanel();
  createCounterRewardPanel();
  createRewardPanel();

  //   onClickSub = dixperPluginSample.onMouseDown$.subscribe(onKeyOrClick);
  //   onKeySub = dixperPluginSample.onKeyDown$.subscribe(onKeyOrClick);
  // const onKeyOrClick = (event) => {
  //   console.log("event", event);
  // };
};

// /*
// CREATE INIT FUNCTIONS - START
// */

const createRandom = (maxOrderBullet, minOrderBullet) => {
  randomBulletOrder = Math.floor(
    Math.random() * (maxOrderBullet - minOrderBullet) + minOrderBullet
  );
  // randomBulletOrder = 5;
  console.log("random", randomBulletOrder);
};

const createPumpkin = () => {
  pumpkin = new DxButton(
    "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/origin/halloween-rii/src/halloween/assets/images/Target_INOUT_00017.png",
    "",
    {
      isClickable: true,
      controller: {
        isPressable: true,
        button: "FACE_4",
        x: 50,
        y: 50,
      },
      keyboard: {
        isPressable: true,
        button: "X",
        x: 150,
        y: 150,
      },
      position: {
        x: DX_WIDTH / 2,
        y: DX_HEIGHT / 2,
      },
      scale: {
        x: 6,
        y: 6,
      },
    }
  );

  pumpkin.start();

  pumpkin.onClick = (event) => {
    if (!choiceOfBetPanel) {
      counterShootPanel.incrementCount();
      if (counterShootPanel.count === randomBulletOrder) {
        console.log("FALLASTE");
        alert("FALLASTE");
        counterRewardPanel.count = 0;
        shootSFX.play({ volume: 0.75 });
        failChallenge();
        setTimeout(() => getReward(), 1500);
      } else {
        checkReward();
        console.log("SIN BALA");
        alert("SIN BALA");
        noShootSFX.play({ volume: 0.75 });
      }
    }
  };
};

const createCounterShootPanel = () => {
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

const createRewardPanel = () => {
  rewardPanel = new dxPanel(
    DX_PIXI,
    "ghostPanel",
    DX_LAYERS.ui,
    rewardsRemainder,
    {
      position: {
        x: 200,
        y: DX_HEIGHT / 2 + 100,
      },
      scale: {
        x: 0.4,
        y: 0.8,
      },
      animationSpeed: 0.5,
    }
  );
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

const createShootSFX = () => {
  shootSFX = PIXI.sound.Sound.from(sounds[0]);
};

const createNoShootSFX = () => {
  noShootSFX = PIXI.sound.Sound.from(sounds[1]);
};

const createChoiceOfBet = () => {
  countCreateChoiceOfBet++;
  nextStepRewards = countCreateChoiceOfBet;
  console.log("count", countCreateChoiceOfBet);
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

  acceptBetButton = new DxButton(
    "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/origin/halloween-rii/src/halloween/assets/images/Reminder_1.png",
    `Juega por: ${rewards[nextStepRewards]}`,
    {
      isClickable: true,
      controller: {
        isPressable: true,
        button: "FACE_1",
        x: 0,
        y: 40,
      },
      keyboard: {
        isPressable: true,
        button: "Enter",
        x: 0,
        y: 40,
      },
      position: {
        x: DX_WIDTH / 2 - 350,
        y: 540,
      },
      scale: {
        x: 1,
        y: 1,
      },
    }
  );

  declineBetButton = new DxButton(
    "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/origin/halloween-rii/src/halloween/assets/images/Reminder_1.png",
    `Me rindo con: ${counterRewardPanel.count}`,
    {
      isClickable: true,
      controller: {
        isPressable: true,
        button: "FACE_2",
        x: 0,
        y: 40,
      },
      keyboard: {
        isPressable: true,
        button: "Esc",
        x: 0,
        y: 40,
      },
      position: {
        x: DX_WIDTH / 2 + 350,
        y: 540,
      },
      scale: {
        x: 1,
        y: 1,
      },
    }
  );

  acceptBetButton.start();
  declineBetButton.start();

  acceptBetButton.onClick = (event) => {
    removeChoiceOfBet();
  };
  declineBetButton.onClick = (event) => {
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
      counterRewardPanel.incrementCount(stepRewards[0]);
      pumpkin.instance.alpha = 0;
      createChoiceOfBet();
      break;
    case 2:
      counterRewardPanel.incrementCount(stepRewards[1]);
      pumpkin.instance.alpha = 0;
      createChoiceOfBet();
      break;
    case 3:
      counterRewardPanel.incrementCount(stepRewards[2]);
      pumpkin.instance.alpha = 0;
      createChoiceOfBet();
      break;
    case 4:
      counterRewardPanel.incrementCount(stepRewards[3]);
      pumpkin.instance.alpha = 0;
      createChoiceOfBet();
      break;
    case 5:
      counterRewardPanel.incrementCount(stepRewards[4]);
      getReward();
      break;
    default:
  }
};

const removeChoiceOfBet = () => {
  choiceOfBetPanel.remove();
  acceptBetButton.remove();
  declineBetButton.remove();
  halloweenPanel.remove();
  choiceOfBetPanel = null;
  acceptBetButton = null;
  declineBetButton = null;
  pumpkin.instance.alpha = 1;
};

const getReward = () => {
  if (counterRewardPanel.count === 0) {
    getRewardPanel = new dxPanel(
      DX_PIXI,
      "ghostPanel",
      DX_LAYERS.top,
      defeatText,
      {
        position: {
          x: DX_WIDTH / 2,
          y: 330,
        },
        scale: {
          x: 1.25,
          y: 1.25,
        },
        animationSpeed: 0.5,
        text: {
          fontSize: 40,
          fill: "#000000",
        },
      }
    );
  } else {
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
  }

  clearScenePumpkin();
};

const clearScenePumpkin = () => {
  reminder.remove();
  counterShootPanel.remove();
  counterRewardPanel.remove();
  rewardPanel.remove();
  pumpkin.remove();
  setTimeout(() => dixperPluginSample.stopSkill(), 1500);
};

const failChallenge = () => {
  console.log("boooom");
  // dxPanel de la calabaza explotando
  pumpkin.remove();
};

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
