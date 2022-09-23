const images = [
    {
        name: "tarotFront1",
        url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/origin/halloween-rii/src/halloween/assets/images/tarot-card-0001.png"
    },
    {
        name: "tarotFront2",
        url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/origin/halloween-skills-adri/src/halloween/assets/images/tarot-card-0002.png"
    },
    {
        name: "tarotFront3",
        url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/origin/halloween-skills-adri/src/halloween/assets/images/tarot-card-0003.png"
    },
    {
        name: "tarotFront4",
        url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/origin/halloween-rii/src/halloween/assets/images/tarot-card-0004.png"
    },
    {
        name: "tarotFront5",
        url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/origin/halloween-skills-adri/src/halloween/assets/images/tarot-card-0006.png"
    },
    {
        name: "tarotFront6",
        url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/origin/halloween-rii/src/halloween/assets/images/tarot-card-0007.png"
    },
    {
        name: "tarotFront7",
        url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/origin/halloween-skills-adri/src/halloween/assets/images/tarot-card-0008.png"
    },
    {
        name: "tarotFront8",
        url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/origin/halloween-skills-adri/src/halloween/assets/images/tarot-card-0009.png"
    },
    {
        name: "tarotFront9",
        url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/origin/halloween-rii/src/halloween/assets/images/tarot-card-0010.png"
    },
    {
        name: "tarotFront10",
        url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/origin/halloween-skills-adri/src/halloween/assets/images/tarot-card-0011.png"
    },
    {
        name: "tarotFront11",
        url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/origin/halloween-skills-adri/src/halloween/assets/images/tarot-card-0012.png"
    },
    {
        name: "tarotFront12",
        url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/origin/halloween-skills-adri/src/halloween/assets/images/tarot-card-0013.png"
    },
];

const sprites = [

    {
        name: "invisibleButton",
        url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/phasmophobia/src/phasmophobia/assets/spritesheets/invisible_sprite.json",
    }
];

const sounds = [];


// INPUTS PARAMS

let frontCards = ["tarotFront1", "tarotFront2", "tarotFront3", "tarotFront4", "tarotFront5", "tarotFront6", "tarotFront7", "tarotFront8", "tarotFront9", "tarotFront10", "tarotFront11", "tarotFront12"];
let cardWidth, cardHeigth;
// DIXPER SDK INJECTED CLASS

const dixperPluginSample = new DixperSDKLib({
    pixi: {
        enable: true,
        files: [...images, ...sprites, ...sounds],
    },
});

const gamePadButtons = [
    "FACE_1",
    "FACE_2",
    "FACE_3",
    "FACE_4",
    "RIGHT_SHOULDER",
    "RIGHT_SHOULDER_BOTTOM",
    "LEFT_SHOULDER",
    "LEFT_SHOULDER_BOTTOM",
];

// INPUTS

const { numCards } =
    DX_INPUTS;

// PIXIJS INITILIZE

dixperPluginSample.onPixiLoad = () => {
    console.clear();
    init();
};

const init = () => {
    //CARD WIDTH = 275 || SPACE BETWEEN CARDS = 100
    cardWidth = 275;
    cardHeigth = 487;
    let distanceBetweenCards = 25;
    let totalWidth = cardWidth * numCards + distanceBetweenCards * (numCards - 1);
    let randLucky = Math.floor(Math.random() * numCards);
    for (var i = 0; i < numCards; i++) {
        if (i === randLucky) {
            createCard(DX_WIDTH / 2 - totalWidth / 2 + i * (distanceBetweenCards + cardWidth) + cardWidth / 2, i, true);
        }
        else {
            createCard(DX_WIDTH / 2 - totalWidth / 2 + i * (distanceBetweenCards + cardWidth) + cardWidth / 2, i, false);
        }
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

const createCard = (posX, counter, lucky) => {
    let turn = false;

    //CREATE FRONT
    const card = createFrontImage(posX);

    const button = new DxButton(
        "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/origin/halloween-skills-adri/src/halloween/assets/images/tarot-card-0005.png",
        ``,
        {
            isClickable: true,
            controller: {
                isPressable: true,
                button: `${gamePadButtons[counter]}`,
                x: 0,
                y: 40,
            },
            keyboard: {
                isPressable: true,
                button: `${counter + 1}`,
                x: 0,
                y: 40,
            },
            position: {
                x: posX,
                y: DX_HEIGHT / 2,
            },
            scale: {
                x: 1,
                y: 1,
            },
            hitbox: [-cardWidth / 2, -cardHeigth / 2, cardWidth / 2, -cardHeigth / 2, cardWidth / 2, cardHeigth / 2, -cardWidth / 2, cardHeigth / 2],
            luckyCard: lucky,
        }
    );

    button.start();

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
                cardAction(card);

            } else {
                card.scale.x += 0.01;
            }
        }
    });
}

const cardAction = (card) => {
    if (card._options.luckyCard) {
        console.log("WIIII");
        alert("WIIII");
    }
    else {
        console.log("BOOOH");
        alert("BOOOH");
    }
}