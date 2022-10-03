const images = [];

const sprites = [
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
];

const sounds = [
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/phasmophobia/src/phasmophobia/assets/sounds/Writing_01.mp3",
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
// let positionsCrates = [
//   { x: DX_WIDTH / 2, y: 200 },
//   { x: (3 * DX_WIDTH) / 4, y: DX_HEIGHT / 2 },
//   { x: DX_WIDTH / 4, y: DX_HEIGHT / 2 },
//   { x: (3 * DX_WIDTH) / 5, y: DX_HEIGHT - 250 },
//   { x: (2 * DX_WIDTH) / 5, y: DX_HEIGHT - 250 },
//   { x: DX_WIDTH / 2, y: DX_HEIGHT / 2 },
// ];
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
      if (typeof crates._options.priceCrate === typeof String()) {
        alert("soy un susto");
      } else {
        console.log("crates", crates);
        console.log("surpriseBox", crates._options.priceCrate);
        alert(`PREMIOOOOOO: ${crates._options.priceCrate}`);
        openSFX.play({ volume: volumeOpenSFX });
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
