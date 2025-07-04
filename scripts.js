const canvas = document.getElementById('forestCanvas');
const ctx = canvas.getContext('2d');

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

class Leaf {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * -canvas.height; // start above the screen
    this.size = 5 + Math.random() * 5; // smaller leaves (5-10)
    this.speedY = 0.5 + Math.random() * 1.5;
    this.speedX = (Math.random() - 0.5) * 0.7;
    this.angle = Math.random() * 2 * Math.PI;
    this.angleSpeed = (Math.random() - 0.5) * 0.02;
    this.color = `rgba(34, 139, 34, ${0.5 + Math.random() * 0.5})`; // dark green leaves with some transparency
  }

  update() {
    this.y += this.speedY;
    this.x += this.speedX;
    this.angle += this.angleSpeed;

    if (this.y > canvas.height || this.x < -this.size || this.x > canvas.width + this.size) {
      this.reset();
    }
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);

    ctx.fillStyle = this.color;
    ctx.beginPath();
    // Simple leaf shape (ellipse)
    ctx.ellipse(0, 0, this.size * 0.6, this.size * 0.3, 0, 0, 2 * Math.PI);
    ctx.fill();

    ctx.restore();
  }
}

const leaves = [];
const leafCount = 60; // fewer, smaller leaves

for (let i = 0; i < leafCount; i++) {
  leaves.push(new Leaf());
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  leaves.forEach(leaf => {
    leaf.update();
    leaf.draw();
  });

  requestAnimationFrame(animate);
}

animate();
