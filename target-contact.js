const myGameArea = {
    canvas: document.createElement('canvas'),
    frames: 0,
    start: function () {
      this.canvas.width = 1920;
      this.canvas.height = 1080;
      this.context = this.canvas.getContext('2d');
      document.body.insertBefore(this.canvas, document.body.childNodes[0]);
      this.interval = setInterval(updateGameArea, 20);
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop: function () {
        clearInterval(this.interval);
    },
    score: function () {
        const points = Math.floor(this.frames / 5);
        this.context.font = '60px serif';
        this.context.fillStyle = 'black';
        this.context.fillText(`Score: ${points}`, 1300, 80);
    },
  };

  class Component {
    constructor(width, height, color, x, y) {
        this.width = width
        this.height = height
        this.color = color
        this.x = x
        this.y = y

        this.speedX = 0
        this.speedY = 0
    }

    newPos() {
        this.x = this.speedX
        this.y = this.speedY
    }

    update() {
        const ctx =  myGameArea.context
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }

    left() {
        return this.x;
      }
      right() {
        return this.x + this.width;
      }
      top() {
        return this.y;
      }
      bottom() {
        return this.y + this.height;
      }
     
      crashWith(obstacle) {
        return !(this.bottom() < obstacle.top() || this.top() > obstacle.bottom() || this.right() < obstacle.left() || this.left() > obstacle.right());
      }
  }

  const player = new Component(30, 30, 'red', 10, 10)

  function updateGameArea() {
    myGameArea.clear();
    player.newPos();
    player.update();
  }

  myGameArea.start();

  document.addEventListener('mousemove', (e) => {
    player.speedX = e.clientX
    player.speedY = e.clientY
  })

  function updateGameArea() {
    myGameArea.clear();
    player.newPos();
    player.update();
    updateObstacles();
    checkGameOver();
    myGameArea.score();
  }

  const myObstacles = [];

  function updateObstacles() {
    for (i = 0; i < myObstacles.length; i++) {
        myObstacles[i].update();  
      }
    myGameArea.frames += 1;
    if (myGameArea.frames % 120 === 0) {
      let x = getRandomX();
      let y = getRandomY();
      
      newTarget = new Component( 50, 50, 'blue', x, y)
      myObstacles.push(newTarget)
    }
  };

  function getRandomX() {
      const random = Math.floor(Math.random() * myGameArea.canvas.width)
      return random
  }

  function getRandomY() {
    const random = Math.floor(Math.random() * myGameArea.canvas.height)
    return random
  }
  
  function checkGameOver() {
    const crashed = myObstacles.some(function (obstacle) {
      return player.crashWith(obstacle); 
    });

    if (crashed) {
      myObstacles.splice(myObstacles.i, 1)
      //fix 
  }
}