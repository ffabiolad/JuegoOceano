'use strict'
class CanvasButton{
  constructor(canvas,x,y,width,height,text,color,clickable){
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.rect = this.canvas.getBoundingClientRect();
    this.x=x;
    this.y=y;
    this.width=width;
    this.height=height;
    this.text=text;
    this.color = color;
    this.clickable = clickable;
    this.clickHandler;
    if (this.clickable){
      this.makeClickable();
    }
  }
  makeClickable(){
    console.log('made clickable')
    this.clickable = true;
    this.clickHandler = this.clicker.bind(this)
    canvas.addEventListener('click', this.clickHandler,true);
  }

  makeUnclickable(){
    console.log('made UNclickable')
    this.clickable = false;
    canvas.removeEventListener('click', this.clickHandler,true);
  }

  clicker(evt) {
    if (evt.pageX-this.rect.left>=this.x && evt.pageX-this.rect.left<=this.x+this.width && evt.pageY-this.rect.top>=this.y && evt.pageY-this.rect.top<=this.y+this.height){
      this.color='rgb('+Math.floor(Math.random()*256)+','+Math.floor(Math.random()*256)+','+Math.floor(Math.random()*256)+')';
    }
  }
  yes(){
    this.ctx.strokeStyle = 'black'
    this.ctx.lineWidth = 1;
  }
  no(){
    this.ctx.strokeStyle = 'red'
    this.ctx.lineWidth = 3;
  }
  draw(){
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
    this.ctx.fillStyle = 'black';
    this.ctx.font = "30px Verdana";
    this.ctx.fillText(this.text, this.x, this.y + this.height);
    this.clickable ? this.yes() : this.no();
    this.ctx.beginPath();
    this.ctx.moveTo(this.x, this.y);
    this.ctx.lineTo(this.x+this.width, this.y);
    this.ctx.lineTo(this.x+this.width, this.y+this.height);
    this.ctx.lineTo(this.x, this.y+this.height);
    this.ctx.lineTo(this.x, this.y);
    this.ctx.stroke();
  }
}

'use strict'
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var rect=canvas.getBoundingClientRect();

var CButtons=[];
CButtons[0] = new CanvasButton(canvas,30,280,150,60,'JUGAR','white',true);
CButtons[1] = new CanvasButton(canvas,190,280,160,60,'CREDITOS','white',true);
CButtons[2] = new CanvasButton(canvas,400,280,190,60,'JUGADORES','white',true);

for (let i=0; i<CButtons.length; i++){
  let ButtonName = 'B'+ (i+1);
  document.getElementById(ButtonName).addEventListener('click',(evt)=> {
    let buttonNr = parseInt(evt.target.id.slice(1,evt.target.length))-1;
    CButtons[buttonNr].clickable ? CButtons[buttonNr].makeUnclickable() : CButtons[buttonNr].makeClickable();
  })
}
function loop(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle='lightgrey';
  ctx.fillRect(0,0,canvas.width,canvas.height);
  for (let CButton of CButtons){
    CButton.draw();
  }
requestAnimationFrame(loop);
}
loop();