const app = new PIXI.Application({ backgroundColor: 0x1099bb });
document.body.appendChild(app.view);

// Scale mode for all textures, will retain pixelation
PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

const sprite = PIXI.Sprite.from("assets/target-clip.mp4");

// Set the initial position
sprite.anchor.set(0.5);
sprite.x = 50;
sprite.y = 50;

// Opt-in to interactivity
sprite.interactive = true;

// Shows hand cursor
sprite.buttonMode = true;

// Pointers normalize touch and mouse
document.addEventListener("pointerdown", onClick);

// Alternatively, use the mouse & touch events:
// sprite.on('click', onClick); // mouse-only
// sprite.on('tap', onClick); // touch-only

app.stage.addChild(sprite);

function onClick() {
  console.log("sprite", sprite);
  console.log("sprite", sprite.scale);
  console.log("sprite x", sprite.scale.x);
  sprite.scale.x *= 1.25;
  sprite.scale.y *= 1.25;
}
