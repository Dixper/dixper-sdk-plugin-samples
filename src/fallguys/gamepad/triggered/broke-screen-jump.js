const images = [];
const sprites = [];
const sounds = [];

let onKeySub;
let actionType = 'start';

let bullets = 0;

// DIXPER SDK INJECTED CLASS

const dixperPluginSample = new DixperSDKLib({
  pixi: {
    enable: true,
    files: [...images, ...sprites, ...sounds],
  },
});

// INPUTS

dixperPluginSample.inputs$.subscribe((inputs) => {});

// PIXIJS INITILIZE

dixperPluginSample.onPixiLoad = () => {
  init();
};

const init = () => {
  onKeySub = dixperPluginSample.onKeyDown$.subscribe(onKeyboard);
};

const onKeyboard = (event) => {
  console.log('keycode', event.keycode);
  if (event.keycode === 57 && !event.repeat) {
    // const jumpSFX = PIXI.sound.Sound.from(sounds[1]);
    // jumpSFX.play({ volume: 0.5 });
    applyEffect();
  }
};

const applyEffect = () => {
  const timestampUntilSkillFinish = dixperPluginSample.context.skillEnd;
  const millisecondsToFinish = timestampUntilSkillFinish - Date.now();

  dixperPluginSample.addActions(
    JSON.stringify([
      {
        actions: [
          {
            inputKey: 'imagepostprocessing||1',
            scope: '{{scope}}',
            key: 'imagePostProcessing',
            component: 'graphicsPostProcessor',
            type: 'imagePostProcessing',
            action: actionType,
            metadata: {
              effect: '{{effect}}',
              effectData: '{{effectdata}}',
            },
            tt0: '{{tt0}}',
            ttl: '{{ttl}}',
          },
        ],
        ttl: 0,
      },
    ]),
    {
      'scope||imagepostprocessing||1': [0],
      'effect||imagepostprocessing||1': 'CameraFilterPack_TV_BrokenGlass',
      'effectdata||imagepostprocessing||1': {
        Bullet_1: bullets > 0 ? 1.0 : 0,
        Bullet_2: bullets > 1 ? 1.0 : 0,
        Bullet_3: bullets > 2 ? 1.0 : 0,
        Bullet_4: bullets > 3 ? 1.0 : 0,
        Bullet_5: bullets > 4 ? 1.0 : 0,
        Bullet_6: bullets > 5 ? 1.0 : 0,
        Bullet_7: bullets > 6 ? 1.0 : 0,
        Bullet_8: bullets > 7 ? 1.0 : 0,
        Bullet_9: bullets > 8 ? 1.0 : 0,
        Bullet_10: bullets > 9 ? 1.0 : 0,
        Bullet_11: bullets > 10 ? 1.0 : 0,
        Bullet_12: bullets > 11 ? 1.0 : 0,
      },
      'tt0||imagepostprocessing||1': 0,
      'ttl||imagepostprocessing||1': millisecondsToFinish,
    }
  );

  bullets++;

  actionType = 'update';
};
