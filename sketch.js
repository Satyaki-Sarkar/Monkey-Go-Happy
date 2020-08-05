var monkey,Monkey,Banana,Stone,Jungle,jungle,monkey_1;
var stoneGroup,bananaGroup;
var ground,lifetime;
var SERVE,PLAY,END,gameState;

function preload(){
  Monkey=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
                       
  Banana=loadImage("banana.png");
  
  Stone=loadImage("stone.png");
  
  Jungle=loadImage("jungle.png");
  
  monkey_1=loadImage("monkey_1.png");
}
function setup() {
  createCanvas(400, 400);
  
  SERVE=2;
  PLAY=1;
  END=0;
  gameState=SERVE; 
  
  bananaGroup=new Group();
  stoneGroup=new Group();
  
  monkey=createSprite(35,350,10,10);
  monkey.addAnimation("Monkey",Monkey);
  monkey.addAnimation("monkey_1",monkey_1);
  monkey.scale=0.1;
  
  ground=createSprite(200,390,800,20);
  ground.shapeColor="brown";
  
  jungle=createSprite(200,200,10,10);
  jungle.addAnimation("Jungle",Jungle);
  jungle.depth=-100/0;
  jungle.scale=2;
  
}

function draw() {
  background("White");
    if(gameState===SERVE){
    //Resetting the animation of the monkey
      monkey.changeAnimation("Monkey");
      monkey.x=35;
      monkey.y=350;
    
    if(keyWentDown("space")){
        gameState=PLAY;
    }
    
    //initialising the lifetime
      lifetime=300;
      
  }else if(gameState===PLAY){
    //deploying the stones and bananas
      deployingStones();
      deployingBanana();
      
      //Adding velocity to ground
        ground.velocityX=-5-(lifetime/200);
        if(ground.x<0){  
          ground.x=ground.width/2;
        }
      
      if(World.frameCount%4===0){
        lifetime--;
      }
      
    //making bananas move along X axis as touching the ground
      for(var i=0; i<bananaGroup.length; i++){
        var banana=bananaGroup.get(i);
        if(banana.isTouching(ground)){
          banana.collide(ground);
          banana.velocityX=-5-(lifetime/200);
        }
        if(banana.isTouching(monkey)){
          lifetime=lifetime+20;
          banana.destroy();            
        }
        if(banana.isTouching(stoneGroup)){
          banana.destroy();
        }
      }
      
      //extracting each stone
        for(var s=0;s<stoneGroup.length; s++){
          var stone=stoneGroup.get(s);
          if(monkey.isTouching(stone)){
            gameState=END;
          }
        }
    
    //Changing to end
    if(lifetime===0){
      gameState=END;
    }
    //setting velocity to ground
      if(keyDown("space") && monkey.collide(ground)){
        monkey.velocityY=-15;
      }
    
    //setting gravity to monkey
      monkey.velocityY=monkey.velocityY+1;
      
    //setting the monkey on ground
      monkey.collide(ground);
  }else if(gameState===END){
    
  //Stopping the ground
    ground.velocityX=0;
    
  //Changing the animation of the monkey
    monkey.changeAnimation("monkey_1");
    monkey.x=200;
    monkey.y=200;
    
  //Destroying the Stones and Bananas  
    bananaGroup.destroyEach();
    stoneGroup.destroyEach();
    
  //Restarting the game
    if(keyWentDown("space")){
      gameState=SERVE;
    }
  }
  
  drawSprites();
  
  if(gameState===SERVE){
    //displaying orders for starting
      textFont("Gregorian");
      textSize(30);
      strokeWeight(20);
      fill("yellow");
      text("Press Space to Start!!",80,100);
      text("You have lifetime of 300",50,200);
      text("If you touch the rocks you lose",20,250);
      text("Press Space to jump.",5,50);
      textSize(18);
      text("Each Banana you pick your lifetime increases by 20",10,150);
      textSize(25);
      text("If lifetime becomes zero you lose",30,300);
      
  }
  if(gameState===END){
  //diplaying the text for starting
    textFont("Gregorian");
    textSize(30);
    strokeWeight(20);
    fill("yellow");
    text("Press Space to restart!!",100,150);
  }
  
  textFont("Gregorian");
  textSize(20);
  strokeWeight(40);
  fill("white");
  text("Lifetime:"+lifetime,250,50);
}

function deployingStones(){
if (frameCount%300===0){
  var stone=createSprite(410,365,10,10);
  stone.addAnimation("Stone",Stone);
  stone.scale=0.1;
  stone.velocityX=-5-(lifetime/200);
  stone.lifetime=120;
  
  stoneGroup.add(stone);
  }
}

function deployingBanana(){
  if(frameCount%80===0){
    var rand=random(120,200);
    var banana=createSprite(rand,-10,10,10);
    banana.addAnimation("Banana",Banana);
    banana.scale=0.05;
    banana.setCollider("rectangle",0,0,1000,500,0);
    banana.velocityY=5;
    banana.lifetime=120;
    
    bananaGroup.add(banana);
  }
}
