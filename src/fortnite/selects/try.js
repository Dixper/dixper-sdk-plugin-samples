const images = [];
const sprites = [
  {
    name: "selectorButton",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/spritesheets/button.json",
  },
  //   {
  //     name: "challengeFrameCommunicationLarge",
  //     url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/aim-blur/src/fortnite/assets/spritesheets/communication-frame-large.json",
  //   },
];
const sounds = [];

let millisecondsToFinish;

// INPUTS PARAMS

// DIXPER SDK INJECTED CLASS

const dixperPluginSample = new DixperSDKLib({
  pixi: {
    enable: true,
    files: [...images, ...sprites, ...sounds],
  },
});

// INPUTS

// REMOTE

dixperPluginSample.onPixiLoad = () => {
  createSelectors();
};

const init = () => {};

const createSelectors = () => {
  dixperPluginSample.drawCursor();

  const titleSelector = new dxPanel(
    dixperPluginSample.pixi,
    "challengeFrameCommunicationLarge",
    dixperPluginSample.uiLayer,
    "hola",
    {
      position: {
        x: DX_WIDTH / 2,
        y: 100,
      },
      scale: {
        x: 4,
        y: 4,
      },
      animationSpeed: 0.5,
    }
  );

  const reload = new dxButton(
    dixperPluginSample.pixi,
    "selectorButton",
    dixperPluginSample.uiLayer,
    "Prueba",
    {
      position: {
        x: DX_WIDTH / 2 - 200,
        y: 300,
      },
      scale: {
        x: 0.75,
        y: 0.75,
      },
      animationSpeed: 0.5,
      hitbox: [-175, -45, 175, -45, 175, 45, -175, 46],
    }
  );

  const jump = new dxButton(
    dixperPluginSample.pixi,
    "selectorButton",
    dixperPluginSample.uiLayer,
    "Prueba 2",
    {
      position: {
        x: DX_WIDTH / 2 + 200,
        y: 300,
      },
      scale: {
        x: 0.75,
        y: 0.75,
      },
      animationSpeed: 0.5,
      hitbox: [-175, -45, 175, -45, 175, 45, -175, 46],
    }
  );
};
//   reload.onClick = (event) => {
//     millisecondsToFinish = dixperPluginSample.context.skillEnd - Date.now();

//     dixperPluginSample.cursor.remove();
//     reload.instance.interactive = false;
//     reload.remove();
//     jump.instance.interactive = false;
//     jump.remove();
//     titleSelector.remove();
//     keyBlock(millisecondsToFinish, reloadKey);
//     init();
//     createReminder(optionAReminder);
//   };

//   jump.onClick = (event) => {
//     millisecondsToFinish = dixperPluginSample.context.skillEnd - Date.now();

//     dixperPluginSample.cursor.remove();
//     reload.instance.interactive = false;
//     reload.remove();
//     jump.instance.interactive = false;
//     jump.remove();
//     titleSelector.remove();
//     keyBlock(millisecondsToFinish, jumpKey);
//     init();
//     createReminder(optionBReminder);
//   };
// }

// createReminder = (reminderTitle) => {
//   const reminder = new dxPanel(
//     dixperPluginSample.pixi,
//     "reminder",
//     dixperPluginSample.uiLayer,
//     reminderTitle,
//     {
//       position: {
//         x: 200,
//         y: DX_HEIGHT / 2 - 100,
//       },
//       scale: {
//         x: 0.5,
//         y: 0.5,
//       },
//       animationSpeed: 0.5,
//     }
//   );
// };

// const keyBlock = (millisecondsToFinish, key) => {
//   dixperPluginSample.addActions(
//     JSON.stringify([
//       {
//         ttl: millisecondsToFinish,
//         actions: [
//           {
//             inputKey: `keyboard-filter||1654001460515`,
//             scope: "{{scope}}",
//             key: "keyboard-filter",
//             component: "keyboard",
//             type: "filter",
//             version: 1,
//             action: "start",
//             metadata: { disable: [{ vkeys: "{{vkeys}}" }] },
//             tt0: "{{tt0}}",
//             ttl: "{{ttl}}",
//           },
//         ],
//       },
//     ]),
//     {
//       "scope||keyboard-filter||1654001460515": [0],
//       "vkeys||keyboard-filter||1654001460515": [key],
//       "tt0||keyboard-filter||1654001460515": 0,
//       "ttl||keyboard-filter||1654001460515": millisecondsToFinish,
//     }
//   );
// };
