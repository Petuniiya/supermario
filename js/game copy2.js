/* Headers('Access-Control-Allow-Origin: *');
import {myMario} from './myMario.js'; */
class MyMario {
    constructor(){
    this.x = 100;    
    this.y = 500;

    this.image = new Image();
    this.image.src ='./images/MarioRun.gif';
    }
}

var myMario = new MyMario();

var canvas = document.getElementById('myCanvas');
var ctx= canvas.getContext('2d');

moveMario();


window.addEventListener('keydown',keydownHandlerEditor);

function keydownHandlerEditor(event)
{
    console.log(event.target);
    console.log(event.which);
    ctx.clearRect(myMario.x,myMario.y,20,20);

    switch (event.which){
        case 40: //down
            myMario.y += 10;
            break;
        case 39: //right
            myMario.x += 10;    
            break;
        case 38: //up
            myMario.y -= 10;    
            break;
        case 37: //left
            myMario.x -= 10;    
            break;
        case 32: //space
            jumpMario();
            return;
    }
     
    moveMario();   
}

function moveMario(){
    console.log('Move',myMario.x,myMario.y);
    ctx.beginPath();
    ctx.rect(myMario.x,myMario.y,20,20);
    ctx.fillStyle = '#FF0000';
    ctx.fill();
    ctx.closePath();
}

function jumpMario(){

    console.log('Jump ');
    let start = Date.now(); // запомнить время начала
    let timer = setInterval (function () {
        let curTimer = Date.now()-start;
        if (curTimer>1000){  // закончить анимацию через 2 секунды
           
            clearInterval(timer);
            return;
        }else{
            ctx.clearRect(myMario.x,myMario.y,20,20);
            curTimer>=500 ? myMario.y += 4 : myMario.y -= 4; 
            moveMario();
            console.log(curTimer);
            console.log('test');
        }
        
    }, 20);


   
}
