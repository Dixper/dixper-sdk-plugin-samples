const images = [
  {
    name: "questionPanel",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/origin/halloween-skills-adri/src/halloween/assets/images/WYR_Question_Panel.png",
  },
  {
    name: "answerPanel",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/origin/halloween-skills-adri/src/halloween/assets/images/WYR_Answer_Panel.png",
  },
  {
    name: "orPanel",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/origin/halloween-skills-adri/src/halloween/assets/images/WYR_Or_panel.png",
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
];
const sounds = [];

// INPUTS PARAMS
let reminder,
  timer,
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
let position = 400;
let readCSV;
let csvLines = [];
let answers = [];
let questionCounter = 1;
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

const { reminderTitle, numberQuestions } = DX_INPUTS;

// PIXIJS INITILIZE

dixperPluginSample.onPixiLoad = () => {
  init();
  //dixperPluginSample.initChallenge(challengeTitle, challengeTime);
};

// INIT CHALLENGE

dixperPluginSample.onChallengeAccepted = () => {
  init();
};

dixperPluginSample.onChallengeRejected = () => {
  dixperPluginSample.stopSkill();
};

dixperPluginSample.onChallengeFinish = () => {
  if (reminder) {
    reminder.remove();
  }
  dixperPluginSample.challengeFail();
  dixperPluginSample.stopSkill();
};
const init = async () => {
  console.clear();

  const waiter = await loadQuestions();
  generateQuestion();
};

const loadQuestions = async () => {
  //READ CSV FROM URL AND SAVE IT IN A STRING
  const temp = await fetch(
    "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/origin/halloween-skills-adri/src/halloween/assets/rather-options.csv"
  )
    .then((response) => response.text())
    .then((csv) => (readCSV = csv));

  //CSV FORMATTED TO AN ARRAY
  let tempCSVText = [];
  for (var i = 0; i < 101; i++) {
    let match = /;/.exec(readCSV);
    if (match != null) {
      tempCSVText.push(readCSV.substring(0, match.index));
      readCSV = readCSV.substring(match.index + 1);
    } else {
      break;
    }
  }

  //QUESTION AND ANSWER LIST CREATED FROM THE CSV ARRAY

  for (var i = 0; i < tempCSVText.length; i++) {
    answersList.push(tempCSVText[i]);
  }

  return new Promise((resolve) => {
    resolve();
  });
};

const generateQuestion = () => {
  createQuestionPanel();
  createRandomAnswers();
  createButtonAnswer();
};

const createQuestionPanel = () => {
  question = new DxButton("questionPanel", `What whould you rather?`, {
    position: {
      x: DX_WIDTH / 2,
      y: DX_HEIGHT / 2 - 200,
    },
    scale: {
      x: 1,
      y: 1,
    },
    text: {
      fontSize: 20,
      lineHeight: 20,
      strokeThickness: 0,
      dropShadowDistance: 0
    },
  });
  question.start();
};

const createButtonAnswer = () => {
  randomAnswers.forEach((element, index) => {
    position += 300;
    button = new DxButton("answerPanel", `${element}`, {
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
        x: 1,
        y: 1,
      },
      text: {
        fontSize: 20,
        lineHeight: 20,
        strokeThickness: 0,
        dropShadowDistance: 0
      },
    });
    button.start();
    buttonsArray.push(button);
  });
  buttonsArray.forEach((button) => {
    checkAnswer(button);
  });
};

const createRandomAnswers = () => {
  for (let i = 0; i < 2; i++) {
    let randIdx = Math.floor(Math.random() * answersList.length);
    console.log(answersList, randIdx, answersList[randIdx]);
    answers.push(answersList[randIdx]);
    answersList.splice(randIdx, 1);
    console.log(answers);
  }
  randomAnswers = answers
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
};

const checkAnswer = (button) => {
  button.onClick = () => {
    console.log("respondido");
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
