const images = [
  {
    name: "trivialPanel",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/images/trivial-question-XXL.png",
  },
  {
    name: "trivialAnswer",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/images/trivial-answers.png",
  },
];
const sprites = [
  {
    name: "halloweenTime",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/spritesheets/timer_v2.json",
  },
  {
    name: "halloweenReminder",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/spritesheets/reminderHalloween.json",
  },
  {
    name: "halloweenChallenge",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/spritesheets/challenge-communication.json",
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
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/sounds/successMarkerSFX.mp3",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/sounds/failMarkerSFX.mp3",
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
let finalPositionTimer = -666;
let panelChallengeFail, panelChallengeSuccess;
let challengeMarker;
let onGame = true;
let csvURL;
let assetFail, assetSuccess;
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

const removeChallenge = () => {
  titleChallengePanel._destroy();
  acceptButton.remove();
  declineButton.remove();
  halloweenPanel._destroy();
};

const onChallengeAccepted = () => {
  init();
};

dixperPluginSample.onChallengeRejected = () => {
  dixperPluginSample.stopSkill();
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

const createChallengeSuccess = () => {
  const challengeSuccessSFX = PIXI.sound.Sound.from(sounds[0]);
  challengeSuccessSFX.play({ volume: 0.75 });

  panelChallengeSuccess = new dxPanel(
    DX_PIXI,
    assetSuccess,
    DX_LAYERS.top,
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
  setTimeout(() => panelChallengeSuccess.remove(), 2000);
  setTimeout(() => dixperPluginSample.stopSkill(), 3000);
};

const createChallengeFail = () => {
  const challengeFailSFX = PIXI.sound.Sound.from(sounds[1]);
  challengeFailSFX.play({ volume: 0.75 });

  panelChallengeFail = new dxPanel(
    DX_PIXI,
    assetFail,
    DX_LAYERS.top,
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
  setTimeout(() => panelChallengeFail.remove(), 2000);
  setTimeout(() => dixperPluginSample.stopSkill(), 3000);
};

const createTimer = () => {
  const interval = 1000;

  timer = new dxTimer(
    DX_PIXI,
    "halloweenTime",
    DX_LAYERS.top,
    challengeTime,
    interval,
    {
      position: {
        x: DX_WIDTH / 2,
        y: 125,
      },
      scale: {
        x: question._options.scale.x / 2,
        y: question._options.scale.y / 2,
      },
      animationSpeed: 0.5,
    }
  );
  timer.onTimerFinish = () => {
    if (onGame) {
      removeHUD();
      timer.instance.x = finalPositionTimer;
      challengeMarker._destroy();
      setTimeout(() => createChallengeFail(), 1000);
      console.log("fin skill");
    }
  };
};

const removeHUD = () => {
  console.log("REMOVING HUD");
  buttonsArray.forEach(element => {
    element.remove();
  });
  question.remove();
};

const marker = () => {
  challengeMarker = new DxChallengeMarker(
    {
      success: {
        img: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/images/counter-error-correct.png",
        sound:
          "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/sounds/successMarkerSFX.mp3",
      },
      fail: {
        img: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/images/counter-error-incorrect.png",
        sound:
          "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/sounds/failMarkerSFX.mp3",
      },
      idle: {
        img: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/images/counter-error-empty.png",
        sound: "https://pixijs.io/sound/examples/resources/boing.mp3",
      },
    },
    numberQuestions,
    100,
    {
      position: {
        x: DX_WIDTH / 2 + 50,
        y: 200,
      },
      scale: {
        x: 0.8,
        y: 0.8,
      },
    }
  );
  challengeMarker.start();
};

// INIT CHALLENGE
const init = async () => {

  if (DX_CONTEXT.language === "es") {
    assetFail = "newChallengeFailSpanish";
    assetSuccess = "newChallengeSuccessSpanish";
    csvURL = "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/origin/halloween-skills-adri/src/halloween/assets/questions-es.csv";

  } else {
    assetFail = "newChallengeFail";
    assetSuccess = "newChallengeSuccess";
    csvURL = "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/origin/halloween-skills-adri/src/halloween/assets/questions-en.csv";
  }

  console.clear();
  onClickSub = dixperPluginSample.onMouseDown$.subscribe(checkCorrectAnswer);
  const waiter = await loadQuestions();
  marker();
  console.warn(challengeMarker);
  generateQuestion();
  createTimer();
};

const loadQuestions = async () => {
  //READ CSV FROM URL AND SAVE IT IN A STRING
  const temp = await fetch(
    csvURL
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

  console.log(questionList);
  console.log(answersList);

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
  question = new DxButton("trivialPanel", `${questionName}`, {
    position: {
      x: DX_WIDTH / 2,
      y: DX_HEIGHT / 2 - 200,
    },
    scale: {
      x: 1,
      y: 1,
    },
    text: {
      fontSize: 23,
      lineHeight: 20,
      strokeThickness: 0,
      dropShadowDistance: 0
    },
  });
  question.start();
};

const createButtonAnswer = () => {
  randomAnswers.forEach((element, index) => {
    position += 100;
    button = new DxButton("trivialAnswer", `${element}`, {
      isClickable: true,
      controller: {
        isPressable: true,
        button: "FACE_1",
        x: -250,
        y: 0,
      },
      keyboard: {
        isPressable: true,
        button: `${index + 1}`,
        x: -250,
        y: 0,
      },
      position: {
        x: DX_WIDTH / 2,
        y: position + 200,
      },
      scale: {
        x: 1,
        y: 1,
      },
      text: {
        fontSize: 22,
        lineHeight: 20,
        strokeThickness: 0,
        dropShadowDistance: 0
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
      removeHUD();
      challengeMarker.changeStatus(questionCounter - 1, "success");
      setTimeout(() => cleanAll(), 900);

      if (questionCounter < numberQuestions) {
        setTimeout(() => generateQuestion(), 1000);
        questionCounter++;
      } else {

        timer.instance.x = finalPositionTimer;
        challengeMarker._destroy();
        onGame = false;
        setTimeout(() => {
          createChallengeSuccess();
        }, 1000);
      }
    } else {
      console.log("respuesta incorrecta");
      challengeMarker.changeStatus(questionCounter - 1, "fail");
      removeHUD();
      timer.instance.x = finalPositionTimer;
      challengeMarker._destroy();
      setTimeout(() => {
        createChallengeFail();
      }, 900);
      onGame = false;
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
