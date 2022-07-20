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
  aimDelay = inputs.aimDelay || 4000;
  effectDuration = inputs.effectDuration || 4000;
  reminderTitle = inputs.reminderTitle || "If you aim...";
  effect1 = inputs.effect1 || "CameraFilterPack_Alien_Vision";
  effect2 = inputs.effect2 || "CameraFilterPack_TV_VHS";
  effect3 = inputs.effect3 || "CameraFilterPack_FX_8bits";
  effect4 = inputs.effect4 || "CameraFilterPack_FX_Psycho";
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
    "timer",
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
      }, aimDelay);
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

createReminder = () => {
  const reminder = new dxPanel(
    dixperPluginSample.pixi,
    "reminder",
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

const applyEffect = () => {
  dixperPluginSample.addActions(
    JSON.stringify([
      {
        actions: [
          {
            inputKey: "render-texture||1",
            scope: "{{scope}}",
            key: "render-texture",
            component: "graphics",
            type: "render-texture",

            action: "start",
            metadata: {
              file: "{{file}}",
              textureProperties: {
                width: "{{width}}",
                height: "{{height}}",
                position: "{{position}}",
                fadeIn: "{{fade}}",
              },
            },
            tt0: "{{tt0}}",
            ttl: "{{ttl}}",
          },
          {
            inputKey: "imagepostprocessing||1",
            scope: "{{scope}}",
            key: "imagePostProcessing",
            component: "graphicsPostProcessor",
            type: "imagePostProcessing",

            action: "start",
            metadata: { effect: "{{effect}}" },
            tt0: "{{tt0}}",
            ttl: "{{ttl}}",
          },
        ],
        ttl: 0,
      },
      {
        actions: [
          {
            inputKey: "render-texture||2",
            scope: "{{scope}}",
            key: "render-texture",
            component: "graphics",
            type: "render-texture",

            action: "start",
            metadata: {
              file: "{{file}}",
              textureProperties: {
                width: "{{width}}",
                height: "{{height}}",
                position: "{{position}}",
                fadeIn: "{{fade}}",
              },
            },
            tt0: "{{tt0}}",
            ttl: "{{ttl}}",
          },
          {
            inputKey: "imagepostprocessing||2",
            scope: "{{scope}}",
            key: "imagePostProcessing",
            component: "graphicsPostProcessor",
            type: "imagePostProcessing",

            action: "start",
            metadata: { effect: "{{effect}}" },
            tt0: "{{tt0}}",
            ttl: "{{ttl}}",
          },
        ],
        ttl: 0,
      },
      {
        actions: [
          {
            inputKey: "render-texture||3",
            scope: "{{scope}}",
            key: "render-texture",
            component: "graphics",
            type: "render-texture",

            action: "start",
            metadata: {
              file: "{{file}}",
              textureProperties: {
                width: "{{width}}",
                height: "{{height}}",
                position: "{{position}}",
                fadeIn: "{{fade}}",
              },
            },
            tt0: "{{tt0}}",
            ttl: "{{ttl}}",
          },
          {
            inputKey: "imagepostprocessing||3",
            scope: "{{scope}}",
            key: "imagePostProcessing",
            component: "graphicsPostProcessor",
            type: "imagePostProcessing",

            action: "start",
            metadata: { effect: "{{effect}}" },
            tt0: "{{tt0}}",
            ttl: "{{ttl}}",
          },
        ],
        ttl: 0,
      },
      {
        actions: [
          {
            inputKey: "render-texture||4",
            scope: "{{scope}}",
            key: "render-texture",
            component: "graphics",
            type: "render-texture",

            action: "start",
            metadata: {
              file: "{{file}}",
              textureProperties: {
                width: "{{width}}",
                height: "{{height}}",
                position: "{{position}}",
                fadeIn: "{{fade}}",
              },
            },
            tt0: "{{tt0}}",
            ttl: "{{ttl}}",
          },
          {
            inputKey: "imagepostprocessing||4",
            scope: "{{scope}}",
            key: "imagePostProcessing",
            component: "graphicsPostProcessor",
            type: "imagePostProcessing",

            action: "start",
            metadata: { effect: "{{effect}}" },
            tt0: "{{tt0}}",
            ttl: "{{ttl}}",
          },
        ],
        ttl: 0,
      },
    ]),
    {
      "scope||render-texture||1": [0],
      "scope||render-texture||2": [0],
      "scope||render-texture||3": [0],
      "scope||render-texture||4": [0],
      "position||render-texture||1": [50, 5],
      "position||render-texture||2": [50, 5],
      "position||render-texture||3": [50, 5],
      "position||render-texture||4": [50, 5],
      "fade||render-texture||1": false,
      "fade||render-texture||2": false,
      "fade||render-texture||3": false,
      "fade||render-texture||4": false,
      "width||render-texture||1": 25.2,
      "width||render-texture||2": 25.2,
      "width||render-texture||3": 25.2,
      "width||render-texture||4": 25.2,
      "height||render-texture||1": 44.8,
      "height||render-texture||2": 44.8,
      "height||render-texture||3": 44.8,
      "height||render-texture||4": 44.8,
      "tt0||render-texture||1": 0,
      "tt0||render-texture||2": 0,
      "tt0||render-texture||3": 0,
      "tt0||render-texture||4": 0,
      "ttl||render-texture||1": 9000,
      "ttl||render-texture||2": 9000,
      "ttl||render-texture||3": 9000,
      "ttl||render-texture||4": 9000,
      "file||render-texture||1":
        "https://firebasestorage.googleapis.com/v0/b/dixper-abae2.appspot.com/o/collections%2FQEOEcFGD7UozNiRSVcob%2Fskills%2F24nWc1oSE3uwsuX8bvKO%2Finput-en-render-texture%7C%7C1655113959891.webm?alt=media&token=aa6a885c-3af9-4317-b304-540fe697e82b",
      "file||render-texture||2":
        "https://firebasestorage.googleapis.com/v0/b/dixper-abae2.appspot.com/o/collections%2FQEOEcFGD7UozNiRSVcob%2Fskills%2F24nWc1oSE3uwsuX8bvKO%2Finput-en-render-texture%7C%7C1655114075243.webm?alt=media&token=d941dd17-360e-4b4c-98b6-8badd2619aba",
      "file||render-texture||3":
        "https://firebasestorage.googleapis.com/v0/b/dixper-abae2.appspot.com/o/collections%2FQEOEcFGD7UozNiRSVcob%2Fskills%2F24nWc1oSE3uwsuX8bvKO%2Finput-en-render-texture%7C%7C1655114113653.webm?alt=media&token=fade8b29-9a1a-4ecd-a2fd-4f459f0205e3",
      "file||render-texture||4":
        "https://firebasestorage.googleapis.com/v0/b/dixper-abae2.appspot.com/o/collections%2FQEOEcFGD7UozNiRSVcob%2Fskills%2F24nWc1oSE3uwsuX8bvKO%2Finput-en-render-texture%7C%7C1655114131648.webm?alt=media&token=dbb540fe-caae-47bf-b139-f258f9916a3c",
      "scope||imagepostprocessing||1": [0],
      "scope||imagepostprocessing||2": [0],
      "scope||imagepostprocessing||3": [0],
      "scope||imagepostprocessing||4": [0],
      "effect||imagepostprocessing||1": effect1,
      "effect||imagepostprocessing||2": effect2,
      "effect||imagepostprocessing||3": effect3,
      "effect||imagepostprocessing||4": effect4,
      "tt0||imagepostprocessing||1": 9000,
      "tt0||imagepostprocessing||2": 9000,
      "tt0||imagepostprocessing||3": 9000,
      "tt0||imagepostprocessing||4": 9000,
      "ttl||imagepostprocessing||1": effectDuration,
      "ttl||imagepostprocessing||2": effectDuration,
      "ttl||imagepostprocessing||3": effectDuration,
      "ttl||imagepostprocessing||4": effectDuration,
    }
  );
};
