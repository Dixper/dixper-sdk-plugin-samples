const images = [
    {
        name: "tarotFront1",
        url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/origin/halloween-skills-adri/src/halloween/assets/images/tarot-front-1.webp"
    },
    {
        name: "tarotBack",
        url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/origin/halloween-skills-adri/src/halloween/assets/images/tarot-back.png"
    },
];

const sprites = [];

const sounds = [];


// INPUTS PARAMS



// DIXPER SDK INJECTED CLASS

const dixperPluginSample = new DixperSDKLib({
    pixi: {
        enable: true,
        files: [...images, ...sprites, ...sounds],
    },
});

// INPUTS

const { } =
    DX_INPUTS;

// PIXIJS INITILIZE

dixperPluginSample.onPixiLoad = () => {
    init();
    //dixperPluginSample.initChallenge(challengeTitle, challengeTime);
};

// INIT CHALLENGE

dixperPluginSample.onChallengeAccepted = () => {
    init();
};

dixperPluginSample.onChallengeRejected = () => {
    dixperPluginSample.stopSkill();
};

dixperPluginSample.onChallengeFinish = () => {
};

const init = () => {

    turnCard();
}

const turnCard = () => {

    const card = new PIXI.Sprite.from(DX_PIXI.resources.tarotFront1.texture);
    card.x = DX_WIDTH / 2;
    card.y = DX_HEIGHT / 2;
    card.anchor.set(0.5);
    card.zIndex = 99;

    DX_LAYERS.top.addChild(card);
    console.log("HI");

    let turned = false;
    card.onClick = (event) => {
        dixperPluginSample.pixi.ticker.start();
        turned = true;
    }
    dixperPluginSample.pixi.ticker.add(() => {
        if (card && turned) {
            if (card.scale.x == 0) {

                dixperPluginSample.pixi.ticker.stop();
                console.log(turned);
            } else {
                card.scale.x -= 0.995;
            }
        }
    });
}
