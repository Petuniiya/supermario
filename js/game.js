/* Headers('Access-Control-Allow-Origin: *');
import {myMario} from './myMario.js'; */
class MyMario {
    constructor(){
    this.x = 300;    
    this.y = 572;
    this.cond = 0; //0 -stay, 1-move right, 2-move left
    this.imageFrame = 0;
    this.frameWidth = 83;
    this.frameHeight = 126;
    this.floor       = 572;
    this.inJump      = false;

    this.image = new Image();
    this.image.src ='./images/SeekPng.com_person-walking-side-view_2417340.png';

    this.jump = new Audio();
    this.jump.src ='./audio/jump.wav';
    
    }
}

class MyEnemy {
    constructor(x,y, condition = 1){
    this.x = x;//10;    
    this.y = y+128/2;//572+128/2;
    this.cond = condition; //0 -stay, 1-move right, 2-move left 4- dead
    this.imageFrame = 0;
    this.frameWidth = 128;
    this.frameHeight = 128;

    this.image = new Image();
    this.image.src ='./images/enemy.png';
    
    }
}

class MyBackground {
    constructor(image,x,y,x2,y2){
    this.x = x;    
    this.y = y;
    this.x2= x2;    
    this.y2 = y2;
    this.move = false;
    
    this.image = new Image();
    this.image.src = image;
    
    }
}

class MyBlocks {
    constructor(x,y){
    this.x = x;    
    this.y = y;
    this.cond = 0; //0 -stay, 1-destroed
    this.imageFrame = 0;
    this.frameWidth = 83;
    this.frameHeight = 126;

    this.image = new Image();
    this.image.src ='./images/Bricks.gif';

    this.explode = new Audio();
    this.explode.src ='./audio/explode.wav';
   
    }
}

class MyPipes {

    constructor(x,y){
    this.x = x;    
    this.y = y;
    this.width  = 110;
    this.height = 0;
  

    }

    update(x,y) {
        ctx.beginPath();
        ctx.rect(x,y,110,20);
        ctx.fillStyle = '#FF0000';
        ctx.fill();
        ctx.closePath();    
    }
}

var canvas = document.getElementById('background-layer');
var ctx= canvas.getContext('2d');

var myBackground = [
    new MyBackground('./images/overworld_bg_plain1.png',0,0,canvas.width,canvas.height),
    new MyBackground('./images/overworld_bg_plain2.png',canvas.width,0,canvas.width,canvas.height)
];

var myMario = new MyMario();
var myBlocks = [new MyBlocks(800,300),new MyBlocks(1000,300),new MyBlocks(1064,300),new MyBlocks(1128,300),new MyBlocks(1192,300)];
var myEnemy = [new MyEnemy(10,572), new MyEnemy(70,572), new MyEnemy(1000,572,2), new MyEnemy(1250,572,2)];//new MyEnemy(10,572);
var myPipes = [
    new MyPipes(507,586),
    new MyPipes(1281,445),
];
var myPipes2 = [
    new MyPipes(521,586),
    
];

var frameCountEnemy =0;
var frameCountMario =0;
var gameStop = false;

let scoreCounter = 0;
const scoresElement = document.getElementById('scores');
let coinCounter = 0;
const coinsElement = document.getElementById('coin-counter');


window.onload = ()=>{
    draw();
    timer();
    scoresElement.innerText = scoreCounter;
    coinsElement.innerText = 'x'+coinCounter;
}

window.addEventListener('keydown',keydownHandlerEditor);
window.addEventListener('keyup',function(){ myMario.cond = 0});

function keydownHandlerEditor(event)
{
   /*  console.log(event.target);
    console.log(event.which); */
   
    switch (event.which){
       /*  case 40: //down
            myMario.y += 10;
            break; */
        case 39: //right
            myMario.cond = 1; 
            myMario.x += 3;  
            if (myMario.x>=canvas.width/2)  {myBackground[0].move = true}
            if (myBackground[0].move)  {myMario.x -= 3;}
            if (!myMario.inJump)  {myMario.y = myMario.floor;}
            break;
      /*   case 38: //up
            myMario.y -= 10;    
            break; */
        case 37: //left
            myMario.cond = 2; 
            myMario.x -= 3;    
            if (!myMario.inJump)  {myMario.y = myMario.floor;}
            break;
        
        case 32: //space
        if (myMario.inJump)  {return}
            myMario.cond = 0; 
            myMario.inJump =true;
            myMario.jump.play();
            
            jumpMario();
            return;
    }
  
}

function moveMario(){
    
    switch (myMario.cond){
        case 0:
            ctx.drawImage(myMario.image,0,myMario.frameHeight*2,myMario.frameWidth,myMario.frameHeight,myMario.x,myMario.y,myMario.frameWidth,myMario.frameHeight);        
            break;
        case 1:
            ctx.drawImage(myMario.image,myMario.frameWidth*myMario.imageFrame,0,myMario.frameWidth,myMario.frameHeight,myMario.x,myMario.y,myMario.frameWidth,myMario.frameHeight);        
            break;
        case 2:
            ctx.drawImage(myMario.image,myMario.frameWidth*myMario.imageFrame,myMario.frameHeight,myMario.frameWidth,myMario.frameHeight,myMario.x,myMario.y,myMario.frameWidth,myMario.frameHeight);        
            break;
    }

    if (frameCountMario < 15) {return}
   
    frameCountMario =0;

    myMario.imageFrame<5 ? myMario.imageFrame ++: myMario.imageFrame =0;
   
}

function jumpMario(){

    
    let start = Date.now(); // запомнить время начала
    let timer = setInterval (function () {
        let curTimer = Date.now()-start;
        if (curTimer>1000){  // закончить анимацию через 1 секунды
           
            clearInterval(timer);
            myMario.inJump =false;
            myMario.y=myMario.floor;
            return;
        }else{
           
            curTimer>=500 ? myMario.y = Math.min(myMario.y+12,myMario.floor) : myMario.y = Math.max(myMario.y-12,200); 

            myMario.cond == 1 ? myMario.x +=1 : myMario.cond == 2 ? myMario.x -=1 : myMario.x;
   
            checkBlock();
            moveMario();
          
        }
        
    }, 20);
   
}

function checkBlock(){

    for (let i=0 ; i<myBlocks.length; i++){

       // console.log(myMario.x, myMario.x+myMario.frameWidth , myBlocks[i].x, myBlocks[i].x+32*2);
        if( (myMario.x+32-2>=myBlocks[i].x+myBackground[0].x && myMario.x+32+2<=myBlocks[i].x+myBackground[0].x+32*2) 
                 && myBlocks[i].cond==0  && myMario.y<=myBlocks[i].y+32*2)    {
            myBlocks[i].cond=1;
            myBlocks[i].explode.play();
            increaseScores();
        }
    }
}

function moveEnemy(enemy){
        if (enemy.cond == 4) {  return  }
        ctx.drawImage(enemy.image,enemy.frameWidth*enemy.imageFrame,enemy.frameHeight*2,enemy.frameWidth,enemy.frameHeight,enemy.x,myEnemy.y,enemy.frameWidth/2,enemy.frameHeight/2);   
        if (frameCountEnemy < 20) {
            return;
        }
        frameCountEnemy =0;  
        enemy.x += 12;
        if (myBackground[0].move)  {enemy.x -= 12;}
        enemy.imageFrame<3 ? enemy.imageFrame ++: enemy.imageFrame =0;
}
/* function moveEnemy(){
    if (myEnemy.cond == 4) {  return  }
    ctx.drawImage(myEnemy.image,myEnemy.frameWidth*myEnemy.imageFrame,myEnemy.frameHeight*2,myEnemy.frameWidth,myEnemy.frameHeight,myEnemy.x,myEnemy.y,myEnemy.frameWidth/2,myEnemy.frameHeight/2);   
    if (frameCountEnemy < 20) {
        return;
    }
    frameCountEnemy =0;  
    myEnemy.x += 12;
    if (myBackground[0].move)  {myEnemy.x -= 12;}
    myEnemy.imageFrame<3 ? myEnemy.imageFrame ++: myEnemy.imageFrame =0;
}
 */
function moveEnemyArray(){
    for (let index = 0; index < myEnemy.length; index++) {
        const element = myEnemy[index];
        if (element.cond == 4) {  return  }
        ctx.drawImage(element.image,element.frameWidth*element.imageFrame,element.frameHeight*index,element.frameWidth,element.frameHeight,element.x,element.y,element.frameWidth/2,element.frameHeight/2);   
        if (frameCountEnemy < 20) {
            return;
        }
        frameCountEnemy =0;  
        element.x += 12;
        if (myBackground[0].move)  {element.x -= 12;}
        element.imageFrame<3 ? element.imageFrame ++: element.imageFrame =0;
    }
    
  
}

function draw(){

    //let TO_RADIANS = Math.PI/180; 
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (myBackground[0].move) {

        for(let curBackground of myBackground){
            curBackground.x -=1;    
            if ( curBackground.x<=-canvas.width){curBackground.x =canvas.width}
        }
    
        if (myMario.cond == 0 ){myMario.x -=1}
    }

    if(myMario.x<=200){myBackground[0].move = false}
    ctx.drawImage(myBackground[0].image,myBackground[0].x,myBackground[0].y,myBackground[0].x2,myBackground[0].y2); //
    ctx.drawImage(myBackground[1].image,myBackground[1].x,myBackground[1].y,myBackground[1].x2,myBackground[1].y2); //

    for (let i=0 ; i<myBlocks.length; i++){
        if(myBlocks[i].cond==0){
            ctx.drawImage(myBlocks[i].image,myBlocks[i].x+myBackground[0].x,myBlocks[i].y,32*2,32*2); 
        }
    }

    //frameCountEnemy++;
    frameCountMario++;
    myEnemy.forEach(element => {
        frameCountEnemy++;
        meetEnemy(element);
    });
  
  //  console.log(myMario.x,myBackground[0].x,myBackground[0].x2+myBackground[0].x);
    if (myMario.x>=myBackground[0].x && myMario.x<=myBackground[0].x2+myBackground[0].x){
        meetPipe(myPipes,myBackground[0].x);
    }else{
        meetPipe(myPipes2,myBackground[1].x);
    }
    
    myEnemy.forEach(element => {
        moveEnemy(element);  
    });

    moveMario();

    if ( !gameStop){ window.requestAnimationFrame(draw) }
 
}

function meetEnemy(enemy){
        if(enemy.x+40  >= myMario.x && enemy.x+40 <= myMario.x+myMario.frameWidth){
            if(myMario.y<572-enemy.frameHeight/2){
            }else if(myMario.y>=572-enemy.frameHeight/2 && myMario.y<572 ){
                enemy.cond = 4 ;
                enemy.x = 0;
                increaseScores();
            }else{
                gameStop = true;
            }
        } 
    
}
/* function meetEnemy(){
    if(myEnemy.x+40  >= myMario.x && myEnemy.x+40 <= myMario.x+myMario.frameWidth){
        if(myMario.y<572-myEnemy.frameHeight/2){
        }else if(myMario.y>=572-myEnemy.frameHeight/2 && myMario.y<572 ){
            myEnemy.cond = 4 ;
            myEnemy.x = 0;
            increaseScores();
        }else{
            gameStop = true;
        }
    } 

} */
function meetEnemyArray(){
    myEnemy.forEach(element => {
        if(element.x+40  >= myMario.x && element.x+40 <= myMario.x+myMario.frameWidth){
            if(myMario.y<572-element.frameHeight/2){
            }else if(myMario.y>=572-element.frameHeight/2 && myMario.y<572 ){
                element.cond = 4 ;
                element.x = 0;
                increaseScores();
            }else{
                gameStop = true;
            }
        } 
    });
    
}

function meetPipe(CurPipes,xc){

    for(let myPipe of CurPipes){
      
     //   myPipe.update(myPipe.x+xc, myPipe.y);
       
        if (myMario.x+myMario.frameWidth-20>=myPipe.x+xc && myMario.x+myMario.frameWidth-20<=myPipe.x+xc+myPipe.width){

            if (myMario.y+myMario.frameHeight>myPipe.y){
                myMario.x=myPipe.x+xc-myMario.frameWidth+20;
            }else{
                myMario.floor=myPipe.y-myMario.frameHeight;
            }

            break;    
        }else if( myMario.floor<572 && !myMario.inJump){
            myMario.floor = 572;
                       
        }
    }
    
}

function timer(){
    let counter = 0;
    const intervalId = setInterval(() => {
      const timer = document.getElementById('time');
      timer.innerText = counter;
      counter += 1;
    }, 1000);
}

function restartGame(){
    window.location.reload()
}

function increaseScores(){
    scoreCounter+=1;
    scoresElement.innerText = scoreCounter;
}