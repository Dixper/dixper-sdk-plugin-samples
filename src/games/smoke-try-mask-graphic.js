const app = new PIXI.Application({ antialias: true });
document.body.appendChild(app.view);

app.stage.interactive = true;

const container = new PIXI.Container();
container.x = app.screen.width / 2;
container.y = app.screen.height / 2;

// add a bunch of sprites
const bgFront = PIXI.Sprite.from("assets/cofre.png");
bgFront.anchor.set(0.5);

container.addChild(bgFront);

app.stage.addChild(container);

const thing = new PIXI.Graphics();
app.stage.addChild(thing);
thing.x = app.screen.width / 2;
thing.y = app.screen.height / 2;
thing.lineStyle(0);

container.mask = thing;

let count = 0;

document.addEventListener("pointerdown", () => {
  console.log("click");
});

app.ticker.add(() => {
  thing.clear();

  thing.beginFill(0x8bc5ff, 0.4);
  thing.drawRect(-100, -100, 200, 200);
});
