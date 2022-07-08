/* Headers('Access-Control-Allow-Origin: *');
import {myMario} from './myMario.js'; */
class MyMario {
    constructor(){
    this.x = 1000;    
    this.y = 552;
    this.cond = 0; //0 -stay, 1-move right, 2-move left
    this.imageFrame = 0;
    this.frameWidth = 83;
    this.frameHeight = 126;

    this.image = new Image();
    this.image.src ='./images/SeekPng.com_person-walking-side-view_2417340.png';
    
    }
}

class MyEnemy {
    constructor(){
    this.x = 10;    
    this.y = 552;
    this.cond = 3; //0 -stay, 1-move right, 2-move left
    this.imageFrame = 0;
    this.frameWidth = 128;
    this.frameHeight = 128;

    this.image = new Image();
    this.image.src ='./images/enemy.png';
    
    }
}

class MyBlocks {
    constructor(x,y){
    this.x = x;    
    this.y = y;
    this.cond = 0; //0 -stay, 1-move right, 2-move left
    this.imageFrame = 0;
    this.frameWidth = 83;
    this.frameHeight = 126;

    this.image = new Image();
    this.image.src ='./images/Bricks.gif';
   
    }
}

var canvas = document.getElementById('background-layer');
var ctx= canvas.getContext('2d');

var myBackground = new Image();
var myMario = new MyMario();
var myBlocks = [new MyBlocks(800,400),new MyBlocks(1000,400),new MyBlocks(1064,400),new MyBlocks(1128,400),new MyBlocks(1192,400)];
var myEnemy = new MyEnemy();

myBackground.src ='./images/overworld_bg.png'; 

window.onload = ()=>{
    moveEnemy();
   // moveMario();  
}

window.addEventListener('keydown',keydownHandlerEditor);

function keydownHandlerEditor(event)
{
    console.log(event.target);
    console.log(event.which);
   
    switch (event.which){
       /*  case 40: //down
            myMario.y += 10;
            break; */
        case 39: //right
            myMario.cond = 1; 
            myMario.x += 10;    
            break;
      /*   case 38: //up
            myMario.y -= 10;    
            break; */
        case 37: //left
            myMario.cond = 2; 
            myMario.x -= 10;    
            break;
        case 32: //space
            myMario.cond = 0; 
            jumpMario();
            return;
    }
     
    moveMario();   
}

function moveMario(){
    console.log('Move',myMario.x,myMario.y,myMario.cond,myMario.imageFrame);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(myBackground,0,0,canvas.width,canvas.height); 
    for (let i=0 ; i<myBlocks.length; i++){
        ctx.drawImage(myBlocks[i].image,myBlocks[i].x,myBlocks[i].y,32*2,32*2); 
    }
    
   // ctx.drawImage(myMario.image,myMario.x,myMario.y);
    switch (myMario.cond){
        case 0:
            ctx.drawImage(myMario.image,0,myMario.frameHeight*2,myMario.frameWidth,myMario.frameHeight,myMario.x,myMario.y,myMario.frameWidth,myMario.frameHeight);        
            break;
        case 1:
            ctx.drawImage(myMario.image,myMario.frameWidth*myMario.imageFrame,0,myMario.frameWidth,myMario.frameHeight,myMario.x,myMario.y,myMario.frameWidth,myMario.frameHeight);        
            myMario.imageFrame<5 ? myMario.imageFrame ++: myMario.imageFrame =0;
            break;
        case 2:
            ctx.drawImage(myMario.image,myMario.frameWidth*myMario.imageFrame,myMario.frameHeight,myMario.frameWidth,myMario.frameHeight,myMario.x,myMario.y,myMario.frameWidth,myMario.frameHeight);        
            myMario.imageFrame<5 ? myMario.imageFrame ++: myMario.imageFrame =0;
            break;
    
    }

   
}

function jumpMario(){

    console.log('Jump ');
    let start = Date.now(); // запомнить время начала
    let timer = setInterval (function () {
        let curTimer = Date.now()-start;
        if (curTimer>1000){  // закончить анимацию через 1 секунды
           
            clearInterval(timer);
            return;
        }else{
           
            curTimer>=500 ? myMario.y = Math.min(myMario.y+8,552) : myMario.y = Math.max(myMario.y-8,200); 
            moveMario();
            console.log(curTimer);
            console.log('test');
        }
        
    }, 20);


   
}

/* function rotateAndPaintImage ( context, image, angleInRad , positionX, positionY, axisX, axisY ) {
    context.translate( positionX, positionY );
    context.rotate( angleInRad );
    context.drawImage( image, -axisX, -axisY );
    context.rotate( -angleInRad );
    context.translate( -positionX, -positionY );
  } */


  /* function flipImage(img, ctx, flipH, flipV, width, height) {
    var scaleH = flipH ? -1 : 1, // Set horizontal scale to -1 if flip horizontal
        scaleV = flipV ? -1 : 1, // Set verical scale to -1 if flip vertical
        posX = flipH ? width * -1 : 0, // Set x position to -100% if flip horizontal 
        posY = flipV ? height * -1 : 0; // Set y position to -100% if flip vertical
    
    ctx.save(); // Save the current state
    ctx.scale(scaleH, scaleV); // Set scale to flip the image
    ctx.drawImage(img, posX, posY, width, height); // draw the image
    ctx.restore(); // Restore the last saved state
}; */
var frameCount =0;
var animationEnemy =0;
function moveEnemy(){

     let TO_RADIANS = Math.PI/180; 
     frameCount++;
    
     if (frameCount < 20) {
        window.requestAnimationFrame(moveEnemy);
        return;
      }
      moveMario();
      frameCount =0;  
    ctx.drawImage(myEnemy.image,myEnemy.frameWidth*myEnemy.imageFrame,myEnemy.frameHeight*2,myEnemy.frameWidth,myEnemy.frameHeight,myEnemy.x,myEnemy.y,myEnemy.frameWidth,myEnemy.frameHeight);   
    myEnemy.x += 12;
    myEnemy.imageFrame<3 ? myEnemy.imageFrame ++: myEnemy.imageFrame =0;

    if ( myEnemy.x <canvas.width){window.requestAnimationFrame(moveEnemy)}
    
    // rotate 45º image "imgSprite", based on its rotation axis located at x=20,y=30 and draw it on context "ctx" of the canvas on coordinates x=200,y=100
    //rotateAndPaintImage ( ctx, myEnemy.image, 180*TO_RADIANS, 64, 64, myEnemy.x,myEnemy.y );
}
