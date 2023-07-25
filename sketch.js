var PLAY = 1;
var END = 0;
var gameState = PLAY;
var bg, bgImg
var bottomGround
var topGround
var balloon, balloonImg
var obsBottom1,obsBottom2,obsBottom3,obsTop1,obsTop2;
var TopObstacleGroup;
var BottomObstacleGroup;
var gameOver,gameOverImg,restart,restartImg;
var barGroup;
var Jump,die;
var score = 0;





function preload(){
bgImg = loadImage("assets/bg.png")
obsBottom1 = loadImage("assets/obsBottom1.png");
obsBottom2 = loadImage("assets/obsBottom2.png");
obsBottom3 = loadImage("assets/obsBottom3.png");
obsTop1 = loadImage("assets/obsTop1.png");
obsTop2 = loadImage("assets/obsTop2.png");
gameOverImg = loadImage("assets/gameOver.png");
restartImg = loadImage("assets/restart.png");

jump = loadSound("assets/jump.mp3");
die = loadSound("assets/die.mp3");



balloonImg = loadAnimation("assets/balloon1.png","assets/balloon2.png","assets/balloon3.png")
}

function setup(){

//background image
bg = createSprite(165,485,1,1);
bg.addImage(bgImg);
bg.scale = 1.3;

//creating top and bottom grounds
bottomGround = createSprite(200,390,800,20);
bottomGround.visible = false;

topGround = createSprite(200,10,800,20);
topGround.visible = false;
      
//creating balloon     
balloon = createSprite(100,200,20,50);
balloon.addAnimation("balloon",balloonImg);
balloon.scale = 0.2;

//gameover sprite
gameOver = createSprite(220,200);
gameOver.addImage(gameOverImg);
gameOver.scale = 0.5;
gameOver.visible = false;

//restart sprite
restart = createSprite(220,240);
restart.addImage(restartImg);
restart.scale = 0.5;
restart.visible = false;

barGroup = new Group();


TopObstacleGroup = new Group ();
BottomObstacleGroup = new Group();

}

function draw() {
  
  background("black");
        
  
  
          //making the hot air balloon jump
           if(gameState == PLAY){

            
            if(keyDown("space") ) {
              balloon.velocityY = -6 ;
              jump.play();

            
            }
            //adding gravity
           balloon.velocityY = balloon.velocityY + 2;
          bar();
           spawnTopObstacles();
           spawnBottomObstacles();
          
           //checking collision

           if(TopObstacleGroup.isTouching(balloon)
           || BottomObstacleGroup.isTouching(balloon)
           || balloon.isTouching(topGround)
           || balloon.isTouching(bottomGround)){
            gameState = END;
            die.play();
           }
          }
           else if(gameState === END){
          
            gameOver.visible = true;
            gameOver.depth = gameOver.depth+1;
            restart.visible = true;
            restart.depth = restart.depth + 1;

            //all sprites should stop moving in the end state
            balloon.velocityX = 0;
            balloon.velocityY = 0;

            TopObstacleGroup.setVelocityXEach(0);
            BottomObstacleGroup.setVelocityXEach(0);

            TopObstacleGroup.setLifetimeEach(-1);
            BottomObstacleGroup.setLifetimeEach(-1);
            
            balloon.y = 200;
            //reseting the game
            if(mousePressedOver(restart)){
              reset();
            }
            }
           
       
        drawSprites();
        Score();
        
}


function spawnTopObstacles(){
  
  if (frameCount % 40 === 0){
    var TopObstacle = createSprite(400,50,10,40);
    TopObstacle.velocityX = -6;
    TopObstacle.scale = 0.1;
     //generate random obstacles
     var rand = Math.round(random(1,2));
     switch(rand) {
       case 1: TopObstacle.addImage(obsTop1);
               break;
       case 2: TopObstacle.addImage(obsTop2);
               break;
  
       default: break;
     }   
     
     TopObstacle.lifetime = 100;
    balloon.depth = balloon.depth+1;
    TopObstacleGroup.add(TopObstacle);
    
        
  }
}
  

    function spawnBottomObstacles(){
  
      if (frameCount % 40 === 0){
        var BottomObstacle = createSprite(400,350,10,40);
       BottomObstacle.velocityX = -6;
        BottomObstacle.scale = 0.1;
         //generate random obstacles
         var rand = Math.round(random(1,3));
         switch(rand) {
           case 1: BottomObstacle.addImage(obsBottom1);
                   break;
           case 2: BottomObstacle.addImage(obsBottom2);
                   break;
           case 3: BottomObstacle.addImage(obsBottom3);
                   break;
      
           default: break;
         } 
         BottomObstacle.lifetime = 100;
         balloon.depth = balloon.depth+1;
         BottomObstacleGroup.add(BottomObstacle);
        
        }
    }
     function reset(){
      gameState=PLAY;
      gameOver.visible=false;
      restart.visible=false;
      TopObstacleGroup.destroyEach();
      BottomObstacleGroup.destroyEach();
      score = 0;
     }

     function Score(){
      if(balloon.isTouching(barGroup)){
        score = score+1;
      }
      textFont("algerian");
      textSize(30);
      fill ("yellow");
       text("score: "+score,250,50);
     }

     function bar(){
      if(World.frameCount % 60 === 0){
        var bar = createSprite(400,200,10,800);
        bar.velocityX=-6;
        bar.depth = balloon.depth;
        bar.lifetime = 70;
        bar.visible = false;
        barGroup.add(bar);
      }
     }
