const images = [];
const sprites = [];
const sounds = [];

let onClickSub;
let activeClick = true;

// INPUTS PARAMS

let clickKey, aimDelay, reminderTitle;

// DIXPER SDK INJECTED CLASS

const dixperPluginSample = new DixperSDKLib({
  pixi: {
    enable: true,
    files: [...images, ...sprites, ...sounds],
  },
});

// INPUTS

dixperPluginSample.inputs$.subscribe((inputs) => {
  clickKey = inputs.clickKey || 2;
  aimDelay = inputs.aimDelay || 10000;
  reminderTitle = inputs.reminderTitle || 'If you aim...';
});

// PIXIJS INITILIZE

dixperPluginSample.onPixiLoad = () => {
  init();
  createReminder();
  const timestampUntilSkillFinish = dixperPluginSample.context.skillEnd;
  const millisecondsToFinish = timestampUntilSkillFinish - Date.now();
  const interval = 1000;

  const timer = new dxTimer(
    dixperPluginSample.pixi,
    'timer',
    dixperPluginSample.uiLayer,
    millisecondsToFinish,
    interval,
    {
      position: {
        x: DX_WIDTH / 2,
        y: 100,
      },
      animationSpeed: 0.5,
    }
  );

  timer.onTimerStart = () => {};

  timer.onTimerFinish = () => {
    onClickSub.unsubscribe();
  };
};

const init = () => {
  const onClick = (event) => {
    if (clickKey === event.button && activeClick) {
      activeClick = false;
      applyEffect();
      setTimeout(() => {
        activeClick = true;
      }, delay);
      // countdownContainer = new dxCountDown(
      //   dixperPluginSample.pixi,
      //   'challengeFrameCommunication',
      //   dixperPluginSample.uiLayer,
      //   3,
      //   '',
      //   {
      //     position: {
      //       x: DX_WIDTH / 2,
      //       y: DX_HEIGHT / 2,
      //     },
      //     animationSpeed: 0.5,
      //   }
      // );
    }
  };

  onClickSub = dixperPluginSample.onMouseDown$.subscribe(onClick);
};

const applyEffect = () => {
  dixperPluginSample.addActions(
    JSON.stringify([
      {
        actions: [
          {
            inputKey: 'render-texture||1',
            scope: '{{scope}}',
            key: 'render-texture',
            component: 'graphics',
            type: 'render-texture',
            version: 1,
            action: 'start',
            metadata: {
              file: '{{file}}',
              textureProperties: {
                width: '{{width}}',
                height: '{{height}}',
                position: '{{position}}',
                fadeIn: '{{fade}}',
              },
            },
            tt0: '{{tt0}}',
            ttl: '{{ttl}}',
          },
          {
            inputKey: 'imagePostProcessing||1',
            scope: '{{scope}}',
            key: 'imagePostProcessing',
            component: 'graphicsPostProcessor',
            type: 'imagePostProcessing',
            version: 1,
            action: 'start',
            metadata: { effect: '{{effect}}' },
            tt0: '{{tt0}}',
            ttl: '{{ttl}}',
          },
        ],
        ttl: 0,
      },
      {
        actions: [
          {
            inputKey: 'render-texture||2',
            scope: '{{scope}}',
            key: 'render-texture',
            component: 'graphics',
            type: 'render-texture',
            version: 1,
            action: 'start',
            metadata: {
              file: '{{file}}',
              textureProperties: {
                width: '{{width}}',
                height: '{{height}}',
                position: '{{position}}',
                fadeIn: '{{fade}}',
              },
            },
            tt0: '{{tt0}}',
            ttl: '{{ttl}}',
          },
          {
            inputKey: 'imagePostProcessing||2',
            scope: '{{scope}}',
            key: 'imagePostProcessing',
            component: 'graphicsPostProcessor',
            type: 'imagePostProcessing',
            version: 1,
            action: 'start',
            metadata: { effect: '{{effect}}' },
            tt0: '{{tt0}}',
            ttl: '{{ttl}}',
          },
        ],
        ttl: 0,
      },
      {
        actions: [
          {
            inputKey: 'render-texture||3',
            scope: '{{scope}}',
            key: 'render-texture',
            component: 'graphics',
            type: 'render-texture',
            version: 1,
            action: 'start',
            metadata: {
              file: '{{file}}',
              textureProperties: {
                width: '{{width}}',
                height: '{{height}}',
                position: '{{position}}',
                fadeIn: '{{fade}}',
              },
            },
            tt0: '{{tt0}}',
            ttl: '{{ttl}}',
          },
          {
            inputKey: 'imagePostProcessing||3',
            scope: '{{scope}}',
            key: 'imagePostProcessing',
            component: 'graphicsPostProcessor',
            type: 'imagePostProcessing',
            version: 1,
            action: 'start',
            metadata: { effect: '{{effect}}' },
            tt0: '{{tt0}}',
            ttl: '{{ttl}}',
          },
        ],
        ttl: 0,
      },
      {
        actions: [
          {
            inputKey: 'render-texture||4',
            scope: '{{scope}}',
            key: 'render-texture',
            component: 'graphics',
            type: 'render-texture',
            version: 1,
            action: 'start',
            metadata: {
              file: '{{file}}',
              textureProperties: {
                width: '{{width}}',
                height: '{{height}}',
                position: '{{position}}',
                fadeIn: '{{fade}}',
              },
            },
            tt0: '{{tt0}}',
            ttl: '{{ttl}}',
          },
          {
            inputKey: 'imagePostProcessing||4',
            scope: '{{scope}}',
            key: 'imagePostProcessing',
            component: 'graphicsPostProcessor',
            type: 'imagePostProcessing',
            version: 1,
            action: 'start',
            metadata: { effect: '{{effect}}' },
            tt0: '{{tt0}}',
            ttl: '{{ttl}}',
          },
        ],
        ttl: 0,
      },
    ]),
    {
      'scope||render-texture||1': [0],
      'scope||render-texture||2': [0],
      'scope||render-texture||3': [0],
      'scope||render-texture||4': [0],
      'position||render-texture||1': [65, 65],
      'position||render-texture||2': [65, 65],
      'position||render-texture||3': [65, 65],
      'position||render-texture||4': [65, 65],
      'fade||render-texture||1': false,
      'fade||render-texture||2': false,
      'fade||render-texture||3': false,
      'fade||render-texture||4': false,
      'width||render-texture||1': 30,
      'width||render-texture||2': 30,
      'width||render-texture||3': 30,
      'width||render-texture||4': 30,
      'height||render-texture||1': 30,
      'height||render-texture||2': 30,
      'height||render-texture||3': 30,
      'height||render-texture||4': 30,
      'tt0||render-texture||1': 0,
      'tt0||render-texture||2': 0,
      'tt0||render-texture||3': 0,
      'tt0||render-texture||4': 0,
      'ttl||render-texture||1': 12000,
      'ttl||render-texture||2': 12000,
      'ttl||render-texture||3': 12000,
      'ttl||render-texture||4': 12000,
      'file||render-texture||1':
        'https://firebasestorage.googleapis.com/v0/b/dixper-abae2.appspot.com/o/collections%2Fq4G1voaxLK98mhzQZAQH%2Fskills%2FslTuQtnfH9e3INXG8dhT%2Finput-en-render-texture%7C%7C1654030554606.webm?alt=media&token=9cf4090f-600a-4ca7-9265-fcda54015b8f',
      'file||render-texture||2':
        'https://firebasestorage.googleapis.com/v0/b/dixper-abae2.appspot.com/o/collections%2Fq4G1voaxLK98mhzQZAQH%2Fskills%2FslTuQtnfH9e3INXG8dhT%2Finput-en-render-texture%7C%7C1654030577555.webm?alt=media&token=5c8bdbec-e8d5-4796-8460-fc799447996a',
      'file||render-texture||3':
        'https://firebasestorage.googleapis.com/v0/b/dixper-abae2.appspot.com/o/collections%2Fq4G1voaxLK98mhzQZAQH%2Fskills%2FslTuQtnfH9e3INXG8dhT%2Finput-en-render-texture%7C%7C1654030588140.webm?alt=media&token=d074b7a6-fb73-4f43-853e-6b80da69a099',
      'file||render-texture||4':
        'https://firebasestorage.googleapis.com/v0/b/dixper-abae2.appspot.com/o/collections%2Fq4G1voaxLK98mhzQZAQH%2Fskills%2FslTuQtnfH9e3INXG8dhT%2Finput-en-render-texture%7C%7C1654030597610.webm?alt=media&token=bd3befd3-d5d7-4164-a214-32b8a7c82346',
      'scope||imagePostProcessing||1': [0],
      'scope||imagePostProcessing||2': [0],
      'scope||imagePostProcessing||3': [0],
      'scope||imagePostProcessing||4': [0],
      'effect||imagePostProcessing||1': 'CameraFilterPack_Distortion_Dream',
      'effect||imagePostProcessing||2': 'CameraFilterPack_Drawing_BluePrint',
      'effect||imagePostProcessing||3': 'CameraFilterPack_Broken_Screen',
      'effect||imagePostProcessing||4': 'CameraFilterPack_Drawing_Comics',
      'tt0||imagePostProcessing||1': 11500,
      'tt0||imagePostProcessing||2': 11500,
      'tt0||imagePostProcessing||3': 11500,
      'tt0||imagePostProcessing||4': 11500,
      'ttl||imagePostProcessing||1': 10000,
      'ttl||imagePostProcessing||2': 10000,
      'ttl||imagePostProcessing||3': 10000,
      'ttl||imagePostProcessing||4': 10000,
    }
  );
};

createReminder = () => {
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
