var tower, towerImg;

var door, doorImg, doorGroup;

var climber, climberImg, climberGroup;

var ghost, ghostImg;

var invisibleBlock, invisibleBlockGroup;

var gameState = "PLAY";

var spooky;

function preload(){
  towerImg = loadImage("tower.png");
  
  doorImg = loadImage("door.png");
  
  climberImg = loadImage("climber.png");
  
  ghostImg = loadImage("ghost-standing.png");
  
  spooky = loadSound("spooky.wav");
  
}

function setup(){
  createCanvas(600,600);
  
  spooky.loop();
  
  tower = createSprite(300,300,20,20);
  tower.addImage(towerImg);
  tower.velocityY = 1;
  
  ghost = createSprite(500,300,20,20);
  ghost.addImage(ghostImg);
  ghost.scale = 0.4;
  
  doorGroup = new Group();
  climberGroup = new Group();
  invisibleBlockGroup = new Group();
}

function draw(){
  background(0);
  if(gameState==="PLAY"){
     drawSprites();
    
    if(tower.y > 400){
    tower.y = 300;
  }
  
    doors();
    
    ghost.velocityY = ghost.velocityY+0.5;
  
  if(keyDown("space")){
    ghost.velocityY = -5;
  }
  
  if(keyDown("left_arrow")){
    ghost.x = ghost.x-5;
  }

  if(keyDown("right_arrow")){
    ghost.x = ghost.x+5;
  }
  
  if(climberGroup.isTouching(ghost)){
    ghost.velocityY = 0;
  }
  
  if(invisibleBlockGroup.isTouching(ghost)){
    gameState = "END";
  } if(ghost.y > 600){
    gameState = "END";
  }
  } if(gameState==="END"){
    fill("yellow")
    textSize(20);
    text("GAME OVER",250,255);
  }
  
}

function doors(){
  if(frameCount%300===0){
    door = createSprite(10,-50,20,20);
    door.addImage(doorImg);
    door.x = Math.round(random(100,400));
    door.velocityY = 1;
    door.lifetime = 700;
    
    doorGroup.add(door);
    
    climber = createSprite(10,10,20,20);
    climber.addImage(climberImg);
    climber.x = door.x;
    climber.velocityY = 1;
    climber.lifetime = 700;
    
    climberGroup.add(climber);
    
    ghost.depth = door.depth+1;
    
    invisibleBlock = createSprite(10,15,20,5);
    invisibleBlock.x = climber.x;
    invisibleBlock.velocityY = 1;
    invisibleBlock.width = climber.width
    invisibleBlock.lifetime = 700;
    invisibleBlock.visible = false;
    
    invisibleBlockGroup.add(invisibleBlock);
  }
}