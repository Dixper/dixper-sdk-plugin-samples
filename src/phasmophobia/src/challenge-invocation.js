const images = [];
const sprites = [
  {
    name: "drawButton",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/phasmophobia/src/phasmophobia/assets/spritesheets/button_draw_invocation.json",
  },
];
const sounds = [];

// INPUTS PARAMS

let reminder, onKeySub, onClickSub, firstButton, secondButton;
let check = false;
let check2 = false;

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
  // if (DX_CONTROLLER_TYPE) {
  //   onKeySub = dixperPluginSample.onGamepadButtonPress$.subscribe(onGamepad);
  // } else {
  //   onKeySub = dixperPluginSample.onKeyDown$.subscribe(addFloatingText);
  // }
  onClickSub = dixperPluginSample.onMouseDown$.subscribe(optionAccepted);
  createReminder();
  createButtonOptions();
};

const createTokenInvocation = () => {
  console.log("createToken");
  const graphics = new PIXI.Graphics();
  const path = [600, 370, 700, 460, 780, 420, 730, 570, 590, 520];
  graphics.lineStyle(0);
  graphics.beginFill(0x3500fa, 1);
  graphics.drawPolygon(path);
  graphics.endFill();

  DX_LAYERS.ui.addChild(graphics);
};

const createButtonOptions = () => {
  const createFirstButton = () => {
    firstButton = new dxButton(DX_PIXI, "drawButton", DX_LAYERS.ui, "", {
      position: {
        x: DX_WIDTH / 2 - 250,
        y: DX_HEIGHT / 2,
      },
      scale: {
        x: 0.25,
        y: 0.25,
      },
      animationSpeed: 0.5,
      hitbox: [-175, -45, 175, -45, 175, 45, -175, 46],
    });
  };

  const createSecondButton = () => {
    secondButton = new dxButton(DX_PIXI, "drawButton", DX_LAYERS.ui, "", {
      position: {
        x: DX_WIDTH / 2 + 250,
        y: DX_HEIGHT / 2,
      },
      scale: {
        x: 0.25,
        y: 0.25,
      },
      animationSpeed: 0.5,
      hitbox: [-175, -45, 175, -45, 175, 45, -175, 46],
    });
    if (check) {
      let check2 = true;
    }
    return secondButton;
  };
  createFirstButton();
  createSecondButton();
};

const optionAccepted = (event) => {
  console.log("click");
  firstButton.onClick = () => {
    console.log("check antes", check);
    firstButton._options.scale.x = 1;
    firstButton._options.scale.y = 1;
    check = true;
    console.log("check despues", check);
  };
  secondButton.onClick = () => {
    console.log("check dentro", check, check2);
    if (check === true) {
      check2 = true;
    }
    if (check === true && check2 === true) {
      createTokenInvocation();
    }
  };

  // firstButton.onClick = (event) => {
  //   console.log("event", event);
  //   let check = true;
  //   console.log("compruebo checks", check, check2);
  //   if (check && check2) {
  //     console.log("ambos true");
  //     createTokenInvocation();
  //   }
  // };
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
