const canvas = document.querySelector('canvas');
const para=document.querySelector('p');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// function to generate random number

function random(min,max) {
  const num = Math.floor(Math.random()*(max-min)) + min;
  return num;
}

function Shape(x,y,velX,velY,exists)
{
	this.x=x;
	this.y=y;
	this.velX=velX;
	this.velY=velY;
	this.exists=exists;
}

function Ball(x,y,velX,velY,color,size,exists)
{
	Shape.call(this,x,y,velX,velY,exists);
	this.color=color;
	this.size=size;

}
Ball.prototype.draw = function() {
  ctx.beginPath();
  ctx.lineWidth=3;
  ctx.fillStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.fill();
}
Ball.prototype.update=function() {
	if(this.x<this.size)
		this.velX=-this.velX;
	if(this.y<this.size)
		this.velY=-this.velY;
	if(this.x>width-this.size)
		this.velX=-this.velX;
	if(this.y>height-this.size)
		this.velY=-this.velY;

	this.x+=this.velX;
	this.y+=this.velY;
}
Ball.prototype.collisionDetect = function() {
  for (let j = 0; j < balls.length; j++) {
    if (!(this === balls[j])) {
      const dx = this.x - balls[j].x;
      const dy = this.y - balls[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + balls[j].size) {
        balls[j].color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) +')';
      }
    }
  }
}


function evilCircle(x,y,velX,velY,exists){

	Shape.call(this,x,y,20,20,exists);
	this.color='white';
	this.size=20;

 }
 evilCircle.prototype.draw=function(){
 	ctx.beginPath();
  ctx.strokeStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.stroke();
 }
evilCircle.prototype.update=function() {
	if(this.x<this.size)
		this.x=this.x+size;
	if(this.y<this.size)
		this.y+=this.size;
	if(this.x>width-this.size)
		this.x-=this.size;
	if(this.y>height-this.size)
		this.y-=this.size;
}
evilCircle.prototype.setControls=function()
{
	let _this = this;
window.onkeydown = function(e) {
    if (e.key === 'a') {
      _this.x -= _this.velX;
    } else if (e.key === 'd') {
      _this.x += _this.velX;
    } else if (e.key === 'w') {
      _this.y -= _this.velY;
    } else if (e.key === 's') {
      _this.y += _this.velY;
    }
  }
}
evilCircle.prototype.collisionDetect = function() {
  for (let j = 0; j < balls.length; j++) {
    if (balls[j].exists==true) {
      const dx = this.x - balls[j].x;
      const dy = this.y - balls[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + balls[j].size) {
        balls[j].exists=false;
        count--;
      }
    }
  }
}



let count=0;

let balls=[];
while(balls.length<25)
{
	let size=random(10,20);
	let newBall= new Ball(random(0+size,width-size),
		                  random(0+size,height-size),
		                  random(-7,7),
		                  random(-7,7),
		                  'rgb('+random(0,255)+','+random(0,255)+','+random(0,255)+')',
		                  size,true);
	balls.push(newBall);
	count++;
		                  
}

let evil=new evilCircle(random(0,width),
		                  random(0,height),
		                  20,
		                  20,
		                  true);
evil.setControls();





 function loop() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
  ctx.fillRect(0, 0, width, height);

  for (let i = 0; i < balls.length; i++) {
  	if(balls[i].exists==true){
  		balls[i].draw();
    balls[i].update();
    balls[i].collisionDetect();
  	}
    
  }
  evil.draw();
  evil.update();
  evil.collisionDetect();
  para.textContent="count= "+count;

  requestAnimationFrame(loop);
}

loop();


