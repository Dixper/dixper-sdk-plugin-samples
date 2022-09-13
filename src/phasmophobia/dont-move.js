const images = [
    {
        name: "fissure",
        url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/0bb845b328d82c1f47e5b7f5e3b4a09af8faa3a4/src/samples/assets/images/fissure.png",
    }];
const sprites = [
    {
        name: "crucifix",
        url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/phasmophobia/src/phasmophobia/assets/spritesheets/crucifijo.json",
    }
];
const sounds = [
    "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/sounds/target-appear.mp3"
];

//VARIABLES


// INPUTS PARAMS

let clickKey,
    reminderTitle,
    reminder;

// DIXPER SDK INJECTED CLASS

const dixperPluginSample = new DixperSDKLib({
    pixi: {
        enable: true,
        files: [...images, ...sprites, ...sounds],
    },
});

// INPUTS

dixperPluginSample.inputs$.subscribe((inputs) => {
    console.log("inputs", inputs);
    clickKey = inputs.clickKey || 1;
    reminderTitle = inputs.reminderTitle || "Stay or turn?";
});

// INIT CHALLENGE

dixperPluginSample.onPixiLoad = () => {
    init();
};

const init = () => {
    blockInputs();
    setTimeout(() => createReminder(), 5000);

};

const blockInputs = () => {
    //Block WASD
    dixperPluginSample.addParentSkill("XbRBE0EPVPXovsd2mv4x");
    //Block control
    dixperPluginSample.addParentSkill("5mQsDAFKTmhFrp9Un5Zk");
    //Block space
    dixperPluginSample.addParentSkill("YFYs7hBKDoqnitmgcfcG");
    //Block mouse
    dixperPluginSample.addParentSkill("6xYrQOjA3AibxYKLEK7D");
}

const createReminder = (scale_x = 0.5, scale_y = 0.5) => {
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
                x: scale_x,
                y: scale_y,
            },
            animationSpeed: 0.5,
        }
    );
};