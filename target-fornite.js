let points = 0;
let timeSkills = 20;

setInterval(() => {
  timeSkills--;
  if (timeSkills === -1) {
    timeSkills = 0;
    countdownContainer.innerHTML = `${timeSkills}`;
  } else {
    countdownContainer.innerHTML = `${timeSkills}`;
  }
}, 1000);

let counterContainer = document.createElement("div");
counterContainer.className = "counter";
document.body.appendChild(counterContainer);
counterContainer.appendChild(document.createTextNode(`${points}`));

let countdownContainer = document.createElement("div");
countdownContainer.className = "countdown";
document.body.appendChild(countdownContainer);
countdownContainer.appendChild(document.createTextNode(`${timeSkills}`));

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
    counterContainer.innerHTML = `${points}`;
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

function getRandomX() {
  const x = Math.floor(Math.random() * window.screen.width);
  return x;
}
function getRandomY() {
  const y = Math.floor(Math.random() * window.screen.height);
  return y;
}

let i = 0;
setInterval(() => {
  createVideo(getRandomX(), getRandomY(), i);
  i++;
}, 1000);

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
      top: 20%;
      left: 80%;
      height: 300px;
      width: 300px;
      background-size: contain;
      background-image: url('https://firebasestorage.googleapis.com/v0/b/dixper-dev-95388.appspot.com/o/js%2Fbackground-counter.png?alt=media&token=478ea89b-0da3-458c-93a9-d1ed935a9467');
      background-repeat: no-repeat;
      color: white;
      font-family: 'Francois One', sans-serif;
      font-size: 180px;
      display:flex;
      justify-content: center;
      
    }
    .countdown {
      position: absolute;
      top: 10%;
      left: 50%;
      height: 300px;
      width: 300px;
      background-size: contain;
      background-image: url('https://firebasestorage.googleapis.com/v0/b/dixper-dev-95388.appspot.com/o/js%2Fbackground-counter.png?alt=media&token=478ea89b-0da3-458c-93a9-d1ed935a9467');
      background-repeat: no-repeat;
      color: white;
      font-size: 180px;
      font-family: 'Francois One', sans-serif;
      display: flex;
      justify-content: center;
      
    }
`;

const style = document.createElement("style");
style.appendChild(document.createTextNode(css));
document.getElementsByTagName("head")[0].appendChild(style);

// // test desktop
// class DixperPluginSample extends DixperSDKLib {
//   constructor() {
//     super(true);
//     console.log("DixperPluginSample ");
//   }
// }

// const dixperPluginSample = new DixperPluginSample();

// //Remote
// dixperPluginSample.drawCursor("url raton");

// dixperPluginSample.context$.subscribe((context) => {
//   context.skillFinishTimestamp; // fecha de cuando acaba la skill para hacer un countdown
// });

// //INIT CHALLENGE
// dixperPluginSample.initChallenge("Jump challenge!");
// dixperPluginSample.onChallengeAccepted = () => {
//   init();
// };
// dixperPluginSample.onChallengeRejected = () => {
// sendJumpscare();
// setTimeout(() => {
//   dixperPluginSample.stopSkill();
// }, 10000);

// };

// //SUSTO
// const sendJumpscare = ()=>{
//     dixperPluginSample.addActions(
//       JSON.stringify([
//         {
//           ttl: 10000,
//           actions: [
//             {
//               inputKey: "render-texture-0-0",
//               scope: "{{scope}}",
//               key: "render-texture",
//               component: "graphics",
//               type: "render-texture",
//               version: 1,
//               action: "start",
//               metadata: {
//                 file: "{{file}}",
//                 textureProperties: {
//                   width: "{{width}}",
//                   height: "{{height}}",
//                   position: "{{position}}",
//                   fadeIn: "{{fade}}",
//                 },
//               },
//               tt0: "{{tt0}}",
//               ttl: "{{ttl}}",
//             },
//             {
//               inputKey: "sound-0-1",
//               scope: "{{scope}}",
//               key: "sound",
//               metadata: { file: "{{file}}", volume: "{{volume}}" },
//               tt0: "{{tt0}}",
//               ttl: "{{ttl}}",
//             },
//           ],
//         },
//       ]),
//       {
//         "file||sound-0-1":
//           "https://firebasestorage.googleapis.com/v0/b/dixper-abae2.appspot.com/o/skills%2FIUvnTvzg4RsRUwoll9pZ%2FAudio%20bicho%20cara%20fea.mp3?alt=media&token=a08c25ff-c138-4d2d-93f1-106106766ec0",
//         "ttl||sound-0-1": 10000,
//         "scope||sound-0-1": 100,
//         "file||render-texture-0-0":
//           "https://firebasestorage.googleapis.com/v0/b/dixper-abae2.appspot.com/o/skills%2FX46ap915je4GhT9iGHLT%2Fassets%2Fsusto-ligth-1.png?alt=media&token=c8db59a9-6bd5-463f-99b7-0dead27aec3f",
//         "ttl||render-texture-0-0": 10000,
//         "scope||render-texture-0-0": 100,
//       }
//     );
// }
