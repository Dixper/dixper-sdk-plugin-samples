const images = [
    {
        name: "player",
        url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/origin/phasmophobia-adri-skills/src/phasmophobia/assets/images/voodoo-doll.png"
    }
];
const sprites = [

];
const sounds = [
];

//INPUTS PARAMS
let reminder;
let imageIdx;
let initialImage;
let challengeText;

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
    challengeTime,
    reminderTitle,
} = DX_INPUTS;

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
    reminder.remove();
};

const init = () => {
    createReminder();
};

const createReminder = () => {
    reminder = new dxPanel(
        DX_PIXI,
        "reminder",
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

const showInitialImage = () => {
    imageIdx = Math.random() * images.length;
    initialImage = new PIXI.Sprite.from(images[imageIdx].texture);
    initialImage.x = DX_WIDTH / 2;
    initialImage.y = 200;

    challengeText = new PIXI.Text('Basic text in pixi');
    basicText.x = 50;
    basicText.y = 100;

    DX_PIXI.stage.addChild(text);
}

const setText = () => {

}