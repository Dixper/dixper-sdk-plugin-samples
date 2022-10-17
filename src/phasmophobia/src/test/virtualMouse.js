const images = [
    {
        name: "vCursor",
        url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/origin/phasmophobia-adri-skills/src/phasmophobia/assets/images/voodoo-doll.png"
    }
];
const sprites = [
    {
        name: "target",
        url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/main/src/fortnite/assets/spritesheets/definitive-target.json",
    },
    {
        name: "starCursor",
        url: "https://raw.githubusercontent.com/Dixper/dixper-sdk-plugin-samples/phasmophobia/src/phasmophobia/assets/spritesheets/star_cursor.json",
    }
];
const sounds = [

];

let vCursor, vCursorContainer, vCursorPosSub, vCursorClick;
let prevPos = {
    x: DX_WIDTH / 2,
    y: DX_HEIGHT / 2
}
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
const { sensibility, tolerance } = DX_INPUTS;

// PIXIJS INITILIZE

dixperPluginSample.onPixiLoad = () => {
    init();
};


const init = () => {
    //vCursorClick = dixperPluginSample.onMouseDown$.subscribe(onClick);
    setvCursor();

    vCursorPosSub = dixperPluginSample.onMouseMove$.subscribe(onMove.bind(this));

    // button = new dxButton(
    //     DX_PIXI,
    //     "target",
    //     DX_LAYERS.ui,
    //     "",
    //     {
    //         position: {
    //             x: 100,
    //             y: 100,
    //         },
    //         scale: {
    //             x: 1,
    //             y: 1,
    //         },
    //         animationSpeed: 0.5,
    //         hitbox: [-41, -5, -8, -28, 22, -25, 41, 13, 14, 38, -30, 25],
    //     },
    // );
};

const setvCursor = () => {
    vCursorContainer = new PIXI.Container();
    DX_PIXI.stage.addChild(vCursorContainer);

    vCursor = new PIXI.Sprite.from(dixperPluginSample.pixi.resources.vCursor.texture);
    vCursor.scale = { x: 0.2, y: 0.2 };

    vCursorContainer.addChild(vCursor);

    vCursorContainer.x = DX_WIDTH / 2;
    vCursorContainer.y = DX_HEIGHT / 2;
    vCursorContainer.pivot.x = vCursorContainer.width / 2;
    vCursorContainer.pivot.y = vCursorContainer.height / 2;
    //     vCursor = new dxCursor(
    //         DX_PIXI,
    //         "starCursor",
    //         DX_LAYERS.ui,
    //         {
    //             parentLayer: dixperPluginSample.topLayer,
    //             anchor: {
    //                 x: 0.5,
    //                 y: 0.5,
    //             },
    //         }
    //     );

    //     console.log(vCursor.instance);
    //     sensibility = 10;
}


const onMove = (event) => {
    if (event.x < DX_WIDTH / 2 - tolerance) {

        vCursorContainer.x -= DX_WIDTH / 2 - event.x;
        //vCursor.instance.x -= sensibility
    }
    else if (event.x > DX_WIDTH / 2 + tolerance) {
        vCursorContainer.x += event.x - DX_WIDTH / 2;
        //vCursor.instance.x += sensibility

    }
    if (event.y < DX_HEIGHT / 2 - tolerance) {
        vCursorContainer.y -= DX_HEIGHT / 2 - event.y;
        //vCursor.instance.y -= sensibility

    }
    else if (event.y > DX_HEIGHT / 2 + tolerance) {
        vCursorContainer.y += event.y - DX_HEIGHT / 2;
        // vCursor.instance.y += sensibility

    }

}

/*const onClick = () => {
    DX_LAYERS.ui.children.forEach(element => {
        console.log(element);
    });

}*/