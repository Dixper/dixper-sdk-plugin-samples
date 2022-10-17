const images = [
    {
        name: "player",
        url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/origin/phasmophobia-adri-skills/src/phasmophobia/assets/images/voodoo-doll.png"
    }
];
const sprites = [
    {
        name: "crosshair",
        url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/spritesheets/crosshair.json",
    },
    {
        name: "target",
        url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/spritesheets/definitive-target.json",
    },
    {
        name: "lifeCounter",
        url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/spritesheets/target-counter.json",
    },
    {
        name: "invisibleButton",
        url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/phasmophobia/src/phasmophobia/assets/spritesheets/invisible_sprite.json",
    },
];
const sounds = [
    {
        name: "targetCounterHitSound",
        url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/sounds/counter-target-hit.mp3",
    },
];

let intervalSub, intervalSub2, cursorPosSub;
let lifeCounterPanel;
let cursor;
let lives;
let playing;
let level;
let player, playerContainer;

//INPUTS PARAMS
let reminder;

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
    cursor.remove();
    intervalSub.unsubscribe();
    intervalSub2.unsubscribe();
    reminder.remove();
    lifeCounterPanel.remove();
    player._destroy();
};

const init = () => {
    lives = 3;
    level = 1;
    playing = true;
    createPlayer();
    createReminder();
    cursorPosSub = dixperPluginSample.onMouseMove$.subscribe(onMove);
    console.log(reminder);
    cursor = new dxCursor(
        DX_PIXI,
        "crosshair",
        DX_LAYERS.ui,
        {
            parentLayer: dixperPluginSample.topLayer,
            anchor: {
                x: 0.5,
                y: 0.5,
            },
        }
    );

    lifeCounterPanel = new dxCounter(
        DX_PIXI,
        "lifeCounter",
        DX_LAYERS.ui,
        lives,
        lives,
        {
            position: {
                x: (3 * DX_WIDTH) / 4 - 100,
                y: 100,
            },
            animationSpeed: 0.5,
        }
    );
    intervalSub2 = interval(10000).subscribe((x) => {
        levelUp();
    });
    intervalSub = interval((Math.random() * 2000 + 1500) / (level * 3)).subscribe((x) => {
        let rnd = getRandomNumBetween2Num(1, 4);
        switch (rnd) {
            case 1: //TOP
                createEnemies(
                    Math.floor(Math.random() * (DX_HEIGHT - 100) + 100),
                    0
                );
                break;
            case 2: //RIGHT
                createEnemies(
                    DX_WIDTH,
                    Math.floor(Math.random() * (DX_HEIGHT - 100) + 100)
                );
                break;
            case 3: //BOTTOM
                createEnemies(
                    Math.floor(Math.random() * (DX_HEIGHT - 100) + 100),
                    DX_HEIGHT
                );
                break;
            case 4: //LEFT
                createEnemies(
                    0,
                    Math.floor(Math.random() * (DX_HEIGHT - 100) + 100)
                );
                break;
        }

    });
};

const levelUp = () => {
    level++;
    if (level > challengeTime / 10000) {
        dixperPluginSample.challengeSuccess();
        playing = false;
    }
}
const createEnemies = (x, y) => {
    const enemy = new dxButton(
        DX_PIXI,
        "target",
        DX_LAYERS.ui,
        "",
        {
            position: {
                x,
                y,
            },
            scale: {
                x: 1,
                y: 1,
            },
            animationSpeed: 0.5,
            hitbox: [-41, -5, -8, -28, 22, -25, 41, 13, 14, 38, -30, 25],
        },
    );
    console.log(enemy);

    //Let's calculate the speed vector
    let dir = {
        x: ((DX_WIDTH / 2) - enemy.instance.position.x)/* / Math.abs((DX_WIDTH / 2) - enemy.instance.position.x)*/,
        y: ((DX_HEIGHT / 2) - enemy.instance.position.y)/* / Math.abs((DX_HEIGHT / 2) - enemy.instance.position.y)*/,
    }
    let speed = level;
    let factor = speed / Math.sqrt(Math.pow(dir.x, 2) + Math.pow(dir.y, 2));
    let vel = {
        x: dir.x * factor,
        y: dir.y * factor
    }

    let destroyed = false;
    dixperPluginSample.pixi.ticker.add(() => {
        if (enemy && playing && !destroyed) {
            //check if enters in the middle
            if (enemy.instance.position.x < DX_WIDTH / 2 + 100 && enemy.instance.position.y < DX_HEIGHT / 2 + 100 &&
                enemy.instance.position.x < DX_WIDTH / 2 + 100 && enemy.instance.position.y < DX_HEIGHT / 2 + 100 &&
                enemy.instance.position.x > DX_WIDTH / 2 - 100 && enemy.instance.position.y > DX_HEIGHT / 2 - 100 &&
                enemy.instance.position.x > DX_WIDTH / 2 - 100 && enemy.instance.position.y > DX_HEIGHT / 2 - 100) {
                console.log("HIT");
                destroyed = true;
                enemy.remove();
                enemy._destroy();
                if (lives > 1) {
                    console.log(lives);
                    lives--;
                    console.log(lives);
                    lifeCounterPanel.decrementCount();
                }
                else {
                    playing = false;
                    dixperPluginSample.challengeFail();
                }
            } else {
                enemy.instance.position.x += vel.x;
                enemy.instance.position.y += vel.y;
            }
        }
        if (!playing) {
            enemy._destroy();
            enemy.remove();
        }
    });

    enemy.onClick = (event) => {
        console.log("PIUM");
        enemy.instance.interactive = false;
        enemy.instance.animationSpeed = 2;
        destroyed = true;
        enemy.remove();
        enemy._destroy();
    };
}

const createReminder = () => {
    reminder = new dxPanel(
        DX_PIXI,
        "reminder",
        DX_LAYERS.ui,
        lives + "/3",
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

const getRandomNumBetween2Num = (min = 5, max = 11) => {
    let diff = max - min
    let rand = Math.floor(Math.random() * diff) + min;
    return rand;
}

const createPlayer = () => {

    playerContainer = new PIXI.Container();
    // Move container to the center
    playerContainer.x = DX_WIDTH / 2;
    playerContainer.y = DX_HEIGHT / 2;

    // Center bunny sprite in local container coordinates
    playerContainer.pivot.x = playerContainer.width / 2;
    playerContainer.pivot.y = playerContainer.height / 2;

    DX_PIXI.stage.addChild(playerContainer);

    player = new PIXI.Sprite.from(
        dixperPluginSample.pixi.resources.player.texture
    );
    player.x = 0;
    player.y = 0;
    player.anchor.set(0.5);
    player.zIndex = 90;
    player.scale = { x: 0.1, y: 0.1 };

    playerContainer.addChild(player);

    //COLLIDER DEBUG
    player = new dxButton(
        DX_PIXI,
        "invisibleButton",
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
            hitbox: [-50, -50, 50, -50, 50, 50, -50, 50],
            debug: true,
        },
    );
}
const onMove = (event) => {
    if (playerContainer != undefined) {
        let u = {
            x: DX_WIDTH / 2,
            y: DX_HEIGHT / 2
        }
        let v = {
            x: event.x,
            y: event.y
        }

        let angle = Math.atan((v.y - u.y) / (v.x - u.x));

        playerContainer.rotation = angle;
    }
}