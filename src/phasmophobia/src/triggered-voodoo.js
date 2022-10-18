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
    name: "starCursor",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/phasmophobia/src/phasmophobia/assets/spritesheets/star_cursor.json",
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
let cursorDownSub;
let dollImage;
let curseDoll;
let cursor;
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
  cursor = new dxCursor(DX_PIXI, "starCursor", DX_LAYERS.ui, {
    parentLayer: dixperPluginSample.topLayer,
    anchor: {
      x: 0.5,
      y: 0.5,
    },
  });
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
        button: "FACE_2",
        x: -10,
        y: 10,
        scale: {
          x: 0.5,
          y: 0.5,
        },
      },
      keyboard: {
        isPressable: true,
        button: 1,
        x: -10,
        y: 10,
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
        365 * voodooScale,
        136 * voodooScale,
        469 * voodooScale,
        134 * voodooScale,
        560 * voodooScale,
        320 * voodooScale,
        464 * voodooScale,
        362 * voodooScale,
        372 * voodooScale,
        357 * voodooScale,
        325 * voodooScale,
        273 * voodooScale,
      ],
      debug: true,
    });

    head.start();

    head.onClick = (event) => {
      console.log("CLICK HEAD");
      dixperPluginSample.addParentSkill("30nkikJt1FkGTS4eotaQ");
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
    };
  };

  const createRightArm = () => {
    rightArm = new DxButton(invisibleButton, "", {
      isClickable: true,
      controller: {
        isPressable: true,
        button: "FACE_2",
        x: 236 * voodooScale,
        y: 422 * voodooScale,
        scale: {
          x: 0.5,
          y: 0.5,
        },
      },
      keyboard: {
        isPressable: true,
        button: 2,
        x: 236 * voodooScale,
        y: 422 * voodooScale,
        scale: {
          x: 0.3,
          y: 0.3,
        },
      },
      position: {
        x: currentX,
        y: currentY,
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
        217 * voodooScale,
        376 * voodooScale,
        350 * voodooScale,
        337 * voodooScale,
        372 * voodooScale,
        357 * voodooScale,
        343 * voodooScale,
        392 * voodooScale,
        246 * voodooScale,
        442 * voodooScale,
      ],
      debug: true,
    });

    rightArm.start();

    rightArm.onClick = (event) => {
      console.log("CLICK RIGHT ARM");
      dixperPluginSample.addParentSkill("4fLk7GDNVQlnKsB3ru5m");
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
    };

    return rightArm;
  };

  const createBody = () => {
    body = new DxButton(invisibleButton, "", {
      isClickable: true,
      controller: {
        isPressable: true,
        button: "FACE_1",
        x: 410 * voodooScale,
        y: 510 * voodooScale,
        scale: {
          x: 0.5,
          y: 0.5,
        },
      },
      keyboard: {
        isPressable: true,
        button: 3,
        x: 410 * voodooScale,
        y: 510 * voodooScale,
        scale: {
          x: 0.3,
          y: 0.3,
        },
      },
      position: {
        x: currentX,
        y: currentY,
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
        372 * voodooScale,
        357 * voodooScale,
        464 * voodooScale,
        362 * voodooScale,
        512 * voodooScale,
        520 * voodooScale,
        387 * voodooScale,
        578 * voodooScale,
        301 * voodooScale,
        492 * voodooScale,
      ],
      debug: true,
    });

    body.start();

    body.onClick = (event) => {
      console.log("CLICK BODY");
      dixperPluginSample.addParentSkill("CGfyESi9XDiOLGuFeGE8");
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
    };

    return body;
  };

  const createLeftArm = () => {
    leftArm = new DxButton(invisibleButton, "", {
      isClickable: true,
      controller: {
        isPressable: true,
        button: "FACE_4",
        x: 580 * voodooScale,
        y: 469 * voodooScale,
        scale: {
          x: 0.5,
          y: 0.5,
        },
      },
      keyboard: {
        isPressable: true,
        button: 4,
        x: 580 * voodooScale,
        y: 469 * voodooScale,
        scale: {
          x: 0.3,
          y: 0.3,
        },
      },
      position: {
        x: currentX,
        y: currentY,
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
        464 * voodooScale,
        362 * voodooScale,
        502 * voodooScale,
        356 * voodooScale,
        609 * voodooScale,
        440 * voodooScale,
        562 * voodooScale,
        489 * voodooScale,
        486 * voodooScale,
        402 * voodooScale,
      ],
      debug: true,
    });

    leftArm.start();

    leftArm.onClick = (event) => {
      console.log("CLICK LEFT ARM");
      dixperPluginSample.addParentSkill("eHBCAnSByN58FHQ4Awx5");
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
    };
    return leftArm;
  };

  const createRightLeg = () => {
    rightLeg = new DxButton(invisibleButton, "", {
      isClickable: true,
      controller: {
        isPressable: true,
        button: "DPAD_UP",
        x: 240 * voodooScale,
        y: 605 * voodooScale,
        scale: {
          x: 0.5,
          y: 0.5,
        },
      },
      keyboard: {
        isPressable: true,
        button: 5,
        x: 240 * voodooScale,
        y: 605 * voodooScale,
        scale: {
          x: 0.3,
          y: 0.3,
        },
      },
      position: {
        x: currentX,
        y: currentY,
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
        301 * voodooScale,
        492 * voodooScale,
        350 * voodooScale,
        552 * voodooScale,
        253 * voodooScale,
        625 * voodooScale,
        202 * voodooScale,
        552 * voodooScale,
      ],
      debug: true,
    });

    rightLeg.start();

    rightLeg.onClick = (event) => {
      console.log("CLICK RIGHT LEG");
      dixperPluginSample.addParentSkill("0C0ZpKSxtH7fLklLcNT2");
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
    };
    return leftLeg;
  };

  const createLeftLeg = () => {
    leftLeg = new DxButton(invisibleButton, "", {
      isClickable: true,
      controller: {
        isPressable: true,
        button: "DPAD_DOWN",
        x: 516 * voodooScale,
        y: 670 * voodooScale,
        scale: {
          x: 0.5,
          y: 0.5,
        },
      },
      keyboard: {
        isPressable: true,
        button: 6,
        x: 516 * voodooScale,
        y: 670 * voodooScale,
        scale: {
          x: 0.3,
          y: 0.3,
        },
      },
      position: {
        x: currentX,
        y: currentY,
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
        436 * voodooScale,
        564 * voodooScale,
        480 * voodooScale,
        536 * voodooScale,
        556 * voodooScale,
        649 * voodooScale,
        475 * voodooScale,
        690 * voodooScale,
      ],
      debug: true,
    });

    leftLeg.start();

    leftLeg.onClick = (event) => {
      console.log("CLICK LEFT LEG");
      dixperPluginSample.addParentSkill("QpeY2JhsTz6MwhDvpj5p");
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
    };
    return rightLeg;
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
    }
  );
  timer.onTimerFinish = () => {
    // if (checkfinished) {
    //   timer.remove(false);
    // }
  };
};
