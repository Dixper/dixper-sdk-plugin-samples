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

const invisibleButton =
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/phasmophobia/assets/images/invisible_button.png";

let millisecondsToFinish;

let head, leftArm, rightArm, body, leftLeg, rightLeg;
let currentX, currentY;
let dollImage;
let curseDoll;

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
  setTimeout(() => init(), 1000);
  //   init();
};

const init = () => {
  createHUD();
  createVoodooDoll(DX_WIDTH / 2, DX_HEIGHT / 2, 0.6);
};

const createVoodooDoll = (initialX, initialY, voodooScale) => {
  currentX = initialX - 421 * voodooScale;
  currentY = initialY - 421 * voodooScale;

  const createDollImage = () => {
    dollImage = new PIXI.Sprite.from(
      dixperPluginSample.pixi.resources.voodooDoll.texture
    );
    dollImage.x = initialX;
    dollImage.y = initialY;
    dollImage.anchor.set(0.5);
    dollImage.zIndex = 90;
    dollImage.scale = { x: 0.6, y: 0.6 };
    console.log(dollImage);
    dixperPluginSample.uiLayer.addChild(dollImage);
  };
  const createHead = () => {
    head = new DxButton(invisibleButton, "", {
      isClickable: true,
      controller: {
        isPressable: true,
        button: "FACE_1",
        x: -5,
        y: -30,
        scale: {
          x: 0.5,
          y: 0.5,
        },
      },
      keyboard: {
        isPressable: true,
        button: 1,
        x: -5,
        y: -30,
        scale: {
          x: 0.3,
          y: 0.3,
        },
      },
      position: {
        x: currentX + 442 * voodooScale,
        y: currentY + 250 * voodooScale,
      },
      anchor: {
        x: 0,
        y: 0,
      },
      scale: {
        x: 1,
        y: 1,
      },
      animationSpeed: 0.5,
      hitbox: [
        -77 * voodooScale,
        -114 * voodooScale,
        27 * voodooScale,
        -116 * voodooScale,
        118 * voodooScale,
        70 * voodooScale,
        22 * voodooScale,
        112 * voodooScale,
        -70 * voodooScale,
        107 * voodooScale,
        -117 * voodooScale,
        23 * voodooScale,
      ],
      debug: true,
    });

    head.start();

    head.onClick = (event) => {
      console.log("CLICK HEAD");
      dixperPluginSample.addParentSkill("dmJi0vXiHPJuAgKasleU");
      curseDoll = new dxAnimatedElement(DX_PIXI, "head", DX_LAYERS.ui, "", {
        position: {
          x: initialX,
          y: initialY,
        },
        scale: {
          x: 0.6,
          y: 0.6,
        },
        animationSpeed: 0.5,
      });
      dollImage.destroy();
      deleteVoodooDoll();
    };
  };

  const createRightArm = () => {
    rightArm = new DxButton(invisibleButton, "", {
      isClickable: true,
      controller: {
        isPressable: true,
        button: "FACE_2",
        x: -25,
        y: 10,
        scale: {
          x: 0.5,
          y: 0.5,
        },
      },
      keyboard: {
        isPressable: true,
        button: 2,
        x: -25,
        y: 10,
        scale: {
          x: 0.3,
          y: 0.3,
        },
      },
      position: {
        x: currentX + 295 * voodooScale,
        y: currentY + 390 * voodooScale,
      },
      anchor: {
        x: 0,
        y: 0,
      },
      scale: {
        x: 1,
        y: 1,
      },
      animationSpeed: 0.5,
      hitbox: [
        -78 * voodooScale,
        -14 * voodooScale,
        55 * voodooScale,
        -53 * voodooScale,
        77 * voodooScale,
        -33 * voodooScale,
        48 * voodooScale,
        2 * voodooScale,
        -49 * voodooScale,
        53 * voodooScale,
      ],
      debug: true,
    });

    rightArm.start();

    rightArm.onClick = (event) => {
      console.log("CLICK RIGHT ARM");
      dixperPluginSample.addParentSkill("8DDoB4HA4fuAOesMFUcv");
      curseDoll = new dxAnimatedElement(DX_PIXI, "rightArm", DX_LAYERS.ui, "", {
        position: {
          x: initialX,
          y: initialY,
        },
        scale: {
          x: 0.6,
          y: 0.6,
        },
        animationSpeed: 0.5,
      });
      dollImage.destroy();
      deleteVoodooDoll();
    };
  };

  const createBody = () => {
    body = new DxButton(invisibleButton, "", {
      isClickable: true,
      controller: {
        isPressable: true,
        button: "FACE_3",
        x: 0,
        y: 25,
        scale: {
          x: 0.5,
          y: 0.5,
        },
      },
      keyboard: {
        isPressable: true,
        button: 3,
        x: 0,
        y: 25,
        scale: {
          x: 0.3,
          y: 0.3,
        },
      },
      position: {
        x: currentX + 406 * voodooScale,
        y: currentY + 463 * voodooScale,
      },
      anchor: {
        x: 0,
        y: 0,
      },
      scale: {
        x: 1,
        y: 1,
      },
      animationSpeed: 0.5,
      hitbox: [
        -34 * voodooScale,
        -106 * voodooScale,
        58 * voodooScale,
        -101 * voodooScale,
        106 * voodooScale,
        57 * voodooScale,
        -19 * voodooScale,
        115 * voodooScale,
        -105 * voodooScale,
        29 * voodooScale,
      ],
      debug: true,
    });

    body.start();

    body.onClick = (event) => {
      console.log("CLICK BODY");
      dixperPluginSample.addParentSkill("8WfmoBLDZ4yVX9UFVBxo");
      curseDoll = new dxAnimatedElement(DX_PIXI, "body", DX_LAYERS.ui, "", {
        position: {
          x: initialX,
          y: initialY,
        },
        scale: {
          x: 0.6,
          y: 0.6,
        },
        animationSpeed: 0.5,
      });
      dollImage.destroy();
      deleteVoodooDoll();
    };
  };

  const createLeftArm = () => {
    leftArm = new DxButton(invisibleButton, "", {
      isClickable: true,
      controller: {
        isPressable: true,
        button: "FACE_4",
        x: 30,
        y: 20,
        scale: {
          x: 0.5,
          y: 0.5,
        },
      },
      keyboard: {
        isPressable: true,
        button: 4,
        x: 30,
        y: 20,
        scale: {
          x: 0.3,
          y: 0.3,
        },
      },
      position: {
        x: currentX + 537 * voodooScale,
        y: currentY + 423 * voodooScale,
      },
      anchor: {
        x: 0,
        y: 0,
      },
      scale: {
        x: 1,
        y: 1,
      },
      animationSpeed: 0.5,
      hitbox: [
        -73 * voodooScale,
        -61 * voodooScale,
        -35 * voodooScale,
        -67 * voodooScale,
        72 * voodooScale,
        17 * voodooScale,
        25 * voodooScale,
        67 * voodooScale,
        -51 * voodooScale,
        -21 * voodooScale,
      ],
      debug: true,
    });

    leftArm.start();

    leftArm.onClick = (event) => {
      console.log("CLICK LEFT ARM");
      dixperPluginSample.addParentSkill("5jFjCz6Zse3KZa3b8IyK");
      curseDoll = new dxAnimatedElement(DX_PIXI, "leftArm", DX_LAYERS.ui, "", {
        position: {
          x: initialX,
          y: initialY,
        },
        scale: {
          x: 0.6,
          y: 0.6,
        },
        animationSpeed: 0.5,
      });
      dollImage.destroy();
      deleteVoodooDoll();
    };
  };

  const createRightLeg = () => {
    rightLeg = new DxButton(invisibleButton, "", {
      isClickable: true,
      controller: {
        isPressable: true,
        button: "DPAD_UP",
        x: -60,
        y: 20,
        scale: {
          x: 0.5,
          y: 0.5,
        },
      },
      keyboard: {
        isPressable: true,
        button: 5,
        x: -60,
        y: 20,
        scale: {
          x: 0.3,
          y: 0.3,
        },
      },
      position: {
        x: currentX + 351 * voodooScale,
        y: currentY + 559 * voodooScale,
      },
      anchor: {
        x: 0,
        y: 0,
      },
      scale: {
        x: 1,
        y: 1,
      },
      animationSpeed: 0.5,
      hitbox: [
        -50 * voodooScale,
        -67 * voodooScale,
        -1 * voodooScale,
        -7 * voodooScale,
        -98 * voodooScale,
        67 * voodooScale,
        -149 * voodooScale,
        -7 * voodooScale,
      ],
      debug: true,
    });

    rightLeg.start();

    rightLeg.onClick = (event) => {
      console.log("CLICK RIGHT LEG");
      dixperPluginSample.addParentSkill("2SVua6uMysoWEZkNolHg");
      curseDoll = new dxAnimatedElement(DX_PIXI, "rightLeg", DX_LAYERS.ui, "", {
        position: {
          x: initialX,
          y: initialY,
        },
        scale: {
          x: 0.6,
          y: 0.6,
        },
        animationSpeed: 0.5,
      });
      dollImage.destroy();
      deleteVoodooDoll();
    };
  };

  const createLeftLeg = () => {
    leftLeg = new DxButton(invisibleButton, "", {
      isClickable: true,
      controller: {
        isPressable: true,
        button: "DPAD_DOWN",
        x: 10,
        y: 20,
        scale: {
          x: 0.5,
          y: 0.5,
        },
      },
      keyboard: {
        isPressable: true,
        button: 6,
        x: 10,
        y: 20,
        scale: {
          x: 0.3,
          y: 0.3,
        },
      },
      position: {
        x: currentX + 496 * voodooScale,
        y: currentY + 613 * voodooScale,
      },
      anchor: {
        x: 0,
        y: 0,
      },
      scale: {
        x: 1,
        y: 1,
      },
      animationSpeed: 0.5,
      hitbox: [
        -60 * voodooScale,
        -49 * voodooScale,
        -16 * voodooScale,
        -77 * voodooScale,
        60 * voodooScale,
        36 * voodooScale,
        -21 * voodooScale,
        77 * voodooScale,
      ],
      debug: true,
    });

    leftLeg.start();

    leftLeg.onClick = (event) => {
      console.log("CLICK LEFT LEG");
      dixperPluginSample.addParentSkill("7FeUakDb4i9b9wzol2vI");
      curseDoll = new dxAnimatedElement(DX_PIXI, "leftLeg", DX_LAYERS.ui, "", {
        position: {
          x: initialX,
          y: initialY,
        },
        scale: {
          x: 0.6,
          y: 0.6,
        },
        animationSpeed: 0.5,
      });
      dollImage.destroy();
      deleteVoodooDoll();
    };
  };

  createDollImage();
  createHead();
  createLeftArm();
  createBody();
  createRightArm();
  createLeftLeg();
  createRightLeg();
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
    timer.remove();
  };
};

const deleteVoodooDoll = () => {
  head.remove();
  leftArm.remove();
  rightArm.remove();
  leftLeg.remove();
  rightLeg.remove();
  body.remove();
  curseDoll.remove();
  timer.remove(false);
  reminder.remove();
};
