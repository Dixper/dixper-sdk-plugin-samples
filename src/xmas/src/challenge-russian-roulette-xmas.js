const images = [];
const sprites = [
  {
    name: "spriteSnowmanExplosion",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/xmas/assets/spritesheets/explosion.json",
  },
  {
    name: "cursorHalloween",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/spritesheets/halloween-crosshair.json",
  },
  {
    name: "reminderXXL",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/xmas-david/src/xmas/assets/spritesheets/ReminderM_no_timer.json",
  },
  {
    name: "bulletsPanel",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/xmas-david/src/xmas/assets/spritesheets/2xMesa_de_trabajo_27.json",
  },
  {
    name: "rewardPanel",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/xmas-david/src/xmas/assets/spritesheets/prize_counter.json",
  },
  {
    name: "target",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/phasmophobia/src/fortnite/assets/spritesheets/definitive-target.json",
  },
  {
    name: "xmasChallenge",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/xmas-david/src/xmas/assets/spritesheets/Challenge_coms.json",
  },
  {
    name: "xmasTimer",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/xmas-david/src/xmas/assets/spritesheets/Timer_alone.json",
  },
  {
    name: "xmasReminderS",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/xmas-david/src/xmas/assets/spritesheets/ReminderS_No_timer.json",
  },
  {
    name: "snowFloor",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/xmas-david/src/xmas/assets/spritesheets/snow-floor-small.json",
  },
  {
    name: "newChallengeSuccess",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/xmas-david/src/xmas/assets/spritesheets/you_win.json",
  },
  {
    name: "newChallengeFail",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/xmas-david/src/xmas/assets/spritesheets/you_lose.json",
  },
  {
    name: "defeatPanel",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/xmas-david/src/xmas/assets/spritesheets/2xMesa_de_trabajo_27.json",
  },
  {
    name: "rewardTextPanel",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/xmas-david/src/xmas/assets/spritesheets/2xMesa_de_trabajo_16.json",
  },
  {
    name: "newChallengeSuccessSpanish",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/xmas-david/src/xmas/assets/spritesheets/you_win.json",
  },
  {
    name: "newChallengeFailSpanish",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/xmas-david/src/xmas/assets/spritesheets/you_lose.json",
  },
];
const sounds = [
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/xmas/assets/sounds/Box_Success.mp3",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/xmas-david/src/xmas/assets/sounds/you_lose_SFX.mp3",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/sounds/Shoot.wav",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/sounds/reload-revolver.wav",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/sounds/Heartbeat-sound.wav",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/xmas-david/src/xmas/assets/sounds/Dauzkobza-Merry-Christmas-Gentle-Bells_-Harmonic_-Toy-Music-Box.mp3",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/sounds/xpwinning.wav",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/sounds/pumpkinExplodingSFX.mp3",
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
  challengeSFX,
  gainXpSFX,
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
  mouse,
  hearthSFX,
  explodingSFX,
  spritePumpkin;
let gainedXP = false;
let assetFail, assetSuccess;
let continueText, stopText;
let timeoutArray = [];
let timeout = false;
let checkClick = false;
let clickedChallenge = false;

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
  rewardsRemainder,
} = DX_INPUTS;

// PIXIJS INITILIZE

dixperPluginSample.onPixiLoad = () => {
  if (DX_CONTEXT.language === "es") {
    assetFail = "newChallengeFailSpanish";
    assetSuccess = "newChallengeSuccessSpanish";
  } else {
    assetFail = "newChallengeFail";
    assetSuccess = "newChallengeSuccess";
  }
  createSoundsSFX();
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
  clearTimeouts();
};

dixperPluginSample.onChallengeFinish = () => {
  getReward();
};

const clearTimeouts = () => {
  if (timer) {
    timer.remove(false);
  }
  console.log(timeoutArray.length);
  timeoutArray.forEach((element) => {
    clearTimeout(element);
    console.log("timeout id: " + element + " cleared");
  });
  dixperPluginSample.stopSkill();
};

const createChallenge = () => {
  challengeSFX.play({ volume: 0.75 });
  titleChallengePanel = new dxPanel(
    DX_PIXI,
    "xmasChallenge",
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
        fontSize: 35,
        lineHeight: 36,
        strokeThickness: 1,
        dropShadowDistance: 4,
      },
    }
  );

  acceptButton = new DxButton(
    "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/xmas-david/src/xmas/assets/spritesheets/Accept_button_clear.png",
    acceptButtonText,
    {
      isClickable: true,
      controller: {
        isPressable: true,
        button: "FACE_1",
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
        fontSize: 26,
        strokeThickness: 1,
        dropShadowDistance: 3,
      },
    }
  );

  declineButton = new DxButton(
    "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/xmas-david/src/xmas/assets/spritesheets/Decline_button_clear.png",
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
        fontSize: 26,
        strokeThickness: 1,
        dropShadowDistance: 3,
      },
    }
  );

  halloweenPanel = new dxPanel(
    DX_PIXI,
    "snowFloor",
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
    if (!clickedChallenge) {
      clickedChallenge = true;
      removeChallenge();
      dixperPluginSample.initCountdown();
    }
  };
  declineButton.onClick = (event) => {
    if (!clickedChallenge) {
      clickedChallenge = true;
      dixperPluginSample.onChallengeRejected();
    }
  };
};

const onChallengeAccepted = () => {
  switch (level) {
    case 1:
      rewards = [1, 3, 7, 15, 31];
      stepRewards = [1, 2, 4, 8, 16];
      // rewardsRemainder =
      //   "XP FOR EXTRA SHOTS \n\n 1 Shot: +1XP \n 2 Shot: +2XP \n 3 Shot: +4XP \n 4 Shot: +8XP \n 5 Shot: +16XP \n\n Destroy Pumpkin : 0";
      break;
    case 2:
      rewards = [2, 6, 14, 30, 62];
      stepRewards = [2, 4, 8, 16, 32];
      // rewardsRemainder =
      //   "XP FOR EXTRA SHOTS \n\n 1 Shot: +2XP \n 2 Shot: +4XP \n 3 Shot: +8XP \n 4 Shot: +16XP \n 5 Shot: +32XP \n\n Destroy Pumpkin : 0";
      break;
    case 3:
      rewards = [4, 12, 28, 60, 124];
      stepRewards = [4, 8, 16, 32, 64];
      // rewardsRemainder =
      //   "XP FOR EXTRA SHOTS \n\n 1 Shot: +4XP \n 2 Shot: +8XP \n 3 Shot: +16XP \n 4 Shot: +32XP \n 5 Shot: +64XP \n\n Destroy Pumpkin : 0";
      break;
    case 4:
      rewards = [8, 24, 56, 120, 248];
      stepRewards = [8, 16, 32, 64, 128];
      // rewardsRemainder =
      //   "XP FOR EXTRA SHOTS \n\n 1 Shot: +8XP \n 2 Shot: +16XP \n 3 Shot: +32XP \n 4 Shot: +64XP \n 5 Shot: +128XP \n\nDestroy Pumpkin : 0";
      break;
  }

  reminder = new dxPanel(
    DX_PIXI,
    "xmasReminderS",
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
    "xmasTimer",
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
    removeChoiceOfBet();
    if (pumpkin) {
      pumpkin._destroy();
    }
    timeout = true;
    getReward();
    console.log("fin skill");
  };

  setContainer();

  init();
};

const removeChallenge = () => {
  titleChallengePanel._destroy();
  acceptButton.remove();
  declineButton.remove();
  halloweenPanel._destroy();
};

const createChallengeSuccess = (language) => {
  const challengeSuccessSFX = PIXI.sound.Sound.from(sounds[0]);
  challengeSuccessSFX.play({ volume: 0.75 });

  const panelChallengeSuccess = new dxPanel(
    DX_PIXI,
    language,
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
  let tempTimeout = setTimeout(() => panelChallengeSuccess.remove(), 1500);
  timeoutArray.push(tempTimeout);
  tempTimeout = setTimeout(() => clearTimeout(), 2500);
  timeoutArray.push(tempTimeout);
};

const createChallengeFail = (language) => {
  const challengeFailSFX = PIXI.sound.Sound.from(sounds[1]);
  challengeFailSFX.play({ volume: 0.75 });

  const panelChallengeFail = new dxPanel(DX_PIXI, language, DX_LAYERS.ui, "", {
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
  let tempTimeout = setTimeout(() => panelChallengeFail.remove(), 1500);
  timeoutArray.push(tempTimeout);
  tempTimeout = setTimeout(() => clearTimeout(), 2500);
};

// ---------------------------------------

const createSoundsSFX = () => {
  challengeSFX = PIXI.sound.Sound.from(sounds[5]);
  shootSFX = PIXI.sound.Sound.from(sounds[2]);
  noShootSFX = PIXI.sound.Sound.from(sounds[3]);
  hearthSFX = PIXI.sound.Sound.from(sounds[4]);
  gainXpSFX = PIXI.sound.Sound.from(sounds[6]);
  explodingSFX = PIXI.sound.Sound.from(sounds[7]);
};

const init = () => {
  console.clear();
  createPumpkin();
  hearthSFX.play({ volume: 0.75, loop: true });
//  createHalloweenCursor();
  createRandom(maxOrderBullet, minOrderBullet);
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
    "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/xmas/assets/images/snowman.png",
    "",
    {
      isClickable: true,
      controller: {
        isPressable: true,
        button: "FACE_1",
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
      if (counterShootPanel.count < 5) {
        counterShootPanel.incrementCount();
        if (counterShootPanel.count === randomBulletOrder) {
          // shootSFX.play({ volume: 2 });
          explodingSFX.play({ volume: 2 });
          console.log("FALLASTE");
          timeout = true;
          counterRewardPanel.count = 0;
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
    }
  };
};

const createSpritePumpkin = () => {
  spritePumpkin = new dxPanel(
    DX_PIXI,
    "spriteSnowmanExplosion",
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
        x: 250,
        y: DX_HEIGHT / 2,
      },
      scale: {
        x: 0.7,
        y: 0.7,
      },
      animationSpeed: 0.5,
      text: {
        fontSize: 25,
        lineHeight: 26,
        align: screenLeft,
        strokeThickness: 0,
        dropShadowDistance: 0,
      },
    }
  );
};

const createChoiceOfBet = () => {
  checkClick = false;
  countCreateChoiceOfBet++;
  nextStepRewards = countCreateChoiceOfBet;
  console.log("count", countCreateChoiceOfBet);

  if (DX_CONTEXT.language === "es") {
    continueText = `Juegas por: ${stepRewards[nextStepRewards]}XP`;
    stopText = `Te rindes con: ${counterRewardPanel.count}XP`;
  } else {
    continueText = `Play for: ${stepRewards[nextStepRewards]}XP`;
    stopText = `Leave with: ${counterRewardPanel.count}XP`;
  }

  choiceOfBetPanel = new dxPanel(
    DX_PIXI,
    "xmasChallenge",
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
  //   "snowFloor",
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
    "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/xmas-david/src/xmas/assets/spritesheets/Accept_button_clear.png",
    continueText,
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
    "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/xmas-david/src/xmas/assets/spritesheets/Decline_button_clear.png",
    stopText,
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
    if (!checkClick) {
      hearthSFX.play({ volume: 0.75, loop: true });
      removeChoiceOfBet();
      checkClick = true;
    }
  };
  declineBetButton.onClick = (event) => {
    if (!checkClick) {
      timeout = true;
      pumpkin._destroy();
      removeChoiceOfBet();
      getReward();
      checkClick = true;
    }
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
  if (choiceOfBetPanel) {
    choiceOfBetPanel.remove();
  }
  if (acceptBetButton) {
    acceptBetButton.remove();
  }
  if (declineBetButton) {
    declineBetButton.remove();
  }
  // halloweenFloor.remove();
  choiceOfBetPanel = null;
  acceptBetButton = null;
  declineBetButton = null;
  if (pumpkin) {
    pumpkin.instance.alpha = 1;
  }
};

const getReward = () => {
  timer.remove(false);
  const rewardQuantity = counterRewardPanel.count;
  console.log("rewardQuantity", rewardQuantity);

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
    if (!gainedXP) {
      addXp(rewardQuantity);
      gainXpSFX.play({ volume: 0.75 });
    }
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
      `+${rewardQuantity}XP`,
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
  setTimeout(() => clearTimeouts(), 3000);
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

  if (timeout) {
    timer.onTimerFinish = () => {};
    timer.remove(false);
  }
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

const addXp = (gainXP) => {
  gainedXP = true;
  console.log("gainXP", gainXP);
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
      "ttl||crafting-game-xp-01": 0,
    }
  );
};
