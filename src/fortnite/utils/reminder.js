function INIT() {
  // INPUTS PARAMS

  let reminderTitle;

  // DIXPER SDK INJECTED CLASS

  const dixperPluginSample = new DixperSDKLib({
    pixi: {
      enable: true,
      files: [],
    },
  });

  // INPUTS

  dixperPluginSample.inputs$.subscribe((inputs) => {
    reminderTitle = inputs.reminderTitle || '';
  });

  // PIXIJS INITILIZE

  dixperPluginSample.onPixiLoad = () => {
    const reminder = new dxPanel(
      dixperPluginSample.pixi,
      'reminder',
      dixperPluginSample.uiLayer,
      reminderTitle,
      {
        position: {
          x: 200,
          y: DX_HEIGHT / 2 - 100,
        },
        scale: {
          x: 0.5,
          y: 0.5,
        },
        animationSpeed: 0.5,
      }
    );
  };
}

INIT();
