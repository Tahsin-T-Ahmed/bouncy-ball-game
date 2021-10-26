var bar;
var balls = [];
var ballCount=0;
var score=0;
var scoreSpeed = 1;

function setup(){
    createCanvas(1250,750);
    
    
    /* BAR OBJECT */
    bar = new Bar();
    
    balls.push(new NewBall(bar.x,height-(bar.h+20)));
}

function draw() {
    score += scoreSpeed;
    background(200);
    noStroke();
    
    /*BRINGING THE BAR TO LIFE*/
    bar.show();
    bar.track();
    
    /*BRINGING THE BALLS TO LIFE*/
    for (var i=0; i<balls.length; i++) {
        balls[i].show();
        balls[i].animate();
        balls[i].bounce();
        
        if (balls[i].y >= 750) {
            balls.splice(i,1);
            ballCount++;
        }
        
        if (balls.length===0) {
            alert("Your score is " + score + ".\nTry harder next time, scrub.");
            alert("Refresh the page to restart.");
            
            scoreSpeed = 0;
        }
        
        if (ballCount >= 5) {
            textSize(75);
            fill(random(255),random(255),random(255));
            text("YOU SUCK",width/2-200,height/2);
            
            if (ballCount>=10) {
                text("ARE YOU EVEN TRYING?",width/2-450,height/2+100);
            }
            
            if (ballCount>=15) {
                text("GIVE UP. YOU LOST.",width/2-350,height/2-100);
            }
        }
    }
    
    /*SETTINGS TOP-RIGHT DISPLAY*/
    stroke(255);
    strokeWeight(3);
    fill(0);
    textSize(25);
    text("SCORE:\t"+score,width-200,height-700);
    text("BALLS DROPPED:\t"+ballCount,width-300,height-650);
    text("ACTIVE BALLS:\t"+balls.length,width-300,height-600);
    
    
}

/*NEWBALL CONSTRUCTOR*/
function NewBall(x,y) {
    this.x = x;
    this.y = y;
    this.r = 25;
    this.ySpeed = -5;
    this.xSpeed=-5;
    this.speedLimit = 10;
    this.fillColor=0;
    this.colorIncrement=15;
    
    /* DISPLAYS THE BALL */
    this.show = function() {
        this.fillColor+=this.colorIncrement;
        stroke(210,0,0);
        strokeWeight(5);
        fill(this.fillColor);
        ellipse(this.x,this.y,this.r);
        
        if (this.fillColor>=210 || this.fillColor<=0) {
            this.colorIncrement = this.colorIncrement * -1;
        }
    };
        
    /*ADDS MOTION TO BALL*/
    this.animate = function() {
        this.y+=this.ySpeed;
        this.x+=this.xSpeed;
    };      //END ANIMATE
        
    this.bounce = function() {
            
        /* H-BOUNCE ; HIGH BOUNCE */
        if (this.y <= (this.r - 10)) {
            this.ySpeed *= -1;
        }   //END H-BOUNCE
            
        /* L-BOUNCE ; LOW BOUNCE */
        if (this.y + (this.r-11) >= height - bar.h) {  //ALLOWS BALL TO BOUNCE LOW
                
            /*NESTED IF ; ALLOWS BALL TO BOUNCE ONLY ON BAR ; INCREASES SPEED*/
            if (this.x+(this.r-10)>bar.x-(bar.w/2)&&this.x+(this.r-10)<bar.x+(bar.w/2)) {
                    
                /* SUB-NESTED IF ; LIMITING THE SPEED */
                /* ALLOWS SPEED-UP WHILE WITHIN SPEED LIMIT */
                if (this.ySpeed > (this.speedLimit * -1) && this.ySpeed < this.speedLimit) {
                    this.ySpeed *= random(-2,-1.2);
                    
                    if (balls.length<5) {
                        balls.push(new NewBall(bar.x,height-(bar.h+20)));
                    }
                }
                    
                /* LOCKS THE SPEED UPON REACHING SPEED LIMIT*/
                else {
                    this.ySpeed *= -1;
                }
            }
        }   //END L-BOUNCE
        
        if (this.y >= height) {
            
        }
            
        /* H-BOUNCE ; HORIZONTAL BOUNCE */
        if (this.x - (this.r - 10) <= 10 || this.x + (this.r - 10) >= width-10) {
            this.xSpeed = this.xSpeed * random(-1.1,-1);
        }   //END H-BOUNCE
            
    };      //END BOUNCE
        
        
}       //END NEWBALL CONSTRUCTOR


/*BAR CONSTRUCTOR*/
function Bar() {
    this.w = 200;
    this.h = 30;
    this.x = width/2;
    this.fillColor = 100;
    this.colorIncrement = 20;
    
    /*DISPLAYS BAR*/
    this.show = function() {
        this.fillColor += this.colorIncrement;
        fill(this.fillColor);
        rect(this.x-(this.w / 2),height-(this.h+2),this.w,this.h);
        
        if (this.fillColor >= 200 || this.fillColor <= 100) {
            this.colorIncrement = this.colorIncrement * -1;
        }
    };
    
    /* MAKES BAR FOLLOW CURSOR */
    this.track = function() {
        this.x = constrain(mouseX,0+this.w/2,width-this.w/2);
    };
}       //END BAR CONSTRUCTOR