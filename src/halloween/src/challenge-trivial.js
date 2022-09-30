const images = [
  {
    name: "questionPanel",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/phasmophobia/src/phasmophobia/assets/spritesheets/phasmoReminder.png",
  },
];
const sprites = [
  {
    name: "questionReminder",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/phasmophobia/src/phasmophobia/assets/spritesheets/phasmoReminder.json",
  },
  {
    name: "newTime",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/phasmophobia/src/phasmophobia/assets/spritesheets/phasmoTimer.json",
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

let titleChallengePanel,
  acceptButton,
  declineButton,
  halloweenPanel,
  reminder,
  timer,
  onClickSub,
  question,
  randomOrderQuestion,
  selectedQuestion,
  questionName,
  answersQuestion,
  correctAnswer,
  wrongAnswer,
  randomAnswers,
  button;
let wrongAnswers = [];
let arrayWrongAnswer = [];
let buttonsArray = [];
let position = 200;
let readCSV;
let csvLines = [];
let answers = [];
let questionCounter = 1;

// INPUTS PARAMS

let questionList = [];

let answersList = [];

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
  numberQuestions,
} = DX_INPUTS;

// PIXIJS INITILIZE

dixperPluginSample.onPixiLoad = () => {
  createChallenge();
};

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
  const interval = 1000;

  timer = new dxTimer(
    DX_PIXI,
    "halloweenTime",
    DX_LAYERS.ui,
    challengeTime,
    interval,
    {
      position: {
        x: 140,
        y: DX_HEIGHT / 2 - 300,
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

// INIT CHALLENGE
const init = async () => {
  console.clear();

  onClickSub = dixperPluginSample.onMouseDown$.subscribe(checkCorrectAnswer);
  const waiter = await loadQuestions();

  generateQuestion();
};

const loadQuestions = async () => {
  //READ CSV FROM URL AND SAVE IT IN A STRING
  const temp = await fetch(
    "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/origin/halloween-skills-adri/src/halloween/assets/preguntas.csv"
  )
    .then((response) => response.text())
    .then((csv) => (readCSV = csv));

  //CSV FORMATTED TO AN ARRAY
  let tempCSVText = [];
  for (var i = 0; i < 101; i++) {
    let match = /\r|\n/.exec(readCSV);
    if (match != null) {
      tempCSVText.push(readCSV.substring(0, match.index));
      for (var j = 0; j < 10; j++) {
        let match2 = /;/.exec(tempCSVText[i]);
        if (match2 != null) {
          csvLines.push(tempCSVText[i].substring(0, match2.index));
          tempCSVText[i] = tempCSVText[i].substring(match2.index + 1);
        } else {
          break;
        }
      }
      readCSV = readCSV.substring(match.index + 1);
    } else {
      break;
    }
  }

  //QUESTION AND ANSWER LIST CREATED FROM THE CSV ARRAY
  let questionCount = 0;
  let answerCount = 0;

  for (var i = 0; i < csvLines.length; i += 5) {
    questionList.push({
      question: csvLines[i],
      question_id: questionCount,
      answers: [
        i - questionCount,
        i - (questionCount - 1),
        i - (questionCount - 2),
        i - (questionCount - 3),
      ],
    });
    for (var j = i + 1; j < i + 5; j++) {
      answersList.push({
        answer: csvLines[j],
        answer_id: answerCount,
        question: i / 5,
      });
      answerCount++;
    }
    questionCount++;
  }

  // console.log(questionList);
  // console.log(answersList);

  return new Promise((resolve) => {
    resolve();
  });
};

const generateQuestion = () => {
  createQuestion();
  createQuestionPanel(questionName);
  createRandomAnswers();
  createButtonAnswer();
};

const createQuestion = () => {
  randomOrderQuestion = Math.floor(Math.random() * questionList.length);
  selectedQuestion = questionList[randomOrderQuestion];
  // console.log("selectedQuestion", selectedQuestion, randomOrderQuestion);
  questionName = selectedQuestion.question;
};
const createQuestionPanel = (questionName) => {
  question = new DxButton("questionPanel", `${questionName}`, {
    position: {
      x: DX_WIDTH / 2,
      y: DX_HEIGHT / 2 - 200,
    },
    scale: {
      x: 0.75,
      y: 0.75,
    },
  });
  question.start();
};

const createButtonAnswer = () => {
  randomAnswers.forEach((element, index) => {
    position += 300;
    button = new DxButton("questionPanel", `${element}`, {
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
  selectedQuestion.answers.forEach((element) => {
    for (let i = 0; i < answersList.length; i++) {
      if (element === answersList[i].answer_id) {
        answers.push(answersList[i].answer);
      }
    }
  });

  correctAnswer = answers[0];
  randomAnswers = answers
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
  // console.log("answers", randomAnswers);
  console.log("correct", correctAnswer);
};

const checkCorrectAnswer = (button) => {
  button.onClick = () => {
    if (correctAnswer === button._text) {
      console.log("respuesta correcta");
      question.remove();
      buttonsArray.forEach((button) => {
        button.remove();
      });
      setTimeout(() => cleanAll(), 900);
      if (questionCounter < numberQuestions) {
        setTimeout(() => generateQuestion(), 1000);
        questionCounter++;
      } else {
        setTimeout(() => dixperPluginSample.stopSkill(), 1000);
      }
    } else {
      console.log("respuesta incorrecta");
      question.remove();
      buttonsArray.forEach((button) => {
        button.remove();
      });
      setTimeout(() => dixperPluginSample.stopSkill(), 900);
    }
  };
};

const cleanAll = () => {
  question = undefined;
  randomOrderQuestion = undefined;
  selectedQuestion = undefined;
  questionName = undefined;
  answersQuestion = undefined;
  correctAnswer = undefined;
  correctAnswer = undefined;
  wrongAnswer = undefined;
  answers = [];
  randomAnswers = undefined;
  button = undefined;
  wrongAnswers = [];
  arrayWrongAnswer = [];
  buttonsArray = [];
  position = 200;
};
