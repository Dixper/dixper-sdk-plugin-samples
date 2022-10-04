const images = [];

const sprites = [
  {
    name: "rewardPanel",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/spritesheets/rewardPanel.json",
  },
  {
    name: "halloweenTime",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/spritesheets/timer_v2.json",
  },
  {
    name: "halloweenReminder",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/spritesheets/reminderHalloween.json",
  },
  {
    name: "halloweenCementery",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/spritesheets/cementery-illustration.json",
  },
  {
    name: "newChallengeSuccess",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/spritesheets/win_challenge.json",
  },
  // {
  //   name: "newChallengeFail",
  //   url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/spritesheets/lose_challenge.json",
  // },
];

const sounds = [
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/phasmophobia/src/phasmophobia/assets/sounds/Writing_01.mp3",
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/sounds/You_Win_SFX.mp3",
  // "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/sounds/You_Loose_SFX.mp3",
];

// INPUTS PARAMS

// DIXPER SDK INJECTED CLASS

const dixperPluginSample = new DixperSDKLib({
  pixi: {
    enable: true,
    files: [...images, ...sprites, ...sounds],
  },
});

// INPUTS

const { listPrices, volumeOpenSFX, reminderTitle } = DX_INPUTS;

let surpriseBox, openSFX, orderPrice, reminder, timer, halloweenPanel;
const finalPositionTimer = -666;

let gamepadButtons = [
  "FACE_1",
  "FACE_2",
  "FACE_3",
  "FACE_4",
  "RIGHT_SHOULDER",
  "RIGHT_SHOULDER_BOTTOM",
  "LEFT_SHOULDER",
  "LEFT_SHOULDER_BOTTOM",
];
let cratesArray = [];

// PIXIJS INITILIZE

dixperPluginSample.onPixiLoad = () => {
  createOpenCrateSFX();
  init();
};

// INIT CHALLENGE

const init = () => {
  createBottomDecoration();
  createReminder();
  createRandomPrice();
  createCrate();
  createTimer();
};

const createCrate = () => {
  let crateWidth = 200;
  let distanceBetweeenCrate = 150;
  let totalWidth =
    crateWidth * orderPrice.length +
    distanceBetweeenCrate * (orderPrice.length - 1);

  orderPrice.forEach((price, index) => {
    surpriseBox = new DxButton(
      "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/images/box.png",
      "",
      {
        isClickable: true,
        controller: {
          isPressable: true,
          button: gamepadButtons[index],
          x: 0,
          y: 50,
        },
        keyboard: {
          isPressable: true,
          button: `${index + 1}`,
          x: 0,
          y: 50,
        },
        position: {
          x:
            DX_WIDTH / 2 -
            totalWidth / 2 +
            index * (distanceBetweeenCrate + crateWidth) +
            crateWidth / 2,
          y: DX_HEIGHT / 2,
        },
        scale: {
          x: 1,
          y: 1,
        },
        priceCrate: price,
      }
    );
    surpriseBox.start();
    cratesArray.push(surpriseBox);
  });

  cratesArray.forEach((crates) => {
    crates.onClick = (event) => {
      halloweenPanel.remove();
      if (typeof crates._options.priceCrate === typeof String()) {
        dixperPluginSample.addParentSkill("2zQMEp3FcpirdrIKaFu3");
        cratesArray.forEach((element) => {
          element.remove();
        });
        reminder.remove();
        timer.instance.x = finalPositionTimer;
        setTimeout(() => dixperPluginSample.stopSkill(), 3000);
        // cambiar a nuevo script de luis para finalizar las skill en el momento correcto
      } else {
        console.log("crates", crates);
        console.log("surpriseBox", crates._options.priceCrate);
        const reward = crates._options.priceCrate;
        openSFX.play({ volume: volumeOpenSFX });
        createChallengeSuccess(reward);
        reminder.remove();
        // halloweenPanel.remove();
        timer.instance.x = finalPositionTimer;
        cratesArray.forEach((element) => {
          element.remove();
        });
      }
    };
  });
};

const createOpenCrateSFX = () => {
  openSFX = PIXI.sound.Sound.from(sounds[0]);
};

const createRandomPrice = () => {
  orderPrice = listPrices
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

  console.log("orderPrice", orderPrice);
};

const createTimer = () => {
  const timestampUntilSkillFinish = dixperPluginSample.context.skillEnd;
  const millisecondsToFinish = timestampUntilSkillFinish - Date.now();
  const interval = 1000;

  timer = new dxTimer(
    DX_PIXI,
    "halloweenTime",
    DX_LAYERS.ui,
    millisecondsToFinish,
    interval,
    {
      position: {
        x: 210,
        y: DX_HEIGHT / 2 - 25,
      },
      scale: {
        x: 0.5,
        y: 0.5,
      },
      animationSpeed: 0.5,
    }
  );
  timer.onTimerFinish = () => {
    dixperPluginSample.stopSkill();
    console.log("fin skill");
  };
};

const createReminder = () => {
  reminder = new dxPanel(
    DX_PIXI,
    "halloweenReminder",
    DX_LAYERS.ui,
    reminderTitle,
    {
      position: {
        x: 200,
        y: DX_HEIGHT / 2 - 100,
      },
      scale: {
        x: 1,
        y: 1,
      },
      animationSpeed: 0.5,
      text: {
        fontSize: 20,
      },
    }
  );
};

const createBottomDecoration = () => {
  halloweenPanel = new dxPanel(
    DX_PIXI,
    "halloweenCementery",
    DX_LAYERS.ui,
    "",
    {
      position: {
        x: DX_WIDTH / 2,
        y: DX_HEIGHT - 195,
      },
      scale: {
        x: 1,
        y: 1,
      },
      animationSpeed: 0.5,
      zIndex: 99,
    }
  );
};

const createChallengeSuccess = (price) => {
  const challengeSuccessSFX = PIXI.sound.Sound.from(sounds[1]);
  challengeSuccessSFX.play({ volume: 0.75 });
  console.log("pric---------------------------------e", price);

  const panelQuantityPrice = new dxPanel(
    DX_PIXI,
    "rewardPanel",
    DX_LAYERS.ui,
    `${price}`,
    {
      position: {
        x: DX_WIDTH / 2,
        y: DX_HEIGHT / 2 + 200,
      },
      scale: {
        x: 2,
        y: 2,
      },
      animationSpeed: 0.5,
    }
  );

  const panelChallengeSuccess = new dxPanel(
    DX_PIXI,
    "newChallengeSuccess",
    DX_LAYERS.ui,
    "",
    {
      position: {
        x: DX_WIDTH / 2,
        y: DX_HEIGHT / 2,
      },
      scale: {
        x: 1,
        y: 1,
      },
      animationSpeed: 0.5,
    }
  );
  setTimeout(() => panelChallengeSuccess.remove(), 1500);
  setTimeout(() => dixperPluginSample.stopSkill(), 2500);
};

// const createChallengeFail = () => {
//   const challengeFailSFX = PIXI.sound.Sound.from(sounds[2]);
//   challengeFailSFX.play({ volume: 0.75 });

//   const panelChallengeFail = new dxPanel(
//     DX_PIXI,
//     "newChallengeFail",
//     DX_LAYERS.ui,
//     "",
//     {
//       position: {
//         x: DX_WIDTH / 2,
//         y: DX_HEIGHT / 2,
//       },
//       scale: {
//         x: 1,
//         y: 1,
//       },
//       animationSpeed: 0.5,
//     }
//   );
//   setTimeout(() => panelChallengeFail.remove(), 1500);
//   setTimeout(() => dixperPluginSample.stopSkill(), 2500);
// };
