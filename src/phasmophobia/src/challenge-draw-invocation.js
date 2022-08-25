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

let reminder, randomPosition, randomSymbol, x, y, onClickSub;
let firstButtonClicked,
  secondButtonClicked,
  firstCirclePainted,
  secondCirclePainted;
let buttonsArray = [];
let checkConnections = 0;

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

const buttonSettingsSymbol_2 = [
  {
    x: 969,
    y: 218,
    id: 1,
    connections: [3, 4, 6, 15],
  },
  {
    x: 592,
    y: 459,
    id: 2,
    connections: [4, 5, 7, 8],
  },
  {
    x: 741,
    y: 830,
    id: 3,
    connections: [1, 5, 9, 10],
  },
  {
    x: 1184,
    y: 824,
    id: 4,
    connections: [1, 2, 11, 12],
  },
  {
    x: 1327,
    y: 454,
    id: 5,
    connections: [2, 3, 13, 14],
  },
  {
    x: 782,
    y: 256,
    id: 6,
    connections: [1, 7],
  },
  {
    x: 671,
    y: 335,
    id: 7,
    connections: [2, 6],
  },
  {
    x: 585,
    y: 586,
    id: 8,
    connections: [2, 9],
  },
  {
    x: 638,
    y: 728,
    id: 9,
    connections: [3, 8],
  },
  {
    x: 876,
    y: 887,
    id: 10,
    connections: [3, 11],
  },
  {
    x: 1086,
    y: 881,
    id: 11,
    connections: [4, 10],
  },
  {
    x: 1285,
    y: 741,
    id: 12,
    connections: [4, 13],
  },
  {
    x: 1340,
    y: 630,
    id: 13,
    connections: [5, 12],
  },
  {
    x: 1266,
    y: 344,
    id: 14,
    connections: [5, 15],
  },
  {
    x: 1120,
    y: 247,
    id: 15,
    connections: [1, 14],
  },
];
const buttonSettingsSymbol_3 = [
  {
    x: 972,
    y: 234,
    id: 1,
    connections: [2],
  },
  {
    x: 975,
    y: 733,
    id: 2,
    connections: [1, 7, 9, 10, 12],
  },
  {
    x: 756,
    y: 347,
    id: 3,
    connections: [4],
  },
  {
    x: 1194,
    y: 344,
    id: 4,
    connections: [3],
  },
  {
    x: 699,
    y: 492,
    id: 5,
    connections: [6],
  },
  {
    x: 1244,
    y: 489,
    id: 6,
    connections: [5],
  },
  {
    x: 1201,
    y: 616,
    id: 7,
    connections: [2, 8],
  },
  {
    x: 1366,
    y: 733,
    id: 8,
    connections: [7, 9],
  },
  {
    x: 1223,
    y: 855,
    id: 9,
    connections: [2, 8],
  },
  {
    x: 731,
    y: 617,
    id: 10,
    connections: [2, 11],
  },
  {
    x: 581,
    y: 726,
    id: 11,
    connections: [10, 12],
  },
  {
    x: 738,
    y: 857,
    id: 12,
    connections: [2, 11],
  },
];
const buttonSettingsSymbol_4 = [
  {
    x: 573,
    y: 182,
    id: 1,
    connections: [2, 4, 6],
  },
  {
    x: 1266,
    y: 187,
    id: 2,
    connections: [1, 3, 5],
  },
  {
    x: 690,
    y: 717,
    id: 3,
    connections: [2],
  },
  {
    x: 1154,
    y: 715,
    id: 4,
    connections: [1],
  },
  {
    x: 764,
    y: 944,
    id: 5,
    connections: [2, 8],
  },
  {
    x: 1108,
    y: 948,
    id: 6,
    connections: [1, 7],
  },
  {
    x: 1155,
    y: 869,
    id: 7,
    connections: [6],
  },
  {
    x: 681,
    y: 868,
    id: 8,
    connections: [5],
  },
  {
    x: 1032,
    y: 807,
    id: 9,
    connections: [11],
  },
  {
    x: 812,
    y: 808,
    id: 10,
    connections: [11],
  },
  {
    x: 923,
    y: 984,
    id: 11,
    connections: [9, 10],
  },
];
const buttonSettingsSymbol_5 = [
  {
    x: 1149,
    y: 317,
    id: 1,
    connections: [],
  },
  {
    x: 1038,
    y: 230,
    id: 2,
    connections: [],
  },
  {
    x: 938,
    y: 326,
    id: 3,
    connections: [],
  },
  {
    x: 895,
    y: 473,
    id: 4,
    connections: [],
  },
  {
    x: 851,
    y: 393,
    id: 5,
    connections: [],
  },
  {
    x: 729,
    y: 595,
    id: 6,
    connections: [],
  },
  {
    x: 811,
    y: 750,
    id: 7,
    connections: [],
  },
  {
    x: 692,
    y: 673,
    id: 8,
    connections: [],
  },
  {
    x: 640,
    y: 778,
    id: 9,
    connections: [],
  },
  {
    x: 805,
    y: 804,
    id: 10,
    connections: [],
  },
  {
    x: 990,
    y: 759,
    id: 11,
    connections: [],
  },
  {
    x: 797,
    y: 577,
    id: 12,
    connections: [],
  },
  {
    x: 955,
    y: 508,
    id: 13,
    connections: [],
  },
  {
    x: 1127,
    y: 514,
    id: 14,
    connections: [],
  },
  {
    x: 911,
    y: 576,
    id: 15,
    connections: [],
  },
  {
    x: 989,
    y: 696,
    id: 16,
    connections: [],
  },
  {
    x: 1142,
    y: 769,
    id: 17,
    connections: [],
  },
  {
    x: 929,
    y: 830,
    id: 18,
    connections: [],
  },
  {
    x: 1186,
    y: 820,
    id: 19,
    connections: [],
  },
  {
    x: 1318,
    y: 681,
    id: 20,
    connections: [],
  },
  {
    x: 1090,
    y: 696,
    id: 21,
    connections: [],
  },
  {
    x: 1172,
    y: 590,
    id: 22,
    connections: [],
  },
  {
    x: 1185,
    y: 445,
    id: 23,
    connections: [],
  },
  {
    x: 1243,
    y: 551,
    id: 24,
    connections: [],
  },
  {
    x: 1377,
    y: 650,
    id: 25,
    connections: [],
  },
  {
    x: 1436,
    y: 780,
    id: 26,
    connections: [],
  },
  {
    x: 1305,
    y: 803,
    id: 27,
    connections: [],
  },
  {
    x: 1349,
    y: 550,
    id: 28,
    connections: [],
  },
  {
    x: 1295,
    y: 444,
    id: 29,
    connections: [],
  },
  {
    x: 1200,
    y: 383,
    id: 30,
    connections: [],
  },
  {
    x: 985,
    y: 358,
    id: 31,
    connections: [],
  },
];

const symbolsOfInvocation = [
  buttonSettingsSymbol_1,
  buttonSettingsSymbol_2,
  buttonSettingsSymbol_3,
  buttonSettingsSymbol_4,
  buttonSettingsSymbol_5,
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
  //   dixperPluginSample.challengeFail();
  //   reminder.remove();
  //   setTimeout(
  //     () => dixperPluginSample.addParentSkill("zmwKfnd7vzV7HZ07uK3s"),
  //     2000
  //   );
};

const init = () => {
  // console.log("init");
  createReminder();
  createRandomSymbol();
  createButtons(randomSymbol);
  onClickSub = dixperPluginSample.onMouseDown$.subscribe(onKeyOrClick);
};

/*
CREATE INIT FUNCTIONS - START
*/
const createRandomSymbol = () => {
  randomPosition = Math.floor(Math.random() * symbolsOfInvocation.length);
  //   randomSymbol = symbolsOfInvocation[randomPosition];
  randomSymbol = [...symbolsOfInvocation[4]];
};

const createButtons = (symbolSelected) => {
  symbolSelected.forEach((current, index) => {
    const button = new dxButton(DX_PIXI, "drawButton", DX_LAYERS.ui, "", {
      position: {
        x: current.x,
        y: current.y,
      },
      scale: {
        x: 0.25,
        y: 0.25,
      },
      animationSpeed: 0.5,
    });

    buttonsArray.push({
      clicked: false,
      instance: button,
      id: current.id,
      connections: current.connections,
      index,
    });
    // console.log("buttonArray", buttonsArray);
  }, {});

  buttonsArray.forEach((buttonInstance, index) => {
    checkClickButton(buttonInstance, index);
  });
};

const createReminder = () => {
  reminder = new dxPanel(DX_PIXI, "reminder", DX_LAYERS.ui, reminderTitle, {
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
  // console.log("createLine");

  const line = new PIXI.Graphics();
  line.lineStyle(5);
  line.beginFill(0x650a5a, 1);
  line.drawPolygon(path);
  DX_LAYERS.ui.addChild(line);
};

const createPointDraw = (x, y) => {
  // console.log("createPointDraw");

  const pointDraw = new PIXI.Sprite.from(DX_PIXI.resources.drawClick.texture);
  pointDraw.x = x;
  pointDraw.y = y;
  pointDraw.scale = { x: 0.25, y: 0.25 };
  pointDraw.anchor = { x: 0.5, y: 0.5 };

  return pointDraw;
};

const onKeyOrClick = (event) => {
  console.log("event", event);
};

const checkClickButton = (buttonInstance, pointDraw) => {
  buttonInstance.instance.onClick = () => {
    if (firstButtonClicked) {
      if (buttonInstance.connections.includes(firstButtonClicked.id)) {
        secondButtonClicked = buttonInstance;

        secondCirclePainted = createPointDraw(
          secondButtonClicked.instance._options.position.x,
          secondButtonClicked.instance._options.position.y
        );
        DX_LAYERS.ui.addChild(secondCirclePainted);

        createLine([
          firstButtonClicked.instance._options.position.x,
          firstButtonClicked.instance._options.position.y,
          secondButtonClicked.instance._options.position.x,
          secondButtonClicked.instance._options.position.y,
        ]);

        let indexArray1 = buttonSettingsSymbol_5.findIndex(
          (button) => button.id === firstButtonClicked.id
        );
        let indexArray2 = buttonSettingsSymbol_5.findIndex(
          (button) => button.id === secondButtonClicked.id
        );
        buttonSettingsSymbol_5[indexArray1].connections =
          buttonSettingsSymbol_5[indexArray1].connections.filter(
            (id) => id !== secondButtonClicked.id
          );
        buttonSettingsSymbol_5[indexArray2].connections =
          buttonSettingsSymbol_5[indexArray2].connections.filter(
            (id) => id !== firstButtonClicked.id
          );

        firstButtonClicked = null;
        secondButtonClicked = null;

        let checkChallengeSuccess = true;

        buttonSettingsSymbol_5.forEach((element) => {
          if (element.connections.length > 0) {
            checkChallengeSuccess = false;
          }
        });
        if (checkChallengeSuccess) {
          if (reminder) {
            reminder.remove();
          }
          dixperPluginSample.challengeSuccess();
          setTimeout(() => dixperPluginSample.stopSkill(), 2800);
        }
        checkConnections = 0;
      } else {
        // console.log("error");
        firstCirclePainted.destroy();
        firstButtonClicked = null;
        secondButtonClicked = null;
      }
    } else {
      firstButtonClicked = buttonInstance;
      firstCirclePainted = createPointDraw(
        firstButtonClicked.instance._options.position.x,
        firstButtonClicked.instance._options.position.y
      );
      DX_LAYERS.ui.addChild(firstCirclePainted);
    }
  };
};
