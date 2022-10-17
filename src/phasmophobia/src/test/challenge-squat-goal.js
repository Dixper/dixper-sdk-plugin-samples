const images = [
  {
    name: "ghostPanel",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/phasmophobia/assets/spritesheets/phasmoReminder.png",
  },
];
const sprites = [
  {
    name: "reminderPhasmo",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/phasmophobia/assets/spritesheets/phasmoReminder.json",
  },
  {
    name: "phasmoChallenge",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/phasmophobia/assets/spritesheets/challenge_title_phasmo.json",
  },
  {
    name: "panelPhasmo",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/phasmophobia/assets/spritesheets/phasmoReminder.json",
  },
  {
    name: "timerPhasmo",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/phasmophobia/assets/spritesheets/phasmoTimer.json",
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

// DIXPER SDK INJECTED CLASS

const dixperPluginSample = new DixperSDKLib({
  pixi: {
    enable: true,
    files: [...images, ...sprites, ...sounds],
  },
});

// INPUTS
let onKeySub;
let counterPanel;
let count = 0;
let timeoutArray = [];
let timeout = false;

let titleChallengePanel,
  acceptButton,
  declineButton,
  reminder,
  timer,
  assetFail,
  assetSuccess,
  acceptPhasmo,
  declinePhasmo;

let squatKeys = [29, 46];
const squatButton = "FACE_1";
let checkfinished = false;

const {
  challengeTitle,
  challengeTime,
  reminderTitle,
  acceptButtonText,
  declineButtonText,
  textCountdown,
  squatTarget,
} = DX_INPUTS;

// PIXIJS INITILIZE

dixperPluginSample.onPixiLoad = () => {
  if (DX_CONTEXT.language === "es") {
    assetFail = "newChallengeFailSpanish";
    assetSuccess = "newChallengeSuccessSpanish";
    acceptPhasmo =
      "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/phasmophobia/assets/images/aceptar_button.png";
    declinePhasmo =
      "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/phasmophobia/assets/images/rechazar_button.png";
  } else {
    assetFail = "newChallengeFail";
    assetSuccess = "newChallengeSuccess";
    acceptPhasmo =
      "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/phasmophobia/assets/images/accept_button.png";
    declinePhasmo =
      "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/phasmophobia/assets/images/decline_button.png";
  }

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
  checkfinished = true;
  counterPanel.remove();
  onKeySub.unsubscribe();
  reminder.remove();
  if (counterPanel.count >= squatTarget) {
    createChallengeSuccess(assetSuccess);
  } else {
    createChallengeFail(assetFail);
  }
};

const createChallenge = () => {
  titleChallengePanel = new dxPanel(
    DX_PIXI,
    "phasmoChallenge",
    DX_LAYERS.ui,
    challengeTitle,
    {
      position: {
        x: DX_WIDTH / 2,
        y: 250,
      },
      scale: {
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

  acceptButton = new DxButton(acceptPhasmo, "", {
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
      x: 0,
      y: 50,
    },
    position: {
      x: DX_WIDTH / 2 - 120,
      y: 400,
    },
    scale: {
      x: 0.7,
      y: 0.7,
    },
    text: {
      fontSize: 20,
      lineHeight: 23,
      strokeThickness: 0,
      dropShadowDistance: 0,
    },
  });

  declineButton = new DxButton(declinePhasmo, "", {
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
      x: 0,
      y: 50,
    },
    position: {
      x: DX_WIDTH / 2 + 120,
      y: 400,
    },
    scale: {
      x: 0.7,
      y: 0.7,
    },
    text: {
      fontSize: 20,
      lineHeight: 23,
      strokeThickness: 0,
      dropShadowDistance: 0,
    },
  });

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
    "timerPhasmo",
    DX_LAYERS.ui,
    challengeTime,
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
  timer.onTimerFinish = () => {
    if (!checkfinished) {
      dixperPluginSample.stopSkill();
      console.log("fin skill");
    }
  };
  init();
};

const removeChallenge = () => {
  titleChallengePanel._destroy();
  acceptButton.remove();
  declineButton.remove();
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
  tempTimeout = setTimeout(() => clearTimeouts(), 2500);
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
  tempTimeout = setTimeout(() => clearTimeouts(), 2500);
  timeoutArray.push(tempTimeout);
};

const init = () => {
  if (DX_CONTROLLER_TYPE) {
    onKeySub = dixperPluginSample.onGamepadButtonPress$.subscribe(gamepadPress);
  } else {
    onKeySub = dixperPluginSample.onKeyDown$.subscribe(keyboardDown);
  }
  createcounterPanel();
};

const keyboardDown = (event) => {
  if (squatKeys.includes(event.keycode) && !event.repeat) {
    count += 1;
    if (count % 2 === 0 && counterPanel.count < squatTarget) {
      counterPanel.incrementCount();

      const randomRect = {
        min: DX_WIDTH / 2 - 200,
        max: DX_WIDTH / 2 + 100,
      };

      const coordinates = getRandomCoordinates(randomRect);

      const floatingText = new dxFloatingText(
        DX_PIXI,
        DX_LAYERS.ui,
        `${counterPanel.count}`,
        800,
        randomRect,
        {
          position: coordinates,
          random: true,
        }
      );

      floatingText.start();
    } else if (counterPanel.count >= squatTarget) {
      dixperPluginSample.challengeFinish();
    }
  }
};

const gamepadPress = (event) => {
  if (event.name === squatButton) {
    count += 1;
    if (count % 2 === 0 && counterPanel.count < squatTarget) {
      counterPanel.incrementCount();

      const randomRect = {
        min: DX_WIDTH / 2 - 200,
        max: DX_WIDTH / 2 + 100,
      };

      const coordinates = getRandomCoordinates(randomRect);

      const floatingText = new dxFloatingText(
        DX_PIXI,
        DX_LAYERS.ui,
        `${counterPanel.count}`,
        800,
        randomRect,
        {
          position: coordinates,
          random: true,
        }
      );

      floatingText.start();
    } else if (counterPanel.count >= squatTarget) {
      dixperPluginSample.challengeFinish();
    }
  }
};

function getRandomCoordinates(rect) {
  let x = Math.random() * (rect.max - rect.min) + rect.min;
  let y = DX_HEIGHT / 2 - 100;
  return { x, y };
}

const createcounterPanel = () => {
  counterPanel = new dxCounter(
    DX_PIXI,
    "panelPhasmo",
    DX_LAYERS.ui,
    0,
    squatTarget,
    {
      position: {
        x: (3 * DX_WIDTH) / 4 - 100,
        y: 100,
      },
      scale: {
        x: 0.5,
        y: 0.5,
      },
      animationSpeed: 0.5,
    }
  );
};

const clearTimeouts = () => {
  console.log(timeoutArray.length);
  timer.remove(false);
  timeoutArray.forEach((element) => {
    clearTimeout(element);
    console.log("timeout id: " + element + " cleared");
  });
  dixperPluginSample.stopSkill();
};
