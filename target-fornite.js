let points = 0;
let timeSkills = 20;
let countdownContainer;

const createVideo = (x, y, id) => {
  const videoElementIn = document.createElement("video");
  const videoElementOut = document.createElement("video");

  videoElementIn.id = `${id}-in`;
  videoElementOut.id = `${id}-out`;

  videoElementIn.src =
    "https://firebasestorage.googleapis.com/v0/b/dixper-dev-95388.appspot.com/o/js%2FTarget_IN.webm?alt=media&token=51415209-4124-463a-bdf4-1270003cd839";
  videoElementOut.src =
    "https://firebasestorage.googleapis.com/v0/b/dixper-dev-95388.appspot.com/o/js%2FTarget_OUT.webm?alt=media&token=72cdcdab-14d9-446f-b235-d468e98bb8ed";

  videoElementIn.className = "target-in";
  videoElementOut.className = "target-out";

  videoElementIn.style = `
    top: ${y}px;
    left: ${x}px;
    `;
  videoElementOut.style = `
    top: ${y}px;
    left: ${x}px;
    `;

  videoElementIn.oncanplay = () => {
    videoElementIn.play();
  };

  videoElementIn.onclick = () => {
    videoElementOut.style.opacity = 1;
    setTimeout(() => {
      videoElementIn.remove();
    }, 50);
    videoElementOut.play();
    points++;
    document.getElementById("counter").innerText = `${points}`;
  };

  videoElementIn.onended = () => {
    videoElementIn.className = `${videoElementIn.className} target-out-animation`;
    videoElementOut.className = `${videoElementOut.className} target-out-animation`;
    setTimeout(() => {
      if (videoElementIn.className === "target-in target-out-animation") {
        videoElementIn.remove();
      }
      videoElementOut.remove();
    }, 5000);
  };

  videoElementOut.onended = () => {
    videoElementOut.remove();
  };

  document.body.appendChild(videoElementIn);
  document.body.appendChild(videoElementOut);
};

function getRandom(axis) {
  return Math.floor(
    Math.random() * (screen[axis] / window.devicePixelRatio - 200)
  );
}

let i = 0;

const init = () => {
  DixperSDKUtils.addTimer(
    "timer",
    "163px",
    "97px",
    "calc(50vw - 173px)",
    "30px",
    "https://firebasestorage.googleapis.com/v0/b/dixper-dev-95388.appspot.com/o/js%2F05_Counter_TARGET_notext.png?alt=media&token=995d9cc2-e623-46a9-be1c-5c80d4626e20",
    Date.now() + 40000,
    1000
  );

  DixperSDKUtils.addImagePanel(
    "counter-panel",
    "163px",
    "97px",
    "calc(50vw + 10px)",
    "30px",
    "https://firebasestorage.googleapis.com/v0/b/dixper-dev-95388.appspot.com/o/js%2F05_Counter_TARGET_notext.png?alt=media&token=995d9cc2-e623-46a9-be1c-5c80d4626e20"
  );

  interval(1000).subscribe(() => {
    createVideo(getRandom("width"), getRandom("height"), i);
    i++;
  });
};

var css = `
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

const style = document.createElement("style");
style.appendChild(document.createTextNode(css));
document.getElementsByTagName("head")[0].appendChild(style);

// // test desktop
// class DixperPluginSample extends DixperSDKLib {
//   constructor() {
//     super();
//     console.log("DixperPluginSample ");
//   }
// }

// const dixperPluginSample = new DixperPluginSample();

// //Remote
// dixperPluginSample.drawCursor(
//   // 'https://firebasestorage.googleapis.com/v0/b/dixper-abae2.appspot.com/o/sdk%2Fcursor.png?alt=media&token=48f5c1eb-8ace-4cbd-af10-691c265da97f',
//   "https://media.discordapp.net/attachments/189732250516979713/974311489236271145/unknown.png",
//   100,
//   100
// );

// dixperPluginSample.context$.subscribe((context) => {
//   context.skillFinishTimestamp; // fecha de cuando acaba la skill para hacer un countdown
// });

// INIT CHALLENGE

dixperPluginSample.initChallenge("Jump challenge!", 100000);
dixperPluginSample.onChallengeAccepted = () => {
  init();
};

dixperPluginSample.onChallengeRejected = () => {
  sendJumpscare();
  console.log("send Jumpscare");
  setTimeout(() => {
    console.log("stop skill");
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
            inputKey: "render-texture-0-0",
            scope: "{{scope}}",
            key: "render-texture",
            component: "graphics",
            type: "render-texture",
            version: 1,
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
            inputKey: "sound-0-1",
            scope: "{{scope}}",
            key: "sound",
            metadata: { file: "{{file}}", volume: "{{volume}}" },
            tt0: "{{tt0}}",
            ttl: "{{ttl}}",
          },
        ],
      },
    ]),
    {
      "file||sound-0-1":
        "https://firebasestorage.googleapis.com/v0/b/dixper-abae2.appspot.com/o/skills%2FIUvnTvzg4RsRUwoll9pZ%2FAudio%20bicho%20cara%20fea.mp3?alt=media&token=a08c25ff-c138-4d2d-93f1-106106766ec0",
      "ttl||sound-0-1": 10000,
      "scope||sound-0-1": 100,
      "file||render-texture-0-0":
        "https://firebasestorage.googleapis.com/v0/b/dixper-abae2.appspot.com/o/skills%2FX46ap915je4GhT9iGHLT%2Fassets%2Fsusto-ligth-1.png?alt=media&token=c8db59a9-6bd5-463f-99b7-0dead27aec3f",
      "ttl||render-texture-0-0": 10000,
      "scope||render-texture-0-0": 100,
    }
  );
};
