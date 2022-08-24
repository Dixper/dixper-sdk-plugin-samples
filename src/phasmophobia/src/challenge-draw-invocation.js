const images = [
  {
    name: "drawClick",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/phasmophobia/src/phasmophobia/assets/images/button_draw_invocation_filled_2.png",
  },
];
const sprites = [
  {
    name: "drawButton",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/phasmophobia/src/phasmophobia/assets/spritesheets/button_draw_invocation.json",
  },
];
const sounds = [];

let randomPosition, randomSymbol, order, x, y, correctOrder, status;
let circlePosition = [];
let buttonsArray = [];
let arrayToCheck = [];
let firstButtonClicked;
let secondButtonClicked = [];

// INPUTS PARAMS

const buttonSettingsSymbol_1 = [
  {
    x: DX_WIDTH / 2 - 250,
    y: DX_HEIGHT / 2 + 100,
    id: 1,
    connections: [2],
  },
  {
    x: DX_WIDTH / 2 + 250,
    y: DX_HEIGHT / 2 + 100,
    id: 2,
    connections: [1],
  },
  {
    x: DX_WIDTH / 2,
    y: DX_HEIGHT / 2 - 350,
    id: 3,
    connections: [4],
  },
  {
    x: DX_WIDTH / 2,
    y: DX_HEIGHT / 2 + 250,
    id: 4,
    connections: [3],
  },
];

// const buttonSettingsSymbol_2 = [
//   {
//     order: 0,
//     x: DX_WIDTH / 2 - 250,
//     y: DX_HEIGHT / 2 + 100,
//   },
// ];
// const buttonSettingsSymbol_3 = [
//   {
//     order: 1,
//     x: DX_WIDTH / 2 + 250,
//     y: DX_HEIGHT / 2 + 100,
//   },
// ];
// const buttonSettingsSymbol_4 = [
//   {
//     order: 2,
//     x: DX_WIDTH / 2,
//     y: DX_HEIGHT / 2 - 350,
//   },
// ];
// const buttonSettingsSymbol_5 = [
//   {
//     order: 3,
//     x: DX_WIDTH / 2,
//     y: DX_HEIGHT / 2 + 250,
//   },
// ];

const symbolsOfInvocation = [
  buttonSettingsSymbol_1,
  //   buttonSettingsSymbol_2,
  //   buttonSettingsSymbol_3,
  //   buttonSettingsSymbol_4,
  //   buttonSettingsSymbol_5,
];

// DIXPER SDK INJECTED CLASS

const dixperPluginSample = new DixperSDKLib({
  pixi: {
    enable: true,
    files: [...images, ...sprites, ...sounds],
  },
});

// INPUTS

const { challengeTitle, challengeTime, reminderTitle } = DX_INPUTS;

// PIXIJS INITILIZE

dixperPluginSample.onPixiLoad = () => {
  dixperPluginSample.initChallenge(challengeTitle, challengeTime);
};

// INIT CHALLENGE

dixperPluginSample.onChallengeAccepted = () => {
  init();
};

dixperPluginSample.onChallengeRejected = () => {
  dixperPluginSample.stopSkill();
};

dixperPluginSample.onChallengeFinish = () => {
  // if (reminder) {
  //   dixperPluginSample.challengeSuccess();
  //   reminder.remove();
  //   setTimeout(() => dixperPluginSample.stopSkill(), 3000);
  // } else {
  //   dixperPluginSample.challengeFail();
  //   reminder.remove();
  //   setTimeout(
  //     () => dixperPluginSample.addParentSkill("zmwKfnd7vzV7HZ07uK3s"),
  //     2000
  //   );
  // }
};

const init = () => {
  console.log("init");
  createReminder();
  createRandomSymbol();
  createButtons(randomSymbol);
};

/*
CREATE INIT FUNCTIONS - START
*/
const createRandomSymbol = () => {
  randomPosition = Math.floor(Math.random() * symbolsOfInvocation.length);
  //   randomSymbol = symbolsOfInvocation[randomPosition];
  randomSymbol = symbolsOfInvocation[0];
};

const createButtons = (symbolSelected) => {
  symbolSelected.forEach((current, index) => {
    const button = new dxButton(
      DX_PIXI,
      "drawButton",
      DX_LAYERS.ui,
      `${index + 1}`,
      {
        position: {
          x: current.x,
          y: current.y,
        },
        scale: {
          x: 0.25,
          y: 0.25,
        },
        animationSpeed: 0.5,
      }
    );

    buttonsArray.push({
      clicked: false,
      instance: button,
      id: current.id,
      connections: current.connections,
      index,
    });
    console.log("buttonArray", buttonsArray);
  }, {});

  buttonsArray.forEach((buttonInstance, index) => {
    checkClickButton(buttonInstance, index);
  });
};

const createReminder = () => {
  new dxPanel(DX_PIXI, "reminder", DX_LAYERS.ui, reminderTitle, {
    position: {
      x: 200,
      y: DX_HEIGHT / 2 - 100,
    },
    scale: {
      x: 0.5,
      y: 0.5,
    },
    animationSpeed: 0.5,
  });
};

/*
CREATE INIT FUNCTIONS - END
*/
const createLine = (path) => {
  console.log("createLine");

  const line = new PIXI.Graphics();
  line.lineStyle(5);
  line.beginFill(0x650a5a, 1);
  line.drawPolygon(path);
  DX_LAYERS.ui.addChild(line);
};

const createCircle = (x, y) => {
  console.log("createCircle");

  const circle = new PIXI.Sprite.from(DX_PIXI.resources.drawClick.texture);
  circle.x = x;
  circle.y = y;
  circle.scale = { x: 0.25, y: 0.25 };
  circle.anchor = { x: 0.5, y: 0.5 };

  DX_LAYERS.ui.addChild(circle);
};

const checkClickButton = (buttonInstance) => {
  buttonInstance.instance.onClick = () => {
    if (firstButtonClicked) {
      secondButtonClicked = buttonInstance;
      console.log("secondButtonClicked", secondButtonClicked);

      createCircle(
        secondButtonClicked.instance._options.position.x,
        secondButtonClicked.instance._options.position.y
      );

      if (buttonInstance.connections.includes(firstButtonClicked.id)) {
        createLine([
          firstButtonClicked.instance._options.position.x,
          firstButtonClicked.instance._options.position.y,
          secondButtonClicked.instance._options.position.x,
          secondButtonClicked.instance._options.position.y,
        ]);

        let indexArray1 = buttonSettingsSymbol_1.findIndex(
          (button) => button.id === firstButtonClicked.id
        );
        let indexArray2 = buttonSettingsSymbol_1.findIndex(
          (button) => button.id === secondButtonClicked.id
        );
        buttonSettingsSymbol_1[indexArray1].connections =
          buttonSettingsSymbol_1[indexArray1].connections.filter(
            (id) => id !== secondButtonClicked.id
          );
        buttonSettingsSymbol_1[indexArray2].connections =
          buttonSettingsSymbol_1[indexArray2].connections.filter(
            (id) => id !== firstButtonClicked.id
          );

        console.log("new button setting", buttonSettingsSymbol_1);

        firstButtonClicked = null;
        secondButtonClicked = null;
      } else {
        console.log("error");
        //sprite borrar escritura
        firstButtonClicked.instance._destroy();
        firstButtonClicked = null;
        secondButtonClicked = null;
      }
    } else {
      console.log("primera pulsacion-------------------");
      firstButtonClicked = buttonInstance;

      createCircle(
        firstButtonClicked.instance._options.position.x,
        firstButtonClicked.instance._options.position.y
      );
    }
  };
};
