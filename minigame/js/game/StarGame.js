/*
Luke Darrow 11349190
CptS 483 Web Dev
HW 4
 */
function StarGame(canvas, player1ImageSrc, player2ImageSrc, laserImageSrc, laser2ImageSrc)
{
    var self = this;
    self.canvas = canvas;
    self.context = canvas.getContext("2d");

    var keyPressed = {};

    //images
    self.p1Image = new Image();
    self.p1Image.src = player1ImageSrc;

    self.p2Image = new Image();
    self.p2Image.src = player2ImageSrc;

    self.bulletImage = new Image();
    self.bulletImage.src = laserImageSrc;

    self.enemyBulletImage = new Image();
    self.enemyBulletImage.src = laser2ImageSrc;

    self.widgets = Array();
    self.bullets1 = Array();
    self.bullets2 = Array();

    var lives1 = 3;
    var lives2 = 3;

    //hide mouse
    self.canvas.style.cursor = "none";

    //set up player piece
    self.player1Ship = new SpaceShip(self.context, self.p1Image, 0, 66, 64, 64, 10, 260);
    self.player2Ship = new SpaceShip2(self.context, self.p2Image, 0, 66, 64, 64, 926, 260);

    //set up globals
    maxX = canvas.clientWidth;
    maxY = canvas.clientHeight;

    var audio = new Audio('song.mp3');
    var shootSound = new Audio('shot.mp3');
    var explosion = new Audio('explosion.mp3');
    var rich = new Audio('rich.mp3');
    var loan = new Audio('loan.mp3');
    var fart = new Audio('fart.mp3');
    var death = new Audio('death.mp3');

    //audio.play();

    self.begin = function()
    {
        self.init();
        self.renderLoop();
    };

    //resets game state
    self.init = function()
    {
        //placing ship last puts it on top of the stars
        self.widgets.push(self.player1Ship);
        self.widgets.push(self.player2Ship);

        //begin game
        window.requestAnimationFrame(self.renderLoop);
    };

    self.renderLoop = function()
    {
        //clear canvas
        self.context.clearRect(0, 0, maxX, maxY);

        //paint black
        self.context.fillStyle = "rgb(0, 0, 0)";
        self.context.fillRect(0, 0, maxX, maxY);

        //player 1
        if(keyPressed["87"])
        {
            //w (up)
            if(self.player1Ship.y > 0)
                self.player1Ship.y -= 5;
        }
        if(keyPressed["65"])
        {
            //a (left)
            //if(self.player1Ship.x > 0)
            //    self.player1Ship.x -= 5;
        }
        if(keyPressed["83"])
        {
            //s (down)
            if(self.player1Ship.y < 600 - 64)
                self.player1Ship.y += 5;
        }
        if(keyPressed["68"])
        {
            //d (right)
            //if(self.player1Ship.x < 1000 - 64)
            //    self.player1Ship.x += 5;
        }

        //player 2
        if(keyPressed["38"])
        {
            //up
            if(self.player2Ship.y > 0)
                self.player2Ship.y -= 5;
        }
        if(keyPressed["37"])
        {
            //left
            //if(self.player2Ship.x < 1000 - 64)
            //    self.player2Ship.x -= 5;
        }
        if(keyPressed["40"])
        {
            //down
            if(self.player2Ship.y  < 600 - 64)
                self.player2Ship.y += 5;
        }
        if(keyPressed["39"])
        {
            //right
            //if(self.player2Ship.x < 1000 - 64)
            //    self.player2Ship.x += 5;
        }

        //p1shoot
        if(keyPressed["32"])
        {
            var bullet = Bullet.makeBullet(self.context, self.enemyBulletImage, self.player1Ship.x + 60, self.player1Ship.y + 22, 5);
            self.bullets1.push(bullet);
        }

        //p2shoot
        if(keyPressed["45"])
        {
            var bullet = Bullet.makeBullet(self.context, self.bulletImage, self.player2Ship.x - 16, self.player2Ship.y + 22, -5);
            self.bullets2.push(bullet);
        }

        //render widgets
        for(var i = 0; i < self.widgets.length; i++)
        {
            self.widgets[i].render();
        }

        //update bullets1
        for(var i = 0; i < self.bullets1.length; i++)
        {
            self.bullets1[i].render();
            self.bullets1[i].update();
        }

        //update bullets2
        for(var i = 0; i < self.bullets2.length; i++)
        {
            self.bullets2[i].render();
            self.bullets2[i].update();
        }

        if(lives1 > 0 && lives2 > 0)
        {
            //game still going on, check collision
            //collision check between p1's bullets and p2's tank
            for(var i = 0; i < self.bullets1.length; i++)
            {
                if(self.bullets1[i].x < self.player2Ship.x +64 &&
                       self.bullets1[i].x + 20 > self.player2Ship.x &&
                       self.bullets1[i].y < self.player2Ship.y + 64 &&
                       self.bullets1[i].y + 40 > self.player2Ship.y)
                {
                    lives2--;
                    if (explosion.paused) {
                        explosion.play();
                    }else{
                        explosion.currentTime = 0;
                    }
                    self.bullets1.splice(i, 1);
                    break;
                }
            }

            //collision check between enemy bullets and playership
            for(var i = 0; i < self.bullets2.length; i++)
            {
                if(self.bullets2[i].x < self.player1Ship.x +64 &&
                       self.bullets2[i].x + 20 > self.player1Ship.x &&
                       self.bullets2[i].y < self.player1Ship.y + 64 &&
                       self.bullets2[i].y + 40 > self.player1Ship.y)
                {
                    lives1--;
                    if (explosion.paused) {
                        explosion.play();
                    }else{
                        explosion.currentTime = 0;
                    }
                    self.bullets2.splice(i, 1);
                    break;
                }
            }
            
        }

        //display lives left code (along with some extra color changing)
        var red = Math.floor(Math.random() * 255);
        var green = Math.floor(Math.random() * 255);
        var blue = Math.floor(Math.random() * 255);
        self.context.fillStyle = "rgb(" + red + ", " + green + ", " + blue + ")";
        self.context.font = "30px Arial";
        self.context.fillText("Lives: " + lives1, 10, 590);
        self.context.fillText("Lives: " + lives2, 880, 590);

        //no lives, you've lost
        if(lives1 <= 0)
        {
            lives1 = 0;
            var red = Math.floor(Math.random() * 255);
            var green = Math.floor(Math.random() * 255);
            var blue = Math.floor(Math.random() * 255);
            self.context.fillStyle = "rgb(" + red + ", " + green + ", " + blue + ")";
            self.context.font = "100px Arial";
            self.context.fillText("PLAYER 2 WINS", 120, 300);
        }
        else if(lives2 <= 0)
        {
            lives2 = 0;
            var red = Math.floor(Math.random() * 255);
            var green = Math.floor(Math.random() * 255);
            var blue = Math.floor(Math.random() * 255);
            self.context.fillStyle = "rgb(" + red + ", " + green + ", " + blue + ")";
            self.context.font = "100px Arial";
            self.context.fillText("PLAYER 1 WINS", 120, 300);
        }

        window.requestAnimationFrame(self.renderLoop);
    };

    canvas.canvasKeyDown = function(e)
    {
        //update interested parties

        keyPressed[e.keyCode] = true;
    };

    canvas.canvasKeyUp = function(e)
    {
        //update interested parties
        keyPressed[e.keyCode] = false;
    };

    //set up event listeners
    window.addEventListener('keydown', canvas.canvasKeyDown, true);
    window.addEventListener('keyup', canvas.canvasKeyUp);
}
