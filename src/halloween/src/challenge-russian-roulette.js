const images = [];
const sprites = [
  {
    name: "reminderXXL",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/spritesheets/reminderXXL.json",
  },
  {
    name: "bulletsPanel",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/spritesheets/bulletsPanel.json",
  },
  {
    name: "rewardPanel",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/spritesheets/rewardPanel.json",
  },
  {
    name: "target",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/phasmophobia/src/fortnite/assets/spritesheets/definitive-target.json",
  },
  {
    name: "halloweenChallenge",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/spritesheets/challenge-communication.json",
  },
  {
    name: "halloweenTime",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/spritesheets/timer.json",
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
    name: "newChallengeSuccess",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/spritesheets/win_challenge.json",
  },
  {
    name: "newChallengeFail",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/spritesheets/lose_challenge.json",
  },
  {
    name: "newChallengeSuccessSpanish",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/spritesheets/win_challenge_es.json",
  },
  {
    name: "newChallengeFailSpanish",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/spritesheets/lose_challenge_es.json",
  },
];
const sounds = [
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/sounds/You_Win_SFX.mp3",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/sounds/You_Loose_SFX.mp3",
];

// INPUTS PARAMS

let titleChallengePanel,
  acceptButton,
  declineButton,
  halloweenPanel,
  reminder,
  timer,
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
  halloweenFloor,
  nextStepRewards,
  rewardPanel,
  rewards,
  stepRewards,
  rewardsRemainder;

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
  acceptButtonText,
  declineButtonText,
  textCountdown,
  maxOrderBullet,
  minOrderBullet,
  choiceOfBetText,
  getRewardText,
  defeatText,
  level,
} = DX_INPUTS;

// PIXIJS INITILIZE

dixperPluginSample.onPixiLoad = () => {
  createChallenge();
};

// INIT CHALLENGE
dixperPluginSample.initCountdown = () => {
  const countDown = new dxCountDown(
    DX_PIXI,
    "countDown",
    DX_LAYERS.ui,
    3,
    textCountdown,
    {
      position: {
        x: DX_WIDTH / 2,
        y: DX_HEIGHT / 2,
      },
      scale: {
        x: 0.25,
        y: 0.25,
      },
      animationSpeed: 0.5,
    }
  );

  countDown.onOutFinish = () => {
    onChallengeAccepted();
  };
};

dixperPluginSample.onChallengeRejected = () => {
  dixperPluginSample.stopSkill();
};

dixperPluginSample.onChallengeFinish = () => {
  getReward();
};

const createChallenge = () => {
  titleChallengePanel = new dxPanel(
    DX_PIXI,
    "halloweenChallenge",
    DX_LAYERS.ui,
    challengeTitle,
    {
      position: {
        x: DX_WIDTH / 2,
        y: 250,
      },
      scale: {
        x: 1,
        y: 1,
      },
      animationSpeed: 0.5,
    }
  );

  acceptButton = new DxButton(
    "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/images/accept_challenge-button.png",
    acceptButtonText,
    {
      isClickable: true,
      controller: {
        isPressable: true,
        button: "FACE_2",
        x: 0,
        y: 50,
      },
      keyboard: {
        isPressable: true,
        button: "Enter",
        x: 0,
        y: 50,
      },
      position: {
        x: DX_WIDTH / 2 - 150,
        y: 450,
      },
      scale: {
        x: 1,
        y: 1,
      },
    }
  );

  declineButton = new DxButton(
    "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/images/decline-challenge-button.png",
    declineButtonText,
    {
      isClickable: true,
      controller: {
        isPressable: true,
        button: "FACE_2",
        x: 50,
        y: 50,
      },
      keyboard: {
        isPressable: true,
        button: "Esc",
        x: 0,
        y: 50,
      },
      position: {
        x: DX_WIDTH / 2 + 150,
        y: 450,
      },
      scale: {
        x: 1,
        y: 1,
      },
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

  acceptButton.start();
  declineButton.start();

  acceptButton.onClick = (event) => {
    removeChallenge();
    dixperPluginSample.initCountdown();
  };
  declineButton.onClick = (event) => {
    dixperPluginSample.onChallengeRejected();
  };
};

const onChallengeAccepted = () => {
  switch (level) {
    case 1:
      rewards = [5, 15, 35, 75, 200];
      stepRewards = [5, 10, 20, 40, 125];
      rewardsRemainder =
        "1 shoot: 5 \n 2 shoot: 10 \n 3 shoot: 20 \n 4 shoot: 40 \n 5 shoot: 125 \n Destroy Pumpkin : 0";
      break;
    case 2:
      rewards = [50, 150, 350, 750, 2000];
      stepRewards = [50, 100, 200, 400, 1250];
      rewardsRemainder =
        "1 shoot: 50 \n 2 shoot: 100 \n 3 shoot: 200 \n 4 shoot: 400 \n 5 shoot: 1250 \n Destroy Pumpkin : 0";
      break;
    case 3:
      rewards = [500, 1500, 3500, 7500, 20000];
      stepRewards = [500, 1000, 2000, 4000, 12500];
      rewardsRemainder =
        "1 shoot: 500 \n 2 shoot: 1000 \n 3 shoot: 2000 \n 4 shoot: 4000 \n 5 shoot: 12500 \n Destroy Pumpkin : 0";
      break;
    case 4:
      rewards = [1500, 5000, 10000, 20000, 50000];
      stepRewards = [1500, 3500, 5000, 10000, 30000];
      rewardsRemainder =
        "1 shoot: 1500 \n 2 shoot: 3500 \n 3 shoot: 5000 \n 4 shoot: 10000 \n 5 shoot: 30000 \n Destroy Pumpkin : 0";
      break;
  }

  reminder = new dxPanel(
    DX_PIXI,
    "halloweenReminder",
    DX_LAYERS.ui,
    reminderTitle,
    {
      position: {
        x: 200,
        y: DX_HEIGHT / 2 - 100,
      },
      scale: {
        x: 1,
        y: 1,
      },
      animationSpeed: 0.5,
    }
  );
  const interval = 1000;

  timer = new dxTimer(
    DX_PIXI,
    "halloweenTime",
    DX_LAYERS.ui,
    challengeTime,
    interval,
    {
      position: {
        x: 275,
        y: DX_HEIGHT / 2,
      },
      scale: {
        x: 1,
        y: 1,
      },
      animationSpeed: 0.5,
    }
  );
  timer.onTimerFinish = () => {
    dixperPluginSample.stopSkill();
    console.log("fin skill");
  };
  createNoShootSFX();
  createShootSFX();
  setContainer();

  init();
};

const removeChallenge = () => {
  titleChallengePanel._destroy();
  acceptButton.remove();
  declineButton.remove();
  halloweenPanel._destroy();
};

const createChallengeSuccess = () => {
  const challengeSuccessSFX = PIXI.sound.Sound.from(sounds[0]);
  challengeSuccessSFX.play({ volume: 0.75 });

  const panelChallengeSuccess = new dxPanel(
    DX_PIXI,
    "newChallengeSuccess",
    DX_LAYERS.ui,
    "",
    {
      position: {
        x: DX_WIDTH / 2,
        y: DX_HEIGHT / 2,
      },
      scale: {
        x: 1,
        y: 1,
      },
      animationSpeed: 0.5,
    }
  );
  setTimeout(() => panelChallengeSuccess.remove(), 500);
  setTimeout(() => dixperPluginSample.stopSkill(), 1000);
};

const createChallengeFail = () => {
  const challengeFailSFX = PIXI.sound.Sound.from(sounds[1]);
  challengeFailSFX.play({ volume: 0.75 });

  const panelChallengeFail = new dxPanel(
    DX_PIXI,
    "newChallengeFail",
    DX_LAYERS.ui,
    "",
    {
      position: {
        x: DX_WIDTH / 2,
        y: DX_HEIGHT / 2,
      },
      scale: {
        x: 1,
        y: 1,
      },
      animationSpeed: 0.5,
    }
  );
  setTimeout(() => panelChallengeFail.remove(), 500);
  setTimeout(() => dixperPluginSample.stopSkill(), 1000);
};

// ---------------------------------------

const init = () => {
  console.clear();
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
        counterRewardPanel.count = 0;
        shootSFX.play({ volume: 0.75 });
        failChallenge();
        setTimeout(() => getReward(), 1500);
      } else {
        checkReward();
        console.log("SIN BALA");
        noShootSFX.play({ volume: 0.75 });
      }
    }
  };
};

const createCounterShootPanel = () => {
  counterShootPanel = new dxCounter(
    DX_PIXI,
    "bulletsPanel",
    DX_LAYERS.ui,
    0,
    "",
    {
      position: {
        x: (3 * DX_WIDTH) / 4 - 100,
        y: 100,
      },
      scale: {
        x: 1,
        y: 1,
      },
      animationSpeed: 0.5,
    }
  );
};

const createCounterRewardPanel = () => {
  counterRewardPanel = new dxCounter(
    DX_PIXI,
    "rewardPanel",
    DX_LAYERS.ui,
    0,
    "",
    {
      position: {
        x: (3 * DX_WIDTH) / 4 - 400,
        y: 100,
      },
      scale: {
        x: 1,
        y: 1,
      },
      animationSpeed: 0.5,
    }
  );
};

const createRewardPanel = () => {
  rewardPanel = new dxPanel(
    DX_PIXI,
    "reminderXXL",
    DX_LAYERS.ui,
    rewardsRemainder,
    {
      position: {
        x: 200,
        y: DX_HEIGHT / 2 + 250,
      },
      scale: {
        x: 1,
        y: 1,
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

const createChoiceOfBet = () => {
  countCreateChoiceOfBet++;
  nextStepRewards = countCreateChoiceOfBet;
  console.log("count", countCreateChoiceOfBet);
  choiceOfBetPanel = new dxPanel(
    DX_PIXI,
    "halloweenChallenge",
    DX_LAYERS.top,
    choiceOfBetText,
    {
      position: {
        x: DX_WIDTH / 2,
        y: 200,
      },
      scale: {
        x: 1,
        y: 1,
      },
      animationSpeed: 0.5,
      zIndex: 99,
    }
  );

  halloweenFloor = new dxPanel(
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
    "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/images/accept_challenge-button.png",
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
        x: DX_WIDTH / 2 - 150,
        y: 540,
      },
      scale: {
        x: 1,
        y: 1,
      },
    }
  );

  declineBetButton = new DxButton(
    "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/images/decline-challenge-button.png",
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
        x: DX_WIDTH / 2 + 150,
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
  halloweenFloor.remove();
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
