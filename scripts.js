const canvas = document.getElementById('forestCanvas');
const ctx = canvas.getContext('2d');

// Resize the canvas to always fill the window
function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

// Leaf class definition
class Leaf {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * -canvas.height; // Start above the screen
    this.size = 10 + Math.random() * 10; // Bigger leaves (10–20)
    this.speedY = 0.5 + Math.random() * 1.5;
    this.speedX = (Math.random() - 0.5) * 0.7;
    this.angle = Math.random() * 2 * Math.PI;
    this.angleSpeed = (Math.random() - 0.5) * 0.02;
    this.color = `rgba(34, 139, 34, ${0.5 + Math.random() * 0.5})`; // Dark green with some transparency
  }

  update() {
    this.y += this.speedY;
    this.x += this.speedX;
    this.angle += this.angleSpeed;

    // Reset if out of bounds
    if (
      this.y > canvas.height ||
      this.x < -this.size ||
      this.x > canvas.width + this.size
    ) {
      this.reset();
    }
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);

    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.ellipse(0, 0, this.size * 0.6, this.size * 0.3, 0, 0, 2 * Math.PI);
    ctx.fill();

    ctx.restore();
  }
}

// Create leaf instances
const leaves = [];
const leafCount = 60; // Number of leaves

for (let i = 0; i < leafCount; i++) {
  leaves.push(new Leaf());
}

// Animation loop
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  leaves.forEach((leaf) => {
    leaf.update();
    leaf.draw();
  });

  requestAnimationFrame(animate);
}

animate();
