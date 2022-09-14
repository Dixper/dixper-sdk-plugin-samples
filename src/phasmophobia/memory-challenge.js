const images = [
];
const sprites = [
  {
    name: "ghostReminder",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/phasmophobia/src/phasmophobia/assets/spritesheets/phasmoReminder.json",
  },
  {
    name: "newTime",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/phasmophobia/src/phasmophobia/assets/spritesheets/phasmoTimer.json",
  },
];
const sounds = [];

let reminder,
  timer,
  onClickSub,
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
  button;

let symbol;
let baseURL = "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/phasmophobia/src/phasmophobia/assets/spritesheets/";

let wrongAnswers = [];
let arrayWrongAnswer = [];
let buttonsArray = [];
let position = 200;

// INPUTS PARAMS

const symbolList = [
  {
    symbol: "phasmoReminder.png",
    options: [2, 4, 6],
  }
];

const optionsList = [
  {
    option: "phasmoReminder.png",
    name: 1,
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

const { challengeTitle, challengeTime, reminderTitle } = DX_INPUTS;

// PIXIJS INITILIZE

dixperPluginSample.onPixiLoad = () => {
  dixperPluginSample.initChallenge(challengeTitle, challengeTime);
};

// INIT CHALLENGE

dixperPluginSample.onChallengeAccepted = () => {
  init();
};

dixperPluginSample.onChallengeRejected = () => {
  dixperPluginSample.stopSkill();
};

dixperPluginSample.onChallengeFinish = () => {
  console.log("onChallengeFinish");
  if (reminder) {
    reminder.remove();
  }
  dixperPluginSample.challengeFail();
  dixperPluginSample.stopSkill();
};
const init = () => {
  createReminder();
  createTimer();
  generateQuestion();
};

/*
CREATE INIT FUNCTIONS - START
*/

const createReminder = () => {
  reminder = new dxPanel(
    DX_PIXI,
    "ghostReminder",
    DX_LAYERS.ui,
    reminderTitle,
    {
      position: {
        x: 200,
        y: DX_HEIGHT / 2 - 100,
      },
      scale: {
        x: 0.5,
        y: 0.5,
      },
      animationSpeed: 0.5,
    }
  );
};

const createTimer = () => {
  const interval = 1000;
  timer = new dxTimer(
    DX_PIXI,
    "newTime",
    DX_LAYERS.ui,
    challengeTime,
    interval,
    {
      position: {
        // x: (3 * DX_WIDTH) / 4 - 100,
        // y: 100,
        x: 200,
        y: DX_HEIGHT / 2 - 300,
      },
      scale: {
        x: 0.5,
        y: 0.5,
      },
      animationSpeed: 0.5,
    }
  );
};

const generateQuestion = () => {
  createSymbol();
  // createGhostPanel(ghostName);
  // createRandomAnswers();
  // createAnswers();
  // createRandomOrderAnswers();
  // createButtonAnswer();
};

const createSymbol = () => {
  console.log("Create symbol");
  let randomIdx = Math.floor(Math.random() * symbolList.length);
  console.log(randomIdx, symbolList.length);

  console.log(baseURL);
  console.log(symbolList[randomIdx].symbol);
  symbol = new PIXI.Sprite.from(baseURL + symbolList[randomIdx].symbol);

  symbol.x = DX_WIDTH / 2;
  symbol.y = 200;
  symbol.anchor.set(0.5);
  symbol.zIndex = 90;
  symbol.scale = { x: 0.6, y: 0.6 };

  DX_LAYERS.ui.addChild(symbol);
};

const createGhostPanel = (ghostName) => {
  ghost = new DxButton("ghostPanel", `${ghostName}`, {
    position: {
      x: DX_WIDTH / 2,
      y: DX_HEIGHT / 2 - 200,
    },
    scale: {
      x: 0.75,
      y: 0.75,
    },
  });
  ghost.start();
};

const createButtonAnswer = () => {
  randomAnswers.forEach((element, index) => {
    position += 300;
    button = new DxButton("ghostPanel", "", {
      isClickable: true,
      controller: {
        isPressable: true,
        button: "FACE_1",
        x: 0,
        y: 40,
      },
      keyboard: {
        isPressable: true,
        button: `${index + 1}`,
        x: 0,
        y: 40,
      },
      position: {
        x: 150 + position,
        y: DX_HEIGHT / 2,
      },
      scale: {
        x: 0.5,
        y: 0.5,
      },
    });
    button.start();
    buttonsArray.push(button);
  });
  buttonsArray.forEach((button) => {
    checkCorrectAnswer(button);
  });
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
      ghost.remove();
      buttonsArray.forEach((button) => {
        button.remove();
      });
      setTimeout(() => cleanAll(), 900);
      setTimeout(() => generateQuestion(), 1000);
    } else {
      console.log("respuesta incorrecta");
      ghost.remove();
      buttonsArray.forEach((button) => {
        button.remove();
      });
      setTimeout(() => cleanAll(), 900);
      setTimeout(() => generateQuestion(), 1000);
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
  position = 200;
};  