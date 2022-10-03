const images = [];
const sprites = [];
const sounds = [];

// DIXPER SDK INJECTED CLASS

const dixperPluginSample = new DixperSDKLib({
  pixi: {
    enable: true,
    files: [...images, ...sprites, ...sounds],
  },
});

const challengeMarker = new DxChallengeMarker(
  {
    success: {
      img: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/images/counter-error-correct.png",
      sound:
        "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/sounds/successMarkerSFX.mp3",
    },
    fail: {
      img: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/images/counter-error-incorrect.png",
      sound:
        "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/sounds/failMarkerSFX.mp3",
    },
    idle: {
      img: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/images/counter-error-empty.png",
      sound: "https://pixijs.io/sound/examples/resources/boing.mp3",
    },
  },
  4,
  100,
  {
    position: {
      x: DX_WIDTH / 2,
      y: 100,
    },
    scale: {
      x: 0.35,
      y: 0.35,
    },
  }
);

// INPUTS

const { selectorTitle } = DX_INPUTS;

// REMOTE

dixperPluginSample.onPixiLoad = () => {
  challengeMarker.start();

  setTimeout(() => {
    challengeMarker.changeStatus(0, "success");
  }, 2000);

  setTimeout(() => {
    challengeMarker.changeStatus(1, "fail");
  }, 4000);

  setTimeout(() => {
    challengeMarker.changeStatus(2, "success");
  }, 6000);
};
