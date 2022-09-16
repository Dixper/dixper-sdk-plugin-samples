const images = [
    {
        name: "tarotFront1",
        url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/origin/halloween-rii/src/halloween/assets/spritesheets/tarot-front-1.png"
    },
    {
        name: "tarotFront2",
        url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/origin/halloween-rii/src/halloween/assets/spritesheets/tarot-front-2.png"
    },
    {
        name: "tarotFront3",
        url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/origin/halloween-rii/src/halloween/assets/spritesheets/tarot-front-3.png"
    },
];

const sprites = [
    {
        name: "tarotBack",
        url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/origin/halloween-rii/src/halloween/assets/spritesheets/tarot-back.json"
    },

    {
        name: "invisibleButton",
        url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/phasmophobia/src/phasmophobia/assets/spritesheets/invisible_sprite.json",
    }
];

const sounds = [];


// INPUTS PARAMS

let frontCards = ["tarotFront1", "tarotFront2", "tarotFront3"];

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

const createRandomPosition = () => {

}

const createFrontImage = () => {

    let randIdx = Math.floor(Math.rand() * frontCards.length);

    const card = new PIXI.Sprite.from(DX_PIXI.resources.frontCards[randIdx].texture);
    card.x = DX_WIDTH / 2;
    card.y = DX_HEIGHT / 2;
    card.anchor.set(0.5);
    card.zIndex = 99;
    card.scale.x = 0;

    DX_LAYERS.ui.addChild(card);

    frontCards.splice(randIdx, 1);
    return currentValue;
}

const createCard = () => {
    let turn = false;

    //CREATE FRONT
    createFrontImage();


    //CREATE BACK
    const button = new dxButton(
        DX_PIXI,
        "tarotBack",
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
            hitbox: [-190, -350, 190, -350, 190, 350, -190, 350],
        }
    );

    console.log(button);

    button.onClick = (event) => {
        turn = true;
    };

    let appear = false;

    dixperPluginSample.pixi.ticker.add(() => {
        if (button && turn) {
            if (button.instance.scale.x < 0) {
                turn = false;
                appear = true;

            } else {
                button.instance.scale.x -= 0.01;
            }
        }
        else if (card && appear) {
            if (card.scale.x > 1) {
                turn = false;
                appear = false;

            } else {
                card.scale.x += 0.01;
            }
        }
    });
}