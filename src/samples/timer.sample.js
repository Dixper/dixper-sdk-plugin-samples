const images = [];
const sprites = [];
const sounds = [];

let challenge = {
  title: 'Challenge name',
  completed:false,
  timetoAccept:1000
}

// DIXPER SDK INJECTED CLASS

const dixperPluginSample = new DixperSDKLib({
  pixi: {
    enable: true,
    files: [...images, ...sprites, ...sounds],
  },
});

// PIXIJS INITILIZE

dixperPluginSample.onPixiLoad = () => {
  const timestampUntilSkillFinish = this.context.skillEnd ;
  const millisecondsToFinish = timestampUntilSkillFinish - Date.now();
  const interval = 1000;

  const timer = new dxTimer(dixperPluginSample.pixi, 'panelSmall', this.uiLayer, millisecondsToFinish, interval, {
    position: {
      x: DX_WIDTH / 2 + 100,
      y: 100,
    },
    animationSpeed: 0.5,
  });

  timer.onTimerFinish = () => {
    console.log('Timer started');
  };

  timer.onTimerFinish = () => {
    console.log('Timer finished');

  };
  
};

const init = () => {};
