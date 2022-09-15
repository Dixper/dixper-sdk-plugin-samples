const images = [
  {
    name: "voodooDoll",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/origin/phasmophobia-adri-skills/src/phasmophobia/assets/images/voodoo-doll.png"
  }
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
  }
];

const sounds = [];

let millisecondsToFinish;

let head, leftArm, rightArm, body, leftLeg, rightLeg;
let currentX, currentY;
let cursorDownSub;
let dollImage;
let curseDoll;
let cursor;
// INPUTS PARAMS

let clickKey,
  reminderTitle,
  reminder;

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
  createVoodooDoll(DX_WIDTH / 2, DX_HEIGHT / 2, 0.6);
  cursor = new dxCursor(
    DX_PIXI,
    "starCursor",
    DX_LAYERS.ui,
    {
      parentLayer: dixperPluginSample.topLayer,
      anchor: {
        x: 0.5,
        y: 0.5,
      },
    }
  );
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
  }
  const createHead = () => {
    head = new dxButton(
      DX_PIXI,
      "invisibleButton",
      DX_LAYERS.ui,
      "",
      {
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
        hitbox: [365 * voodooScale, 136 * voodooScale,
        469 * voodooScale, 134 * voodooScale,
        560 * voodooScale, 320 * voodooScale,
        464 * voodooScale, 362 * voodooScale,
        372 * voodooScale, 357 * voodooScale,
        325 * voodooScale, 273 * voodooScale],
        debug: true,
      }
    );
    console.log(head._options.hitbox);
    head.onClick = (event) => {
      console.log("CLICK HEAD");
      dixperPluginSample.addParentSkill("30nkikJt1FkGTS4eotaQ");
      curseDoll = new dxAnimatedElement(
        DX_PIXI,
        "head",
        DX_LAYERS.ui,
        "",
        {
          position: {
            x: initialX,
            y: initialY,
          },
          scale: {
            x: 0.6,
            y: 0.6,
          },
          animationSpeed: 0.5,
        }
      );
      dollImage.destroy();
    };
  };



  const createRightArm = () => {
    rightArm = new dxButton(
      DX_PIXI,
      "invisibleButton",
      DX_LAYERS.ui,
      "",
      {
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
        hitbox: [217 * voodooScale, 376 * voodooScale,
        350 * voodooScale, 337 * voodooScale,
        372 * voodooScale, 357 * voodooScale,
        343 * voodooScale, 392 * voodooScale,
        246 * voodooScale, 442 * voodooScale],
        debug: true,
      }
    );

    rightArm.onClick = (event) => {
      console.log("CLICK RIGHT ARM");
      dixperPluginSample.addParentSkill("4fLk7GDNVQlnKsB3ru5m");
      curseDoll = new dxAnimatedElement(
        DX_PIXI,
        "rightArm",
        DX_LAYERS.ui,
        "",
        {
          position: {
            x: initialX,
            y: initialY,
          },
          scale: {
            x: 0.6,
            y: 0.6,
          },
          animationSpeed: 0.5,
        }
      );
      dollImage.destroy();
    };


    return rightArm;
  };


  const createBody = () => {
    body = new dxButton(
      DX_PIXI,
      "invisibleButton",
      DX_LAYERS.ui,
      "",
      {
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
        hitbox: [372 * voodooScale, 357 * voodooScale,
        464 * voodooScale, 362 * voodooScale,
        512 * voodooScale, 520 * voodooScale,
        387 * voodooScale, 578 * voodooScale,
        301 * voodooScale, 492 * voodooScale],
        debug: true,
      }
    );

    body.onClick = (event) => {
      console.log("CLICK BODY");
      dixperPluginSample.addParentSkill("CGfyESi9XDiOLGuFeGE8");
      curseDoll = new dxAnimatedElement(
        DX_PIXI,
        "body",
        DX_LAYERS.ui,
        "",
        {
          position: {
            x: initialX,
            y: initialY,
          },
          scale: {
            x: 0.6,
            y: 0.6,
          },
          animationSpeed: 0.5,
        }
      );
      dollImage.destroy();
    };

    return body;
  };


  const createLeftArm = () => {
    leftArm = new dxButton(
      DX_PIXI,
      "invisibleButton",
      DX_LAYERS.ui,
      "",
      {
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
        hitbox: [464 * voodooScale, 362 * voodooScale,
        502 * voodooScale, 356 * voodooScale,
        609 * voodooScale, 440 * voodooScale,
        562 * voodooScale, 489 * voodooScale,
        486 * voodooScale, 402 * voodooScale],
        debug: true,
      }
    );

    leftArm.onClick = (event) => {
      console.log("CLICK LEFT ARM");
      dixperPluginSample.addParentSkill("eHBCAnSByN58FHQ4Awx5");
      curseDoll = new dxAnimatedElement(
        DX_PIXI,
        "leftArm",
        DX_LAYERS.ui,
        "",
        {
          position: {
            x: initialX,
            y: initialY,
          },
          scale: {
            x: 0.6,
            y: 0.6,
          },
          animationSpeed: 0.5,
        }
      );
      dollImage.destroy();
    };
    return leftArm;
  };


  const createRightLeg = () => {
    rightLeg = new dxButton(
      DX_PIXI,
      "invisibleButton",
      DX_LAYERS.ui,
      "",
      {
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
        hitbox: [301 * voodooScale, 492 * voodooScale,
        350 * voodooScale, 552 * voodooScale,
        253 * voodooScale, 625 * voodooScale,
        202 * voodooScale, 552 * voodooScale],
        debug: true,
      }
    );

    rightLeg.onClick = (event) => {
      console.log("CLICK RIGHT LEG");
      dixperPluginSample.addParentSkill("0C0ZpKSxtH7fLklLcNT2");
      curseDoll = new dxAnimatedElement(
        DX_PIXI,
        "rightLeg",
        DX_LAYERS.ui,
        "",
        {
          position: {
            x: initialX,
            y: initialY,
          },
          scale: {
            x: 0.6,
            y: 0.6,
          },
          animationSpeed: 0.5,
        }
      );
      dollImage.destroy();
    };
    return leftLeg;
  };


  const createLeftLeg = () => {
    leftLeg = new dxButton(
      DX_PIXI,
      "invisibleButton",
      DX_LAYERS.ui,
      "",
      {
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
        hitbox: [436 * voodooScale, 564 * voodooScale,
        480 * voodooScale, 536 * voodooScale,
        556 * voodooScale, 649 * voodooScale,
        475 * voodooScale, 690 * voodooScale],
        debug: true,
      }
    );

    leftLeg.onClick = (event) => {
      console.log("CLICK LEFT LEG");
      dixperPluginSample.addParentSkill("QpeY2JhsTz6MwhDvpj5p");
      curseDoll = new dxAnimatedElement(
        DX_PIXI,
        "leftLeg",
        DX_LAYERS.ui,
        "",
        {
          position: {
            x: initialX,
            y: initialY,
          },
          scale: {
            x: 0.6,
            y: 0.6,
          },
          animationSpeed: 0.5,
        }
      );
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


const createReminder = (reminderTitle) => {
  reminder = new dxPanel(
    DX_PIXI,
    "reminder",
    DX_LAYERS.ui,
    reminderTitle,
    {
      position: {
        x: 200,
        y: DX_HEIGHT / 2 - 100,
      },
      scale: {
        x: 0.5,
        y: 0.5,
      },
      animationSpeed: 0.5,
    }
  );
};
