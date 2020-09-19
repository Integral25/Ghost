var door, ghost, tower, climber, ghostStandingImage, towerImage, doorImage, climberImage, ghostJumpingImage, randomDoorX, doorGroup, climberGroup;

var PLAY = 1, END = 0;
var gameState = PLAY;

function preload() {
  climberImage = loadImage("climber.png");
  ghostStandingImage = loadImage("ghost-standing.png");
  ghostJumpingImage = loadImage("ghost-jumping.png");
  doorImage = loadImage("door.png");
  towerImage = loadImage("tower.png");
}

function setup() {
  tower = createSprite(300, 300, 1, 1);
  tower.addImage(towerImage);
  ghost = createSprite(300, 200, 1, 1);
  ghost.addImage(ghostStandingImage);
  ghost.scale = 0.5;
  
  doorGroup = new Group();
  climberGroup = new Group();
}

function draw() {
  createCanvas(600, 600);
  background(220);
  //if (gameState === PLAY) {
  tower.velocityY = 5;
  
  if (gameState === PLAY) {
  
  if (tower.y > 599) {
    tower.y = 300;
  }
  
  if (keyDown("space")) {
    ghost.velocityY = -7;
  }
  
  if(keyDown("left_arrow")) {
     ghost.x = ghost.x - 2;
  }
  
  if(keyDown("right_arrow")) {
     ghost.x = ghost.x + 2;
  }
  
  if(ghost.isTouching(doorGroup)||ghost.isTouching(climberGroup)||ghost.y>600) {
    ghost.destroy();
    doorGroup.destroyEach();
    climberGroup.destroyEach();
    tower.velocityY = 0;
    gameState = END;
  }
  ghost.velocityY = ghost.velocityY + 0.4;
  
  console.log(frameCount);
  spawnDoor();
  }
  
  drawSprites();
  
  if (gameState === END) {
    background("black");
    fill("yellow");
    textSize(50);
    text("Game Over", 150, 300);
  }
}

function spawnDoor() {
  if (frameCount%250 === 0) {
    randomDoorX = Math.round(random(100, 500));
    door = createSprite(randomDoorX, 0, 1, 1);
    door.addImage(doorImage);
    door.velocityY = 5;
    climber = createSprite(door.x, door.y + 50, 1, 1);
    climber.addImage(climberImage);
    climber.velocityY = door.velocityY;
    doorGroup.add(door);
    climberGroup.add(climber);
  }
}

