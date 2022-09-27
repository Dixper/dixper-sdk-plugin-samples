const images = [
  {
    name: "arrowOuijaImage",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/images/cursor-ouija.png",
  },
];
const sprites = [
  {
    name: "ouijaBoard",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/spritesheets/ouijaBoard.json",
  },
];
const sounds = [];

let ouijaBoard, arrowOuija;
let arrayMessage = [];
let lettersPos = 0;
let onClickSub;

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

const { message } = DX_INPUTS;

// PIXIJS INITILIZE

dixperPluginSample.onPixiLoad = () => {
  init();
  onClickSub = dixperPluginSample.onMouseDown$.subscribe(onKeyOrClick);
  // onKeySub = dixperPluginSample.onKeyDown$.subscribe(onKeyOrClick);
};

const init = () => {
  console.clear();
  //   if (DX_CONTROLLER_TYPE) {
  //     onKeySub = dixperPluginSample.onGamepadButtonPress$.subscribe(onGamepad);
  //   } else {
  //     onKeySub = dixperPluginSample.onKeyDown$.subscribe(onKeyboard);
  //     onClickSub = dixperPluginSample.onMouseDown$.subscribe(onClick);
  //   }
  createOuijaPanel();
  createMessage(message);
  createArrowOuija();
  createOuijaMessage(0);
};

const createOuijaPanel = () => {
  ouijaBoard = new dxPanel(DX_PIXI, "ouijaBoard", DX_LAYERS.ui, "", {
    position: {
      x: DX_WIDTH / 2,
      y: DX_HEIGHT / 2,
    },
    scale: {
      x: 0.7,
      y: 0.7,
    },
    animationSpeed: 0.5,
  });
};

const createArrowOuija = () => {
  arrowOuija = new PIXI.Sprite.from(DX_PIXI.resources.arrowOuijaImage.texture);
  arrowOuija.x = xInitialCoords;
  arrowOuija.y = yInitialCoords;
  arrowOuija.anchor.set(0.5);
  arrowOuija.alpha = 1;

  DX_LAYERS.ui.addChild(arrowOuija);

  TweenMax.to(arrowOuija, 0.5, {
    x: "+=5",
    rotation: 0.1,
    yoyo: true,
    repeat: -1,
  });
  TweenMax.to(arrowOuija, 0.5, {
    x: "-=5",
    yoyo: true,
    repeat: -1,
  });
};

const createMessage = (message) => {
  message = message.toLowerCase();
  for (let i = 0; i < message.length; i++) {
    arrayMessage.push(message.substring(i, i + 1));
  }
  console.log("message", arrayMessage);
};

const createMovement = (finalPosX, finalPosY) => {
  gsap.fromTo(
    arrowOuija,
    { x: arrowOuija.x, y: arrowOuija.y },
    { x: finalPosX, y: finalPosY, duration: 3, onComplete: onComplete }
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
      console.log("estoy en espacio");
      letters.space.create();
    } else {
      letters[letter].create();
    }
  } else {
    console.log("end");
    setTimeout(() => dixperPluginSample.stopSkill(), 3000);
  }
};

const onKeyOrClick = (event) => {
  console.log("event", event);
};
