const images = [
    {
        name: "tarotFront1",
        url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/origin/halloween-skills-adri/src/halloween/assets/images/tarot-front-1.webp"
    },
    {
        name: "tarotBack",
        url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/origin/halloween-skills-adri/src/halloween/assets/images/tarot-back.png"
    },
    {
        name: "invisibleButton",
        url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/phasmophobia/src/phasmophobia/assets/spritesheets/invisible_sprite.json",
    }
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
    PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
    createCard();
}

const createCard = () => {

    console.log("HII");
    let turn = false;
    const card = new PIXI.Sprite.from(DX_PIXI.resources.tarotFront1.texture);
    card.x = DX_WIDTH / 2;
    card.y = DX_HEIGHT / 2;
    card.anchor.set(0.5);
    card.zIndex = 99;

    // card.interactive = true;
    // card.buttonMode = true;
    // card.on('pointerdown', onClick);

    // function onClick() {
    //     console.log("TAP");
    // }
    DX_LAYERS.ui.addChild(card);

    const button = new dxButton(
        dixperPluginSample.pixi,
        "invisibleButton",
        dixperPluginSample.uiLayer,
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
            hitbox: [-190, -350, 190, -350, 190, 350, -190, 350],
        }
    );

    button.onClick = (event) => {
        button.instance.interactive = false;
        turn = true;
        button.remove();
    };


    dixperPluginSample.pixi.ticker.add(() => {
        if (card && turn) {
            if (card.scale.x < 0) {

                dixperPluginSample.pixi.ticker.stop();
                turn = false;
            } else {
                card.scale.x -= 0.01;
            }
        }
    });


}