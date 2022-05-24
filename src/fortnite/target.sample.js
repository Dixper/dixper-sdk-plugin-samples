const images = [
  {
    name: 'cursor',
    url:
      './assets/images/cursor.png',
  },
];
const sprites = [
  {
    name: 'target',
    url:
      './assets/spritesheets/target.json',
  },
  {
    name: 'targetCounter',
    url:
      './assets/spritesheets/target-counter.json',
  },
  {
    name: 'challengeFrameDecline',
    url:
      './assets/spritesheets/challenge-frame-decline',
  },
  {
    name: 'challengeFrameAccept',
    url:
      './assets/spritesheets/challenge-frame-accept.json',
  },
  {
    name: 'challengeFrameCommunication',
    url:
      './assets/spritesheets/Fchallenge-frame-communication.json',
  },
  {
    name: 'test',
    url:
      './assets/spritesheets/challenge-frame-accept.json',
  },
];
const sounds = [
  {
    name: 'targetInSound',
    url:
      './assets/sounds/target-appear.mp3?alt',
  },
  {
    name: 'targetOutSound',
    url:
      './assets/sounds/shot.mp3?alt=media',
  },
  {
    name: 'targetCounterInSound',
    url:
      './assets/sounds/counter-hit-in.mp3',
  },
  {
    name: 'targetCounterOutSound',
    url:
      './assets/sounds/counter-hit-out.mp3',
  },
  {
    name: 'targetCounterHitSound',
    url:
      './assets/sounds/counter-target-hit.mp3',
  },
];

const styles = `
    .target-in{
         position: absolute;
        height: 200px;
        width: 200px;
        background: transparent;
        transition:.15s;
        z-index:10;
    }
    .target-out{
         position: absolute;
        height: 200px;
        width: 200px;
        background: transparent;
        transition:.15s;
        opacity:0;
        z-index:9;
    }
    .target-out-animation{
        animation-name: example;
        animation-duration: 5s;
    }
    @keyframes example {
        from {transform:scale(1)}
        to {transform:scale(0)}
    }
    .counter {
      position: absolute;
      top: 5%;
      left: 50%;
      height: 200px;
      width: 200px;
      background-size: contain;
      background-image: url('https://firebasestorage.googleapis.com/v0/b/dixper-dev-95388.appspot.com/o/js%2F05_Counter_TARGET_notext.png?alt=media&token=995d9cc2-e623-46a9-be1c-5c80d4626e20');
      background-repeat: no-repeat;
      color: white;
      font-family: 'Francois One', sans-serif;
      font-size: 80px;
      display:flex;
      justify-content: center;
      align-items: center;
    }
    .countdown {
      position: absolute;
      top: 5%;
      left:40%;
      height: 200px;
      width: 200px;
      background-size: contain;
      background-image: url('https://firebasestorage.googleapis.com/v0/b/dixper-dev-95388.appspot.com/o/js%2Fbackground-counter.png?alt=media&token=478ea89b-0da3-458c-93a9-d1ed935a9467');
      background-repeat: no-repeat;
      color: white;
      font-size: 120px;
      font-family: 'Francois One', sans-serif;
      display: flex;
      justify-content: center;
      align-items: auto;
    }
`;

const dixperPluginSample = new DixperSDKLib({
  styles,
  debug: true,
  pixi: {
    enable: true,
    files: [...images, ...sprites, ...sounds],
  },
});

//Remote
dixperPluginSample.onPixiLoad = () => {
  dixperPluginSample.drawCursor('cursor', 20, 20);
  dixperPluginSample.initChallenge('Jump challenge!', 100000);
};

dixperPluginSample.context$.subscribe((context) => {
  context.skillFinishTimestamp; // fecha de cuando acaba la skill para hacer un countdown
});

// INIT CHALLENGE

dixperPluginSample.onChallengeAccepted = () => {
  init();
};

dixperPluginSample.onChallengeRejected = () => {
  sendJumpscare();
  console.log('send Jumpscare');
  setTimeout(() => {
    console.log('stop skill');
    dixperPluginSample.stopSkill();
  }, 10000);
};

// //SUSTO
const sendJumpscare = () => {
  dixperPluginSample.addActions(
    JSON.stringify([
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
    ]),
    {
      'file||sound-0-1':
        'https://firebasestorage.googleapis.com/v0/b/dixper-abae2.appspot.com/o/skills%2FIUvnTvzg4RsRUwoll9pZ%2FAudio%20bicho%20cara%20fea.mp3?alt=media&token=a08c25ff-c138-4d2d-93f1-106106766ec0',
      'ttl||sound-0-1': 10000,
      'scope||sound-0-1': 100,
      'file||render-texture-0-0':
        'https://firebasestorage.googleapis.com/v0/b/dixper-abae2.appspot.com/o/skills%2FX46ap915je4GhT9iGHLT%2Fassets%2Fsusto-ligth-1.png?alt=media&token=c8db59a9-6bd5-463f-99b7-0dead27aec3f',
      'ttl||render-texture-0-0': 10000,
      'scope||render-texture-0-0': 100,
    },
  );
};

const init = () => {
  const points = 0;
  const targetCounterPanel = new dxPanel(dixperPluginSample.pixi.resources, 'targetCounter', dixperPluginSample.pixi.stage, `${points}`, {
    x: DX_WIDTH / 2,
    y: 100,
    animationSpeed: 0.5,
  });

  interval(1000).subscribe((x) => {
    createTarget(Math.floor(Math.random() * (DX_WIDTH - 50) + 30), Math.floor(Math.random() * (height - 50) + 30));
  });
};

function createTarget(x, y) {
  const target = new dxButton(dixperPluginSample.pixi.resources, 'target', dixperPluginSample.pixi.stage, '', {
    x,
    y,
    animationSpeed: 0.5,
  });

  dixperPluginSample.pixi.ticker.add(() => {
    target.rotation += 0.01;
  });

  target.onClick = (event) => {
    target.instance.interactive = false;
    target.remove();
    points++;
    targetCounterPanel.updateText(`${points}`);
  };
}
