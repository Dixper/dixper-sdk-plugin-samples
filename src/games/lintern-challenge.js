const app = new PIXI.Application();
document.body.appendChild(app.view);

// Inner radius of the circle
const radius = 100;

// The blur amount
const blurSize = 32;

app.loader.add("image", "assets/background.jpg");
app.loader.load(setup);

function setup(loader, resources) {
  const background = new PIXI.Sprite(resources.image.texture);
  app.stage.addChild(background);
  background.width = app.screen.width;
  background.height = app.screen.height;

  const circle = new PIXI.Graphics()
    .beginFill(0xff0000)
    .drawCircle(radius + blurSize, radius + blurSize, radius)
    // .drawRect(-100, -100, 200, 200)
    .endFill();
  circle.filters = [new PIXI.filters.BlurFilter(blurSize)];

  const bounds = new PIXI.Rectangle(
    0,
    0,
    (radius + blurSize) * 2,
    (radius + blurSize) * 2
  );
  const texture = app.renderer.generateTexture(
    circle,
    PIXI.SCALE_MODES.NEAREST,
    1,
    bounds
  );
  const focus = new PIXI.Sprite(texture);

  app.stage.addChild(focus);
  background.mask = focus;

  app.stage.interactive = true;
  app.stage.on("mousemove", pointerMove);

  function pointerMove(event) {
    focus.position.x = event.data.global.x - focus.width / 2;
    focus.position.y = event.data.global.y - focus.height / 2;
  }
}
