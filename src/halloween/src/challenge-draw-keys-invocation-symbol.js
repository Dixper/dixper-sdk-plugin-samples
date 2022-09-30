const images = [
  {
    name: "invisibleButton",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/phasmophobia/src/phasmophobia/assets/spritesheets/invisible_sprite.png",
  },
  {
    name: "drawClick",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/images/filledButton.png",
  },
];
const sprites = [
  {
    name: "halloweenRemainderPanel",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/spritesheets/reminderHalloween.json",
  },
  {
    name: "drawButton",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/spritesheets/filledButton.json",
  },
  {
    name: "halloweenChallenge",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/spritesheets/challenge-communication.json",
  },
  {
    name: "halloweenTime",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/spritesheets/timer.json",
  },
  {
    name: "halloweenReminder",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/spritesheets/reminderHalloween.json",
  },
  {
    name: "halloweenCementery",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/spritesheets/cementery-illustration.json",
  },
  {
    name: "newChallengeSuccess",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/spritesheets/win_challenge.json",
  },
  {
    name: "newChallengeFail",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/spritesheets/lose_challenge.json",
  },
  {
    name: "newChallengeSuccessSpanish",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/spritesheets/win_challenge_es.json",
  },
  {
    name: "newChallengeFailSpanish",
    url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/spritesheets/lose_challenge_es.json",
  },
];
const sounds = [
  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/phasmophobia/src/phasmophobia/assets/sounds/Writing_01.mp3",

  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/phasmophobia/src/phasmophobia/assets/sounds/Writing_02.mp3",

  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/phasmophobia/src/phasmophobia/assets/sounds/Writing_03.mp3",

  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/phasmophobia/src/phasmophobia/assets/sounds/Writing_04.mp3",

  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/sounds/You_Win_SFX.mp3",

  "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/sounds/You_Loose_SFX.mp3",
];

let randomPosition,
  randomSymbol,
  randomOrder,
  x,
  y,
  onClickSub,
  button,
  challengeTime;
let buttonsArray = [];
let previousPoint;
let currentPoint;
let previousCirclePainted;
let randomStart;
let newSymbol;
let circlePainted;
let jsonArray = [];
let idForCoordenates = 0;
let buttonTemplate;
let challengeMarker;
let counterMarker = 0;
let titleChallengePanel,
  acceptButton,
  declineButton,
  halloweenPanel,
  reminder,
  timer;
let countLines = 1;
const finalPositionTimer = -666;

// INPUTS PARAMS

const buttonSettingsSymbol_1 = [
  {
    x: 986,
    y: 239,
    id: 1,
    connections: [8],
    key: "A",
  },
  {
    x: 986,
    y: 954,
    id: 2,
    connections: [16],
    key: "H",
  },
  {
    x: 986,
    y: 760,
    id: 3,
    connections: [8, 10, 13, 16],
    key: "D",
  },
  {
    x: 685,
    y: 763,
    id: 4,
    connections: [10],
    key: "F",
  },
  {
    x: 1287,
    y: 764,
    id: 5,
    connections: [13],
    key: "Q",
  },
  {
    x: 940,
    y: 287,
    id: 6,
    connections: [8],
    key: "Z",
  },
  {
    x: 1045,
    y: 284,
    id: 7,
    connections: [8],
    key: "E",
  },
  {
    x: 987,
    y: 288,
    id: 8,
    connections: [1, 3, 6, 7],
    key: "X",
  },
  {
    x: 730,
    y: 711,
    id: 9,
    connections: [10],
    key: "W",
  },
  {
    x: 730,
    y: 761,
    id: 10,
    connections: [3, 4, 9, 11],
    key: "R",
  },
  {
    x: 730,
    y: 815,
    id: 11,
    connections: [10],
    key: "C",
  },
  {
    x: 1237,
    y: 712,
    id: 12,
    connections: [13],
    key: "T",
  },
  {
    x: 1237,
    y: 762,
    id: 13,
    connections: [3, 5, 12, 14],
    key: "V",
  },
  {
    x: 1237,
    y: 816,
    id: 14,
    connections: [13],
    key: "S",
  },
  {
    x: 941,
    y: 911,
    id: 15,
    connections: [16],
    key: "B",
  },
  {
    x: 987,
    y: 911,
    id: 16,
    connections: [2, 3, 15, 17],
    key: "Y",
  },
  {
    x: 1042,
    y: 910,
    id: 17,
    connections: [16],
    key: "G",
  },
];
const buttonSettingsSymbol_2 = [
  {
    x: 592,
    y: 459,
    id: 2,
    connections: [4, 5, 7, 8],
    key: "W",
  },
  {
    x: 969,
    y: 218,
    id: 1,
    connections: [3, 4, 6, 15],
    key: "S",
  },
  {
    x: 741,
    y: 830,
    id: 3,
    connections: [1, 5, 9, 10],
    key: "E",
  },
  {
    x: 1327,
    y: 454,
    id: 5,
    connections: [2, 3, 13, 14],
    key: "C",
  },
  {
    x: 782,
    y: 256,
    id: 6,
    connections: [1, 7],
    key: "G",
  },
  {
    x: 671,
    y: 335,
    id: 7,
    connections: [2, 6],
    key: "D",
  },
  {
    x: 1184,
    y: 824,
    id: 4,
    connections: [1, 2, 11, 12],
    key: "R",
  },
  {
    x: 585,
    y: 586,
    id: 8,
    connections: [2, 9],
    key: "V",
  },
  {
    x: 638,
    y: 728,
    id: 9,
    connections: [3, 8],
    key: "T",
  },
  {
    x: 876,
    y: 887,
    id: 10,
    connections: [3, 11],
    key: "F",
  },
  {
    x: 1086,
    y: 881,
    id: 11,
    connections: [4, 10],
    key: "X",
  },
  {
    x: 1285,
    y: 741,
    id: 12,
    connections: [4, 13],
    key: "Z",
  },
  {
    x: 1340,
    y: 630,
    id: 13,
    connections: [5, 12],
    key: "H",
  },
  {
    x: 1266,
    y: 344,
    id: 14,
    connections: [5, 15],
    key: "Q",
  },
  {
    x: 1120,
    y: 247,
    id: 15,
    connections: [1, 14],
    key: "A",
  },
];
const buttonSettingsSymbol_3 = [
  {
    x: 573,
    y: 182,
    id: 1,
    connections: [2, 4, 6],
    key: "A",
  },
  {
    x: 1266,
    y: 187,
    id: 2,
    connections: [1, 3, 5],
    key: "R",
  },
  {
    x: 690,
    y: 717,
    id: 3,
    connections: [2],
    key: "Z",
  },
  {
    x: 1154,
    y: 715,
    id: 4,
    connections: [1],
    key: "D",
  },
  {
    x: 764,
    y: 944,
    id: 5,
    connections: [2, 8],
    key: "W",
  },
  {
    x: 1108,
    y: 948,
    id: 6,
    connections: [1, 7],
    key: "X",
  },
  {
    x: 1155,
    y: 869,
    id: 7,
    connections: [6],
    key: "S",
  },
  {
    x: 681,
    y: 868,
    id: 8,
    connections: [5],
    key: "Q",
  },
  {
    x: 1032,
    y: 807,
    id: 9,
    connections: [11],
    key: "C",
  },
  {
    x: 812,
    y: 808,
    id: 10,
    connections: [11],
    key: "E",
  },
  {
    x: 923,
    y: 984,
    id: 11,
    connections: [9, 10],
    key: "F",
  },
];
const buttonSettingsSymbol_4 = [
  { x: 621, y: 244, id: 1, connections: [2], key: "A" },
  { x: 621, y: 404, id: 2, connections: [1, 3, 6], key: "R" },
  { x: 619, y: 610, id: 3, connections: [2, 4, 5], key: "F" },
  { x: 620, y: 892, id: 4, connections: [3], key: "X" },
  { x: 857, y: 618, id: 5, connections: [6, 10], key: "V" },
  { x: 746, y: 509, id: 6, connections: [2, 5, 7], key: "E" },
  { x: 773, y: 428, id: 7, connections: [6, 8], key: "1" },
  { x: 863, y: 390, id: 8, connections: [7, 9], key: "S" },
  { x: 856, y: 276, id: 9, connections: [8], key: "C" },
  { x: 1143, y: 894, id: 10, connections: [5, 11], key: "3" },
  { x: 1140, y: 596, id: 11, connections: [10, 12], key: "2" },
  { x: 1135, y: 282, id: 12, connections: [11], key: "W" },
  { x: 1276, y: 286, id: 13, connections: [15], key: "Z" },
  { x: 1258, y: 877, id: 14, connections: [15], key: "Q" },
  { x: 1200, y: 594, id: 15, connections: [13, 14], key: "D" },
];
const buttonSettingsSymbol_5 = [
  {
    x: 972,
    y: 234,
    id: 1,
    connections: [2],
    key: "F",
  },
  {
    x: 975,
    y: 733,
    id: 2,
    connections: [1, 7, 9, 10, 12],
    key: "A",
  },
  {
    x: 756,
    y: 347,
    id: 3,
    connections: [4],
    key: "X",
  },
  {
    x: 1194,
    y: 344,
    id: 4,
    connections: [3],
    key: "D",
  },
  {
    x: 699,
    y: 492,
    id: 5,
    connections: [6],
    key: "Q",
  },
  {
    x: 1244,
    y: 489,
    id: 6,
    connections: [5],
    key: "C",
  },
  {
    x: 1201,
    y: 616,
    id: 7,
    connections: [2, 8],
    key: "E",
  },
  {
    x: 1366,
    y: 733,
    id: 8,
    connections: [7, 9],
    key: "V",
  },
  {
    x: 1223,
    y: 855,
    id: 9,
    connections: [2, 8],
    key: "S",
  },
  {
    x: 731,
    y: 617,
    id: 10,
    connections: [2, 11],
    key: "W",
  },
  {
    x: 581,
    y: 726,
    id: 11,
    connections: [10, 12],
    key: "R",
  },
  {
    x: 738,
    y: 857,
    id: 12,
    connections: [2, 11],
    key: "Z",
  },
];
const buttonSettingsSymbol_6 = [];
const buttonSettingsSymbol_7 = [
  { x: 520, y: 484, id: 1, connections: [2], key: "A" },
  { x: 585, y: 465, id: 2, connections: [1, 3], key: "E" },
  { x: 636, y: 524, id: 3, connections: [2, 4, 6], key: "1" },
  { x: 583, y: 592, id: 4, connections: [3, 5], key: "V" },
  { x: 527, y: 576, id: 5, connections: [4], key: "T" },
  { x: 700, y: 524, id: 6, connections: [3, 7, 9], key: "G" },
  { x: 700, y: 720, id: 7, connections: [6], key: "2" },
  { x: 820, y: 720, id: 8, connections: [13], key: "C" },
  { x: 753, y: 525, id: 9, connections: [6, 11, 13], key: "B" },
  { x: 757, y: 360, id: 10, connections: [11, 12], key: "R" },
  { x: 756, y: 434, id: 11, connections: [9, 10, 25], key: "3" },
  { x: 838, y: 358, id: 12, connections: [10, 14, 25], key: "D" },
  { x: 831, y: 525, id: 13, connections: [8, 9, 16], key: "Tab" },
  { x: 942, y: 363, id: 14, connections: [12, 15, 16], key: "Shift" },
  { x: 940, y: 168, id: 15, connections: [14], key: "Space" },
  { x: 943, y: 525, id: 16, connections: [13, 14, 18, 19], key: "S" },
  { x: 940, y: 877, id: 17, connections: [18], key: "4" },
  { x: 940, y: 717, id: 18, connections: [16, 17, 19], key: "Z" },
  { x: 1102, y: 523, id: 19, connections: [16, 18, 20], key: "W" },
  { x: 1286, y: 528, id: 20, connections: [19, 21, 22], key: "U" },
  { x: 1291, y: 463, id: 21, connections: [20], key: "I" },
  { x: 1286, y: 603, id: 22, connections: [20, 23], key: "O" },
  { x: 1389, y: 458, id: 23, connections: [22, 24], key: "Q" },
  { x: 1388, y: 596, id: 24, connections: [23], key: "X" },
  { x: 835, y: 427, id: 25, connections: [11, 12], key: "F" },
];
const buttonSettingsSymbol_8 = [];
const buttonSettingsSymbol_9 = [];
const buttonSettingsSymbol_10 = [];
const buttonSettingsSymbol_11 = [];
const buttonSettingsSymbol_12 = [
  {
    x: 1149,
    y: 317,
    id: 1,
    connections: [2],
    key: "F",
  },
  {
    x: 1038,
    y: 230,
    id: 2,
    connections: [1, 3],
    key: "V",
  },
  {
    x: 938,
    y: 326,
    id: 3,
    connections: [2, 4],
    key: "Y",
  },
  {
    x: 895,
    y: 473,
    id: 4,
    connections: [3],
    key: "A",
  },
  {
    x: 851,
    y: 393,
    id: 5,
    connections: [6],
    key: "C",
  },
  {
    x: 729,
    y: 595,
    id: 6,
    connections: [5, 7],
    key: "H",
  },
  {
    x: 811,
    y: 750,
    id: 7,
    connections: [6],
    key: "U",
  },
  {
    x: 692,
    y: 673,
    id: 8,
    connections: [9],
    key: "S",
  },
  {
    x: 640,
    y: 778,
    id: 9,
    connections: [8, 10],
    key: "D",
  },
  {
    x: 805,
    y: 804,
    id: 10,
    connections: [9, 11],
    key: "N",
  },
  {
    x: 990,
    y: 759,
    id: 11,
    connections: [10],
    key: "X",
  },
  {
    x: 797,
    y: 577,
    id: 12,
    connections: [13],
    key: "E",
  },
  {
    x: 955,
    y: 508,
    id: 13,
    connections: [12, 14],
    key: "J",
  },
  {
    x: 1127,
    y: 514,
    id: 14,
    connections: [13],
    key: "1",
  },
  {
    x: 911,
    y: 576,
    id: 15,
    connections: [16],
    key: "M",
  },
  {
    x: 989,
    y: 696,
    id: 16,
    connections: [15, 17],
    key: "2",
  },
  {
    x: 1142,
    y: 769,
    id: 17,
    connections: [16],
    key: "W",
  },
  {
    x: 929,
    y: 830,
    id: 18,
    connections: [19],
    key: "B",
  },
  {
    x: 1186,
    y: 820,
    id: 19,
    connections: [18, 20],
    key: "I",
  },
  {
    x: 1318,
    y: 681,
    id: 20,
    connections: [19],
    key: "Z",
  },
  {
    x: 1090,
    y: 696,
    id: 21,
    connections: [22],
    key: "3",
  },
  {
    x: 1172,
    y: 590,
    id: 22,
    connections: [21, 23],
    key: "G",
  },
  {
    x: 1185,
    y: 445,
    id: 23,
    connections: [22],
    key: "R",
  },
  {
    x: 1243,
    y: 551,
    id: 24,
    connections: [25],
    key: "T",
  },
  {
    x: 1377,
    y: 650,
    id: 25,
    connections: [24, 26],
    key: "4",
  },
  {
    x: 1436,
    y: 780,
    id: 26,
    connections: [25, 27],
    key: "Tab",
  },
  {
    x: 1305,
    y: 803,
    id: 27,
    connections: [26],
    key: "K",
  },
  {
    x: 1349,
    y: 550,
    id: 28,
    connections: [29],
    key: "Space",
  },
  {
    x: 1295,
    y: 444,
    id: 29,
    connections: [28, 30],
    key: "O",
  },
  {
    x: 1200,
    y: 383,
    id: 30,
    connections: [29, 31],
    key: "Shift",
  },
  {
    x: 985,
    y: 358,
    id: 31,
    connections: [30],
    key: "Q",
  },
];

const symbolsOfInvocation = [
  buttonSettingsSymbol_1,
  buttonSettingsSymbol_2,
  buttonSettingsSymbol_3,
  buttonSettingsSymbol_4,
  buttonSettingsSymbol_5,
  buttonSettingsSymbol_6,
  buttonSettingsSymbol_7,
  buttonSettingsSymbol_8,
  buttonSettingsSymbol_9,
  buttonSettingsSymbol_10,
  buttonSettingsSymbol_11,
  buttonSettingsSymbol_12,
];

// DIXPER SDK INJECTED CLASS

const dixperPluginSample = new DixperSDKLib({
  pixi: {
    enable: true,
    files: [...images, ...sprites, ...sounds],
  },
});

// INPUTS

const {
  challengeTitle,
  reminderTitle,
  level,
  numberSymbol,
  acceptButtonText,
  declineButtonText,
  textCountdown,
} = DX_INPUTS;

// PIXIJS INITILIZE

dixperPluginSample.onPixiLoad = () => {
  createRandomSymbol();
  switch (level) {
    case 1:
      challengeTime = 30000;
      break;
    case 2:
      challengeTime = 45000;
      break;
    case 3:
      challengeTime = 60000;
      break;
    case 4:
      challengeTime = 75000;
      break;
  }
  createChallenge();
};

// INIT CHALLENGE

dixperPluginSample.initCountdown = () => {
  const countDown = new dxCountDown(
    DX_PIXI,
    "countDown",
    DX_LAYERS.ui,
    3,
    textCountdown,
    {
      position: {
        x: DX_WIDTH / 2,
        y: DX_HEIGHT / 2,
      },
      scale: {
        x: 0.25,
        y: 0.25,
      },
      animationSpeed: 0.5,
    }
  );

  countDown.onOutFinish = () => {
    onChallengeAccepted();
  };
};

dixperPluginSample.onChallengeRejected = () => {
  dixperPluginSample.stopSkill();
};

dixperPluginSample.onChallengeFinish = () => {
  console.log("onChallengeFinish");
  if (!buttonsArray[buttonsArray.length - 1].clicked) {
    createChallengeFail();
    console.log("failed");
  }
};
// setTimeout(
//   () => dixperPluginSample.addParentSkill("zmwKfnd7vzV7HZ07uK3s"),
//   2000
// );

const createChallenge = () => {
  titleChallengePanel = new dxPanel(
    DX_PIXI,
    "halloweenChallenge",
    DX_LAYERS.ui,
    challengeTitle,
    {
      position: {
        x: DX_WIDTH / 2,
        y: 250,
      },
      scale: {
        x: 1,
        y: 1,
      },
      animationSpeed: 0.5,
    }
  );

  acceptButton = new DxButton(
    "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/images/accept_challenge-button.png",
    acceptButtonText,
    {
      isClickable: true,
      controller: {
        isPressable: true,
        button: "FACE_2",
        x: 0,
        y: 50,
      },
      keyboard: {
        isPressable: true,
        button: "Enter",
        x: 0,
        y: 50,
      },
      position: {
        x: DX_WIDTH / 2 - 150,
        y: 450,
      },
      scale: {
        x: 1,
        y: 1,
      },
    }
  );

  declineButton = new DxButton(
    "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/images/decline-challenge-button.png",
    declineButtonText,
    {
      isClickable: true,
      controller: {
        isPressable: true,
        button: "FACE_2",
        x: 50,
        y: 50,
      },
      keyboard: {
        isPressable: true,
        button: "Esc",
        x: 0,
        y: 50,
      },
      position: {
        x: DX_WIDTH / 2 + 150,
        y: 450,
      },
      scale: {
        x: 1,
        y: 1,
      },
    }
  );

  halloweenPanel = new dxPanel(
    DX_PIXI,
    "halloweenCementery",
    DX_LAYERS.ui,
    "",
    {
      position: {
        x: DX_WIDTH / 2,
        y: DX_HEIGHT - 195,
      },
      scale: {
        x: 1,
        y: 1,
      },
      animationSpeed: 0.5,
      zIndex: 99,
    }
  );

  acceptButton.start();
  declineButton.start();

  acceptButton.onClick = (event) => {
    removeChallenge();
    dixperPluginSample.initCountdown();
  };
  declineButton.onClick = (event) => {
    dixperPluginSample.onChallengeRejected();
  };
};

const onChallengeAccepted = () => {
  const interval = 1000;

  timer = new dxTimer(
    DX_PIXI,
    "halloweenTime",
    DX_LAYERS.ui,
    challengeTime,
    interval,
    {
      position: {
        x: 140,
        y: DX_HEIGHT / 2 - 300,
      },
      scale: {
        x: 1,
        y: 1,
      },
      animationSpeed: 0.5,
    }
  );
  timer.onTimerFinish = () => {
    dixperPluginSample.onChallengeFinish();
    console.log("fin skill");
  };

  reminder = new dxPanel(
    DX_PIXI,
    "halloweenReminder",
    DX_LAYERS.ui,
    reminderTitle,
    {
      position: {
        x: 200,
        y: DX_HEIGHT / 2 - 100,
      },
      scale: {
        x: 1,
        y: 1,
      },
      animationSpeed: 0.5,
    }
  );
  init();
};

const removeChallenge = () => {
  titleChallengePanel._destroy();
  acceptButton.remove();
  declineButton.remove();
  halloweenPanel._destroy();
};

const createChallengeSuccess = () => {
  const challengeSuccessSFX = PIXI.sound.Sound.from(sounds[4]);
  challengeSuccessSFX.play({ volume: 0.75 });

  const panelChallengeSuccess = new dxPanel(
    DX_PIXI,
    "newChallengeSuccess",
    DX_LAYERS.ui,
    "",
    {
      position: {
        x: DX_WIDTH / 2,
        y: DX_HEIGHT / 2,
      },
      scale: {
        x: 1,
        y: 1,
      },
      animationSpeed: 0.5,
    }
  );
  setTimeout(() => panelChallengeSuccess.remove(), 500);
  setTimeout(() => dixperPluginSample.stopSkill(), 1000);
};

const createChallengeFail = () => {
  const challengeFailSFX = PIXI.sound.Sound.from(sounds[5]);
  challengeFailSFX.play({ volume: 0.75 });

  const panelChallengeFail = new dxPanel(
    DX_PIXI,
    "newChallengeFail",
    DX_LAYERS.ui,
    "",
    {
      position: {
        x: DX_WIDTH / 2,
        y: DX_HEIGHT / 2,
      },
      scale: {
        x: 1,
        y: 1,
      },
      animationSpeed: 0.5,
    }
  );
  setTimeout(() => panelChallengeFail.remove(), 500);
  setTimeout(() => dixperPluginSample.stopSkill(), 1000);
};

// INIT SKILL
const init = () => {
  // console.log("init");
  console.clear();
  // createReminder();

  //random Order -----------------------
  // createButtons(randomOrder);numberSymbol

  //order button ------------------
  // createButtons(randomSymbol);

  // change first button order
  createButtons(newSymbol);
  createCounterError();
  // onClickSub = dixperPluginSample.onMouseDown$.subscribe(onKeyOrClick);
};

/*
CREATE INIT FUNCTIONS - START
*/
const createRandomSymbol = () => {
  // randomPosition = Math.floor(Math.random() * symbolsOfInvocation.length);
  // randomSymbol = [...symbolsOfInvocation[randomPosition]];
  randomSymbol = [...symbolsOfInvocation[numberSymbol]];

  // set levels system
  // switch (level) {
  //   case 1:
  //     randomPosition = Math.floor(Math.random() * 4);
  //     randomSymbol = [...symbolsOfInvocation[randomPosition]];
  //     break;
  //   case 2:
  //     randomPosition = Math.floor(Math.random() * (7 - 4) + 4);
  //     randomSymbol = [...symbolsOfInvocation[randomPosition]];
  //     break;
  //   case 3:
  //     randomPosition = Math.floor(Math.random() * (10 - 7) + 7);
  //     randomSymbol = [...symbolsOfInvocation[randomPosition]];
  //     break;
  //   case 4:
  //     randomPosition = Math.floor(Math.random() * (13 - 10) + 10);
  //     randomSymbol = [...symbolsOfInvocation[randomPosition]];
  //     break;
  // }

  // // RANDOM ORDER
  // createRandomOrder(randomSymbol);

  // RANDOM START
  createRandomStart(randomSymbol);
};

const createRandomOrder = () => {
  randomOrder = randomSymbol
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
};

const createRandomStart = () => {
  randomStart = Math.floor(Math.random() * randomSymbol.length);

  const newStartSymbol = randomSymbol.splice(randomStart);

  newSymbol = newStartSymbol.concat(randomSymbol);
};

const createButtons = (symbolSelected) => {
  symbolSelected.forEach((current, index) => {
    if (index === 0) {
      button = new DxButton(
        "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/phasmophobia/src/phasmophobia/assets/spritesheets/invisible_sprite.png",
        ``,
        {
          isClickable: true,
          controller: {
            isPressable: true,
            button: "FACE_4",
            x: 0,
            y: 0,
          },
          keyboard: {
            isPressable: true,
            button: current.key,
            x: 0,
            y: 0,
          },
          position: {
            x: current.x,
            y: current.y,
          },
          scale: {
            x: 1,
            y: 1,
          },
        }
      );
      buttonTemplate = new dxButton(DX_PIXI, "drawButton", DX_LAYERS.ui, ``, {
        position: {
          x: current.x,
          y: current.y,
        },
        scale: {
          x: 0.2,
          y: 0.2,
        },
        animationSpeed: 0.5,
        isInteractive: false,
      });
      button.start();
    } else {
      button = new DxButton(
        "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/phasmophobia/src/phasmophobia/assets/spritesheets/invisible_sprite.png",
        ``,
        {
          isClickable: true,
          controller: {
            isPressable: true,
            button: "FACE_4",
            x: 0,
            y: 0,
          },
          keyboard: {
            isPressable: true,
            button: current.key,
            x: 0,
            y: 0,
          },
          position: {
            x: current.x,
            y: current.y,
          },
          scale: {
            x: 0,
            y: 0,
          },
        }
      );
      buttonTemplate = new dxButton(DX_PIXI, "drawButton", DX_LAYERS.ui, ``, {
        position: {
          x: current.x,
          y: current.y,
        },
        scale: {
          x: 0.2,
          y: 0.2,
        },
        animationSpeed: 0.5,
        isInteractive: false,
      });
      button.start();
    }

    buttonsArray.push({
      clicked: false,
      instance: button,
      id: current.id,
      connections: current.connections,
      index,
      key: current.key,
    });
    // console.log("buttonArray", buttonsArray);
  }, {});
  // console.log("buttonsArray", buttonsArray[0].textInstance);
  buttonsArray.forEach((buttonInstance, index) => {
    checkClickButton(buttonInstance, index);
  });
};

const createSoundsSFX = () => {
  countLines++;
  if (countLines % 2 === 0) {
    let randomSFX = Math.floor(Math.random() * 4);
    let writingSFX = PIXI.sound.Sound.from(sounds[randomSFX]);
    writingSFX.play({ volume: 0.75 });
  }
};

const createReminder = () => {
  reminder = new dxPanel(
    DX_PIXI,
    "halloweenRemainderPanel",
    DX_LAYERS.ui,
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

/*
CREATE INIT FUNCTIONS - END
*/
const createLine = (path) => {
  const line = new PIXI.Graphics();
  line.lineStyle(5);
  line.beginFill(0x650a5a, 0.75);
  line.drawPolygon(path);
  DX_LAYERS.ui.addChild(line);

  createSoundsSFX();
};

const createPointDraw = (x, y) => {
  const pointDraw = new PIXI.Sprite.from(DX_PIXI.resources.drawClick.texture);
  pointDraw.x = x;
  pointDraw.y = y;
  pointDraw.scale = { x: 0.5, y: 0.5 };
  pointDraw.anchor = { x: 0.5, y: 0.5 };

  return pointDraw;
};

const createFirstPointDraw = (x, y) => {
  const pointDraw = new PIXI.Sprite.from(DX_PIXI.resources.drawClick.texture);
  pointDraw.x = x;
  pointDraw.y = y;
  pointDraw.scale = { x: 0.5, y: 0.5 };
  pointDraw.anchor = { x: 0.5, y: 0.5 };

  return pointDraw;
};

// const onKeyOrClick = (event) => {
// console.log("event", event);
// idForCoordenates += 1;
// let coordenatesSymbol = {
//   x: event.x,
//   y: event.y,
//   id: idForCoordenates,
//   connections: [],
// };
// jsonArray.push(coordenatesSymbol);
// let JsonObject = JSON.stringify(jsonArray);
// console.log("Objeto nuevo", JsonObject);
// };

const checkClickButton = (buttonInstance) => {
  buttonInstance.instance.onClick = () => {
    if (buttonInstance.clicked) {
      challengeMarker.changeStatus(counterMarker, "fail");
      counterMarker += 1;
      if (counterMarker === 3) {
        buttonsArray.forEach((element) => {
          element.instance._destroy();
        });
        reminder.remove();
        timer.instance.x = finalPositionTimer;
        setTimeout(() => createChallengeFail(), 500);
      }
    } else if (buttonInstance.index === 0 && buttonInstance.clicked === false) {
      // console.log("---------", buttonInstance.instance);
      buttonInstance.instance.instance.scale.x = 0;
      buttonInstance.instance.instance.scale.y = 0;
      buttonsArray.forEach((elem) => {
        // console.log("elem", elem);
        if (elem.index === buttonInstance.index + 1) {
          // console.log("elemento siguiente", elem);
          elem.instance.instance.scale.x = 1;
          elem.instance.instance.scale.y = 1;
        }
      });
      previousPoint = buttonInstance;
      previousPoint.clicked = true;
      previousCirclePainted = createFirstPointDraw(
        previousPoint.instance._options.position.x,
        previousPoint.instance._options.position.y
      );
      DX_LAYERS.top.addChild(previousCirclePainted);
      // console.log("buttonsArray", buttonsArray);
    } else if (
      buttonInstance.index > 0 &&
      buttonsArray[buttonInstance.index - 1].clicked === true
    ) {
      buttonsArray.forEach((elem) => {
        // console.log("elem", elem);
        if (elem.index === buttonInstance.index + 1) {
          // console.log("elemento siguiente", elem);
          elem.instance.instance.scale.x = 1;
          elem.instance.instance.scale.y = 1;
        }
      });
      currentPoint = buttonInstance;
      currentPoint.clicked = true;
      circlePainted = createPointDraw(
        currentPoint.instance._options.position.x,
        currentPoint.instance._options.position.y
      );
      DX_LAYERS.top.addChild(circlePainted);

      buttonsArray.forEach((element) => {
        if (element.connections.includes(currentPoint.id) && element.clicked) {
          createLine([
            element.instance._options.position.x,
            element.instance._options.position.y,
            currentPoint.instance._options.position.x,
            currentPoint.instance._options.position.y,
          ]);
        }
      });
      previousPoint = currentPoint;
      currentPoint = null;
      // console.log("buttonsArray", buttonsArray);

      if (buttonsArray[buttonsArray.length - 1].clicked) {
        buttonsArray.forEach((element) => {
          console.log("element", element);
          element.instance._destroy();
        });
        reminder.remove();
        timer.instance.x = finalPositionTimer;
        setTimeout(() => createChallengeSuccess(), 1500);
      }
    } else {
      // console.log("error");
      challengeMarker.changeStatus(counterMarker, "fail");
      counterMarker += 1;
      if (counterMarker === 3) {
        buttonsArray.forEach((element) => {
          element.instance._destroy();
        });
        reminder.remove();
        timer.instance.x = finalPositionTimer;
        setTimeout(() => createChallengeFail(), 1000);
      }
    }
  };
};

const createCounterError = () => {
  challengeMarker = new DxChallengeMarker(
    {
      success: {
        img: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/images/counter-error-correct.png",
        sound:
          "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/sounds/successMarkerSFX.mp3",
      },
      fail: {
        img: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/images/counter-error-incorrect.png",
        sound:
          "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/sounds/failMarkerSFX.mp3",
      },
      idle: {
        img: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/halloween/assets/images/counter-error-empty.png",
        sound: "https://pixijs.io/sound/examples/resources/boing.mp3",
      },
    },
    3,
    150,
    {
      position: {
        x: DX_WIDTH / 2,
        y: 100,
      },
      scale: {
        x: 3,
        y: 3,
      },
    }
  );
  challengeMarker.start();
};
