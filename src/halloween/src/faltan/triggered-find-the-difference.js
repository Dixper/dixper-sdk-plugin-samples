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
let container;
let firstCard;
let cardsList;
let cardsPlaced = [];
let score;
let cardsTurned;

// DIXPER SDK INJECTED CLASS

const dixperPluginSample = new DixperSDKLib({
    pixi: {
        enable: true,
        files: [...images, ...sprites, ...sounds],
    },
});

// INPUTS

const { rows, columns } =
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
    score = 0;
    cardsTurned = 0;
    //Create default array position
    cardsList = new Array(rows);
    for (let i = 0; i < cardsList.length; i++) {
        cardsList[i] = new Array(columns);
    }



    //CREATE CARDS IN RANDOM POSITIONS
    for (let i = 0; i < (rows * columns / 2); i++) {
        let setted = 0;
        while (setted < 2) {
            var rowIdx = Math.floor(Math.random() * rows);
            var columnIdx = Math.floor(Math.random() * columns);
            if (cardsList[rowIdx][columnIdx] === undefined) {
                cardsList[rowIdx][columnIdx] = 1;
                createCard(DX_WIDTH / 2 - 400 + rowIdx * 400, DX_HEIGHT / 2 - 400 + columnIdx * 400, i);
                setted++;
            }
        }
    }


}


const createFrontImage = (posX, posY, imageIdx) => {
    const card = new PIXI.Sprite.from(DX_PIXI.resources[frontCards[imageIdx]].texture);
    card.scale.x = 0;
    card.x = posX;
    card.y = posY;
    card.anchor.set(0.5);
    card.zIndex = 99;
    card.name = frontCards[imageIdx];
    card.frontReturn = false;

    DX_LAYERS.ui.addChild(card);


    return card
}

const createCard = (posX, posY, imageIdx) => {
    let turn = false;
    //CREATE FRONT
    const card = createFrontImage(posX, posY, imageIdx);

    //CREATE BACK
    const button = new dxButton(
        DX_PIXI,
        "tarotBack",
        DX_LAYERS.ui,
        "",
        {
            position: {
                x: posX,
                y: posY,
            },
            scale: {
                x: 1,
                y: 1,
            },
            hitbox: [-190, -350, 190, -350, 190, 350, -190, 350],
        }
    );

    button.onClick = (event) => {
        if (cardsTurned < 2) {
            turn = true;
            cardsTurned++;
        }
    };

    let appear = false;

    dixperPluginSample.pixi.ticker.add(() => {
        //ANIMATION TO TURN
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
        //ANIMATION TO RETURN
        else if (card && card.frontReturn) {
            if (card.scale.x < 0) {
                card.frontReturn = false;
                card.backReturn = true;

            } else {
                card.scale.x -= 0.01;
            }
        }
        else if (card && card.backReturn) {
            if (button.instance.scale.x > 1) {
                card.frontReturn = false;
                card.backReturn = false;
                cardsTurned--;

            } else {
                button.instance.scale.x += 0.01;
            }
        }
    });
    cardsPlaced.push(card);
}

const cardAction = (card) => {
    //CHECK FIRST CARD
    if (firstCard === undefined) {
        firstCard = card.name;
    }
    //CHECK SECOND CARD
    else {

        if (firstCard === card.name) {
            cardsPlaced.forEach(element => {
                if (firstCard === element.name) {
                    element.destroy();
                }
            });
            firstCard = undefined;


            if (score === rows * columns / 2) {
                dixperPluginSample.stopSkill();
            }
            else {
                score++;
                cardsTurned = 0;
            }
        }
        else {
            card.frontReturn = true;
            cardsPlaced.forEach(element => {
                if (firstCard === element.name) {
                    element.frontReturn = true;
                }
            });
            firstCard = undefined;
        }
    }
}