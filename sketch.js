var PLAY = 1;
var END = 0;
var gameState = 1;
var sword, swordImage;
var fruit, fruit1Image, fruit2Image, fruit3Image, fruit4Image;
var gameOver, gameOverImage;
var alien, alienImage;
var r, score = 0;
var fruitGroup
var alienGroup

function preload()
{
  swordImage  = loadImage("sword.png");
  fruit1Image = loadImage("fruit1.png");
  fruit2Image = loadImage("fruit2.png");
  fruit3Image = loadImage("fruit3.png");
  fruit4Image = loadImage("fruit4.png");
  alienImage  = loadAnimation("alien1.png","alien2.png");
  gameOverImage = loadImage("gameover.png");
}

function setup()
{
  createCanvas(600,600);
  sword = createSprite(200,200,50,50);
  sword.addImage(swordImage);
  
  fruitGroup = new Group();
  alienGroup =  new Group();
}


function draw()
{
  background("blue");
  if (gameState === PLAY)
    {
      fruits();
      aliens();
      sword.x = World.mouseX;
      sword.y = World.mouseY;
      if (fruitGroup.isTouching(sword))
      {
        fruitGroup.destroyEach();
        score = score + 1;
      }
      else 
      {
      if (alienGroup.isTouching(sword))
      {
        gameState = END;   
        fruitGroup.destroyEach();
        alienGroup.destroyEach();
        fruitGroup.setVelocityXEach(0);
        alienGroup.setVelocityXEach(0);
        sword.addImage(gameOverImage);
        sword.x = 200;
        sword.y = 200;
      }
     }
    }
   
  
  
  drawSprites();
  text("Score: " + score, 400,50);
  
}

function fruits()
{
  if(frameCount%60 === 0)
  {
    fruit = createSprite(600,300,20,20);
    fruit.scale = 0.2;
    r = Math.round(random(1,4))
    if( r === 1)
    {
      fruit.addImage("fruit1", fruit1Image);      
    }
    else if(r === 2)
    {
      fruit.addImage("fruit2", fruit2Image);      
    }
    else if(r === 3)
    {
      fruit.addImage("fruit3", fruit3Image);      
    }
    else
    {
      fruit.addImage("fruit4", fruit4Image);      
    }
    fruit.y = Math.round(random(100,500));
    fruit.velocityX = -5;
    fruit.lifetime = 150;
    fruitGroup.add(fruit);
  }
  
  
}

function aliens()
{
  if (frameCount%100 === 0)
    {
      alien = createSprite(600,100,20,20);
      alien.addAnimation("alien", alienImage);
      alien.y = Math.round(random(100,500));
      alien.velocityX = -5;
      alien.lifetime = 150;
      alienGroup.add(alien);
    }
  
}

