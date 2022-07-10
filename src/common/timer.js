// DIXPER SDK INJECTED CLASS
const dixperPluginSample = new DixperSDKLib({
  pixi: {
    enable: true,
    files: [],
  },
});

// INPUTS
const timestampUntilSkillFinish = DX_CONTEXT.skillEnd;
const millisecondsToFinish = timestampUntilSkillFinish - Date.now();
const { time = millisecondsToFinish, timeInterval = 1000, x, y } = DX_INPUTS;

const timer = new dxTimer(DX_PIXI, 'timer', DX_LAYERS.ui, time, timeInterval, {
  position: DX_UTILS.transformRelativePosition(x, y),
  animationSpeed: 0.5,
});
