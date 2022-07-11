const images = [];
const sprites = [];
const sounds = [];

let onKeySub;
let actionType = 'start';
let fadeIncrement = 0.1;
let shadowIncrement = 0.1;

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
    // const jumpSFX = (sounds[1]);
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
      'effect||imagepostprocessing||1': 'CameraFilterPack_Broken_Screen',
      'effectdata||imagepostprocessing||1': `{"Fade": ${fadeIncrement},"Shadow": ${shadowIncrement}}`,
      'tt0||imagepostprocessing||1': 0,
      'ttl||imagepostprocessing||1': millisecondsToFinish,
    }
  );

  bullets++;

  actionType = 'update';
};
