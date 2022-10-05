const images = [
  {
    name: "halloweenReminder",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/spritesheets/reminderHalloween.json",
  },
  {
    name: "arrowOuijaImage",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/images/ouija-cursor_2.png",
  },
];
const sprites = [
  {
    name: "ouijaBoard",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/spritesheets/ouijaBoard.json",
  },
];
const sounds = [
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/sounds/ambientSound_1min.mp3",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/sounds/shake_V2.mp3",
];

let ouijaBoard, arrowOuija;
let arrayMessage = [];
let lettersPos = 0;
let onClickSub;
let randomTime;
let scareSFX;
let ambientSound;
let reminder;
let messageTTS;

const xInitialCoords = DX_WIDTH / 2;
const yInitialCoords = DX_HEIGHT / 2 + 10;

const letters = {
  a: { create: () => createMovement(592, 487) },
  b: { create: () => createMovement(636, 425) },
  c: { create: () => createMovement(695, 382) },
  d: { create: () => createMovement(762, 345) },
  e: { create: () => createMovement(834, 319) },
  f: { create: () => createMovement(899, 308) },
  g: { create: () => createMovement(976, 303) },
  h: { create: () => createMovement(1054, 312) },
  i: { create: () => createMovement(1116, 329) },
  j: { create: () => createMovement(1164, 345) },
  k: { create: () => createMovement(1216, 372) },
  l: { create: () => createMovement(1277, 415) },
  m: { create: () => createMovement(1335, 475) },
  n: { create: () => createMovement(590, 667) },
  ñ: { create: () => createMovement(619, 590) },
  o: { create: () => createMovement(665, 533) },
  p: { create: () => createMovement(716, 475) },
  q: { create: () => createMovement(783, 431) },
  r: { create: () => createMovement(852, 401) },
  s: { create: () => createMovement(916, 388) },
  t: { create: () => createMovement(984, 383) },
  u: { create: () => createMovement(1060, 395) },
  v: { create: () => createMovement(1138, 423) },
  w: { create: () => createMovement(1207, 474) },
  x: { create: () => createMovement(1264, 541) },
  y: { create: () => createMovement(1302, 605) },
  z: { create: () => createMovement(1330, 674) },
  space: { create: () => createMovement(962, 519) },
};

// DIXPER SDK INJECTED CLASS

const dixperPluginSample = new DixperSDKLib({
  pixi: {
    enable: true,
    files: [...images, ...sprites, ...sounds],
  },
});

// INPUTS

const { message, reminderTitle } = DX_INPUTS;

// PIXIJS INITILIZE

dixperPluginSample.onPixiLoad = () => {
  createSoundsSFX();
  init();
  // onClickSub = dixperPluginSample.onMouseDown$.subscribe(onKeyOrClick);
  // onKeySub = dixperPluginSample.onKeyDown$.subscribe(onKeyOrClick);
};

const createSoundsSFX = () => {
  ambientSound = PIXI.sound.Sound.from(sounds[0]);
  scareSFX = PIXI.sound.Sound.from(sounds[1]);
};

const init = () => {
  messageTTS = message;
  ambientSound.play({ volume: 0.75 });
  setRandomTime();
  createReminder();
  createOuijaPanel();
  createMessage(message);
  createArrowOuija();
};

const createOuijaPanel = () => {
  ouijaBoard = new dxPanel(DX_PIXI, "ouijaBoard", DX_LAYERS.ui, "", {
    position: {
      x: DX_WIDTH / 2,
      y: DX_HEIGHT / 2,
    },
    scale: {
      x: 0.5,
      y: 0.5,
    },
    animationSpeed: 0.5,
  });
};

const createArrowOuija = () => {
  arrowOuija = new PIXI.Sprite.from(DX_PIXI.resources.arrowOuijaImage.texture);
  arrowOuija.x = xInitialCoords;
  arrowOuija.y = yInitialCoords;
  arrowOuija.anchor = {
    x: 0.5,
    y: 0.45,
  };
  arrowOuija.scale.set(0.5);
  arrowOuija.alpha = 1;

  DX_LAYERS.ui.addChild(arrowOuija);

  const createShake = () => {
    scareSFX.play({ volume: 1.0 });
    TweenMax.to(arrowOuija, 0.05, {
      x: "+=3",
      rotation: 0.1,
      yoyo: true,
      repeat: 30,
    });
    TweenMax.to(arrowOuija, 0.05, {
      x: "-=3",
      yoyo: true,
      repeat: 30,
      onComplete: onComplete,
    });

    function onComplete() {
      createOuijaMessage(0);
    }
  };

  setTimeout(() => createShake(), randomTime);
};

const setRandomTime = () => {
  const random = Math.floor(Math.random() * (4 - 1) + 1);
  randomTime = random * 1000;
};

const createMessage = (message) => {
  let finalMessage = message.toLowerCase();
  const regex = /[`~!@#$%^&*()-_+{}[\]\\|,.//?;':]/g;
  let newMessage = finalMessage.replace(regex, " ");
  for (let i = 0; i < newMessage.length; i++) {
    arrayMessage.push(newMessage.substring(i, i + 1));
  }
  console.log("arrayMessage", arrayMessage);
};

const createMovement = (finalPosX, finalPosY) => {
  gsap.fromTo(
    arrowOuija,
    { x: arrowOuija.x, y: arrowOuija.y },
    { x: finalPosX, y: finalPosY, duration: 0.9, onComplete: onComplete }
  );
  function onComplete() {
    createOuijaMessage(lettersPos);
  }
};

const createOuijaMessage = (pos) => {
  const letter = arrayMessage[pos];
  if (letter) {
    lettersPos += 1;
    if (letter === " ") {
      letters.space.create();
    } else {
      letters[letter].create();
    }
  } else {
    addTTS(messageTTS);
    setTimeout(() => dixperPluginSample.stopSkill(), 5000);
  }
};

// const onKeyOrClick = (event) => {
//   console.log("event", event);
// };

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

const addTTS = (text) => {
  dixperPluginSample.addActions(
    JSON.stringify([
      {
        ttl: 10000,
        actions: [
          {
            inputKey: "tts-01",
            scope: "{{scope}}",
            key: "tts-message",
            metadata: {
              message: "{{ttsmessage}}",
              voice: {
                languageCode: "{{ttslanguagecode}}",
                name: "{{ttslanguagename}}",
                ssmlGender: "{{ttsgender}}",
              },
              audioConfig: {
                audioEncoding: "MP3",
                speakingRate: 1,
                pitch: 1,
                volumeGainDb: 1,
              },
              volume: "{{ttsvolume}}",
            },
            tt0: "{{tt0}}",
            ttl: "{{ttl}}",
          },
        ],
      },
    ]),
    {
      "ttsmessage||tts-01": `${text}`,
      "ttslanguagecode||tts-01": "ca-ES",
      "ttslanguagename||tts-01": "ca-ES-Standard-A",
      "ttsgender||tts-01": "FEMALE",
      "ttsvolume||tts-01": 100,
      "scope||tts-01": [0],
      "tt0||tts-01": 0,
      "ttl||tts-01": 10000,
    }
  );
};
