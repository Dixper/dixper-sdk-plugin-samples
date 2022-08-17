const images = [];
const sprites = [
  {
    name: "drawButton",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/phasmophobia/src/phasmophobia/assets/spritesheets/button_draw_invocation.json",
  },
];
const sounds = [];

// INPUTS PARAMS

const CIRCLE_ONE = "circleOne";
const CIRCLE_TWO = "circleTwo";
const CIRCLE_THREE = "circleThree";
const CIRCLE_FOUR = "circleFour";

let statusCircle = {
  [CIRCLE_ONE]: { status: false, match: false },
  [CIRCLE_TWO]: { status: false, match: false },
  [CIRCLE_THREE]: { status: false, match: false },
  [CIRCLE_FOUR]: { status: false, match: false },
};

const buttonSettings = [
  {
    name: "buttonOne",
    x: DX_WIDTH / 2 - 250,
    y: DX_HEIGHT / 2 + 100,
  },
  {
    name: "buttonTwo",
    x: DX_WIDTH / 2 + 250,
    y: DX_HEIGHT / 2 + 100,
  },
  {
    name: "buttonThree",
    x: DX_WIDTH / 2,
    y: DX_HEIGHT / 2 - 350,
  },
  {
    name: "buttonFour",
    x: DX_WIDTH / 2,
    y: DX_HEIGHT / 2 + 250,
  },
];

const handleButtonOne = (button) => {
  const linePath = [710, 635, 1220, 635];

  button.onClick = (e) => {
    createCircle(710, 635, 10, CIRCLE_ONE);
    const status = checkStatusCircle(CIRCLE_TWO);

    if (status) {
      createLine(linePath);
      circleMatch(CIRCLE_ONE, CIRCLE_TWO);
    } else {
      failCircleMatch(CIRCLE_ONE);
    }

    console.log("statusname", statusCircle);
  };
};

const handleButtonTwo = (button) => {
  const linePath = [710, 635, 1220, 635];

  button.onClick = (e) => {
    createCircle(1220, 635, 10, CIRCLE_TWO);
    const status = checkStatusCircle(CIRCLE_ONE);

    if (status) {
      createLine(linePath);
      circleMatch(CIRCLE_ONE, CIRCLE_TWO);
    } else {
      failCircleMatch(CIRCLE_TWO);
    }

    console.log("statusname", statusCircle);
  };
};

const handleButtonThree = (button) => {
  const linePath = [960, 180, 960, 800];

  button.onClick = (e) => {
    createCircle(960, 180, 10, CIRCLE_THREE);
    const status = checkStatusCircle(CIRCLE_FOUR);

    if (status) {
      createLine(linePath);
      circleMatch(CIRCLE_THREE, CIRCLE_FOUR);
    } else {
      failCircleMatch(CIRCLE_THREE);
    }

    console.log("statusname", statusCircle);
  };
};

const handleButtonFour = (button) => {
  const linePath = [960, 180, 960, 800];

  button.onClick = (e) => {
    createCircle(960, 800, 10, CIRCLE_FOUR);
    const status = checkStatusCircle(CIRCLE_THREE);

    if (status) {
      createLine(linePath);
      circleMatch(CIRCLE_THREE, CIRCLE_FOUR);
    } else {
      failCircleMatch(CIRCLE_FOUR);
    }

    console.log("statusname", statusCircle);
  };
};

const handleButtons = [
  handleButtonOne,
  handleButtonTwo,
  handleButtonThree,
  handleButtonFour,
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
  const buttons = createButtons();
  createHandleButton(buttons);
};

/*
CREATE INIT FUNCTIONS - START
*/
const createButtons = () => {
  return buttonSettings.reduce((init, current) => {
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

    const key = current.name;

    return { ...init, [key]: button };
  }, {});
};

const createHandleButton = (buttons) => {
  Object.keys(buttons).forEach((key, idx) => {
    console.log("key", key, idx);
    const handleButton = handleButtons[idx];

    handleButton(buttons[key]);
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

const createCircle = (x, y, size, name) => {
  console.log("createCircle");
  const circle = new PIXI.Graphics();

  circle.lineStyle(2, 0xfeeb77, 1);
  circle.beginFill(0x650a5a, 1);
  circle.drawCircle(x, y, size);
  circle.endFill();

  DX_LAYERS.ui.addChild(circle);

  statusCircle = {
    ...statusCircle,
    [name]: { ...statusCircle[name], circle, status: true },
  };
};

const checkStatusCircle = (key) => statusCircle[key].status;

const circleMatch = (circleOneKey, circleTwoKey) => {
  statusCircle = {
    ...statusCircle,
    [circleOneKey]: { ...statusCircle[circleOneKey], match: true },
    [circleTwoKey]: { ...statusCircle[circleTwoKey], match: true },
  };
};

const failCircleMatch = (currentCircleKey) => {
  Object.keys(statusCircle).forEach((key, idx) => {
    const isMatch = statusCircle[key].match;
    const isStatus = statusCircle[key].status;

    if (!isMatch && isStatus && key !== currentCircleKey) {
      const circle = statusCircle[key].circle;
      statusCircle = {
        ...statusCircle,
        [key]: { ...statusCircle[key], status: false },
        [currentCircleKey]: { ...statusCircle[currentCircleKey], status: true },
      };
      circle.clear();
    }
    if (isMatch && isStatus && key !== currentCircleKey) {
      console.log("ESTOY DENTRO", statusCircle[currentCircleKey].circle);
      console.log("statusname", statusCircle);
      const circle = statusCircle[currentCircleKey].circle;
      statusCircle = {
        ...statusCircle,
        [key]: { ...statusCircle[key], status: false },
        [currentCircleKey]: {
          ...statusCircle[currentCircleKey],
          status: true,
        },
      };
      circle.clear();
    }
  });
};
