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
let timeoutArray = [];
let timeout = false;

const xInitialCoords = 961;
const yInitialCoords = 523;

const letters = {
  a: { create: () => createMovement(698, 498) },
  b: { create: () => createMovement(729, 456) },
  c: { create: () => createMovement(771, 426) },
  d: { create: () => createMovement(818, 398) },
  e: { create: () => createMovement(867, 380) },
  f: { create: () => createMovement(919, 371) },
  g: { create: () => createMovement(971, 369) },
  h: { create: () => createMovement(1025, 368) },
  i: { create: () => createMovement(1072, 386) },
  j: { create: () => createMovement(1106, 400) },
  k: { create: () => createMovement(1140, 415) },
  l: { create: () => createMovement(1182, 448) },
  m: { create: () => createMovement(1226, 484) },
  n: { create: () => createMovement(698, 626) },
  ñ: { create: () => createMovement(716, 576) },
  o: { create: () => createMovement(747, 530) },
  p: { create: () => createMovement(787, 491) },
  q: { create: () => createMovement(829, 455) },
  r: { create: () => createMovement(882, 435) },
  s: { create: () => createMovement(932, 427) },
  t: { create: () => createMovement(978, 421) },
  u: { create: () => createMovement(1036, 434) },
  v: { create: () => createMovement(1086, 453) },
  w: { create: () => createMovement(1135, 492) },
  x: { create: () => createMovement(1177, 537) },
  y: { create: () => createMovement(1207, 585) },
  z: { create: () => createMovement(1224, 632) },
  space: { create: () => createMovement(961, 523) },
};

// DIXPER SDK INJECTED CLASS

const dixperPluginSample = new DixperSDKLib({
  pixi: {
    enable: true,
    files: [...images, ...sprites, ...sounds],
  },
});

// INPUTS

const { metadata, reminderTitle, defaultMessage } = DX_INPUTS;
// const metadata = "asdf1ghjk/lqwe;rtyu iopz?xcv'bnm ";
// const metadata = ";rtyu iopz?xcv'bnm ";

// const { reminderTitle, defaultMessage } = DX_INPUTS;
const message = metadata || DX_INPUTS.defaultMessage;
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
  ambientSound.play({ volume: 0.5 });
  setRandomTime();
  createReminder();
  createOuijaPanel();
  createMessage(message);
  createArrowOuija();
};

const clearTimeouts = () => {
  console.log(timeoutArray.length);
  timeoutArray.forEach((element) => {
    clearTimeout(element);
    console.log("timeout id: " + element + " cleared");
  });
  dixperPluginSample.stopSkill();
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

  let tempTimeout = setTimeout(() => createShake(), randomTime);
  timeoutArray.push(tempTimeout);
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
    ambientSound.stop();
    addTTS(messageTTS);
    let tempTimeout = setTimeout(() => clearTimeouts(), 5000);
    timeoutArray.push(tempTimeout);
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
        fontSize: 30,
        lineHeight: 28,
        letterSpacing: 1,
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
      "ttslanguagecode||tts-01": "ko-KR",
      "ttslanguagename||tts-01": "ko-KR-Wavenet-C",
      "ttsgender||tts-01": "MALE",
      "ttsvolume||tts-01": 100,
      "scope||tts-01": [0],
      "tt0||tts-01": 0,
      "ttl||tts-01": 10000,
    }
  );
};
