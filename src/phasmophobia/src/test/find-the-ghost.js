const images = [];
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
        name: "targetCounter",
        url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/spritesheets/target-counter.json",
    },
];
const sounds = [
    {
        name: "targetCounterHitSound",
        url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/sounds/counter-target-hit.mp3",
    },
];

let intervalSub, intervalSub2;
let targetCounterPanel;
let cursor;
let lives;
let playing;
let level;

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
    targetCounterPanel.remove();
};

const init = () => {
    lives = 3;
    level = 1;
    playing = true;

    createReminder();
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

    targetCounterPanel = new dxCounter(
        DX_PIXI,
        "targetCounter",
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
        createTarget(
            DX_WIDTH,
            Math.floor(Math.random() * (DX_HEIGHT - 100) + 100)
        );
    });
};

const levelUp = () => {
    level++;
    if (level > challengeTime / 10000) {
        dixperPluginSample.challengeSuccess();
        playing = false;
    }
}
const createTarget = (x, y) => {
    const target = new dxButton(
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
        }
    );

    let removed = false;

    dixperPluginSample.pixi.ticker.add(() => {
        if (target && !removed && playing) {
            if (target.instance.position.x < 50) {
                removed = true;
                target.remove();
                target._destroy();
                if (lives > 1) {
                    lives--;
                    targetCounterPanel.decrementCount();
                }
                else {
                    playing = false;
                    dixperPluginSample.challengeFail();
                }
            } else {
                target.instance.position.x -= (2 + level);
            }
        }
        if (!playing) {
            target._destroy();
            target.remove();
        }
    });

    target.onClick = (event) => {
        target.instance.interactive = false;
        target.instance.animationSpeed = 2;
        target.remove();
        target._destroy();
        removed = true;
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