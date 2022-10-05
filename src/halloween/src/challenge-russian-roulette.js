const images = [];
const sprites = [
  {
    name: "spritePumpkinExplosion",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/spritesheets/calabaza-explota.json",
  },
  {
    name: "cursorHalloween",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/spritesheets/halloween-crosshair.json",
  },
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
    name: "newChallengeSuccess",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/spritesheets/win_challenge.json",
  },
  {
    name: "newChallengeFail",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/spritesheets/lose_challenge.json",
  },
  {
    name: "defeatPanel",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/spritesheets/bulletsPanel.json",
  },
  {
    name: "rewardTextPanel",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/spritesheets/trivial-question.json",
  },
  // faltan los assets por hacer
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
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/sounds/Shoot.wav",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/sounds/reload-revolver.wav",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/sounds/Heartbeat-sound.wav",
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
  rewardPanelXXL,
  rewards,
  stepRewards,
  rewardsRemainder,
  mouse,
  hearthSFX,
  spritePumpkin;

let countCreateChoiceOfBet = 0;
const finalPositionTimer = -666;

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
        x: 0.8,
        y: 0.8,
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
        text: {
          fontSize: 20,
        },
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
      text: {
        fontSize: 20,
        lineHeight: 23,
        strokeThickness: 0,
        dropShadowDistance: 0,
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
        x: 0,
        y: 50,
      },
      keyboard: {
        isPressable: true,
        button: "Esc",
        text: {
          fontSize: 20,
        },
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
      text: {
        fontSize: 20,
        lineHeight: 23,
        strokeThickness: 0,
        dropShadowDistance: 0,
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
        "\n 1 shoot: 5 \n 2 shoot: 10 \n 3 shoot: 20 \n 4 shoot: 40 \n 5 shoot: 125 \n Destroy Pumpkin : 0";
      break;
    case 2:
      rewards = [50, 150, 350, 750, 2000];
      stepRewards = [50, 100, 200, 400, 1250];
      rewardsRemainder =
        "\n 1 shoot: 50 \n 2 shoot: 100 \n 3 shoot: 200 \n 4 shoot: 400 \n 5 shoot: 1250 \n Destroy Pumpkin : 0";
      break;
    case 3:
      rewards = [500, 1500, 3500, 7500, 20000];
      stepRewards = [500, 1000, 2000, 4000, 12500];
      rewardsRemainder =
        "\n 1 shoot: 500 \n 2 shoot: 1000 \n 3 shoot: 2000 \n 4 shoot: 4000 \n 5 shoot: 12500 \n Destroy Pumpkin : 0";
      break;
    case 4:
      rewards = [1500, 5000, 10000, 20000, 50000];
      stepRewards = [1500, 3500, 5000, 10000, 30000];
      rewardsRemainder =
        "\n 1 shoot: 1500 \n 2 shoot: 3500 \n 3 shoot: 5000 \n 4 shoot: 10000 \n 5 shoot: 30000 \n Destroy Pumpkin : 0";
      break;
  }

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
  const interval = 1000;

  timer = new dxTimer(
    DX_PIXI,
    "halloweenTime",
    DX_LAYERS.ui,
    challengeTime,
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
    getReward();
    console.log("fin skill");
  };
  createSoundsSFX();
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
  setTimeout(() => panelChallengeSuccess.remove(), 1500);
  setTimeout(() => dixperPluginSample.stopSkill(), 2500);
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
  setTimeout(() => panelChallengeFail.remove(), 1500);
  setTimeout(() => dixperPluginSample.stopSkill(), 2500);
};

// ---------------------------------------

const createSoundsSFX = () => {
  shootSFX = PIXI.sound.Sound.from(sounds[2]);
  noShootSFX = PIXI.sound.Sound.from(sounds[3]);
  hearthSFX = PIXI.sound.Sound.from(sounds[4]);
};

const init = () => {
  console.clear();
  hearthSFX.play({ volume: 0.75 });
  createHalloweenCursor();
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

const createHalloweenCursor = () => {
  mouse = new dxCursor(DX_PIXI, "cursorHalloween", DX_LAYERS.cursor, {
    parentLayer: DX_LAYERS.top,
    anchor: {
      x: 0.5,
      y: 0.5,
    },
  });
};

const createRandom = (maxOrderBullet, minOrderBullet) => {
  randomBulletOrder = Math.floor(
    Math.random() * (maxOrderBullet - minOrderBullet) + minOrderBullet
  );
  // randomBulletOrder = 6;
  console.log("random", randomBulletOrder);
};

const createPumpkin = () => {
  pumpkin = new DxButton(
    "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/images/pumpkin-ruleta.png",
    "",
    {
      isClickable: true,
      controller: {
        isPressable: true,
        button: "FACE_4",
        x: 0,
        y: 150,
      },
      keyboard: {
        isPressable: true,
        button: "Space",
        x: 0,
        y: 150,
      },
      position: {
        x: DX_WIDTH / 2,
        y: DX_HEIGHT / 2,
      },
      scale: {
        x: 1,
        y: 1,
      },
    }
  );

  pumpkin.start();

  pumpkin.onClick = (event) => {
    hearthSFX.stop();
    if (!choiceOfBetPanel) {
      counterShootPanel.incrementCount();
      if (counterShootPanel.count === randomBulletOrder) {
        console.log("FALLASTE");
        counterRewardPanel.count = 0;
        shootSFX.play({ volume: 2 });
        pumpkin.remove();
        createSpritePumpkin();
        // failChallenge();
        getReward();
      } else {
        checkReward();
        console.log("SIN BALA");
        noShootSFX.play({ volume: 1 });
      }
    }
  };
};

const createSpritePumpkin = () => {
  spritePumpkin = new dxPanel(
    DX_PIXI,
    "spritePumpkinExplosion",
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
      anchor: {
        x: 0.5,
        y: 0.5,
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
  rewardPanelXXL = new dxPanel(
    DX_PIXI,
    "reminderXXL",
    DX_LAYERS.ui,
    rewardsRemainder,
    {
      position: {
        x: 200,
        y: DX_HEIGHT / 2 + 150,
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
};

const createChoiceOfBet = () => {
  countCreateChoiceOfBet++;
  nextStepRewards = countCreateChoiceOfBet;
  console.log("count", countCreateChoiceOfBet);
  choiceOfBetPanel = new dxPanel(
    DX_PIXI,
    "halloweenChallenge",
    DX_LAYERS.ui,
    choiceOfBetText,
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
      zIndex: 99,
    }
  );

  // halloweenFloor = new dxPanel(
  //   DX_PIXI,
  //   "halloweenCementery",
  //   DX_LAYERS.ui,
  //   "",
  //   {
  //     position: {
  //       x: DX_WIDTH / 2,
  //       y: DX_HEIGHT - 195,
  //     },
  //     scale: {
  //       x: 1,
  //       y: 1,
  //     },
  //     animationSpeed: 0.5,
  //     zIndex: 99,
  //   }
  // );

  acceptBetButton = new DxButton(
    "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/images/accept_challenge-button.png",
    `Play for: ${rewards[nextStepRewards]}`,
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
      text: {
        fontSize: 20,
        lineHeight: 23,
        strokeThickness: 0,
        dropShadowDistance: 0,
      },
    }
  );

  acceptBetButton.start();

  declineBetButton = new DxButton(
    "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/images/decline-challenge-button.png",
    `Leave with: ${counterRewardPanel.count}`,
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
      // luis tama;o
      text: {
        fontSize: 20,
        lineHeight: 23,
        strokeThickness: 0,
        dropShadowDistance: 0,
      },
    }
  );

  declineBetButton.start();

  console.log("declineBetButton", declineBetButton);

  acceptBetButton.onClick = (event) => {
    hearthSFX.play({ volume: 0.75 });
    removeChoiceOfBet();
  };
  declineBetButton.onClick = (event) => {
    pumpkin._destroy();
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
      pumpkin._destroy();
      getReward();
      break;
    default:
  }
};

const removeChoiceOfBet = () => {
  choiceOfBetPanel.remove();
  acceptBetButton.remove();
  declineBetButton.remove();
  // halloweenFloor.remove();
  choiceOfBetPanel = null;
  acceptBetButton = null;
  declineBetButton = null;
  pumpkin.instance.alpha = 1;
};

const getReward = () => {
  const rewardQuantity = counterRewardPanel.count;
  clearScenePumpkin();
  if (counterRewardPanel.count === 0) {
    getRewardPanel = new dxPanel(
      DX_PIXI,
      "rewardTextPanel",
      DX_LAYERS.ui,
      defeatText,
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
  } else {
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
    getQuantityPanel = new dxPanel(
      DX_PIXI,
      "rewardPanel",
      DX_LAYERS.ui,
      `+${rewardQuantity}px`,
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
          lineHeight: 23,
          strokeThickness: 0,
          dropShadowDistance: 0,
        },
      }
    );
  }
  // setTimeout(() => clearScenePumpkin(), 2000);
};

const clearScenePumpkin = () => {
  if (reminder) {
    reminder.remove();
  }
  if (counterShootPanel) {
    counterShootPanel.remove();
  }
  if (counterRewardPanel) {
    counterRewardPanel.remove();
  }
  if (rewardPanel) {
    rewardPanel.remove();
  }
  if (rewardPanelXXL) {
    rewardPanelXXL.remove();
  }
  timer.instance.x = finalPositionTimer;
  // pumpkin.remove();
  setTimeout(() => dixperPluginSample.stopSkill(), 3000);
};

// const failChallenge = () => {
//   console.log("boooom");
//   // dxPanel de la calabaza explotando
//   pumpkin.remove();
// };

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
