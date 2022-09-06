const images = [];
const sprites = [
  {
    name: "head",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/spritesheets/button.json",
  },
  {
    name: "leftArm",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/spritesheets/button.json",
  },
  {
    name: "body",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/spritesheets/button.json",
  },
  {
    name: "rightArm",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/spritesheets/button.json",
  },
  {
    name: "leftLeg",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/spritesheets/button.json",
  },
  {
    name: "rightLeg",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/spritesheets/button.json",
  },
  {
    name: "target",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/spritesheets/definitive-target.json",
  },
];

const sounds = [
];

let millisecondsToFinish;

let head, leftArm, rightArm, body, leftLeg, rightLeg;
let currentX, currentY;
let cursorDownSub;

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
  dixperPluginSample.drawCursor();
  createVoodooDoll(DX_WIDTH / 2 - 300, DX_HEIGHT / 2 - 200, 1);
};

const createVoodooDoll = (initialX, initialY, voodooScale) => {
  console.log("start creating voodoo doll");
  currentX = initialX;
  currentY = initialY;

  const createHead = () => {
    head = new dxButton(
      DX_PIXI,
      "head",
      DX_LAYERS.ui,
      "",
      {
        position: {
          x: currentX,
          y: currentY,
        },
        anchor: {
          x: 0.5,
          y: 0.5,
        },
        scale: {
          x: 1,
          y: 1,
        },
        animationSpeed: 0.5,

        // hitbox: [-DX_PIXI.resources.leftArm.data.meta.size.w / 2, -DX_PIXI.resources.leftArm.data.meta.size.h / 2,
        // DX_PIXI.resources.leftArm.data.meta.size.w / 2, -DX_PIXI.resources.leftArm.data.meta.size.h / 2,
        // DX_PIXI.resources.leftArm.data.meta.size.w / 2, DX_PIXI.resources.leftArm.data.meta.size.h / 2,
        // -DX_PIXI.resources.leftArm.data.meta.size.w / 2, DX_PIXI.resources.leftArm.data.meta.size.h / 2],
        hitbox: [-250, -110, 250, -110, 250, 110, -250, 110],
        debug: true,
      }
    );

    head.onClick = (event) => {
      console.log("CLICK HEAD");
      dixperPluginSample.addParentSkill("30nkikJt1FkGTS4eotaQ");
    };
  };



  const createLeftArm = () => {
    leftArm = new dxButton(
      DX_PIXI,
      "leftArm",
      DX_LAYERS.ui,
      "",
      {
        position: {
          x: currentX,
          y: currentY,
        },
        anchor: {
          x: 0.5,
          y: 0.5,
        },
        scale: {
          x: 1,
          y: 1,
        },
        animationSpeed: 0.5,

        // hitbox: [-DX_PIXI.resources.leftArm.data.meta.size.w / 2, -DX_PIXI.resources.leftArm.data.meta.size.h / 2,
        // DX_PIXI.resources.leftArm.data.meta.size.w / 2, -DX_PIXI.resources.leftArm.data.meta.size.h / 2,
        // DX_PIXI.resources.leftArm.data.meta.size.w / 2, DX_PIXI.resources.leftArm.data.meta.size.h / 2,
        // -DX_PIXI.resources.leftArm.data.meta.size.w / 2, DX_PIXI.resources.leftArm.data.meta.size.h / 2],
        hitbox: [-250, -110, 250, -110, 250, 110, -250, 110],
        debug: true,
      }
    );

    leftArm.onClick = (event) => {
      console.log("CLICK LEFT ARM");
      dixperPluginSample.addParentSkill("4fLk7GDNVQlnKsB3ru5m");
    };


    return leftArm;
  };


  const createBody = () => {
    body = new dxButton(
      DX_PIXI,
      "body",
      DX_LAYERS.ui,
      "",
      {
        position: {
          x: currentX,
          y: currentY,
        },
        anchor: {
          x: 0.5,
          y: 0.5,
        },
        scale: {
          x: voodooScale,
          y: voodooScale,
        },
        animationSpeed: 0.5,
        // hitbox: [currentX, currentY,
        //   currentX + DX_PIXI.resources.body.data.meta.size.w * voodooScale, currentY,
        //   currentX, currentY + DX_PIXI.resources.body.data.meta.size.h * voodooScale,
        //   currentX + DX_PIXI.resources.body.data.meta.size.w * voodooScale, currentY + DX_PIXI.resources.body.data.meta.size.h * voodooScale],
        hitbox: [-250, -110, 250, -110, 250, 110, -250, 110],
        debug: true,
      }
    );

    body.onClick = (event) => {
      console.log("CLICK BODY");
    };

    return body;
  };


  const createRightArm = () => {
    rightArm = new dxButton(
      DX_PIXI,
      "rightArm",
      DX_LAYERS.ui,
      "",
      {
        position: {
          x: currentX,
          y: currentY,
        },
        anchor: {
          x: 0.5,
          y: 0.5,
        },
        scale: {
          x: voodooScale,
          y: voodooScale,
        },
        animationSpeed: 0.5,
        // hitbox: [currentX, currentY,
        //   currentX + DX_PIXI.resources.rightArm.data.meta.size.w * voodooScale, currentY,
        //   currentX, currentY + DX_PIXI.resources.rightArm.data.meta.size.h * voodooScale,
        //   currentX + DX_PIXI.resources.rightArm.data.meta.size.w * voodooScale, currentY + DX_PIXI.resources.rightArm.data.meta.size.h * voodooScale],
        hitbox: [-250, -110, 250, -110, 250, 110, -250, 110],
        debug: true,
      }
    );

    rightArm.onClick = (event) => {
      console.log("CLICK RIGHT ARM");
    };
    return rightArm;
  };


  const createLeftLeg = () => {
    leftLeg = new dxButton(
      DX_PIXI,
      "leftLeg",
      DX_LAYERS.ui,
      "",
      {
        position: {
          x: currentX,
          y: currentY,
        },
        anchor: {
          x: 0.5,
          y: 0.5,
        },
        scale: {
          x: voodooScale,
          y: voodooScale,
        },
        animationSpeed: 0.5,
        // hitbox: [currentX, currentY,
        //   currentX + DX_PIXI.resources.leftLeg.data.meta.size.w * voodooScale, currentY,
        //   currentX, currentY + DX_PIXI.resources.leftLeg.data.meta.size.h * voodooScale,
        //   currentX + DX_PIXI.resources.leftLeg.data.meta.size.w * voodooScale, currentY + DX_PIXI.resources.leftLeg.data.meta.size.h * voodooScale],
        hitbox: [-250, -110, 250, -110, 250, 110, -250, 110],
        debug: true,
      }
    );

    leftLeg.onClick = (event) => {
      console.log("CLICK LEFT LEG");
    };
    return leftLeg;
  };


  const createRightLeg = () => {
    rightLeg = new dxButton(
      DX_PIXI,
      "rightLeg",
      DX_LAYERS.ui,
      "",
      {
        position: {
          x: currentX,
          y: currentY,
        },
        anchor: {
          x: 0.5,
          y: 0.5,
        },
        scale: {
          x: voodooScale,
          y: voodooScale,
        },
        animationSpeed: 0.5,
        // hitbox: [currentX, currentY,
        //   currentX + DX_PIXI.resources.rightLeg.data.meta.size.w * voodooScale, currentY,
        //   currentX, currentY + DX_PIXI.resources.rightLeg.data.meta.size.h * voodooScale,
        //   currentX + DX_PIXI.resources.rightLeg.data.meta.size.w * voodooScale, currentY + DX_PIXI.resources.rightLeg.data.meta.size.h * voodooScale],
        hitbox: [-250, -110, 250, -110, 250, 110, -250, 110],
        debug: true,
      }
    );

    rightLeg.onClick = (event) => {
      console.log("CLICK RIGHT LEG");
    };
    return rightLeg;
  };

  createHead();
  currentX = initialX;
  // currentY += DX_PIXI.resources.head.data.meta.size.h * voodooScale;
  currentY += 220 * voodooScale;
  createLeftArm();
  //currentX += DX_PIXI.resources.leftArm.data.meta.size.w * voodooScale;
  currentX += 500 * voodooScale;
  createBody();
  //currentX += DX_PIXI.resources.body.data.meta.size.w * voodooScale;
  currentX += 500 * voodooScale;
  createRightArm();
  currentX = initialX;
  //currentY += DX_PIXI.resources.rightArm.data.meta.size.h * voodooScale;
  currentY += 220 * voodooScale;
  createLeftLeg();
  //currentX += DX_PIXI.resources.leftLeg.data.meta.size.w * voodooScale;
  currentX += 500 * voodooScale;
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

function createTarget(x, y, scaleTarget) {
  const head = new dxButton(
    DX_PIXI,
    "head",
    DX_LAYERS.ui,
    "",
    {
      position: {
        x: 100,
        y: 100,
      },
      anchor: {
        x: 0.5,
        y: 0.5,
      },
      scale: {
        x: 1,
        y: 1,
      },
      animationSpeed: 0.5,

      // hitbox: [-DX_PIXI.resources.leftArm.data.meta.size.w / 2, -DX_PIXI.resources.leftArm.data.meta.size.h / 2,
      // DX_PIXI.resources.leftArm.data.meta.size.w / 2, -DX_PIXI.resources.leftArm.data.meta.size.h / 2,
      // DX_PIXI.resources.leftArm.data.meta.size.w / 2, DX_PIXI.resources.leftArm.data.meta.size.h / 2,
      // -DX_PIXI.resources.leftArm.data.meta.size.w / 2, DX_PIXI.resources.leftArm.data.meta.size.h / 2],
      hitbox: [-250, -110, 250, -110, 250, 110, -250, 110],
      debug: true,
    }
  );

  head.onClick = (event) => {
    console.log("CLICK ");
  };
}
