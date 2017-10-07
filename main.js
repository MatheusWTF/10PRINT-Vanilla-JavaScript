window.onload = function(){
    canvas = document.getElementById('screen');
    ctx = canvas.getContext('2d');
    // ctx.fillStyle="#f8f8f8";
    // ctx.fillRect(0,0,canvas.width, canvas.height);
    setInterval(draw, 1000/15);
}
var x = 0;
var y = 0;
var spc = 20;

function draw(){
    var cor = CreateRemap(0, canvas.width, 0, 255);

    var r = Math.floor(cor(x));
    var g = Math.floor(cor(y));
    var b = Math.floor(cor(x+y/2));
    
    ctx.lineWidth=3;
    ctx.strokeStyle='rgb(' + r + ',' + g + ',' + b + ')';
    if(Math.floor(Math.random()*11) < 5){
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + spc, y + spc);
    
    ctx.stroke();
    } else{
    ctx.beginPath();
    ctx.moveTo(x, y + spc);
    ctx.lineTo(x + spc, y);
    // ctx.lineWidth=3;
    // ctx.strokeStyle='rgb(' + r + ',' + g + ',' + b + ')';
    ctx.stroke();
    }
    x = x + spc;
    if(x > canvas.width){
    x = 0;
    y = y + spc;
    }
    console.log(r, g, b);
}

function CreateRemap(inMin, inMax, outMin, outMax) {
    return function remaper(x) {
        return (x - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
    };
}