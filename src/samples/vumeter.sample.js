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
    dixperPluginSample.uiLayer,
    {
      min: 0.3,
      max: 0.6,
      delay: 2000,
    },
    {
      position: {
        x: DX_WIDTH / 2,
        y: 100,
      },
    }
  );

  vumeter.start();

  vumeter.onVolumeMatch = (volume) => {
    console.warn('onVolumeMatch', volume);
  };

  vumeter.onVolumeChange = (volume) => {
    console.log('onVolumeChange', volume);
  };
};
