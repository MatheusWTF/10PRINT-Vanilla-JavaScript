# 10PRINT in Vanilla JavaScript
Take on the [Coding Challenge #76](https://www.youtube.com/watch?v=bEyTZ5ZZxZs&t=334s) from [Daniel Shiffman/Coding Train](https://www.youtube.com/channel/UCvjgXvBlbQiydffZU7m1_aw)

## What is 10PRINT
10PRINT is an old piece of code, in which a sequence of '/' and '\' are picked at random and displayed on the monitor, creating a unique and interesting pattern.

## Approach
Daniel Shiffman is an amazing online teacher, so understanding what exactly he's done was not hard.
Since I'm studying JavaScript at my university right now and couldn't wrap my head around the classes, I decided to take his P5.js tutorials and recreate them in Vanilla JavaScript.

Starting with:
```
window.onLoad = function(){
  canvas = document.getElementById('screen');
  ctx = canvas.getContext('2d');
```
to reach the canvas created in HTML as soon as the page is open and define the context in which the "drawing" would be happening.


After reaching out the canvas I set the time interval in which I want my updates to happen on the canvas with:

```
  setInterval(draw, 1000/15);
```

Where the "draw" is the function to be called, and 1000/15 is the interval in which to call the function (1000 = 1 second). And then close the function.

Instead of writing a sequence of '/' and '\' on the screen, which would mean I'd have to deal with kerning and line-height. I decided to follow Daniel's path and draw lines. Knowing my canvas was made with size 400x400, I decided the size of the line.

```
var spc = 10;
```
And since I'll start drawing my lines from the top leftmost side of the screen, I could use "0, 0" for my "x" and "y"

```
var x = 0;
var y = 0;
```

The next step is to create the function "draw" that'll determine what will be shown on the canvas each interval.

in order to create a line in JavaScript, you need:

```
    ctx.beginPath();
```
To start the Path/Line;
```
    ctx.moveTo(x, y);
```
The First point of the line in the Canvas;
```
    ctx.lineTo(x, y);
```
the last point of the line in the Canvas, and;
```
    ctx.stroke();
```
the argument that draws the line between the two points.

A line can have more than two points, allowing you to draw pretty much any shape you need, but for this project I'll only need two.

The randomization of the direction of the line will be decided by an "if" statement, with a Math.random() as the decider.

```
    if(Math.floor(Math.random()*11) < 5){
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + spc, y + spc);
      ctx.stroke();
    } else{
      ctx.beginPath();
      ctx.moveTo(x, y + spc);
      ctx.lineTo(x + spc, y);
      ctx.stroke();
    }
```

if you execute the project at this stage, it will only draw the lines in one spot, to fix this I added an statement after the "if"

```
    x = x + spc;
    if(x > canvas.width){
      x = 0;
      y = y + spc;
    }
```

At this point, the core project is already done, but I was feeling a bit adventurous, so I decided to map the colors of the lines to their x and y positions (I was so beninghted back then), but I didn't know the "map()" didn't have an equivalent in vanilla JS, so I had to make my own (Also known as, googled it and prayed for the best). Using a constructor function I've found in [Stack Overflow](https://stackoverflow.com/questions/5649803/remap-or-map-function-in-javascript), I could remap the x and y position of the line to a number ranged from 0 to 255 (the maximum number on a RGB code), and then set another based on the sum of the two other results, then divided by two.
those 3 numbers would be used as the "R", "G", and "B" codes in my lines.

the Function used was:
```
  function CreateRemap(inMin, inMax, outMin, outMax) {
    return function remaper(x) {
        return (x - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
    };
}
```

and the variables were 
```
    var cor = CreateRemap(0, canvas.width, 0, 255);

    var r = Math.floor(cor(x));
    var g = Math.floor(cor(y));
    var b = Math.floor(cor(x+y/2));
    
    ctx.lineWidth=3;
    ctx.strokeStyle='rgb(' + r + ',' + g + ',' + b + ')';
```

Everything was (but the constructor function) was set inside the "draw" function, to be set every interval (but I'm pretty sure that is not needed, since the values it needs can be called outside the function).
