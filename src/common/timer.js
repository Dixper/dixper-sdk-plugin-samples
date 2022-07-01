function INIT() {
  // INPUTS PARAMS

  let time, timeInterval, x, y;

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
    x = inputs.x;
    y = inputs.y;
  });

  const transformRelativePosition = (x, y) => {
    x = x ? (x * DX_WIDtH) / 100 : (3 * DX_WIDTH) / 4;
    y = y ? (y * DX_HEIGHT) / 100 : 100;

    return { x, y };
  };

  // PIXIJS INITILIZE

  dixperPluginSample.onPixiLoad = () => {
    const timer = new dxTimer(
      dixperPluginSample.pixi,
      'timer',
      dixperPluginSample.uiLayer,
      time,
      timeInterval,
      {
        position: transformRelativePosition(x, y),
        animationSpeed: 0.5,
      }
    );
  };
}

INIT();
