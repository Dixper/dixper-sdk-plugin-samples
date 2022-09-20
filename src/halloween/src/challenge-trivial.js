const images = [
    {
        name: "ghostPanel",
        url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/phasmophobia/src/phasmophobia/assets/spritesheets/phasmoReminder.png",
    },
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
let wrongAnswers = [];
let arrayWrongAnswer = [];
let buttonsArray = [];
let position = 200;
let readCSV;
let csvLines = [];

const reader = new FileReader();

// INPUTS PARAMS

const ghostsList = [
    {
        ghost: "Banshee",
        ghost_id: 1,
        evidences: [2, 4, 6],
    }
];
let questionList = [


];

let answersList = [

]

const evidencesList = [
    {
        evidence: "Freezing Temperatures",
        evidence_id: 1,
        ghosts: [2, 5, 6, 8, 11, 12, 16, 17, 20, 21, 24],
    }
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
    console.log("onChallengeFinish");
    if (reminder) {
        reminder.remove();
    }
    dixperPluginSample.challengeFail();
    dixperPluginSample.stopSkill();
};
const init = () => {
    console.clear();
    loadQuestions();

    // onClickSub = dixperPluginSample.onMouseDown$.subscribe(checkCorrectAnswer);
    // console.log("init");
    // createReminder();
    // createTimer();
    // generateQuestion();
};

const loadQuestions = async () => {
    const temp = await fetch('https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/origin/halloween-skills-adri/src/halloween/assets/preguntas.csv')
        .then((response) => response.text())
        .then((csv) => readCSV = csv);


    //CSV FORMATTER
    let tempCSVText = [];
    for (var i = 0; i < 101; i++) {
        let match = /\r|\n/.exec(readCSV);
        if (match != null) {
            tempCSVText.push(readCSV.substring(0, match.index));
            for (var j = 0; j < 10; j++) {
                let match2 = /,/.exec(tempCSVText[i]);
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

    for (var i = 0; i < csvLines.length; i += 5) {
        console.log(csvLines[i]);
    }

    // console.log(tempCSVText);
    // console.log(csvLines);

    // questionList.push({
    //     question: "a",
    //     answer1: "1",
    //     answer2: "2",
    //     answer3: "3",
    //     answer4: "4",
    // });

}

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
        button = new DxButton("ghostPanel", `${element}`, {
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