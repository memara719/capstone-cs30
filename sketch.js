let cueBall;
let cueBallVelocity;
let balls = [];
let isDragging = false;
let dragStart;

function setup() {
  createCanvas(windowWidth, windowHeight);
  cueBall = createVector(width / 4, height / 2);
  cueBallVelocity = createVector(0, 0); 
  setupBalls();
}
function draw() {
  background(51, 105, 30); 

  
  stroke(255);
  strokeWeight(4);
  noFill();
  rect(10, 10, width - 20, height - 20);

  
  if (isDragging && p5.Vector.dist(dragStart, cueBall) > 10) {
    drawAimingLine(cueBall, createVector(mouseX, mouseY));
  }


  cueBall.add(cueBallVelocity);
  applyFriction();
  handleCollisions();
  fill(255);
  ellipse(cueBall.x, cueBall.y, 20, 20);


  for (let ball of balls) {
    fill(ball.color);
    ellipse(ball.position.x, ball.position.y, 20, 20);
  }
}

function mousePressed() {

  if (p5.Vector.dist(createVector(mouseX, mouseY), cueBall) < 10) {
    isDragging = true;
    dragStart = createVector(mouseX, mouseY);
  }
}

function mouseReleased() {
 
  if (isDragging) {
    let dragEnd = createVector(mouseX, mouseY);
    let force = p5.Vector.sub(dragStart, dragEnd);
    force.setMag(force.mag() / 100); 
    cueBallVelocity.add(force);
  }
  isDragging = false;
}

function drawAimingLine(start, end) {
  stroke(255, 0, 0);
  strokeWeight(2);
  line(start.x, start.y, end.x, end.y);
}

function applyFriction() {
  let friction = cueBallVelocity.copy();
  friction.mult(-0.02);
  cueBallVelocity.add(friction);
}

function handleCollisions() {
  // Reflect the velocity vector when the ball hits a boundary
  if (cueBall.x <= 10 || cueBall.x >= width - 10) {
    cueBallVelocity.x *= -1;
    cueBall.x = constrain(cueBall.x, 10, width - 10);
  }
  if (cueBall.y <= 10 || cueBall.y >= height - 10) {
    cueBallVelocity.y *= -1;
    cueBall.y = constrain(cueBall.y, 10, height - 10);
  }
}
function setupBalls() {

  let startX = width * 0.75;
  let startY = height / 2;
  let rows = 5;
  let ballDiameter = 20;



  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < i + 1; j++) {
      let x = startX + (i * (ballDiameter + 2));
      let y = startY - (i * (ballDiameter + 2) / 2) + (j * (ballDiameter + 2));
      balls.push({ position: createVector(x, y), color: [random(255), random(255), random(255)] });
    }
  }
}