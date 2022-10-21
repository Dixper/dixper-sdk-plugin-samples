const images = [
  {
    name: "timerPhasmo",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/phasmophobia/assets/spritesheets/phasmoTimer.json",
  },
  {
    name: "reminderPhasmo",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/phasmophobia/assets/spritesheets/phasmoReminder.json",
  },
  {
    name: "cursorHalloween",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/spritesheets/halloween-cursor.json",
  },
  {
    name: "tarot_aries",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/phasmophobia/assets/images/tarot-card-0001.png",
  },
  {
    name: "tarot_taurus",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/phasmophobia/assets/images/tarot-card-0002.png",
  },
  {
    name: "tarot_geminis",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/phasmophobia/assets/images/tarot-card-0003.png",
  },
  {
    name: "tarot_cancer",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/phasmophobia/assets/images/tarot-card-0004.png",
  },
  {
    name: "tarot_piscis",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/phasmophobia/assets/images/tarot-card-0005.png",
  },
  {
    name: "tarot_leo",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/phasmophobia/assets/images/tarot-card-0006.png",
  },
  {
    name: "tarot_virgo",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/phasmophobia/assets/images/tarot-card-0007.png",
  },
  {
    name: "tarot_libra",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/phasmophobia/assets/images/tarot-card-0008.png",
  },
  {
    name: "tarot_escorpio",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/phasmophobia/assets/images/tarot-card-0009.png",
  },
  {
    name: "tarot_sagitario",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/phasmophobia/assets/images/tarot-card-0010.png",
  },
  {
    name: "tarot_capricornio",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/phasmophobia/assets/images/tarot-card-0011.png",
  },
  {
    name: "tarot_acuario",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/phasmophobia/assets/images/tarot-card-0012.png",
  },
  {
    name: "tarot_back",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/phasmophobia/assets/images/tarot-card-back.png",
  },
  {
    name: "deckAsset",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/phasmophobia/assets/images/deck.png",
  },
];

const sprites = [
  {
    name: "invisibleButton",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/phasmophobia/assets/spritesheets/invisible_sprite.json",
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
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/phasmophobia/assets/sounds/tarot.mp3",
];

// INPUTS PARAMS

let frontCards = [
  "tarot_aries",
  "tarot_taurus",
  "tarot_geminis",
  "tarot_cancer",
  "tarot_piscis",
  "tarot_leo",
  "tarot_virgo",
  "tarot_libra",
  "tarot_escorpio",
  "tarot_sagitario",
  "tarot_capricornio",
  "tarot_acuario",
];
let cardWidth, cardHeigth;
let cardsContainer;
let mouse;
let deck;
let card;
let button;
let getRewardPanel, getQuantityPanel;
let loseXpSFX, gainXpSFX, appearSFX;
let timeoutArray = [];
let timer, reminder;
let inGame = true;
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

const { reminderTitle, numCards, getRewardText, loseRewardText, skillTime } =
  DX_INPUTS;

// PIXIJS INITILIZE

dixperPluginSample.onPixiLoad = () => {
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
  // appearSFX.play({ volume: 0.75 });
  //createHalloweenCursor();
  let temp = setTimeout(() => init(), 1000);
};

const createSoundsSFX = () => {};

const clearTimeouts = () => {
  // console.log(timeoutArray.length);
  timeoutArray.forEach((element) => {
    clearTimeout(element);
    // console.log("timeout id: " + element + " cleared");
  });
};

const init = () => {
  createHUD();
  createDeck();
  cardWidth = 275;
  cardHeigth = 487;
  let distanceBetweenCards = 25;
  let totalWidth = cardWidth * numCards + distanceBetweenCards * (numCards - 1);

  for (var i = 0; i < numCards; i++) {
    createCard(
      DX_WIDTH / 2 -
        totalWidth / 2 +
        i * (distanceBetweenCards + cardWidth) +
        cardWidth / 2,
      i
    );
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

const createHUD = () => {
  reminder = new dxPanel(
    DX_PIXI,
    "reminderPhasmo",
    DX_LAYERS.ui,
    reminderTitle,
    {
      position: {
        x: 250,
        y: 300,
      },
      scale: {
        x: 0.5,
        y: 0.5,
      },
      animationSpeed: 0.5,
      text: {
        fontSize: 36,
        lineHeight: 35,
        fill: ["#000000"],
        strokeThickness: 0,
        dropShadowDistance: 0,
      },
    }
  );
  const interval = 1000;

  timer = new dxTimer(
    DX_PIXI,
    "timerPhasmo",
    DX_LAYERS.ui,
    skillTime,
    interval,
    {
      position: {
        x: reminder._options.position.x,
        y: reminder._options.position.y + 105 * reminder._options.scale.y + 5,
      },
      scale: {
        x: (3.5 * reminder._options.scale.x) / 4,
        y: (3.5 * reminder._options.scale.y) / 4,
      },
      animationSpeed: 0.5,
      text: {
        strokeThickness: 0,
        dropShadowDistance: 0,
        fill: ["#000000"],
      },
    }
  );
  timer.onTimerFinish = () => {
    // random jumpscare
    if (inGame) {
      inGame = false;
      dixperPluginSample.addParentSkill("5OVEL0VCNy1HhlVCyIhL");
      timer.remove(false);
      deck.destroy();
      reminder.remove();
      card.destroy();
      button.remove();
      clearTimeouts();
    }
  };
};
const createFrontImage = (posX) => {
  let randIdx = Math.floor(Math.random() * frontCards.length);
  card = new PIXI.Sprite.from(DX_PIXI.resources[frontCards[randIdx]].texture);

  // card = new PIXI.Sprite.from(DX_PIXI.resources[frontCards[12]].texture);

  card.scale.x = 0;
  card.x = posX;
  card.y = DX_HEIGHT / 2 + 100;
  card.anchor.set(0.5);
  card.zIndex = 99;
  card.name = frontCards[randIdx];

  // card.name = frontCards[12];

  cardsContainer.addChild(card);
};

const createCard = (posX) => {
  let turn = false;

  //CREATE FRONT
  createFrontImage(posX);
  // console.log("CREATING CARD");
  button = new DxButton(
    "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/phasmophobia/assets/images/tarot-card-back.png",
    ``,
    {
      isClickable: true,
      controller: {
        isPressable: true,
        button: `FACE_1`,
        x: 0,
        y: 55,
      },
      keyboard: {
        isPressable: true,
        button: "Space",
        x: 0,
        y: 55,
        scale: {
          x: 0.75,
          y: 0.75,
        },
      },
      position: {
        x: posX,
        y: DX_HEIGHT / 2 + 105,
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

  button.start();

  button.onClick = (event) => {
    const turnCardSFX = PIXI.sound.Sound.from(sounds[0]);
    turnCardSFX.play({ volume: 0.75 });

    inGame = false;

    let temp = setTimeout(() => {
      turn = true;
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
        let temp = setTimeout(() => addSkillEffect(card), 1000);
        timeoutArray.push(temp);
      } else {
        card.scale.x += 0.02;
      }
    }
  });
};

const createDeck = () => {
  deck = new PIXI.Sprite.from(DX_PIXI.resources.deckAsset.texture);

  deck.x = DX_WIDTH / 2;
  deck.y = DX_HEIGHT / 2 + 95;
  deck.scale.x = 0.8;
  deck.scale.y = 0.8;
  deck.anchor.set(0.5);
  deck.zIndex = 99;

  DX_LAYERS.ui.addChild(deck);
};

const addSkillEffect = (clickedCard) => {
  switch (clickedCard.name) {
    case "tarot_aries":
      dixperPluginSample.addParentSkill("SIUBsRCdmM9YZJsorEse");
      break;
    case "tarot_taurus":
      dixperPluginSample.addParentSkill("wyaTulptsEzVtDrwm8no");
      break;
    case "tarot_geminis":
      dixperPluginSample.addParentSkill("JJRA2RVKnCMmj3E16X6b");
      break;
    case "tarot_cancer":
      dixperPluginSample.addParentSkill("4ahd1ZuAmhALfartH1WD");
      break;
    case "tarot_piscis":
      dixperPluginSample.addParentSkill("eNYvaMddiVLGoNtrQtPv");
      break;
    case "tarot_leo":
      dixperPluginSample.addParentSkill("rxXDQc0xJJrRI78dZoR0");
      break;
    case "tarot_virgo":
      dixperPluginSample.addParentSkill("XZLbxXqVLTw4fH79n3Ow");
      break;
    case "tarot_libra":
      dixperPluginSample.addParentSkill("1Q8q6xsLiRe62kYXu1UH");
      break;
    case "tarot_escorpio":
      dixperPluginSample.addParentSkill("dVEYYXV41U3zW3Pgpt8T");
      break;
    case "tarot_sagitario":
      dixperPluginSample.addParentSkill("jUQtCOSjgu4lezmdNFaE");
      break;
    case "tarot_capricornio":
      dixperPluginSample.addParentSkill("sfXlih5OHtvrkKnlcFXg");
      break;
    case "tarot_acuario":
      dixperPluginSample.addParentSkill("jgOeD4ond4cZgDgs1OJ3");
      break;
    default:
      break;
  }
  timer.remove();
  deck.destroy();
  reminder.remove();
  clickedCard.destroy();
  clearTimeouts();
};
