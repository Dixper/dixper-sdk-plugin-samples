const images = [
  {
    name: "arrowOuijaImage",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/origin/halloween-rii/src/halloween/assets/images/Target_INOUT_00017.png",
  },
];
const sprites = [
  {
    name: "ouijaBoard",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/origin/halloween-rii/src/halloween/assets/spritesheets/boardOuija.json",
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
  a: { create: () => createMovement(500, 500) },
  b: { create: () => createMovement(1000, 500) },
  c: { create: () => createMovement(750, 1000) },
  d: { create: () => createMovement(774, 412) },
  i: { create: () => createMovement(1101, 418) },
  x: { create: () => createMovement(1229, 550) },
  p: { create: () => createMovement(722, 530) },
  e: { create: () => createMovement(830, 401) },
  r: { create: () => createMovement(850, 500) },
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
  // onClickSub = dixperPluginSample.onMouseDown$.subscribe(onKeyOrClick);
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
      x: 2,
      y: 2,
    },
    animationSpeed: 0.5,
  });
};

const createArrowOuija = () => {
  arrowOuija = new PIXI.Sprite.from(DX_PIXI.resources.arrowOuijaImage.texture);
  arrowOuija.x = xInitialCoords;
  arrowOuija.y = yInitialCoords;
  arrowOuija.anchor.set(0.5);
  arrowOuija.alpha = 0.5;

  DX_LAYERS.ui.addChild(arrowOuija);
};

const createMessage = (message) => {
  message = message.toLowerCase();
  for (let i = 0; i < message.length; i++) {
    arrayMessage.push(message.substring(i, i + 1));
  }
  console.log("array", arrayMessage);
};

const createMovement = (finalPosX, finalPosY) => {
  gsap.fromTo(
    arrowOuija,
    { x: arrowOuija.x, y: arrowOuija.y },
    { x: finalPosX, y: finalPosY, duration: 3, onComplete: onComplete }
  );
  function onComplete() {
    console.log("completado");
    createOuijaMessage(lettersPos);
  }
};

const createOuijaMessage = (pos) => {
  console.log("lettersPosMessage", pos);
  const letter = arrayMessage[pos];
  if (letter) {
    lettersPos += 1;
    letters[letter].create();
  } else {
    setTimeout(() => dixperPluginSample.stopSkill(), 3000);
  }
};

const onKeyOrClick = (event) => {
  console.log("event", event);
};
