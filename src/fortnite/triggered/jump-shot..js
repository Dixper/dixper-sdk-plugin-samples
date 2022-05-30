const images = [];
const sprites = [];
const sounds = [];

let onClickSub, onKeySub;

const jumpKey = 57;
const clickKey = 1;

// DIXPER SDK INJECTED CLASS

const dixperPluginSample = new DixperSDKLib({
  pixi: {
    enable: true,
    files: [...images, ...sprites, ...sounds],
  },
});

// PIXIJS INITILIZE

dixperPluginSample.onPixiLoad = () => {
  const timestampUntilSkillFinish = dixperPluginSample.context.skillEnd;
  const millisecondsToFinish = timestampUntilSkillFinish - Date.now();
  const interval = 1000;

  const timer = new dxTimer(
    dixperPluginSample.pixi,
    'panelSmall',
    dixperPluginSample.uiLayer,
    millisecondsToFinish,
    interval,
    {
      position: {
        x: DX_WIDTH / 2 + 100,
        y: 100,
      },
      animationSpeed: 0.5,
    }
  );

  timer.onTimerStart = () => {
    console.log('Timer started');
    init();
  };

  timer.onTimerFinish = () => {
    console.log('Timer finished');

    onClickSub.unsubscribe();
    onKeySub.unsubscribe();
  };
};

const init = () => {
  onClickSub = dixperPluginSample.onMouseDown$.subscribe(onShot);
  onKeySub = dixperPluginSample.onKeyDown$.subscribe(onJump);
  // document.addEventListener("keydown", onJump);
};

const onJump = (event) => {
  console.log(event);
  if (jumpKey === event.keyCode) {
    shot();
  }
};

const onShot = (event) => {
  console.log(event);
  if (clickKey === event.button) {
    const random = Math.floor(Math.random() * 3);
    if (random === 0) {
      jump();
    } else if (random === 1) {
      squat();
    } else {
      sprint();
    }
  }
};

const jump = () => {
  const actionScript = JSON.stringify([
    {
      ttl: 10000,
      actions: [
        {
          inputKey: 'render-texture-0-0',
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
          inputKey: 'sound-0-1',
          scope: '{{scope}}',
          key: 'sound',
          metadata: { file: '{{file}}', volume: '{{volume}}' },
          tt0: '{{tt0}}',
          ttl: '{{ttl}}',
        },
      ],
    },
  ]);

  const actionInputs = {
    'file||sound-0-1':
      'https://firebasestorage.googleapis.com/v0/b/dixper-abae2.appspot.com/o/skills%2FIUvnTvzg4RsRUwoll9pZ%2FAudio%20bicho%20cara%20fea.mp3?alt=media&token=a08c25ff-c138-4d2d-93f1-106106766ec0',
    'ttl||sound-0-1': 10000,
    'tt0||sound-0-1': 0,
    'scope||sound-0-1': 0,
    'file||render-texture-0-0':
      'https://firebasestorage.googleapis.com/v0/b/dixper-abae2.appspot.com/o/skills%2FX46ap915je4GhT9iGHLT%2Fassets%2Fsusto-ligth-1.png?alt=media&token=c8db59a9-6bd5-463f-99b7-0dead27aec3f',
    'ttl||render-texture-0-0': 10000,
    'tt0||render-texture-0-0': 0,
    'scope||render-texture-0-0': 0,
  };

  dixperPluginSample.addActions(actionScript, actionInputs);
};

const sprint = () => {
  const actionScript = JSON.stringify([
    {
      ttl: 10000,
      actions: [
        {
          inputKey: 'render-texture-0-0',
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
          inputKey: 'sound-0-1',
          scope: '{{scope}}',
          key: 'sound',
          metadata: { file: '{{file}}', volume: '{{volume}}' },
          tt0: '{{tt0}}',
          ttl: '{{ttl}}',
        },
      ],
    },
  ]);

  const actionInputs = {
    'file||sound-0-1':
      'https://firebasestorage.googleapis.com/v0/b/dixper-abae2.appspot.com/o/skills%2FIUvnTvzg4RsRUwoll9pZ%2FAudio%20bicho%20cara%20fea.mp3?alt=media&token=a08c25ff-c138-4d2d-93f1-106106766ec0',
    'ttl||sound-0-1': 10000,
    'tt0||sound-0-1': 0,
    'scope||sound-0-1': 0,
    'file||render-texture-0-0':
      'https://firebasestorage.googleapis.com/v0/b/dixper-abae2.appspot.com/o/skills%2FX46ap915je4GhT9iGHLT%2Fassets%2Fsusto-ligth-1.png?alt=media&token=c8db59a9-6bd5-463f-99b7-0dead27aec3f',
    'ttl||render-texture-0-0': 10000,
    'tt0||render-texture-0-0': 0,
    'scope||render-texture-0-0': 0,
  };

  dixperPluginSample.addActions(actionScript, actionInputs);
};

const squat = () => {
  const actionScript = JSON.stringify([
    {
      ttl: 10000,
      actions: [
        {
          inputKey: 'render-texture-0-0',
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
          inputKey: 'sound-0-1',
          scope: '{{scope}}',
          key: 'sound',
          metadata: { file: '{{file}}', volume: '{{volume}}' },
          tt0: '{{tt0}}',
          ttl: '{{ttl}}',
        },
      ],
    },
  ]);

  const actionInputs = {
    'file||sound-0-1':
      'https://firebasestorage.googleapis.com/v0/b/dixper-abae2.appspot.com/o/skills%2FIUvnTvzg4RsRUwoll9pZ%2FAudio%20bicho%20cara%20fea.mp3?alt=media&token=a08c25ff-c138-4d2d-93f1-106106766ec0',
    'ttl||sound-0-1': 10000,
    'tt0||sound-0-1': 0,
    'scope||sound-0-1': 0,
    'file||render-texture-0-0':
      'https://firebasestorage.googleapis.com/v0/b/dixper-abae2.appspot.com/o/skills%2FX46ap915je4GhT9iGHLT%2Fassets%2Fsusto-ligth-1.png?alt=media&token=c8db59a9-6bd5-463f-99b7-0dead27aec3f',
    'ttl||render-texture-0-0': 10000,
    'tt0||render-texture-0-0': 0,
    'scope||render-texture-0-0': 0,
  };

  dixperPluginSample.addActions(actionScript, actionInputs);
};

const shot = () => {
  const actionScript = JSON.stringify([
    {
      ttl: 10000,
      actions: [
        {
          inputKey: 'render-texture-0-0',
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
          inputKey: 'sound-0-1',
          scope: '{{scope}}',
          key: 'sound',
          metadata: { file: '{{file}}', volume: '{{volume}}' },
          tt0: '{{tt0}}',
          ttl: '{{ttl}}',
        },
      ],
    },
  ]);

  const actionInputs = {
    'file||sound-0-1':
      'https://firebasestorage.googleapis.com/v0/b/dixper-abae2.appspot.com/o/skills%2FIUvnTvzg4RsRUwoll9pZ%2FAudio%20bicho%20cara%20fea.mp3?alt=media&token=a08c25ff-c138-4d2d-93f1-106106766ec0',
    'ttl||sound-0-1': 10000,
    'tt0||sound-0-1': 0,
    'scope||sound-0-1': 0,
    'file||render-texture-0-0':
      'https://firebasestorage.googleapis.com/v0/b/dixper-abae2.appspot.com/o/skills%2FX46ap915je4GhT9iGHLT%2Fassets%2Fsusto-ligth-1.png?alt=media&token=c8db59a9-6bd5-463f-99b7-0dead27aec3f',
    'ttl||render-texture-0-0': 10000,
    'tt0||render-texture-0-0': 0,
    'scope||render-texture-0-0': 0,
  };

  dixperPluginSample.addActions(actionScript, actionInputs);
};
