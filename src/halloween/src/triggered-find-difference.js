const images = [];

const sprites = [
  {
    name: "halloweenTimer",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/spritesheets/timer_v2.json",
  },
  {
    name: "halloweenReminder",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/spritesheets/reminderHalloween.json",
  },
  {
    name: "rewardTextPanel",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/spritesheets/trivial-question.json",
  },
  {
    name: "rewardPanel",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/spritesheets/rewardPanel.json",
  },
];

const sounds = [
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/sounds/xpwinning.wav",
];

// INPUTS PARAMS

let imageBoard;
let draculaList = [
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/images/Dracula-Original.png",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/images/Dracula-v1.png",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/images/Dracula-v2.png",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/images/Dracula-v3.png",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/images/Dracula-v4.png",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/images/Dracula-v5.png",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/images/Dracula-v6.png",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/images/Dracula-v7.png",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/images/Dracula-v8.png",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/images/Dracula-v9.png",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/images/Dracula-v10.png",
];
let zombieList = [
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/images/Zombie-Original.png",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/images/Zombie-v1.png",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/images/Zombie-v2.png",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/images/Zombie-v3.png",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/images/Zombie-v4.png",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/images/Zombie-v5.png",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/images/Zombie-v6.png",
];
let chuckyList = [
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/images/Chucky-Original.png",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/images/Chucky-v1.png",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/images/Chucky-v2.png",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/images/Chucky-v3.png",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/images/Chucky-v4.png",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/images/Chucky-v5.png",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/images/Chucky-v6.png",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/images/Chucky-v7.png",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/images/Chucky-v8.png",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/images/Chucky-v9.png",
];
let mummyList = [
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/images/Mummy-Original.png",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/images/Mummy-v1.png",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/images/Mummy-v2.png",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/images/Mummy-v3.png",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/images/Mummy-v4.png",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/images/Mummy-v5.png",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/images/Mummy-v6.png",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/images/Mummy-v7.png",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/images/Mummy-v8.png",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/images/Mummy-v9.png",
];
let frankensteinList = [
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/images/Frankenstein-Original.png",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/images/Frankenstein-v1.png",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/images/Frankenstein-v2.png",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/images/Frankenstein-v3.png",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/images/Frankenstein-v4.png",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/images/Frankenstein-v5.png",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/images/Frankenstein-v6.png",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/images/Frankenstein-v7.png",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/images/Frankenstein-v8.png",
];
let monsterList = [
  draculaList,
  zombieList,
  chuckyList,
  mummyList,
  frankensteinList,
];

let timer;
let reminder;
let container;
let firstCard;
let cardsPlaced = [];
let score;
let cardsTurned;
let correctSelectedImage;
let incorrectSelectedImage;
let indexCorrectSelectedImage;
let indexIncorrectSelectedImage;
let indexSelectedMonster;
let selectedMonster;
let imageCorrectCard;
let imageIncorrectCard;
let imagesArray = [];
let keysCards = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
let keysCardsPos = 0;
let i, j;
let positionX, positionY;
let panelChallengeSuccess;
let panelChallengeFail;
const finalPositionTimer = -666;
let challengeMarker;
let getRewardPanel;
let getQuantityPanel;
let assetFail, assetSuccess;
let timeoutArray = [];
let timeout = false;
let xpwinning;
let checkFinal = false;
let timerFinish = false;
let checkReward = false;
let gamepadButtons = [
  "FACE_1",
  "FACE_2",
  "FACE_3",
  "FACE_4",
  "DPAD_UP",
  "DPAD_DOWN",
  "DPAD_RIGHT",
  "DPAD_LEFT",
  "RIGHT_SHOULDER",
  "RIGHT_SHOULDER_BOTTOM",
  "LEFT_SHOULDER",
  "LEFT_SHOULDER_BOTTOM",
];

// DIXPER SDK INJECTED CLASS

const dixperPluginSample = new DixperSDKLib({
  pixi: {
    enable: true,
    files: [...images, ...sprites, ...sounds],
  },
});

// INPUTS

const { challengeTime, price, rows, columns, reminderTitle, getRewardText } =
  DX_INPUTS;

// PIXIJS INITILIZE

dixperPluginSample.onPixiLoad = () => {
  init();
};

// INIT CHALLENGE

const init = () => {
  createOpenCrateSFX();
  createReminder();
  createTimer();
  createRandomPosition();
  selectRandomImages();
  createCardImage();
  marker();
};

const createOpenCrateSFX = () => {
  xpwinning = PIXI.sound.Sound.from(sounds[0]);
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

const createRandomPosition = () => {
  //Create default array position
  imageBoard = new Array(rows).fill(false);
  for (i = 0; i < imageBoard.length; i++) {
    imageBoard[i] = new Array(columns).fill(false);
  }
  console.log("imageBoard", imageBoard);

  let randomRow = Math.floor(Math.random() * rows);
  let randomColumn = Math.floor(Math.random() * columns);
  console.log("random", randomRow, randomColumn);

  imageBoard[randomRow][randomColumn] = true;
  console.log("Array Original------", imageBoard);
  // imageBoard = createRandomOrder(imageBoard);
  // console.log("Modificamos filas------", imageBoard);

  // imageBoard[0].forEach((element) => {
  //   element = createRandomOrder(element);
  // });
  // imageBoard[1].forEach((element) => {
  //   element = createRandomOrder(element);
  // });
  // console.log("Modificamos columnas------", imageBoard);
};

const createRandomOrder = (arrayToSort) => {
  const randomOrder = arrayToSort
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
  return randomOrder;
};

const selectRandomImages = () => {
  indexSelectedMonster = Math.floor(Math.random() * monsterList.length);
  console.log("index", indexSelectedMonster);
  selectedMonster = monsterList[indexSelectedMonster];
  monsterList.splice(indexSelectedMonster, 1);
  console.log("selected", selectedMonster);

  indexCorrectSelectedImage = Math.floor(
    Math.random() * selectedMonster.length
  );
  correctSelectedImage = selectedMonster[indexCorrectSelectedImage];
  selectedMonster.splice(indexCorrectSelectedImage, 1);
  indexIncorrectSelectedImage = Math.floor(
    Math.random() * selectedMonster.length
  );
  incorrectSelectedImage = selectedMonster[indexIncorrectSelectedImage];

  console.log("correct", correctSelectedImage);
  console.log("incorrect", incorrectSelectedImage);
};

const createCardImage = () => {
  let cardWidth = 275;
  let cardHeigth = 275;
  let distanceBetweenCards = 15;
  let totalWidth = cardWidth * columns + distanceBetweenCards * (columns - 1);
  let totalHeigth = cardHeigth * rows + distanceBetweenCards * (rows - 1) + 15;
  for (i = 0; i < imageBoard.length; i++) {
    for (j = 0; j < imageBoard[i].length; j++) {
      if (imageBoard[i][j] === false) {
        imageCorrectCard = new DxButton(correctSelectedImage, "", {
          isClickable: true,
          controller: {
            isPressable: true,
            button: gamepadButtons[keysCardsPos],
            x: 95,
            y: 95,
          },
          keyboard: {
            isPressable: true,
            button: keysCards[keysCardsPos],
            x: 95,
            y: 95,
          },
          position: {
            x:
              DX_WIDTH / 2 -
              totalWidth / 2 +
              j * (distanceBetweenCards + cardWidth) +
              cardWidth / 2,

            y:
              DX_HEIGHT / 2 -
              totalHeigth / 2 +
              i * (distanceBetweenCards + cardHeigth) +
              cardHeigth / 2,
          },
          scale: {
            x: 1,
            y: 1,
          },
          imageCorrect: true,
        });
        imageCorrectCard.start();
        keysCardsPos++;
        imagesArray.push(imageCorrectCard);

        imagesArray.forEach((crates) => {
          imageCorrectCard.onClick = (event) => {
            if (!timerFinish && !checkFinal) {
              checkFinal = true;
              console.log("FALLASTE");
              challengeMarker.changeStatus(0, "fail");
              imagesArray.forEach((element) => {
                if (element._options.imageCorrect) {
                  element.instance.alpha = 0;
                }
              });
              let tempTimeout = setTimeout(() => removeElement(), 1995);
              timeoutArray.push(tempTimeout);
              tempTimeout = setTimeout(
                () => dixperPluginSample.addParentSkill("7vHAwW1lviLgmrcCE082"),
                2005
              );
              timeoutArray.push(tempTimeout);
            }
          };
        });
      } else {
        imageIncorrectCard = new DxButton(incorrectSelectedImage, "", {
          isClickable: true,
          controller: {
            isPressable: true,
            button: gamepadButtons[keysCardsPos],
            x: 95,
            y: 95,
          },
          keyboard: {
            isPressable: true,
            button: keysCards[keysCardsPos],
            x: 95,
            y: 95,
          },
          position: {
            x:
              DX_WIDTH / 2 -
              totalWidth / 2 +
              j * (distanceBetweenCards + cardWidth) +
              cardWidth / 2,

            y:
              DX_HEIGHT / 2 -
              totalHeigth / 2 +
              i * (distanceBetweenCards + cardHeigth) +
              cardHeigth / 2,
          },
          scale: {
            x: 1,
            y: 1,
          },
          imageCorrect: false,
        });

        imageIncorrectCard.start();
        imagesArray.push(imageIncorrectCard);

        keysCardsPos++;
        imagesArray.forEach((crates) => {
          imageIncorrectCard.onClick = (event) => {
            if (!checkReward) {
              if (!timerFinish && !checkFinal) {
                checkFinal = true;
                console.log("imageIncorrectCard", imageIncorrectCard);
                console.log("ACIERTO");
                imagesArray.forEach((element) => {
                  if (element._options.imageCorrect) {
                    element.instance.alpha = 0;
                  }
                });
                challengeMarker.changeStatus(0, "success");
                addXp(price);
                let tempTimeout = setTimeout(() => removeElement(), 1995);
                timeoutArray.push(tempTimeout);
                tempTimeout = setTimeout(() => createPanelXP(), 2005);
                timeoutArray.push(tempTimeout);
                tempTimeout = setTimeout(() => clearTimeouts(), 3500);
                timeoutArray.push(tempTimeout);
              }
              checkReward = true;
            }
          };
        });
      }
    }
  }
};

const createTimer = () => {
  const interval = 1000;

  timer = new dxTimer(
    DX_PIXI,
    "halloweenTimer",
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
    timerFinish = true;
    timer.remove(false);
    if (!checkFinal) {
      challengeMarker.changeStatus(0, "fail");
      dixperPluginSample.addParentSkill("7vHAwW1lviLgmrcCE082");
    }
    imagesArray.forEach((element) => {
      if (element._options.imageCorrect) {
        element.instance.alpha = 0;
      }
    });
    let tempTimeout = setTimeout(() => removeElement(), 2000);
    timeoutArray.push(tempTimeout);
    // dixperPluginSample.stopSkill();
    console.log("fin skill");
  };
};
const createReminder = () => {
  reminder = new dxPanel(
    DX_PIXI,
    "halloweenReminder",
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
    1,
    100,
    {
      position: {
        x: DX_WIDTH / 2,
        y: 60,
      },
      scale: {
        x: 0.8,
        y: 0.8,
      },
    }
  );
  challengeMarker.start();
};

const removeElement = () => {
  challengeMarker.remove();
  imagesArray.forEach((element) => {
    element.remove();
  });
  reminder.remove();
  timer.instance.x = finalPositionTimer;
};

const createPanelXP = () => {
  xpwinning.play({ volume: 0.75 });
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
        x: 0.7,
        y: 0.7,
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
    `+${price}px`,
    {
      position: {
        x: DX_WIDTH / 2,
        y: DX_HEIGHT / 2 + 50,
      },
      scale: {
        x: 0.7,
        y: 0.7,
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

const addXp = (gainXP) => {
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
