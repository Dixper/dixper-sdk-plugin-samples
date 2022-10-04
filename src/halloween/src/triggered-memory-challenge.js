const images = [
  {
    name: "axe",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/images/Axe.png",
  },
  {
    name: "book",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/images/Book.png",
  },
  {
    name: "candle",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/images/Candle.png",
  },
  {
    name: "pumpkin",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/images/Pumpkin.png",
  },
  {
    name: "rip",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/images/RIP.png",
  },
  {
    name: "scareCrow",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/images/Scarecrow.png",
  },

  {
    name: "screamMask",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/images/Scream-Mask.png",
  },
  {
    name: "witchHat",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/images/Witch-Hat.png",
  },
];

const sprites = [
  {
    name: "invisibleButton",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/phasmophobia/src/phasmophobia/assets/spritesheets/invisible_sprite.json",
  },
];

const sounds = [
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/sounds/failMarkerSFX.mp3",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/sounds/successMarkerSFX.mp3",
];

// INPUTS PARAMS

let frontCards = [
  "axe",
  "book",
  "candle",
  "pumpkin",
  "rip",
  "scareCrow",
  "screamMask",
  "witchHat",
];
let firstCard;
let cardsList;
let cardsPlaced = [];
let buttonsPlaced = [];
let score;
let cardsTurned;
let assignedKeyCounter = 0;
let cardWidth, cardHeigth;
let cardsContainer;

const gamePadButtons = [
  "FACE_1",
  "FACE_2",
  "FACE_3",
  "FACE_4",
  "RIGHT_SHOULDER",
  "RIGHT_SHOULDER_BOTTOM",
  "LEFT_SHOULDER",
  "LEFT_SHOULDER_BOTTOM",
  "DPAD_UP",
  "DPAD_DOWN",
  "DPAD_RIGHT",
  "DPAD_LEFT",
];

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
  //dixperPluginSample.initChallenge(challengeTitle, challengeTime);
};

// INIT CHALLENGE

dixperPluginSample.onChallengeAccepted = () => {
  init();
};

dixperPluginSample.onChallengeRejected = () => {
  dixperPluginSample.stopSkill();
};

dixperPluginSample.onChallengeFinish = () => { };

const init = () => {
  cardWidth = 338;
  cardHeigth = 341;
  let distanceBetweenCards = 25;
  let totalWidth = cardWidth * rows + distanceBetweenCards * (rows - 1);
  let totalHeigth = cardWidth * columns + distanceBetweenCards * (columns - 1);

  cardsContainer = new PIXI.Container();
  cardsContainer.width = DX_WIDTH;
  cardsContainer.height = DX_HEIGHT;
  cardsContainer.pivot.x = DX_WIDTH / 2;
  cardsContainer.pivot.y = DX_HEIGHT / 2;
  cardsContainer.x = DX_WIDTH / 2;
  cardsContainer.y = DX_HEIGHT / 2;

  cardsContainer.scale._x = 0.5;
  cardsContainer.scale._y = 0.5;


  DX_PIXI.stage.addChild(cardsContainer);
  console.log(cardsContainer);

  score = 0;
  cardsTurned = 0;
  //Create default array position
  cardsList = new Array(rows);
  for (let i = 0; i < cardsList.length; i++) {
    cardsList[i] = new Array(columns);
  }

  //CREATE CARDS IN RANDOM POSITIONS

  for (let i = 0; i < (rows * columns) / 2; i++) {
    let setted = 0;
    while (setted < 2) {
      var rowIdx = Math.floor(Math.random() * rows);
      var columnIdx = Math.floor(Math.random() * columns);
      if (cardsList[rowIdx][columnIdx] === undefined) {
        cardsList[rowIdx][columnIdx] = 1;
        createCard(
          DX_WIDTH / 2 -
          totalWidth / 2 +
          rowIdx * (distanceBetweenCards + cardWidth) +
          cardWidth / 2,
          DX_HEIGHT / 2 -
          totalHeigth / 2 +
          columnIdx * (distanceBetweenCards + cardHeigth) +
          cardHeigth / 2,
          i
        );
        assignedKeyCounter++;
        setted++;
        console.log("CARDS CREATED");
      }
    }
  }
  console.log("init done");
};

const createFrontImage = (posX, posY, imageIdx) => {
  const card = new PIXI.Sprite.from(
    DX_PIXI.resources[frontCards[imageIdx]].texture
  );
  card.scale.x = 0;
  card.x = posX;
  card.y = posY;
  card.anchor.set(0.5);
  card.zIndex = 99;
  card.name = frontCards[imageIdx];
  card.frontReturn = false;

  cardsContainer.addChild(card);

  return card;
};

const createCard = (posX, posY, imageIdx) => {
  let turn = false;
  //CREATE FRONT
  const card = createFrontImage(posX, posY, imageIdx);
  //CREATE BACK
  const button = new DxButton(
    "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/origin/halloween-skills-adri/src/halloween/assets/images/BackCard.png",
    ``,
    {
      isClickable: true,
      controller: {
        isPressable: true,
        button: `${gamePadButtons[assignedKeyCounter]}`,
        x: 0,
        y: 40,
      },
      keyboard: {
        isPressable: true,
        button: `${assignedKeyCounter}`,
        x: 0,
        y: 40,
      },
      position: {
        x: posX,
        y: posY,
      },
      scale: {
        x: 1,
        y: 1,
      },
      hitbox: [
        -cardWidth / 2,
        -cardHeigth / 2,
        cardWidth / 2,
        -cardHeigth / 2,
        cardWidth / 2,
        cardHeigth / 2,
        -cardWidth / 2,
        cardHeigth / 2,
      ],
      name: card.name,
    },
    DX_PIXI,
    cardsContainer
  );

  button.start();

  button.onClick = (event) => {
    if (cardsTurned < 2) {
      turn = true;
      cardsTurned++;
    }
  };

  let appear = false;

  dixperPluginSample.pixi.ticker.add(() => {
    //ANIMATION TO TURN
    if (button && turn) {
      if (button.instance.scale.x < 0) {
        button.instance.scale.x = 0;
        turn = false;
        appear = true;
      } else {
        button.instance.scale.x -= 0.03;
      }
    } else if (card && appear) {
      if (card.scale.x > 1) {
        card.scale.x = 1;
        turn = false;
        appear = false;
        cardAction(card);
      } else {
        card.scale.x += 0.03;
      }
    }
    //ANIMATION TO RETURN
    else if (card && card.frontReturn) {
      if (card.scale.x < 0) {
        card.scale.x = 0;
        card.frontReturn = false;
        card.backReturn = true;
      } else {
        card.scale.x -= 0.03;
      }
    } else if (card && card.backReturn) {
      if (button.instance.scale.x > 1) {
        button.instance.scale.x = 1;
        card.frontReturn = false;
        card.backReturn = false;
        cardsTurned--;
      } else {
        button.instance.scale.x += 0.03;
      }
    }
  });
  cardsPlaced.push(card);
  buttonsPlaced.push(button);
};

const cardAction = (card) => {
  //CHECK FIRST CARD
  if (firstCard === undefined) {
    firstCard = card.name;
  }
  //CHECK SECOND CARD
  else {
    if (firstCard === card.name) {
      const pairSound = PIXI.sound.Sound.from(sounds[1]);
      pairSound.play({ volume: 0.25 });

      score++;
      console.log(score + "/" + ((rows * columns) / 2));
      cardsTurned = 0;

      cardsPlaced.forEach((element) => {
        if (firstCard === element.name) {
          element.destroy();
        }
      });

      buttonsPlaced.forEach((element) => {
        if (firstCard === element._options.name) {
          element.remove();
        }
      });



      if (score === ((rows * columns) / 2)) {
        console.log("WIN");
        setTimeout(() => dixperPluginSample.stopSkill(), 1000);
      }
    } else {
      const failSound = PIXI.sound.Sound.from(sounds[0]);
      failSound.play({ volume: 0.25 });
      card.frontReturn = true;
      cardsPlaced.forEach((element) => {
        if (firstCard === element.name) {
          element.frontReturn = true;
        }
      });
    }
    firstCard = undefined;
  }
};
