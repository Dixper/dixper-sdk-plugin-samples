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

const a = new DxChallengeMarker(
  {
    success: 'https://i.gyazo.com/35f439d9ddc2a6b0c72d76484ee72520.png',
    fail: 'https://i.gyazo.com/35f439d9ddc2a6b0c72d76484ee72520.png',
    idle: 'https://i.gyazo.com/35f439d9ddc2a6b0c72d76484ee72520.png',
  },
  4,
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
a.start();

const button1 = new DxButton(
  'https://i.gyazo.com/35f439d9ddc2a6b0c72d76484ee72520.png',
  'Comenzar',
  {
    position: {
      x: DX_WIDTH / 2,
      y: DX_HEIGHT / 2 - 200,
    },
    scale: {
      x: 0.35,
      y: 0.35,
    },
  }
);
const button2 = new DxButton(
  'https://i.gyazo.com/e4e2520b2b9cba1418cdefd502cf8382.png',
  'Comenzar',
  {
    isClickable: true,
    controller: {
      isPressable: true,
      button: 'FACE_1',
      x: 0,
      y: 40,
    },
    keyboard: {
      isPressable: true,
      button: 'Enter',
      x: 0,
      y: 40,
    },
    position: {
      x: DX_WIDTH / 2,
      y: DX_HEIGHT / 2 - 150,
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
  console.log(DX_WIDTH + ' ' + DX_HEIGHT);

  button1.start();
  button2.start();
};
