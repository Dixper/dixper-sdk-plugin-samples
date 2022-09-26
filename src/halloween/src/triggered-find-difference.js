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
let rows;
let columns;
let i, j;
let positionX, positionY;

// DIXPER SDK INJECTED CLASS

const dixperPluginSample = new DixperSDKLib({
  pixi: {
    enable: true,
    files: [...images, ...sprites, ...sounds],
  },
});

// INPUTS

const { level } = DX_INPUTS;

// PIXIJS INITILIZE

dixperPluginSample.onPixiLoad = () => {
  init();
};

// INIT CHALLENGE

const init = () => {
  switch (level) {
    case 1:
      rows = 1;
      columns = 3;
      break;
    case 2:
      rows = 2;
      columns = 3;
      break;
    case 3:
      rows = 3;
      columns = 3;
      break;
    case 4:
      rows = 3;
      columns = 3;
      break;
  }
  createRandomPosition();
  selectRandomImages();
  createCardImage();

  // dificultad por tiempo
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

  console.log("------", imageBoard);
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
  let cardWidth = 295;
  let cardHeigth = 305;
  let distanceBetweenCards = 50;
  let totalWidth = cardWidth * rows + distanceBetweenCards * (rows - 1);
  let totalHeigth = cardHeigth * columns + distanceBetweenCards * (columns - 1);
  for (i = 0; i < imageBoard.length; i++) {
    for (j = 0; j < imageBoard[i].length; j++) {
      if (imageBoard[i][j] === false) {
        imageCorrectCard = new DxButton(correctSelectedImage, "", {
          isClickable: true,
          controller: {
            isPressable: true,
            button: "FACE_1",
            x: 175,
            y: 175,
          },
          keyboard: {
            isPressable: true,
            button: keysCards[keysCardsPos],
            x: 175,
            y: 175,
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
            alert("FALLASTE");
          };
        });
      } else {
        imageIncorrectCard = new DxButton(incorrectSelectedImage, "", {
          isClickable: true,
          controller: {
            isPressable: true,
            button: "FACE_1",
            x: 175,
            y: 175,
          },
          keyboard: {
            isPressable: true,
            button: keysCards[keysCardsPos],
            x: 175,
            y: 175,
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
            alert("ACIERTO");
          };
        });
      }
    }
  }
};
