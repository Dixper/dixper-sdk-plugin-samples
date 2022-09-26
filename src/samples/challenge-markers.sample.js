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
      img: 'https://i.gyazo.com/9875a4864f67a83d7ade73fec73f1ca8.png',
      sound: 'https://pixijs.io/sound/examples/resources/boing.mp3',
    },
    fail: {
      img: 'https://i.gyazo.com/6121dd85d49b09e09ecd05502b635cdf.png',
      sound: 'https://pixijs.io/sound/examples/resources/boing.mp3',
    },
    idle: {
      img: 'https://i.gyazo.com/34c127e5f688db4086c813f2d7fa4c52.png',
      sound: 'https://pixijs.io/sound/examples/resources/boing.mp3',
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
    challengeMarker.changeStatus(0, 'success');
  }, 2000);

  setTimeout(() => {
    challengeMarker.changeStatus(1, 'fail');
  }, 4000);

  setTimeout(() => {
    challengeMarker.changeStatus(2, 'success');
  }, 6000);
};
