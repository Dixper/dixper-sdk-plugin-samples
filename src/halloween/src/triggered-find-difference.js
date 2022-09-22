const images = [];

const sprites = [];

const sounds = [];

// INPUTS PARAMS

let imageBoard;
let draculaList = [
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/origin/halloween-rii/src/halloween/assets/images/Dracula-Original.png",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/origin/halloween-rii/src/halloween/assets/images/Dracula-v1.png",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/origin/halloween-rii/src/halloween/assets/images/Dracula-v2.png",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/origin/halloween-rii/src/halloween/assets/images/Dracula-v3.png",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/origin/halloween-rii/src/halloween/assets/images/Dracula-v4.png",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/origin/halloween-rii/src/halloween/assets/images/Dracula-v5.png",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/origin/halloween-rii/src/halloween/assets/images/Dracula-v6.png",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/origin/halloween-rii/src/halloween/assets/images/Dracula-v7.png",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/origin/halloween-rii/src/halloween/assets/images/Dracula-v8.png",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/origin/halloween-rii/src/halloween/assets/images/Dracula-v9.png",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/origin/halloween-rii/src/halloween/assets/images/Dracula-v10.png",
];
let zombieList = [
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/origin/halloween-rii/src/halloween/assets/images/Zombie-Original.png",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/origin/halloween-rii/src/halloween/assets/images/Zombie-v1.png",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/origin/halloween-rii/src/halloween/assets/images/Zombie-v2.png",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/origin/halloween-rii/src/halloween/assets/images/Zombie-v3.png",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/origin/halloween-rii/src/halloween/assets/images/Zombie-v4.png",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/origin/halloween-rii/src/halloween/assets/images/Zombie-v5.png",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/origin/halloween-rii/src/halloween/assets/images/Zombie-v6.png",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/origin/halloween-rii/src/halloween/assets/images/Zombie-v7.png",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/origin/halloween-rii/src/halloween/assets/images/Zombie-v8.png",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/origin/halloween-rii/src/halloween/assets/images/Zombie-v9.png",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/origin/halloween-rii/src/halloween/assets/images/Zombie-v10.png",
];
let chuckyList = [
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/origin/halloween-rii/src/halloween/assets/images/Chucky-Original.png",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/origin/halloween-rii/src/halloween/assets/images/Chucky-v1.png",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/origin/halloween-rii/src/halloween/assets/images/Chucky-v2.png",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/origin/halloween-rii/src/halloween/assets/images/Chucky-v3.png",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/origin/halloween-rii/src/halloween/assets/images/Chucky-v4.png",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/origin/halloween-rii/src/halloween/assets/images/Chucky-v5.png",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/origin/halloween-rii/src/halloween/assets/images/Chucky-v6.png",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/origin/halloween-rii/src/halloween/assets/images/Chucky-v7.png",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/origin/halloween-rii/src/halloween/assets/images/Chucky-v8.png",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/origin/halloween-rii/src/halloween/assets/images/Chucky-v9.png",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/origin/halloween-rii/src/halloween/assets/images/Chucky-v10.png",
];
let mummyList = [
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/origin/halloween-rii/src/halloween/assets/images/Mummy-Original.png",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/origin/halloween-rii/src/halloween/assets/images/Mummy-v1.png",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/origin/halloween-rii/src/halloween/assets/images/Mummy-v2.png",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/origin/halloween-rii/src/halloween/assets/images/Mummy-v3.png",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/origin/halloween-rii/src/halloween/assets/images/Mummy-v4.png",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/origin/halloween-rii/src/halloween/assets/images/Mummy-v5.png",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/origin/halloween-rii/src/halloween/assets/images/Mummy-v6.png",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/origin/halloween-rii/src/halloween/assets/images/Mummy-v7.png",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/origin/halloween-rii/src/halloween/assets/images/Mummy-v8.png",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/origin/halloween-rii/src/halloween/assets/images/Mummy-v9.png",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/origin/halloween-rii/src/halloween/assets/images/Mummy-v10.png",
];
let frankensteinList = [
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/origin/halloween-rii/src/halloween/assets/images/Frankenstein-Original.png",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/origin/halloween-rii/src/halloween/assets/images/Frankenstein-v1.png",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/origin/halloween-rii/src/halloween/assets/images/Frankenstein-v2.png",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/origin/halloween-rii/src/halloween/assets/images/Frankenstein-v3.png",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/origin/halloween-rii/src/halloween/assets/images/Frankenstein-v4.png",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/origin/halloween-rii/src/halloween/assets/images/Frankenstein-v5.png",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/origin/halloween-rii/src/halloween/assets/images/Frankenstein-v6.png",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/origin/halloween-rii/src/halloween/assets/images/Frankenstein-v7.png",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/origin/halloween-rii/src/halloween/assets/images/Frankenstein-v8.png",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/origin/halloween-rii/src/halloween/assets/images/Frankenstein-v9.png",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/origin/halloween-rii/src/halloween/assets/images/Frankenstein-v10.png",
];
let monsterList = [
  draculaList,
  zombieList,
  chuckyList,
  mummyList,
  frankensteinList,
];

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

// DIXPER SDK INJECTED CLASS

const dixperPluginSample = new DixperSDKLib({
  pixi: {
    enable: true,
    files: [...images, ...sprites, ...sounds],
  },
});

// INPUTS

const { rows, columns } = DX_INPUTS;

// PIXIJS INITILIZE

dixperPluginSample.onPixiLoad = () => {
  init();
};

// INIT CHALLENGE

const init = () => {
  createRandomPosition();
  selectRandomImages();
  createCardImage();
};

const createRandomPosition = () => {
  //Create default array position
  imageBoard = new Array(rows).fill(false);
  for (let i = 0; i < imageBoard.length; i++) {
    imageBoard[i] = new Array(columns).fill(false);
  }
  console.log("imageBoard", imageBoard);

  let randomRow = Math.floor(Math.random() * rows);
  let randomColumn = Math.floor(Math.random() * columns);
  console.log("random", randomRow, randomColumn);

  imageBoard[randomRow][randomColumn] = true;

  console.log("------", imageBoard);
};

const selectRandomImages = () => {
  indexSelectedMonster = Math.floor(Math.random() * monsterList.length);
  selectedMonster = monsterList[indexSelectedMonster];
  monsterList.splice(indexSelectedMonster, 1);

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
  for (let i = 0; i < imageBoard.length; i++) {
    for (let j = 0; j < imageBoard[i].length; j++) {
      if (imageBoard[i][j] === false) {
        imageCorrectCard = new DxButton(correctSelectedImage, "", {
          isClickable: true,
          controller: {
            isPressable: true,
            button: "FACE_1",
            x: 50,
            y: 50,
          },
          keyboard: {
            isPressable: true,
            button: keysCards[keysCardsPos],
            x: 0,
            y: 150,
          },
          position: {
            x: 500 + j * 250,
            y: 150 + i * 265,
          },
          scale: {
            x: 0.8,
            y: 0.8,
          },
        });
        imageCorrectCard.start();
        keysCardsPos++;
        imagesArray.push(imageCorrectCard);

        imagesArray.forEach((crates) => {
          imageCorrectCard.onClick = (event) => {
            console.log("FALLASTE");
          };
        });
      } else {
        imageIncorrectCard = new DxButton(incorrectSelectedImage, "", {
          isClickable: true,
          controller: {
            isPressable: true,
            button: "FACE_1",
            x: 50,
            y: 50,
          },
          keyboard: {
            isPressable: true,
            button: keysCards[keysCardsPos],
            x: 0,
            y: 150,
          },
          position: {
            x: 500 + j * 250,
            y: 150 + i * 265,
          },
          scale: {
            x: 0.8,
            y: 0.8,
          },
        });

        imageIncorrectCard.start();
        imagesArray.push(imageIncorrectCard);

        keysCardsPos++;
        imagesArray.forEach((crates) => {
          imageIncorrectCard.onClick = (event) => {
            console.log("ACIERTO");
          };
        });
      }
    }
  }
};
