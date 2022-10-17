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
    name: "tarot_1",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/images/tarot-card-0001.png",
  },
  {
    name: "tarot_2",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/images/tarot-card-0002.png",
  },
  {
    name: "tarot_3",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/images/tarot-card-0003.png",
  },
  {
    name: "tarot_4",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/images/tarot-card-0004.png",
  },
  {
    name: "tarot_5",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/images/tarot-card-0005.png",
  },
  {
    name: "tarot_6",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/images/tarot-card-0006.png",
  },
  {
    name: "tarot_7",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/images/tarot-card-0007.png",
  },
  {
    name: "tarot_8",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/images/tarot-card-0008.png",
  },
  {
    name: "tarot_9",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/images/tarot-card-0009.png",
  },
  {
    name: "tarot_10",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/images/tarot-card-0010.png",
  },
  {
    name: "tarot_11",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/images/tarot-card-0011.png",
  },
  {
    name: "tarot_12",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/images/tarot-card-0012.png",
  },
  {
    name: "tarot_back",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/images/tarot-card-back.png",
  },
];

const sprites = [
  {
    name: "invisibleButton",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/phasmophobia/src/phasmophobia/assets/spritesheets/invisible_sprite.json",
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
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/sounds/flip-card.mp3",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/sounds/tarot-good.wav",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/sounds/tarot-fail.wav",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/sounds/tarot_aparicion.wav",
];

// INPUTS PARAMS

let frontCards = [
  "tarot_1",
  "tarot_2",
  "tarot_3",
  "tarot_4",
  "tarot_5",
  "tarot_6",
  "tarot_7",
  "tarot_8",
  "tarot_9",
  "tarot_10",
  "tarot_11",
  "tarot_12",
];
let cardWidth, cardHeigth;
let cardsContainer;
let cardsPlaced = [];
let buttonsPlaced = [];
let mouse, reminder;
let getRewardPanel, getQuantityPanel;
let loseXpSFX, gainXpSFX, appearSFX;
let timeoutArray = [];
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
  "DPAD_UP",
  "DPAD_DOWN",
  "DPAD_RIGHT",
  "DPAD_LEFT",
  "RIGHT_SHOULDER",
  "RIGHT_SHOULDER_BOTTOM",
  "LEFT_SHOULDER",
  "LEFT_SHOULDER_BOTTOM",
];

// INPUTS

const {
  numCards,
  reminderTitle,
  xpToGain,
  xpToLose,
  getRewardText,
  loseRewardText,
} = DX_INPUTS;

// PIXIJS INITILIZE

dixperPluginSample.onPixiLoad = () => {
  //console.clear();

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

  createSoundsSFX();
  appearSFX.play({ volume: 0.75 });
  //createHalloweenCursor();
  let temp = setTimeout(() => init(), 4800);
};

const createSoundsSFX = () => {
  gainXpSFX = PIXI.sound.Sound.from(sounds[1]);
  loseXpSFX = PIXI.sound.Sound.from(sounds[2]);
  appearSFX = PIXI.sound.Sound.from(sounds[3]);
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

const giveReward = (text, XP) => {
  addXp(XP);
  getRewardPanel = new dxPanel(DX_PIXI, "rewardTextPanel", DX_LAYERS.ui, text, {
    position: {
      x: DX_WIDTH / 2,
      y: 350,
    },
    scale: {
      x: 1,
      y: 1,
    },
    animationSpeed: 0.5,
    text: {
      fontSize: 20,
      lineHeight: 23,
      strokeThickness: 0,
      dropShadowDistance: 0,
    },
  });
  getQuantityPanel = new dxPanel(
    DX_PIXI,
    "rewardPanel",
    DX_LAYERS.ui,
    `${XP} XP`,
    {
      position: {
        x: DX_WIDTH / 2,
        y: DX_HEIGHT / 2 + 50,
      },
      scale: {
        x: 1,
        y: 1,
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

const clearReward = () => {
  getRewardPanel.remove();
  getQuantityPanel.remove();
};

const clearTimeouts = () => {
  console.log(timeoutArray.length);
  timeoutArray.forEach((element) => {
    clearTimeout(element);
    console.log("timeout id: " + element + " cleared");
  });
  dixperPluginSample.stopSkill();
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
    "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/phasmophobia/assets/images/tarot-card-back.png",
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
    let temp = setTimeout(() => {
      turn = true;
      const challengeSuccessSFX = PIXI.sound.Sound.from(sounds[0]);
      challengeSuccessSFX.play({ volume: 0.75 });
    }, 500);
    timeoutArray.push(temp);
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
  reminder.remove();
  if (card.luckyCard) {
    console.log("WIIII");
    gainXpSFX.play({ volume: 0.75 });
    let temp = setTimeout(() => {
      card.destroy();
      giveReward(getRewardText, xpToGain);
    }, 2000);
  } else {
    console.log("BOOOH");
    loseXpSFX.play({ volume: 0.75 });
    let temp = setTimeout(() => {
      card.destroy();
      giveReward(loseRewardText, xpToLose);
    }, 2000);
    timeoutArray.push(temp);
  }
  setTimeout(() => {
    clearReward();
    clearTimeouts();
  }, 5000);
};
