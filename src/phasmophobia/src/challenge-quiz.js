const images = [
  {
    name: "ghostPanel",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/phasmophobia/assets/images/button.png",
  },
  {
    name: "phasmoTitle",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/phasmophobia/assets/spritesheets/challenge_title_phasmo.png",
  },
];
const sprites = [
  {
    name: "phasmoChallenge",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/phasmophobia/assets/spritesheets/challenge_title_phasmo.json",
  },
  {
    name: "timerPhasmo",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/phasmophobia/assets/spritesheets/phasmoTimer.json",
  },
  {
    name: "reminderPhasmo",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/phasmophobia/assets/spritesheets/phasmoReminder.json",
  },
  {
    name: "newChallengeSuccess",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/phasmophobia/assets/spritesheets/you_win.json",
  },
  {
    name: "newChallengeFail",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/phasmophobia/assets/spritesheets/you_lose.json",
  },
  {
    name: "newChallengeSuccessSpanish",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/phasmophobia/assets/spritesheets/you_win_es.json",
  },
  {
    name: "newChallengeFailSpanish",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/phasmophobia/assets/spritesheets/you_lose_es.json",
  },
];
const sounds = [
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/sounds/You_Win_SFX.mp3",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/sounds/You_Loose_SFX.mp3",
];

const ghostsList = [
  {
    ghost: "Banshee",
    ghost_id: 1,
    evidences: [2, 4, 6],
  },
  {
    ghost: "Demon",
    ghost_id: 2,
    evidences: [1, 6, 7],
  },
  {
    ghost: "Deogen",
    ghost_id: 3,
    evidences: [3, 4, 7],
  },
  {
    ghost: "Goryo",
    ghost_id: 4,
    evidences: [4, 5, 6],
  },
  {
    ghost: "Hantu",
    ghost_id: 5,
    evidences: [1, 2, 6],
  },
  {
    ghost: "Jinn",
    ghost_id: 6,
    evidences: [1, 5, 6],
  },
  {
    ghost: "Mare",
    ghost_id: 7,
    evidences: [2, 3, 7],
  },
  {
    ghost: "Moroi",
    ghost_id: 8,
    evidences: [1, 3, 7],
  },
  {
    ghost: "Myling",
    ghost_id: 9,
    evidences: [5, 6, 7],
  },
  {
    ghost: "Obake",
    ghost_id: 10,
    evidences: [2, 5, 6],
  },
  {
    ghost: "Oni",
    ghost_id: 11,
    evidences: [1, 4, 5],
  },
  {
    ghost: "Onryo",
    ghost_id: 12,
    evidences: [1, 2, 3],
  },
  {
    ghost: "Phantom",
    ghost_id: 13,
    evidences: [3, 4, 6],
  },
  {
    ghost: "Poltergeist",
    ghost_id: 14,
    evidences: [3, 6, 7],
  },
  {
    ghost: "Raiju",
    ghost_id: 15,
    evidences: [2, 4, 5],
  },
  {
    ghost: "Revenant",
    ghost_id: 16,
    evidences: [1, 2, 7],
  },
  {
    ghost: "Shade",
    ghost_id: 17,
    evidences: [1, 5, 7],
  },
  {
    ghost: "Spirit",
    ghost_id: 18,
    evidences: [3, 5, 7],
  },
  {
    ghost: "Thaye",
    ghost_id: 19,
    evidences: [2, 4, 7],
  },
  {
    ghost: "The Mimic",
    ghost_id: 20,
    evidences: [1, 2, 3, 6],
  },
  {
    ghost: "The Twins",
    ghost_id: 21,
    evidences: [1, 3, 5],
  },
  {
    ghost: "Wraith",
    ghost_id: 22,
    evidences: [3, 4, 5],
  },
  {
    ghost: "Yokai",
    ghost_id: 23,
    evidences: [2, 3, 4],
  },
  {
    ghost: "Yurei",
    ghost_id: 24,
    evidences: [1, 2, 4],
  },
];

const evidencesList = [
  {
    evidence: "Freezing Temperatures",
    evidence_id: 1,
    ghosts: [2, 5, 6, 8, 11, 12, 16, 17, 20, 21, 24],
  },
  {
    evidence: "Ghost Orb",
    evidence_id: 2,
    ghosts: [1, 5, 7, 10, 12, 15, 16, 19, 20, 23, 24],
  },
  {
    evidence: "Spirit Box",
    evidence_id: 3,
    ghosts: [3, 7, 8, 12, 13, 14, 18, 20, 21, 22, 23],
  },
  {
    evidence: "DOTS Projector",
    evidence_id: 4,
    ghosts: [1, 3, 4, 11, 13, 15, 19, 22, 23, 24],
  },
  {
    evidence: "EMF Level 5",
    evidence_id: 5,
    ghosts: [4, 6, 9, 10, 11, 15, 17, 18, 21, 22],
  },
  {
    evidence: "Fingerprints",
    evidence_id: 6,
    ghosts: [1, 2, 4, 5, 6, 9, 10, 13, 14, 20],
  },
  {
    evidence: "Ghost Writing",
    evidence_id: 7,
    ghosts: [2, 3, 7, 8, 9, 14, 16, 17, 18, 19],
  },
];

// DIXPER SDK INJECTED CLASS

const dixperPluginSample = new DixperSDKLib({
  pixi: {
    enable: true,
    files: [...images, ...sprites, ...sounds],
  },
});

// INPUTS

let onClickSub,
  ghost,
  randomOrderGhost,
  selectedGhost,
  ghostName,
  evidencesGhost,
  randomEvidence,
  correctEvidence,
  correctAnswer,
  evidenceWrongAnswer,
  answers,
  randomAnswers,
  button,
  acceptPhasmo,
  declinePhasmo,
  challengeMarker;
let wrongAnswers = [];
let arrayWrongAnswer = [];
let buttonsArray = [];
let positionY = 125;
let counterAnswer = 0;
let checkfinished = false;
let timeoutArray = [];
let timeout = false;
let answersSize, distanceBetweeenAnswer, totalWidth;

// INPUTS
let titleChallengePanel,
  acceptButton,
  declineButton,
  reminder,
  timer,
  assetFail,
  assetSuccess;

const {
  challengeTitle,
  challengeTime,
  reminderTitle,
  acceptButtonText,
  declineButtonText,
  textCountdown,
} = DX_INPUTS;

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

dixperPluginSample.onChallengeFinish = () => {};

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
        fontSize: 50,
        lineHeight: 20,
        fill: ["#000000"],
        strokeThickness: 0,
        dropShadowDistance: 0,
      },
    }
  );

  acceptButton = new DxButton("ghostPanel", acceptButtonText, {
    isClickable: true,
    controller: {
      isPressable: true,
      button: "FACE_1",
      x: 0,
      y: 50,
    },
    keyboard: {
      isPressable: true,
      button: 1,
      x: 0,
      y: 50,
    },
    position: {
      x: DX_WIDTH / 2 - 150,
      y: 380,
    },
    scale: {
      x: 0.7,
      y: 0.7,
    },
    text: {
      fontSize: 36,
      lineHeight: 35,
      fill: ["#000000"],
      strokeThickness: 0,
      dropShadowDistance: 0,
    },
  });

  declineButton = new DxButton("ghostPanel", declineButtonText, {
    isClickable: true,
    controller: {
      isPressable: true,
      button: "FACE_2",
      x: 0,
      y: 50,
    },
    keyboard: {
      isPressable: true,
      button: 2,
      x: 0,
      y: 50,
    },
    position: {
      x: DX_WIDTH / 2 + 150,
      y: 380,
    },
    scale: {
      x: 0.7,
      y: 0.7,
    },
    text: {
      fontSize: 36,
      lineHeight: 35,
      fill: ["#000000"],
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
        fontSize: 36,
        lineHeight: 35,
        fill: ["#000000"],
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
  // onClickSub = dixperPluginSample.onMouseDown$.subscribe(checkCorrectAnswer);
  console.log("init");
  generateQuestion();
  createCounterMarker();
};

const generateQuestion = () => {
  createGhost();
  createGhostPanel(ghostName);
  createRandomAnswers();
  createAnswers();
  createRandomOrderAnswers();
  createButtonAnswer();
};

/*
CREATE INIT FUNCTIONS - START
*/
const createGhostPanel = (ghostName) => {
  ghost = new DxButton("phasmoTitle", `${ghostName}`, {
    position: {
      x: DX_WIDTH / 2,
      y: DX_HEIGHT / 2 - 300,
    },
    scale: {
      x: 0.75,
      y: 0.75,
    },
    text: {
      fontSize: 35,
      lineHeight: 20,
      fill: ["#000000"],
      strokeThickness: 0,
      dropShadowDistance: 0,
    },
  });
  ghost.start();
};

const createButtonAnswer = () => {
  // answersSize = 250;
  // distanceBetweeenAnswer = 75;
  // totalWidth =
  //   answersSize * randomAnswers.length +
  //   distanceBetweeenAnswer * (randomAnswers.length - 1);

  randomAnswers.forEach((element, index) => {
    positionY += 200;
    button = new DxButton("phasmoTitle", `${element}`, {
      isClickable: true,
      controller: {
        isPressable: true,
        button: `${gamepadButtons[index]}`,
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
        x: DX_WIDTH / 2,
        y: positionY + 100,
      },
      scale: {
        x: 0.5,
        y: 0.5,
      },
      text: {
        fontSize: 35,
        lineHeight: 20,
        fill: ["#000000"],
        strokeThickness: 0,
        dropShadowDistance: 0,
      },
    });
    button.start();
    buttonsArray.push(button);
  });
  buttonsArray.forEach((button) => {
    checkCorrectAnswer(button);
  });
};

/*
CREATE INIT FUNCTIONS - END
*/

// const onKeyOrClick = (event) => {
//   console.log("event", event);
// };

const createGhost = () => {
  randomOrderGhost = Math.floor(Math.random() * ghostsList.length);
  selectedGhost = ghostsList[randomOrderGhost];
  console.log("selectedGhost", selectedGhost);
  ghostName = selectedGhost.ghost;
};

const createRandomAnswers = () => {
  evidencesGhost = selectedGhost.evidences;
  // console.log("evidences", evidencesGhost);
  randomEvidence = Math.floor(Math.random() * evidencesGhost.length);
  correctEvidence = evidencesGhost[randomEvidence];
  // console.log("correctEvidence", correctEvidence);

  evidencesList.forEach((e) => {
    if (e.evidence_id === correctEvidence) {
      correctAnswer = e;
    }
    return correctAnswer;
  });
  console.log("correctAnswer", correctAnswer.evidence);
  evidencesList.forEach((evidence) => {
    if (!evidence.ghosts.includes(selectedGhost.ghost_id)) {
      wrongAnswers.push(evidence.evidence);
    }
    return wrongAnswers;
  });
  // console.log("wrongAnswer", wrongAnswers);
};

const createAnswers = () => {
  for (let i = 0; i <= 1; i++) {
    let random = Math.floor(Math.random() * wrongAnswers.length);
    evidenceWrongAnswer = wrongAnswers.splice(random, 1);
    arrayWrongAnswer.push(...evidenceWrongAnswer);
  }
  answers = arrayWrongAnswer.concat(correctAnswer.evidence);
  // console.log("answers", answers);
};

const createRandomOrderAnswers = () => {
  randomAnswers = answers
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
};

const checkCorrectAnswer = (button) => {
  button.onClick = () => {
    if (correctAnswer.evidence === button._text) {
      console.log("respuesta correcta");
      challengeMarker.changeStatus(counterAnswer, "success");
      ghost.remove();
      buttonsArray.forEach((button) => {
        button.remove();
      });
      let tempTimeout = setTimeout(() => cleanAll(), 900);
      timeoutArray.push(tempTimeout);
      counterAnswer++;
      if (counterAnswer < 3) {
        tempTimeout = setTimeout(() => generateQuestion(), 1000);
        timeoutArray.push(tempTimeout);
      } else if (counterAnswer === 3) {
        checkfinished = true;
        tempTimeout = setTimeout(
          () => createChallengeSuccess(assetSuccess),
          1000
        );
        timeoutArray.push(tempTimeout);
      }
    } else {
      console.log("respuesta incorrecta");
      checkfinished = true;
      challengeMarker.changeStatus(counterAnswer, "fail");
      ghost.remove();
      buttonsArray.forEach((button) => {
        button.remove();
      });
      let tempTimeout = setTimeout(() => cleanAll(), 499);
      timeoutArray.push(tempTimeout);
      tempTimeout = setTimeout(() => createChallengeFail(assetFail), 500);
      timeoutArray.push(tempTimeout);
    }
  };
};

const cleanAll = () => {
  ghost = undefined;
  randomOrderGhost = undefined;
  selectedGhost = undefined;
  ghostName = undefined;
  evidencesGhost = undefined;
  randomEvidence = undefined;
  correctEvidence = undefined;
  correctAnswer = undefined;
  evidenceWrongAnswer = undefined;
  answers = undefined;
  randomAnswers = undefined;
  button = undefined;
  wrongAnswers = [];
  arrayWrongAnswer = [];
  buttonsArray = [];
  positionY = 125;
};

const createCounterMarker = () => {
  challengeMarker = new DxChallengeMarker(
    {
      success: {
        img: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/phasmophobia/assets/images/correct.png",
        sound:
          "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/phasmophobia/assets/sounds/correct.mp3",
      },
      fail: {
        img: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/phasmophobia/assets/images/incorrect.png",
        sound:
          "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/phasmophobia/assets/sounds/lose.mp3",
      },
      idle: {
        img: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/phasmophobia/assets/images/contador.png",
        sound: "https://pixijs.io/sound/examples/resources/boing.mp3",
      },
    },
    3,
    100,
    {
      position: {
        x: DX_WIDTH / 2,
        y: 100,
      },
      scale: {
        x: 0.35,
        y: 0.35,
      },
    }
  );
  challengeMarker.start();
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
