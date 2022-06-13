// INPUTS PARAMS

let time, timeInterval;

// DIXPER SDK INJECTED CLASS

const dixperPluginSample = new DixperSDKLib({
  pixi: {
    enable: true,
    files: [],
  },
});

// INPUTS

dixperPluginSample.inputs$.subscribe((inputs) => {
  const timestampUntilSkillFinish = dixperPluginSample.context.skillEnd;
  const millisecondsToFinish = timestampUntilSkillFinish - Date.now();

  time = inputs.time || millisecondsToFinish;
  timeInterval = inputs.timeInterval || 1000;
});

// PIXIJS INITILIZE

dixperPluginSample.onPixiLoad = () => {
  const timer = new dxTimer(
    dixperPluginSample.pixi,
    'timer',
    dixperPluginSample.uiLayer,
    time,
    timeInterval,
    {
      position: {
        x: DX_WIDTH / 2 + 100,
        y: 100,
      },
      animationSpeed: 0.5,
    }
  );
};
