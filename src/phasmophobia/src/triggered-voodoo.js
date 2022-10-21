const images = [
  {
    name: "voodooDoll",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/origin/phasmophobia-adri-skills/src/phasmophobia/assets/images/voodoo-doll.png",
  },
];
const sprites = [
  {
    name: "head",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/phasmophobia/src/phasmophobia/assets/spritesheets/head_needle.json",
  },
  {
    name: "leftArm",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/phasmophobia/src/phasmophobia/assets/spritesheets/left_arm_needle.json",
  },
  {
    name: "body",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/phasmophobia/src/phasmophobia/assets/spritesheets/body_needle.json",
  },
  {
    name: "rightArm",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/phasmophobia/src/phasmophobia/assets/spritesheets/right_arm_needle.json",
  },
  {
    name: "leftLeg",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/phasmophobia/src/phasmophobia/assets/spritesheets/left_leg_needle.json",
  },
  {
    name: "rightLeg",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/phasmophobia/src/phasmophobia/assets/spritesheets/right_leg_needle.json",
  },
  {
    name: "invisibleButton",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/phasmophobia/src/phasmophobia/assets/spritesheets/invisible_sprite.json",
  },
  {
    name: "phasmoReminder",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/phasmophobia/assets/spritesheets/phasmoReminder.json",
  },
  {
    name: "timerPhasmo",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/phasmophobia/assets/spritesheets/phasmoTimer.json",
  },
];

const sounds = [];

let dollImage;
let curseDoll;
let timeoutArray = [];
let clicked = false;
// INPUTS PARAMS

let clickKey, reminder, timer;

const enterKeycode = 28;
const scapeKeycode = 1;

// DIXPER SDK INJECTED CLASS

const dixperPluginSample = new DixperSDKLib({
  pixi: {
    enable: true,
    files: [...images, ...sprites, ...sounds],
  },
});

// INPUTS

const { reminderTitle, skillTime } = DX_INPUTS;

// REMOTE

dixperPluginSample.onPixiLoad = () => {
  let temp = setTimeout(() => init(), 1000);
  timeoutArray.push(temp);
};

const init = () => {
  createHUD();
  createVoodooDoll();
};

const clearTimeouts = () => {
  console.log(timeoutArray.length);
  timeoutArray.forEach((element) => {
    clearTimeout(element);
    console.log("timeout id: " + element + " cleared");
  });
};

const createVoodooDoll = () => {

  dollImage = new DxButton("voodooDoll", "", {
    isClickable: true,
    controller: {
      isPressable: true,
      button: "FACE_1",
      x: 0,
      y: 300,
      scale: {
        x: 1,
        y: 1,
      },
    },
    keyboard: {
      isPressable: true,
      button: "Space",
      x: 0,
      y: 300,
      scale: {
        x: 1,
        y: 1,
      },
    },
    position: {
      x: DX_WIDTH / 2,
      y: DX_HEIGHT / 2,
    },
    anchor: {
      x: 0.5,
      y: 0.5,
    },
    scale: {
      x: 0.6,
      y: 0.6,
    },
    animationSpeed: 0.5
  });

  dollImage.start();

  dollImage.onClick = (event) => {
    if (!clicked) {
      clicked = true;
      voodooAction();
    }
  };
};

const createHUD = () => {
  reminder = new dxPanel(
    DX_PIXI,
    "phasmoReminder",
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
    if (!clicked) {
      voodooAction();
      let temp = setTimeout(() => clearTimeouts(), 2500);
      timeoutArray.push(temp);
    }
  };
};

const voodooAction = () => {
  let rand = Math.floor(Math.random() * 6);
  switch (rand) {
    case 0:
      console.log("head");
      dixperPluginSample.addParentSkill("dmJi0vXiHPJuAgKasleU");
      curseDoll = new dxAnimatedElement(DX_PIXI, "head", DX_LAYERS.ui, "", {
        position: {
          x: DX_WIDTH / 2,
          y: DX_HEIGHT / 2,
        },
        scale: {
          x: 0.6,
          y: 0.6,
        },
        animationSpeed: 0.5,
      });
      break;
    case 1:
      console.log("rArm");
      dixperPluginSample.addParentSkill("8DDoB4HA4fuAOesMFUcv");
      curseDoll = new dxAnimatedElement(DX_PIXI, "rightArm", DX_LAYERS.ui, "", {
        position: {
          x: DX_WIDTH / 2,
          y: DX_HEIGHT / 2,
        },
        scale: {
          x: 0.6,
          y: 0.6,
        },
        animationSpeed: 0.5,
      });
      break;
    case 2:
      console.log("body");
      dixperPluginSample.addParentSkill("8WfmoBLDZ4yVX9UFVBxo");
      curseDoll = new dxAnimatedElement(DX_PIXI, "body", DX_LAYERS.ui, "", {
        position: {
          x: DX_WIDTH / 2,
          y: DX_HEIGHT / 2,
        },
        scale: {
          x: 0.6,
          y: 0.6,
        },
        animationSpeed: 0.5,
      });
      break;
    case 3:
      console.log("lArm");
      dixperPluginSample.addParentSkill("5jFjCz6Zse3KZa3b8IyK");
      curseDoll = new dxAnimatedElement(DX_PIXI, "leftArm", DX_LAYERS.ui, "", {
        position: {
          x: DX_WIDTH / 2,
          y: DX_HEIGHT / 2,
        },
        scale: {
          x: 0.6,
          y: 0.6,
        },
        animationSpeed: 0.5,
      });
      break;
    case 4:
      console.log("rLeg");
      dixperPluginSample.addParentSkill("2SVua6uMysoWEZkNolHg");
      curseDoll = new dxAnimatedElement(DX_PIXI, "rightLeg", DX_LAYERS.ui, "", {
        position: {
          x: DX_WIDTH / 2,
          y: DX_HEIGHT / 2,
        },
        scale: {
          x: 0.6,
          y: 0.6,
        },
        animationSpeed: 0.5,
      });
      break;
    case 5:
      console.log("lLeg");
      dixperPluginSample.addParentSkill("7FeUakDb4i9b9wzol2vI");
      curseDoll = new dxAnimatedElement(DX_PIXI, "leftLeg", DX_LAYERS.ui, "", {
        position: {
          x: DX_WIDTH / 2,
          y: DX_HEIGHT / 2,
        },
        scale: {
          x: 0.6,
          y: 0.6,
        },
        animationSpeed: 0.5,
      });
      break;
    default:
      break;
  }

  dollImage.remove();
  timer.remove(false);
  reminder.remove();
  let temp = setTimeout(() => curseDoll._destroy(), 2000);
  timeoutArray.push(temp);
}
