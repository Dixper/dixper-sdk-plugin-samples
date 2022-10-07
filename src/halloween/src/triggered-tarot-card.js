const images = [
  {
    name: "halloweenReminder",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/spritesheets/reminderHalloween.json",
  },
  {
    name: "cursorHalloween",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/spritesheets/halloween-cursor.json",
  },
  {
    name: "ganas",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/origin/halloween-skills-adri/src/halloween/assets/images/ganas.png",
  },
  {
    name: "pierdes",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/origin/halloween-skills-adri/src/halloween/assets/images/pierdes.png",
  },
];

const sprites = [
  {
    name: "invisibleButton",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/phasmophobia/src/phasmophobia/assets/spritesheets/invisible_sprite.json",
  },
];

const sounds = [
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/origin/halloween-skills-adri/src/halloween/assets/sounds/flip-card.mp3",
];

// INPUTS PARAMS

let frontCards = ["ganas", "pierdes"];
let cardWidth, cardHeigth;
let cardsContainer;
let cardsPlaced = [];
let buttonsPlaced = [];
let mouse, reminder;
// DIXPER SDK INJECTED CLASS

const dixperPluginSample = new DixperSDKLib({
  pixi: {
    enable: true,
    files: [...images, ...sprites, ...sounds],
  },
});

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

// INPUTS

const { numCards, reminderTitle } = DX_INPUTS;

// PIXIJS INITILIZE

dixperPluginSample.onPixiLoad = () => {
  console.clear();

  DX_PIXI.stage.sortableChildren = true;
  DX_LAYERS.top.zIndex = 99;

  cardsContainer = new PIXI.Container();
  cardsContainer.width = DX_WIDTH;
  cardsContainer.height = DX_HEIGHT;
  cardsContainer.pivot.x = DX_WIDTH / 2;
  cardsContainer.pivot.y = DX_HEIGHT / 2;
  cardsContainer.x = DX_WIDTH / 2;
  cardsContainer.y = DX_HEIGHT / 2;

  cardsContainer.scale._x = 0.8;
  cardsContainer.scale._y = 0.8;
  cardsContainer.zIndex = 90;
  DX_PIXI.stage.addChild(cardsContainer);

  //createHalloweenCursor();
  init();
};

const init = () => {
  createReminder();

  cardWidth = 275;
  cardHeigth = 487;
  let distanceBetweenCards = 25;
  let totalWidth = cardWidth * numCards + distanceBetweenCards * (numCards - 1);
  let randLucky = Math.floor(Math.random() * numCards);
  for (var i = 0; i < numCards; i++) {
    if (i === randLucky) {
      createCard(
        DX_WIDTH / 2 -
          totalWidth / 2 +
          i * (distanceBetweenCards + cardWidth) +
          cardWidth / 2,
        i,
        true
      );
    } else {
      createCard(
        DX_WIDTH / 2 -
          totalWidth / 2 +
          i * (distanceBetweenCards + cardWidth) +
          cardWidth / 2,
        i,
        false
      );
    }
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
  console.log(reminder);
};

const createFrontImage = (posX, lucky) => {
  let randIdx = Math.floor(Math.random() * frontCards.length);
  let card;
  if (lucky) {
    card = new PIXI.Sprite.from(DX_PIXI.resources[frontCards[0]].texture);
  } else {
    card = new PIXI.Sprite.from(DX_PIXI.resources[frontCards[1]].texture);
  }
  card.scale.x = 0;
  card.x = posX;
  card.y = DX_HEIGHT / 2 + 100;
  card.anchor.set(0.5);
  card.zIndex = 99;
  card.name = frontCards[randIdx];
  card.luckyCard = lucky;

  cardsContainer.addChild(card);

  cardsPlaced.push(card);
  return card;
};

const createCard = (posX, counter, lucky) => {
  let turn = false;

  //CREATE FRONT
  const card = createFrontImage(posX, lucky);
  console.log("CREATING CARD");
  const button = new DxButton(
    "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/origin/halloween-skills-adri/src/halloween/assets/images/tarot-card-0005.png",
    ``,
    {
      isClickable: true,
      controller: {
        isPressable: true,
        button: `${gamePadButtons[counter]}`,
        x: 0,
        y: 50,
      },
      keyboard: {
        isPressable: true,
        button: `${counter + 1}`,
        x: 0,
        y: 50,
      },
      position: {
        x: posX,
        y: DX_HEIGHT / 2 + 100,
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
    },
    DX_PIXI,
    cardsContainer
  );

  if (lucky) {
    console.log("WINNER", counter);
  }

  button.start();

  button.onClick = (event) => {
    cardsPlaced.forEach((element) => {
      if (element.transform != null && card != element) {
        element.destroy();
      }
    });

    buttonsPlaced.forEach((element) => {
      if (element != null && button != element) {
        element.remove();
      }
    });
    setTimeout(() => {
      turn = true;
      const challengeSuccessSFX = PIXI.sound.Sound.from(sounds[0]);
      challengeSuccessSFX.play({ volume: 0.75 });
    }, 1000);
  };

  let appear = false;

  dixperPluginSample.pixi.ticker.add(() => {
    if (button && turn) {
      if (button.instance.scale.x < 0) {
        turn = false;
        appear = true;
        button.remove();
      } else {
        button.instance.scale.x -= 0.02;
      }
    } else if (card && appear) {
      if (card.scale.x > 1) {
        turn = false;
        appear = false;
        cardAction(card);
      } else {
        card.scale.x += 0.02;
      }
    }
  });

  buttonsPlaced.push(button);
};

const cardAction = (card) => {
  console.log(card);
  if (card.luckyCard) {
    console.log("WIIII");
  } else {
    console.log("BOOOH");
  }
  reminder.remove();
  setTimeout(() => {
    card.destroy();
    dixperPluginSample.stopSkill();
  }, 2000);
};
