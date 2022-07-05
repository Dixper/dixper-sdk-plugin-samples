const images = [
  {
    name: "downArrow",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/fallguys/src/fallguys/assets/images/buttons/down-arrow.png",
  },
  {
    name: "leftArrow",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/fallguys/src/fallguys/assets/images/buttons/left-arrow.png",
  },
  {
    name: "rightArrow",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/fallguys/src/fallguys/assets/images/buttons/right-arrow.png",
  },
  {
    name: "upArrow",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/fallguys/src/fallguys/assets/images/buttons/up-arrow.png",
  },
];
const sprites = [
  {
    name: "target",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/spritesheets/definitive-target.json",
  },
  {
    name: "targetCounter",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/spritesheets/target-counter.json",
  },
  {
    name: "topHUD",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/spritesheets/hud-top.json",
  },
  {
    name: "rightHUD",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/spritesheets/hud-right.json",
  },
  {
    name: "bottomHUD",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/spritesheets/hud-bottom.json",
  },
  {
    name: "leftHUD",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/spritesheets/hud-left.json",
  },
  {
    name: "crosshair",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/spritesheets/crosshair.json",
  },
];
const sounds = [
  {
    name: "targetInSound",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/sounds/target-appear.mp3",
  },
  {
    name: "targetOutSound",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/sounds/shot.mp3",
  },
  {
    name: "targetCounterInSound",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/sounds/counter-hit-in.mp3",
  },
  {
    name: "targetCounterOutSound",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/sounds/counter-hit-out.mp3",
  },
  {
    name: "targetCounterHitSound",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/sounds/counter-target-hit.mp3",
  },
];

let intervalSub;
let targetCounterPanel;
let cursor;

//INPUTS PARAMS
let fails,
  target,
  scaleTarget,
  challengeTitle,
  challengeTime,
  reminderTitle,
  topHUD,
  rightHUD,
  bottomHUD,
  leftHUD,
  randomKeys,
  nameSprite,
  targetKeysAvailable,
  randomKey,
  randomKey2,
  randomKey3,
  onKeySub;

// DIXPER SDK INJECTED CLASS

const dixperPluginSample = new DixperSDKLib({
  pixi: {
    enable: true,
    files: [...images, ...sprites, ...sounds],
  },
});

// INPUTS

dixperPluginSample.inputs$.subscribe((inputs) => {
  fails = inputs.fails || 3;
  scaleTarget = inputs.scaleTarget || 1;
  challengeTitle =
    inputs.challengeTitle || "Destroy as many targets as possible!";
  challengeTime = inputs.challengeTime || 100000;
  reminderTitle =
    inputs.reminderTitle ||
    "Reto por {{username}}: \n Presiona los botones correctos \n tan rápido como puedas";
});

// PIXIJS INITILIZE

dixperPluginSample.onPixiLoad = () => {
  dixperPluginSample.initChallenge(challengeTitle, challengeTime);
  createHUD();
};

// INIT CHALLENGE

dixperPluginSample.onChallengeAccepted = () => {
  destroyHUD();
  init();
};

dixperPluginSample.onChallengeRejected = () => {
  destroyHUD();
  dixperPluginSample.stopSkill();
};

dixperPluginSample.onChallengeFinish = () => {
  targetCounterPanel.remove();
  cursor.remove();

  intervalSub.unsubscribe();
  if (targetCounterPanel.count >= fails) {
    dixperPluginSample.challengeSuccess();
  } else {
    // setTimeout(() => sendCurse(), 2000);
    dixperPluginSample.challengeFail();
  }
};

const createHUD = () => {
  topHUD = new dxAnimatedElement(
    dixperPluginSample.pixi,
    "topHUD",
    dixperPluginSample.uiLayer,
    "",
    {
      animationSpeed: 0.5,
      position: {
        x: DX_WIDTH / 2,
        y: 140,
      },
      scale: {
        x: 1,
        y: 1,
      },
      zIndex: 99,
    }
  );

  bottomHUD = new dxAnimatedElement(
    dixperPluginSample.pixi,
    "bottomHUD",
    dixperPluginSample.uiLayer,
    "",
    {
      animationSpeed: 0.5,
      position: {
        x: DX_WIDTH / 2,
        y: DX_HEIGHT - 90,
      },
      scale: {
        x: 1,
        y: 1,
      },
      zIndex: 80,
    }
  );

  leftHUD = new dxAnimatedElement(
    dixperPluginSample.pixi,
    "leftHUD",
    dixperPluginSample.uiLayer,
    "",
    {
      animationSpeed: 0.5,
      position: {
        x: 195,
        y: DX_HEIGHT / 2,
      },
      scale: {
        x: 1,
        y: 1,
      },
      zIndex: 60,
    }
  );

  rightHUD = new dxAnimatedElement(
    dixperPluginSample.pixi,
    "rightHUD",
    dixperPluginSample.uiLayer,
    "",
    {
      animationSpeed: 0.5,
      position: {
        x: DX_WIDTH - 160,
        y: DX_HEIGHT / 2,
      },
      scale: {
        x: 1,
        y: 1,
      },
      zIndex: 70,
    }
  );
};

const destroyHUD = () => {
  leftHUD._destroy();
  topHUD._destroy();
  rightHUD._destroy();
  bottomHUD._destroy();
};

const init = () => {
  createReminder();

  targetCounterPanel = new dxCounter(
    dixperPluginSample.pixi,
    "targetCounter",
    dixperPluginSample.uiLayer,
    0,
    fails,
    {
      position: {
        x: (3 * DX_WIDTH) / 4 - 100,
        y: 100,
      },
      animationSpeed: 0.5,
    }
  );

  intervalSub = interval(1000).subscribe((x) => {
    // targetKeysAvailable = [createKeyA, createKeyB, createKeyX, createKeyY];
    // randomKey = targetKeysAvailable[Math.floor(Math.random() * 4)];
    // randomKey2 = targetKeysAvailable[Math.floor(Math.random() * 4)];
    // randomKey3 = targetKeysAvailable[Math.floor(Math.random() * 4)];
    // randomKey(
    //   Math.floor(Math.random() * (DX_WIDTH - 50) + 30),
    //   Math.floor(Math.random() * (DX_HEIGHT - 50) + 30),
    //   scaleTarget
    // );
    // randomKey2(
    //   Math.floor(Math.random() * (DX_WIDTH - 50) + 30),
    //   Math.floor(Math.random() * (DX_HEIGHT - 50) + 30),
    //   scaleTarget
    // );
    // randomKey3(
    //   Math.floor(Math.random() * (DX_WIDTH - 50) + 30),
    //   Math.floor(Math.random() * (DX_HEIGHT - 50) + 30),
    //   scaleTarget
    // );

    createKeyA(
      Math.floor(Math.random() * (DX_WIDTH - 50) + 30),
      Math.floor(Math.random() * (DX_HEIGHT - 50) + 30),
      scaleTarget
    );
  });
  onKeySub = dixperPluginSample.onKeyDown$.subscribe(onKeyboard);
};

const onKeyboard = (event) => {
  console.log("keycode", event.keycode);
  if (event.keycode === 57) {
    target.remove();
  }
};

const createReminder = () => {
  const reminder = new dxPanel(
    dixperPluginSample.pixi,
    "reminder",
    dixperPluginSample.uiLayer,
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

const createKeyA = (x, y, scaleTarget) => {
  target = new dxButton(
    dixperPluginSample.pixi,
    "target",
    dixperPluginSample.uiLayer,
    "",
    {
      position: {
        x,
        y,
      },
      scale: {
        x: scaleTarget,
        y: scaleTarget,
      },
      animationSpeed: 0.5,
      hitbox: [-41, -5, -8, -28, 22, -25, 41, 13, 14, 38, -30, 25],
    }
  );

  let removed = false;

  dixperPluginSample.pixi.ticker.add(() => {
    if (target && !removed) {
      if (target.instance.scale.x < 0.1) {
        removed = true;
        target._destroy();
      } else {
        // target.instance.rotation += 0.01;
        target.instance.scale.x *= 0.995;
        target.instance.scale.y *= 0.995;
      }
    }
  });
};
// function createKeyB(x, y, scaleTarget) {
//   let target = new dxButton(
//     dixperPluginSample.pixi,
//     "target",
//     dixperPluginSample.uiLayer,
//     "",
//     {
//       position: {
//         x,
//         y,
//       },
//       scale: {
//         x: scaleTarget,
//         y: scaleTarget,
//       },
//       animationSpeed: 0.5,
//       hitbox: [-41, -5, -8, -28, 22, -25, 41, 13, 14, 38, -30, 25],
//     }
//   );

//   let removed = false;

//   dixperPluginSample.pixi.ticker.add(() => {
//     if (target && !removed) {
//       if (target.instance.scale.x < 0.1) {
//         removed = true;
//         target._destroy();
//       } else {
//         // target.instance.rotation += 0.01;
//         target.instance.scale.x *= 0.995;
//         target.instance.scale.y *= 0.995;
//       }
//     }
//   });

//   target.onClick = (event) => {
//     target.instance.interactive = false;
//     target.instance.animationSpeed = 2;
//     target.remove();

//     targetCounterPanel.incrementCount();
//   };
// }
// function createKeyX(x, y, scaleTarget) {
//   let target = new dxButton(
//     dixperPluginSample.pixi,
//     "target",
//     dixperPluginSample.uiLayer,
//     "",
//     {
//       position: {
//         x,
//         y,
//       },
//       scale: {
//         x: scaleTarget,
//         y: scaleTarget,
//       },
//       animationSpeed: 0.5,
//       hitbox: [-41, -5, -8, -28, 22, -25, 41, 13, 14, 38, -30, 25],
//     }
//   );

//   let removed = false;

//   dixperPluginSample.pixi.ticker.add(() => {
//     if (target && !removed) {
//       if (target.instance.scale.x < 0.1) {
//         removed = true;
//         target._destroy();
//       } else {
//         // target.instance.rotation += 0.01;
//         target.instance.scale.x *= 0.995;
//         target.instance.scale.y *= 0.995;
//       }
//     }
//   });

//   target.onClick = (event) => {
//     target.instance.interactive = false;
//     target.instance.animationSpeed = 2;
//     target.remove();

//     targetCounterPanel.incrementCount();
//   };
// }
// function createKeyY(x, y, scaleTarget) {
//   let target = new dxButton(
//     dixperPluginSample.pixi,
//     "target",
//     dixperPluginSample.uiLayer,
//     "",
//     {
//       position: {
//         x,
//         y,
//       },
//       scale: {
//         x: scaleTarget,
//         y: scaleTarget,
//       },
//       animationSpeed: 0.5,
//       hitbox: [-41, -5, -8, -28, 22, -25, 41, 13, 14, 38, -30, 25],
//     }
//   );

//   let removed = false;

//   dixperPluginSample.pixi.ticker.add(() => {
//     if (target && !removed) {
//       if (target.instance.scale.x < 0.1) {
//         removed = true;
//         target._destroy();
//       } else {
//         // target.instance.rotation += 0.01;
//         target.instance.scale.x *= 0.995;
//         target.instance.scale.y *= 0.995;
//       }
//     }
//   });

//   target.onClick = (event) => {
//     target.instance.interactive = false;
//     target.instance.animationSpeed = 2;
//     target.remove();

//     targetCounterPanel.incrementCount();
//   };
// }
