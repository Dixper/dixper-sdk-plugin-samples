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

// INPUTS PARAMS

const buttonSettingsSymbol_1 = [
  {
    x: DX_WIDTH / 2 - 250,
    y: DX_HEIGHT / 2 + 100,
    drawLine: false,
  },
  {
    x: DX_WIDTH / 2 + 250,
    y: DX_HEIGHT / 2 + 100,
    drawLine: true,
  },
  {
    x: DX_WIDTH / 2,
    y: DX_HEIGHT / 2 - 350,
    drawLine: false,
  },
  {
    x: DX_WIDTH / 2,
    y: DX_HEIGHT / 2 + 250,
    drawLine: true,
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
        index,
        drawLine: current.drawLine,
      }
    );

    buttonsArray.push({ clicked: false, instance: button });
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

const createCircle = (x, y, order) => {
  console.log("createCircle");

  const circle = new PIXI.Sprite.from(DX_PIXI.resources.drawClick.texture);
  circle.x = x;
  circle.y = y;
  circle.scale = { x: 0.25, y: 0.25 };
  circle.anchor = { x: 0.5, y: 0.5 };

  DX_LAYERS.ui.addChild(circle);
};

const checkClickButton = (buttonInstance, index) => {
  buttonInstance.instance.onClick = () => {
    console.log("buttonInstanceIndex", buttonInstance.instance._options.index);
    if (
      buttonInstance.instance._options.index > 0 &&
      buttonsArray[index - 1].clicked === true
    ) {
      buttonInstance.clicked = true;
      createCircle(
        buttonInstance.instance._options.position.x,
        buttonInstance.instance._options.position.y
      );
      buttonsArray[index].clicked = true;
      if (buttonInstance.instance._options.drawLine === true) {
        createLine([
          buttonsArray[index - 1].instance._options.position.x,
          buttonsArray[index - 1].instance._options.position.y,
          buttonInstance.instance._options.position.x,
          buttonInstance.instance._options.position.y,
        ]);
      }
    } else if (buttonInstance.instance._options.index === 0) {
      createCircle(
        buttonInstance.instance._options.position.x,
        buttonInstance.instance._options.position.y
      );
      buttonInstance.clicked = true;
    }
  };
};
