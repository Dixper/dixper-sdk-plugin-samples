const app = new PIXI.Application();
document.body.appendChild(app.view);

app.loader.add("transparent", "assets/transparent-background.png");
app.loader.load(setup);

function setup(loader, resources) {
  const backgroundTransparent = new PIXI.Sprite(resources.transparent.texture);
  app.stage.addChild(backgroundTransparent);
  backgroundTransparent.width = app.screen.width;
  backgroundTransparent.height = app.screen.height;

  // const backgroundTransparent = new PIXI.Graphics();

  // backgroundTransparent.x = 0;
  // backgroundTransparent.y = 0;
  // backgroundTransparent.alpha = 0;

  // backgroundTransparent.beginFill(0xff0000);
  // backgroundTransparent.drawRect(0, 0, app.screen.width, app.screen.height);
  // backgroundTransparent.endFill();

  // app.stage.addChild(backgroundTransparent);

  const scope = new PIXI.Sprite.from("assets/CIRCULO_00021.png");
  scope.width = 1000;
  scope.height = 1000;
  scope.x = app.screen.width / 2;
  scope.y = app.screen.height / 2;
  scope.anchor.set(0.5);

  app.stage.addChild(scope);

  const hole = new PIXI.Graphics()
    .beginFill(0xff0000)
    .drawRect(0, 0, 1000, 1000)
    .endFill();

  const texture = app.renderer.generateTexture(
    hole,
    PIXI.SCALE_MODES.NEAREST,
    1
  );
  const focus = new PIXI.Sprite(texture);

  app.stage.addChild(focus);
  backgroundTransparent.mask = focus;
  focus.position.x = app.screen.width / 2;
  focus.position.y = app.screen.height / 2;
  focus.anchor.set(0.5);

  app.stage.interactive = true;
  document.addEventListener("pointerdown", onClick);

  function onClick(event) {
    focus.scale.x *= 0.75;
    focus.scale.y *= 0.75;
    scope.scale.x *= 0.75;
    scope.scale.y *= 0.75;

    backgroundTransparent.mask = focus;
  }
}
