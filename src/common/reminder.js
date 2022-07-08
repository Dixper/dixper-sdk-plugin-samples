// DIXPER SDK INJECTED CLASS
const dixperPluginSample = new DixperSDKLib({
  pixi: {
    enable: true,
    files: [],
  },
});

// INPUTS
const { title, x, y } = DX_INPUTS;

const reminder = new dxPanel(DX_PIXI, 'reminder', DX_LAYERS.ui, title, {
  position: DX_UTILS.transformRelativePosition(x, y),
  scale: {
    x: 0.5,
    y: 0.5,
  },
  animationSpeed: 0.5,
});
