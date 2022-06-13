// INPUTS PARAMS

let time, interval;

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
  interval = inputs.interval || 1000;
});

// PIXIJS INITILIZE

dixperPluginSample.onPixiLoad = () => {
  const timer = new dxTimer(
    dixperPluginSample.pixi,
    'panelSmall',
    dixperPluginSample.uiLayer,
    time,
    interval,
    {
      position: {
        x: DX_WIDTH / 2 + 100,
        y: 100,
      },
      animationSpeed: 0.5,
    }
  );
};
