const images = [
  {
    name: 'cursor',
    url:
      'https://firebasestorage.googleapis.com/v0/b/dixper-abae2.appspot.com/o/sdk%2Fcursor.png?alt=media&token=ae18d8b3-064b-400c-bfcc-1d414c41d5f7',
  },
];
const sprites = [
  {
    name: 'target',
    url:
      'https://firebasestorage.googleapis.com/v0/b/dixper-abae2.appspot.com/o/sdk%2Fsprites%2Ftarget%2Ftarget.json?alt=media&token=b7c94b28-e0c3-4bec-8854-48bbed44d762',
  },
  {
    name: 'targetCounter',
    url:
      'https://firebasestorage.googleapis.com/v0/b/dixper-abae2.appspot.com/o/sdk%2Fsprites%2Ftarget-counter%2Ftarget-counter.json?alt=media&token=a42c89fb-7fec-4cbb-8239-39bac022ec4a',
  },
  {
    name: 'challengeFrameDecline',
    url:
      'https://firebasestorage.googleapis.com/v0/b/dixper-abae2.appspot.com/o/sdk%2Fsprites%2Fchallenge-frame-decline%2Fchallenge-frame-decline.json?alt=media&token=98e4ec7c-eb9a-4f2d-8a2f-905b4e8e0af2',
  },
  {
    name: 'challengeFrameAccept',
    url:
      'https://firebasestorage.googleapis.com/v0/b/dixper-abae2.appspot.com/o/sdk%2Fsprites%2Fchallenge-frame-accept%2Fchallenge-frame-accept.json?alt=media&token=99c7cbd2-0064-400d-9d20-0f4352847f10',
  },
  {
    name: 'challengeFrameCommunication',
    url:
      'https://firebasestorage.googleapis.com/v0/b/dixper-abae2.appspot.com/o/sdk%2Fsprites%2Fchallenge-frame-communication%2Fchallenge-frame-communication.json?alt=media&token=55f6b5db-4801-44fa-87fc-e8a6e8a0a924',
  },
  {
    name: 'test',
    url:
      'https://firebasestorage.googleapis.com/v0/b/dixper-abae2.appspot.com/o/sdk%2Fsprites%2Fchallenge-frame-accept.json?alt=media&token=6253e84e-4f42-412e-8a17-4ac525a11627',
  },
];
const sounds = [
  {
    name: 'targetInSound',
    url:
      'https://firebasestorage.googleapis.com/v0/b/dixper-abae2.appspot.com/o/sdk%2Fsounds%2Ftarget-appear.mp3?alt=media&token=f38c2f8a-6554-48c7-8e85-b0a4d9b17d86',
  },
  {
    name: 'targetOutSound',
    url:
      'https://firebasestorage.googleapis.com/v0/b/dixper-abae2.appspot.com/o/sdk%2Fsounds%2Fshot.mp3?alt=media&token=12dfb852-89d7-4467-8295-9935faa848a5',
  },
  {
    name: 'targetCounterInSound',
    url:
      'https://firebasestorage.googleapis.com/v0/b/dixper-abae2.appspot.com/o/sdk%2Fsounds%2Fcounter-hit-in.mp3?alt=media&token=b76134c9-7c8d-4224-b2a6-0576ae5bc161',
  },
  {
    name: 'targetCounterOutSound',
    url:
      'https://firebasestorage.googleapis.com/v0/b/dixper-abae2.appspot.com/o/sdk%2Fsounds%2Fcounter-hit-out.mp3?alt=media&token=d2d0beb5-73e0-4fd1-bb0e-b69cc12d3e8c',
  },
  {
    name: 'targetCounterHitSound',
    url:
      'https://firebasestorage.googleapis.com/v0/b/dixper-abae2.appspot.com/o/sdk%2Fsounds%2Fcounter-target-hit.mp3?alt=media&token=308f15c3-88b4-4dbd-9ef2-0d39137073ad',
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
