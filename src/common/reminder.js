// INPUTS PARAMS

let title, x, y;

// DIXPER SDK INJECTED CLASS

const dixperPluginSample = new DixperSDKLib({
  pixi: {
    enable: true,
    files: [],
  },
});

// INPUTS

dixperPluginSample.inputs$.subscribe((inputs) => {
  title = inputs.title || '';
  x = inputs.x;
  y = inputs.y;
});

const transformRelativePosition = (x, y) => {
  x = x ? (x * DX_WIDTH) / 100 : 200;
  y = y ? (y * DX_HEIGHT) / 100 : DX_HEIGHT / 2 - 100;

  return { x, y };
};

// PIXIJS INITILIZE

dixperPluginSample.onPixiLoad = () => {
  const reminder = new dxPanel(
    dixperPluginSample.pixi,
    'reminder',
    dixperPluginSample.uiLayer,
    title,
    {
      position: transformRelativePosition(x, y),
      scale: {
        x: 0.5,
        y: 0.5,
      },
      animationSpeed: 0.5,
    }
  );
};
