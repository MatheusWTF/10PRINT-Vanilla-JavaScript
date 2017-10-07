window.onload = function(){
    canvas = document.getElementById('screen');
    ctx = canvas.getContext('2d');
    setInterval(draw, 1000/15);
}

//Variables used to determine the position and size of the line
var x = 0;
var y = 0;
var spc = 20;


//Function Called each interval
function draw(){
    //call the map function with the variables in it
    var cor = CreateRemap(0, canvas.width, 0, 255);

    //Used the Map function to find numbers between 0 and 255 in order to used them as the RGB values
    var r = Math.floor(cor(x));
    var g = Math.floor(cor(y));
    var b = Math.floor(cor(x+y/2));
    
    //Line parameters, weight and Color
    ctx.lineWidth=3;
    ctx.strokeStyle='rgb(' + r + ',' + g + ',' + b + ')';

    //Randomizer and the line parameters for printing on the screen
    if(Math.floor(Math.random()*11) < 5){
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + spc, y + spc);
    ctx.stroke();
    }else{
    ctx.beginPath();
    ctx.moveTo(x, y + spc);
    ctx.lineTo(x + spc, y);
    ctx.stroke();
    }

    //re-set the position of the line 
    x = x + spc;
    if(x > canvas.width){
    x = 0;
    y = y + spc;
    }
}

//Map function
function CreateRemap(inMin, inMax, outMin, outMax) {
    return function remaper(x) {
        return (x - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
    };
}