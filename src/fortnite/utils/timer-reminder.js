// INPUTS PARAMS

let reminderTitle, time, timeInterval;

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
