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

// PIXIJS INITILIZE

dixperPluginSample.onPixiLoad = () => {
  const vumeter = new dxVumeter(
    dixperPluginSample.pixi,
    'panelSmall',
    dixperPluginSample.uiLayer,
    {
      position: {
        x: DX_WIDTH / 2 + 100,
        y: 100,
      },
    }
  ).start();

  vumeter.onVolumeChange = (volume) => {
    console.log('onVolumeChange', volume);
  };
};
