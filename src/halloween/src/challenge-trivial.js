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

const reader = new FileReader();

// INPUTS PARAMS

const ghostsList = [
    {
        ghost: "Banshee",
        ghost_id: 1,
        evidences: [2, 4, 6],
    }
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

    fetch('https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/origin/halloween-skills-adri/src/halloween/assets/preguntas.csv')
        .then((response) => response.text())
        .then((csv) => console.log("HI", csv));

    // onClickSub = dixperPluginSample.onMouseDown$.subscribe(checkCorrectAnswer);
    // console.log("init");
    // createReminder();
    // createTimer();
    // generateQuestion();
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