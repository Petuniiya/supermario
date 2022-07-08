var canvas = document.getElementById('myCanvas');
var ctx= canvas.getContext('2d');
var myMario = {
    "coor" : [10,500],
};

moveMario();


window.addEventListener('keydown',keydownHandlerEditor);

function keydownHandlerEditor(event)
{
    console.log(event.target);
    console.log(event.which);
    ctx.clearRect(myMario.coor[0],myMario.coor[1],20,20);

    switch (event.which){
        case 40: //down
            myMario.coor[1] += 10;
            break;
        case 39: //right
            myMario.coor[0] += 10;    
            break;
        case 38: //up
            myMario.coor[1] -= 10;    
            break;
        case 37: //left
            myMario.coor[0] -= 10;    
            break;
        case 32: //space
            jumpMario();
            return;
    }
    

    /* if (event.which === 66 && event.ctrlKey) {
        event.preventDefault();
        document.execCommand('bold', false, null);
        return;
    }   */  
    moveMario();   
}

function moveMario(){
    console.log('Move',myMario.coor[0],myMario.coor[1]);
    ctx.beginPath();
    ctx.rect(myMario.coor[0],myMario.coor[1],20,20);
    ctx.fillStyle = '#FF0000';
    ctx.fill();
    ctx.closePath();
}

function jumpMario(){

    console.log('Jump ');
    let start = Date.now(); // запомнить время начала
    let timer = setInterval (function () {
        let curTimer = Date.now()-start;
        if (curTimer>1500){  // закончить анимацию через 2 секунды
           
            clearInterval(timer);
            return;
        }else{
            ctx.clearRect(myMario.coor[0],myMario.coor[1],20,20);
            curTimer>=750 ? myMario.coor[1] += 4 : myMario.coor[1] -= 4; 
            moveMario();
            console.log(curTimer);
            console.log('test');
        }
        
    }, 20);


   
}
