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
];
const sounds = [];

let reminder,
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

let questionList = [


];

let answersList = [

]

// DIXPER SDK INJECTED CLASS

const dixperPluginSample = new DixperSDKLib({
    pixi: {
        enable: true,
        files: [...images, ...sprites, ...sounds],
    },
});

// INPUTS

const { challengeTitle, challengeTime, reminderTitle, numberQuestions } = DX_INPUTS;

// PIXIJS INITILIZE

dixperPluginSample.onPixiLoad = () => {
    //init();
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
    if (reminder) {
        reminder.remove();
    }
    dixperPluginSample.challengeFail();
    dixperPluginSample.stopSkill();
};
const init = async () => {
    console.clear();

    onClickSub = dixperPluginSample.onMouseDown$.subscribe(checkCorrectAnswer);
    const waiter = await loadQuestions();

    createReminder();
    createTimer();
    generateQuestion();
};

const loadQuestions = async () => {
    //READ CSV FROM URL AND SAVE IT IN A STRING
    const temp = await fetch('https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/origin/halloween-skills-adri/src/halloween/assets/preguntas.csv')
        .then((response) => response.text())
        .then((csv) => readCSV = csv);


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
                }
                else {
                    break;
                }
            }
            readCSV = readCSV.substring(match.index + 1);
        }
        else {
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
            answers: [i - questionCount, i - (questionCount - 1), i - (questionCount - 2), i - (questionCount - 3)]
        });
        for (var j = i + 1; j < i + 5; j++) {
            answersList.push({
                answer: csvLines[j],
                answer_id: answerCount,
                question: i / 5
            })
            answerCount++;
        }
        questionCount++;
    }

    // console.log(questionList);
    // console.log(answersList);

    return new Promise((resolve) => {
        resolve();
    });
}


const generateQuestion = () => {
    createQuestion();
    createQuestionPanel(questionName);
    createRandomAnswers();
    createButtonAnswer();
};
const createReminder = () => {
    reminder = new dxPanel(
        DX_PIXI,
        "questionReminder",
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
    selectedQuestion.answers.forEach(element => {
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
            }
            else {
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