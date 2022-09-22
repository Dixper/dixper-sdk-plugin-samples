const images = [
  {
    name: "tarotFront1",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/origin/halloween-rii/src/halloween/assets/spritesheets/tarot-front-1.png",
  },
  {
    name: "tarotFront2",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/origin/halloween-skills-adri/src/halloween/assets/images/tarot-front-2.png",
  },
  {
    name: "tarotFront3",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/origin/halloween-skills-adri/src/halloween/assets/images/tarot-front-3.png",
  },
];

const sprites = [];

const sounds = [];

// INPUTS PARAMS

let imageBoard;
let draculaList = [
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/origin/halloween-rii/src/halloween/assets/spritesheets/tarot-front-1.png",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/origin/halloween-skills-adri/src/halloween/assets/images/tarot-front-2.png",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/origin/halloween-skills-adri/src/halloween/assets/images/tarot-front-3.png",
];
let zombieList = [
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/origin/halloween-rii/src/halloween/assets/spritesheets/tarot-front-1.png",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/origin/halloween-skills-adri/src/halloween/assets/images/tarot-front-2.png",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/origin/halloween-skills-adri/src/halloween/assets/images/tarot-front-3.png",
];
let chuckyList = [
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/origin/halloween-rii/src/halloween/assets/spritesheets/tarot-front-1.png",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/origin/halloween-skills-adri/src/halloween/assets/images/tarot-front-2.png",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/origin/halloween-skills-adri/src/halloween/assets/images/tarot-front-3.png",
];
let mummyeList = [
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/origin/halloween-rii/src/halloween/assets/spritesheets/tarot-front-1.png",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/origin/halloween-skills-adri/src/halloween/assets/images/tarot-front-2.png",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/origin/halloween-skills-adri/src/halloween/assets/images/tarot-front-3.png",
];
let frankensteinList = [
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/origin/halloween-rii/src/halloween/assets/spritesheets/tarot-front-1.png",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/origin/halloween-skills-adri/src/halloween/assets/images/tarot-front-2.png",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/origin/halloween-skills-adri/src/halloween/assets/images/tarot-front-3.png",
];
let monsterList = [
  draculaList,
  zombieList,
  chuckyList,
  mummyeList,
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
let keysCards = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "0",
  "Q",
  "W",
  "E",
  "R",
  "T",
  "Y",
];
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
            x: 400 + j * 250,
            y: 200 + i * 200,
          },
          scale: {
            x: 0.35,
            y: 0.25,
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
            x: 400 + j * 250,
            y: 200 + i * 200,
          },
          scale: {
            x: 0.35,
            y: 0.25,
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
