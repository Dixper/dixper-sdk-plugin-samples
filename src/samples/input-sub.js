const images = [];
const sprites = [];
const sounds = [];

let onKeySub;
let squatEnable = true;
let squatCount = 0;

const squatKey = 29;
const squatDelay = 600;

// DIXPER SDK INJECTED CLASS

const dixperPluginSample = new DixperSDKLib({
  pixi: {
    enable: true,
    files: [...images, ...sprites, ...sounds],
  },
});

// PIXIJS INITILIZE

dixperPluginSample.onPixiLoad = () => {
  dixperPluginSample.inputs$.subscribe((inputs) => {
    console.log(inputs);
  });
};
