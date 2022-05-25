const canvas = document.getElementById('test-site');
const ctx = canvas.getContext('2d')

// cambiar por una imagen  
// a;adir final del juego

let gravity = 0.1;

const ball = {
    x: 100,
    y: 100,
    vx: 5,
    vy: 2,
    radius: 25,
    color: 'black',
    userPull: 0,
    draw: function () {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.fillStyle = this.color;
      ctx.fill();
    }
  };


  ball.draw();

  function update() {
      ctx.clearRect(0,0, canvas.width, canvas.height)
      ball.draw()
      ball.vy += gravity - ball.userPull
      ball.x += ball.vx
      ball.y += ball.vy

      hitBottom();

      if (ball.x + ball.vx > canvas.width || ball.x + ball.vx < 0) {
        ball.vx *= -1;
      }
  }

  setInterval(update, 10)


  // document.getElementById('faster').onclick = function () {
  //   ball.vx *= 1.1;
  // };
  
  // document.getElementById('slower').onclick = function () {
  //   ball.vx *= 0.9;
  // };
  
  function hitBottom(){
      let rockbottom = canvas.height - ball.radius
    if (ball.y > rockbottom) {
        ball.y = rockbottom;
        clearInterval(intervalId)
    }
  }

  document.onkeydown = function (e) {
    if (e.keyCode == 32) {
      ball.userPull = 0.3;
    }
  };
   
  document.onkeyup = function (e) {
    if (e.keyCode == 32) {
      ball.userPull = 0;
    }
  };