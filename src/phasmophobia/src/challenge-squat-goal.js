const images = [];
const sprites = [
  {
    name: "ghostPanel",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/phasmophobia/src/phasmophobia/assets/spritesheets/phasmoReminder.json",
  },
];
const sounds = [];

let onKeySub;
let counterPanel;
let count = 0;

// INPUTS PARAMS

let reminder;

let squatKeys = [29, 46];

// DIXPER SDK INJECTED CLASS

const dixperPluginSample = new DixperSDKLib({
  pixi: {
    enable: true,
    files: [...images, ...sprites, ...sounds],
  },
});

// INPUTS

const { challengeTitle, challengeTime, reminderTitle, squatTarget } = DX_INPUTS;

// PIXIJS INITILIZE

dixperPluginSample.onPixiLoad = () => {
  dixperPluginSample.initChallenge(challengeTitle, challengeTime);
};

// INIT CHALLENGE

dixperPluginSample.onChallengeAccepted = () => {
  init();
};

dixperPluginSample.onChallengeRejected = () => {
  dixperPluginSample.stopSkill();
};

dixperPluginSample.onChallengeFinish = () => {
  counterPanel.remove();
  onKeySub.unsubscribe();
  reminder.remove();

  if (counterPanel.count >= squatTarget) {
    dixperPluginSample.challengeSuccess();
    setTimeout(() => dixperPluginSample.stopSkill(), 2000);
  } else {
    dixperPluginSample.challengeFail();
    setTimeout(() => dixperPluginSample.stopSkill(), 2000);
  }
};

const init = () => {
  onKeySub = dixperPluginSample.onKeyDown$.subscribe(addFloatingText);
  createcounterPanel();
  createReminder();
};

const addFloatingText = (event) => {
  if (squatKeys.includes(event.keycode) && !event.repeat) {
    count += 1;
    if (count % 2 === 0 && counterPanel.count < squatTarget) {
      counterPanel.incrementCount();

      const randomRect = {
        min: DX_WIDTH / 2 - 200,
        max: DX_WIDTH / 2 + 100,
      };

      const coordinates = getRandomCoordinates(randomRect);

      const floatingText = new dxFloatingText(
        DX_PIXI,
        DX_LAYERS.ui,
        `${counterPanel.count}`,
        800,
        randomRect,
        {
          position: coordinates,
          random: true,
        }
      );

      floatingText.start();
    } else if (counterPanel.count >= squatTarget) {
      dixperPluginSample.challengeFinish();
    }
  }
};

function getRandomCoordinates(rect) {
  let x = Math.random() * (rect.max - rect.min) + rect.min;
  let y = DX_HEIGHT / 2 - 100;
  return { x, y };
}

const createReminder = () => {
  reminder = new dxPanel(DX_PIXI, "ghostPanel", DX_LAYERS.ui, reminderTitle, {
    position: {
      x: 200,
      y: DX_HEIGHT / 2 - 100,
    },
    scale: {
      x: 0.5,
      y: 0.5,
    },
    animationSpeed: 0.5,
  });
};

const createcounterPanel = () => {
  counterPanel = new dxCounter(
    DX_PIXI,
    "ghostPanel",
    DX_LAYERS.ui,
    0,
    squatTarget,
    {
      position: {
        x: (3 * DX_WIDTH) / 4 - 100,
        y: 100,
      },
      scale: {
        x: 0.5,
        y: 0.5,
      },
      animationSpeed: 0.5,
    }
  );
};
