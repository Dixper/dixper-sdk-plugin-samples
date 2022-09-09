const images = [];
const sprites = [
  {
    name: "candlesCircle",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/phasmophobia/src/phasmophobia/assets/spritesheets/candles_circle.json",
  },
  {
    name: "invisibleButton",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/phasmophobia/src/phasmophobia/assets/spritesheets/invisible_sprite.json",
  },
  {
    name: "target",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/spritesheets/definitive-target.json",
  },
];
const sounds = [];

let millisecondsToFinish;

let head, leftArm, rightArm, body, leftLeg, rightLeg;
let currentX, currentY;
let cursorDownSub;
let candlesCircle;
let curseDoll;
// INPUTS PARAMS

let clickKey, reminderTitle, reminder;

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

dixperPluginSample.inputs$.subscribe((inputs) => {
  console.log("inputs", inputs);
  clickKey = inputs.clickKey || 1;
  reminderTitle = inputs.reminderTitle || "voodoo doll";
});

// REMOTE

dixperPluginSample.onPixiLoad = () => {
  init();
};

const init = () => {
  createReminder();
  dixperPluginSample.drawCursor();
  // createVoodooDoll(DX_WIDTH / 2, DX_HEIGHT / 2, 0.6);

  const createDollImage = () => {
    candlesCircle = new PIXI.Sprite.from(
      DX_PIXI.resources.candlesCircle.texture
    );
    candlesCircle.x = initialX;
    candlesCircle.y = initialY;
    candlesCircle.anchor.set(0.5);
    candlesCircle.zIndex = 90;
    candlesCircle.scale = { x: 1, y: 1 };
    console.log(candlesCircle);
    dixperPluginSample.uiLayer.addChild(candlesCircle);
  };
  createDollImage();
};

const createVoodooDoll = (initialX, initialY, voodooScale) => {
  currentX = initialX - 421 * voodooScale;
  currentY = initialY - 421 * voodooScale;

  const createDollImage = () => {
    candlesCircle = new PIXI.Sprite.from(
      dixperPluginSample.pixi.resources.candlesCircle.texture
    );
    candlesCircle.x = initialX;
    candlesCircle.y = initialY;
    candlesCircle.anchor.set(0.5);
    candlesCircle.zIndex = 90;
    candlesCircle.scale = { x: 1, y: 1 };
    console.log(candlesCircle);
    dixperPluginSample.uiLayer.addChild(candlesCircle);
  };
  const createHead = () => {
    head = new dxButton(DX_PIXI, "invisibleButton", DX_LAYERS.ui, "", {
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
    console.log(head._options.hitbox);
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
      candlesCircle.destroy();
    };
  };

  const createRightArm = () => {
    rightArm = new dxButton(DX_PIXI, "invisibleButton", DX_LAYERS.ui, "", {
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
      candlesCircle.destroy();
    };

    return rightArm;
  };

  const createBody = () => {
    body = new dxButton(DX_PIXI, "invisibleButton", DX_LAYERS.ui, "", {
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
      candlesCircle.destroy();
    };

    return body;
  };

  const createLeftArm = () => {
    leftArm = new dxButton(DX_PIXI, "invisibleButton", DX_LAYERS.ui, "", {
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
      candlesCircle.destroy();
    };
    return leftArm;
  };

  const createRightLeg = () => {
    rightLeg = new dxButton(DX_PIXI, "invisibleButton", DX_LAYERS.ui, "", {
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
      candlesCircle.destroy();
    };
    return leftLeg;
  };

  const createLeftLeg = () => {
    leftLeg = new dxButton(DX_PIXI, "invisibleButton", DX_LAYERS.ui, "", {
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
      candlesCircle.destroy();
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

const createReminder = (reminderTitle) => {
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
