const images = [
    {
        name: "tarotFront1",
        url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/origin/halloween-rii/src/halloween/assets/spritesheets/tarot-front-1.png"
    },
    {
        name: "tarotFront2",
        url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/origin/halloween-skills-adri/src/halloween/assets/images/tarot-front-2.png"
    },
    {
        name: "tarotFront3",
        url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/origin/halloween-skills-adri/src/halloween/assets/images/tarot-front-3.png"
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

const { numCards } =
    DX_INPUTS;

// PIXIJS INITILIZE

dixperPluginSample.onPixiLoad = () => {
    console.clear();
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
    for (var i = 0; i < numCards; i++) {
        createCard(DX_WIDTH / 2 - 400 + i * 400);
    }
}


const createFrontImage = (posX) => {

    let randIdx = Math.floor(Math.random() * frontCards.length);
    const card = new PIXI.Sprite.from(DX_PIXI.resources[frontCards[randIdx]].texture);
    card.scale.x = 0;
    card.x = posX;
    card.y = DX_HEIGHT / 2;
    card.anchor.set(0.5);
    card.zIndex = 99;
    card.name = frontCards[randIdx];

    DX_LAYERS.ui.addChild(card);

    frontCards.splice(randIdx, 1);
    return card
}

const createCard = (posX) => {
    let turn = false;

    //CREATE FRONT
    const card = createFrontImage(posX);

    //CREATE BACK
    const button = new dxButton(
        DX_PIXI,
        "tarotBack",
        DX_LAYERS.ui,
        "",
        {
            position: {
                x: posX,
                y: DX_HEIGHT / 2,
            },
            scale: {
                x: 1,
                y: 1,
            },
            hitbox: [-190, -350, 190, -350, 190, 350, -190, 350],
        }
    );

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
                cardAction(card.name);

            } else {
                card.scale.x += 0.01;
            }
        }
    });
}

const cardAction = (cardName) => {
    var actionIdx = Number(cardName.substr(cardName.length - 1));
    if (actionIdx % 2 != 0) {
        console.log("WIIII");
    }
    else {
        console.log("BOOOH");
    }
}