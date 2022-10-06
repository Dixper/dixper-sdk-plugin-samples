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
    name: "cursorHalloween",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/spritesheets/halloween-cursor.json",
  },
  {
    name: "invisibleButton",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/phasmophobia/src/phasmophobia/assets/spritesheets/invisible_sprite.json",
  },
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
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/sounds/failMarkerSFX.mp3",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/sounds/successMarkerSFX.mp3",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/origin/halloween-skills-adri/src/halloween/assets/sounds/flip-card.mp3",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/sounds/You_Win_SFX.mp3",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/sounds/You_Loose_SFX.mp3",
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
let assignedKey;
let cardWidth, cardHeigth;
let cardsContainer;
let win = false;
let timer,
  reminder,
  titleChallengePanel,
  acceptButton,
  declineButton,
  halloweenPanel,
  panelChallengeSuccess,
  panelChallengeFail;
let mouse;
let assetFail, assetSuccess;
let cursorPosSub;
const finalPositionTimer = -666;
let tolerance = 33;
let refresh = true;
let prevMouseX = 100;
let prevMouseY = 100;

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

const {
  challengeTitle,
  acceptButtonText,
  textCountdown,
  declineButtonText,
  challengeTime,
  reminderTitle,
  rows,
  columns,
} = DX_INPUTS;

// PIXIJS INITILIZE

dixperPluginSample.onPixiLoad = () => {
  createHalloweenCursor();

  cursorPosSub = dixperPluginSample.onMouseMove$.subscribe(onMove);
  createChallenge();
  DX_PIXI.stage.sortableChildren = true;
  DX_LAYERS.top.zIndex = 99;
  //init();
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
        x: 0.8,
        y: 0.8,
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
        text: {
          fontSize: 20,
        },
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
      text: {
        fontSize: 20,
        lineHeight: 23,
        strokeThickness: 0,
        dropShadowDistance: 0,
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
        x: 0,
        y: 50,
      },
      keyboard: {
        isPressable: true,
        button: "Esc",
        text: {
          fontSize: 20,
        },
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
      text: {
        fontSize: 20,
        lineHeight: 23,
        strokeThickness: 0,
        dropShadowDistance: 0,
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
  const challengeSuccessSFX = PIXI.sound.Sound.from(sounds[3]);
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
  const challengeFailSFX = PIXI.sound.Sound.from(sounds[4]);
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

// INIT CHALLENGE

const init = () => {
  if (DX_CONTEXT.language === "es") {
    assetFail = "newChallengeFailSpanish";
    assetSuccess = "newChallengeSuccessSpanish";

  } else {
    assetFail = "newChallengeFail";
    assetSuccess = "newChallengeSuccess";
  }

  createReminder();
  createTimer();
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
  cardsContainer.zIndex = 90;

  DX_PIXI.stage.addChild(cardsContainer);

  score = 0;
  cardsTurned = 0;

  //Create default array position
  cardsList = new Array(columns);
  for (let i = 0; i < cardsList.length; i++) {
    cardsList[i] = new Array(rows);
  }
  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      assignedKey = i * rows + j + 1;
      cardsList[i][j] = assignedKey;
    }
  }

  //CREATE CARDS IN RANDOM POSITIONS

  for (let i = 0; i < (rows * columns) / 2; i++) {
    let setted = 0;
    let randImageIdx = Math.floor(Math.random() * frontCards.length);
    while (setted < 2) {
      var rowIdx = Math.floor(Math.random() * rows);
      var columnIdx = Math.floor(Math.random() * columns);
      if (cardsList[columnIdx][rowIdx] != -1) {
        createCard(
          DX_WIDTH / 2 -
          totalWidth / 2 +
          rowIdx * (distanceBetweenCards + cardWidth) +
          cardWidth / 2,
          DX_HEIGHT / 2 -
          totalHeigth / 2 +
          columnIdx * (distanceBetweenCards + cardHeigth) +
          cardHeigth / 2,
          randImageIdx,
          cardsList[columnIdx][rowIdx]
        );
        cardsList[columnIdx][rowIdx] = -1;
        setted++;
      }
    }
    frontCards.splice(randImageIdx, 1);
  }
};

const createHalloweenCursor = () => {
  mouse = new dxCursor(DX_PIXI, "cursorHalloween", DX_LAYERS.cursor, {
    parentLayer: DX_LAYERS.top,
    anchor: {
      x: 0.25,
      y: 0.25,
    },
  });
};

const createTimer = () => {
  const interval = 1000;

  timer = new dxTimer(
    DX_PIXI,
    "halloweenTime",
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
    if (!win) {
      removeHUD();
      setTimeout(() => createChallengeFail(), 1000);
      console.log("fin skill");
    }
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

const removeHUD = () => {
  reminder.remove();
  timer.instance.x = finalPositionTimer;
  cardsPlaced.forEach((element) => {
    if (element.transform != null) {
      element.destroy();
    }
  });

  buttonsPlaced.forEach((element) => {
    if (element != null) {
      element.remove();
    }
  });
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

const createCard = (posX, posY, imageIdx, keyIdx) => {
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
        button: `${gamePadButtons[keyIdx]}`,
        x: 0,
        y: 95,
        scale: {
          x: 0.9,
          y: 0.9,
        },
      },
      keyboard: {
        isPressable: true,
        button: `${keyIdx}`,
        x: 0,
        y: 95,
        scale: {
          x: 0.9,
          y: 0.9,
        },
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
      const pairSound = PIXI.sound.Sound.from(sounds[2]);
      pairSound.play({ volume: 0.15 });
      turn = true;
      cardsTurned++;
    }
  };

  let appear = false;

  dixperPluginSample.pixi.ticker.add(() => {
    //ANIMATION TO TURN
    if (button.instance.transform && turn) {
      if (button.instance.scale.x < 0) {
        button.instance.scale.x = 0;
        turn = false;
        appear = true;
      } else {
        button.instance.scale.x -= 0.03;
      }
    } else if (card.transform && appear) {
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
    else if (card.transform != null && card.frontReturn) {
      if (card.scale.x < 0) {
        card.scale.x = 0;
        card.frontReturn = false;
        card.backReturn = true;
      } else {
        card.scale.x -= 0.03;
      }
    } else if (button.instance.transform != null && card.backReturn) {
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
      pairSound.play({ volume: 0.15 });

      score++;
      console.log(score + "/" + (rows * columns) / 2);
      cardsTurned = 0;

      cardsPlaced.forEach((element) => {
        if (firstCard === element.name) {
          element.destroy();
        }
      });
      console.log("+++++++++++++++++++++++", cardsPlaced);

      buttonsPlaced.forEach((element) => {
        if (firstCard === element._options.name) {
          element.remove();
        }
      });

      if (score === (rows * columns) / 2) {
        console.log("WIN");
        win = true;
        removeHUD();
        setTimeout(() => createChallengeSuccess(), 1000);
      }
    } else {
      const failSound = PIXI.sound.Sound.from(sounds[0]);
      failSound.play({ volume: 0.15 });
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

const onMove = (event) => {
  if (refresh) {
    refresh = false;
    setTimeout(() => {
      checkMove(event);
    }, 500);
  }
}

const checkMove = (event) => {
  console.log("REFRESH", event);
  console.log("-------------------", mouse);
  if (tolerance > Math.sqrt(Math.pow(event.x - prevMouseX, 2) + Math.pow(event.y - prevMouseY, 2))) {
    mouse.instance.alpha = 0;
  }
  else {
    mouse.instance.alpha = 1;
  }
  prevMouseX = event.x;
  prevMouseY = event.y;
  refresh = true;
}