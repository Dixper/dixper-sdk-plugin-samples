const images = [];

const sprites = [];

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

const { listPrices, volumeOpenSFX } = DX_INPUTS;

let surpriseBox, openSFX, orderPrice;
let positionsCrates = [
  { x: DX_WIDTH / 2, y: 200 },
  { x: (3 * DX_WIDTH) / 4, y: DX_HEIGHT / 2 },
  { x: DX_WIDTH / 4, y: DX_HEIGHT / 2 },
  { x: (3 * DX_WIDTH) / 5, y: DX_HEIGHT - 250 },
  { x: (2 * DX_WIDTH) / 5, y: DX_HEIGHT - 250 },
  { x: DX_WIDTH / 2, y: DX_HEIGHT / 2 },
];
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
  createRandomPrice();
  createCrate();
};

const createCrate = () => {
  orderPrice.forEach((price, index) => {
    surpriseBox = new DxButton(
      "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/origin/halloween-rii/src/halloween/assets/images/Target_INOUT_00017.png",
      "",
      {
        isClickable: true,
        controller: {
          isPressable: true,
          button: gamepadButtons[index],
          x: 50,
          y: 50,
        },
        keyboard: {
          isPressable: true,
          button: `${index + 1}`,
          x: 50,
          y: 50,
        },
        position: {
          x: positionsCrates[index].x,
          y: positionsCrates[index].y,
        },
        scale: {
          x: 2,
          y: 2,
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
        console.log("soy un susto");
      } else {
        console.log("crates", crates);
        console.log("surpriseBox", crates._options.priceCrate);
        console.log("PREMIOOOOOO");
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
