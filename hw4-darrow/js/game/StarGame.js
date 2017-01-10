/*
Luke Darrow 11349190
CptS 483 Web Dev
HW 4
 */
function StarGame(canvas, shipImageSrc, enemyImageSrc, laserImageSrc, astronautImageSrc, laser2ImageSrc)
{
    var self = this;
    self.canvas = canvas;
    self.context = canvas.getContext("2d");

    //images
    self.shipImage = new Image();
    self.shipImage.src = shipImageSrc;
    self.enemyImage = new Image();
    self.enemyImage.src = enemyImageSrc;
    self.bulletImage = new Image();
    self.bulletImage.src = laserImageSrc;
    self.astronautImage = new Image();
    self.astronautImage.src = astronautImageSrc;
    self.enemyBulletImage = new Image();
    self.enemyBulletImage.src = laser2ImageSrc;

    self.widgets = Array();
    self.bullets = Array();
    self.enemyBullets = Array();

    var astronaut = new Astronaut(self.context, self.astronautImage, 0, 27, 27, 24, 10, 10);

    var lives = 3;
    var buffer = 20; //ten pixel hit box buffer
    var enemies = 10;

    //hide mouse
    self.canvas.style.cursor = "none";

    //set up player piece
    self.playerShip = new SpaceShip(self.context, self.shipImage, 6, 66, 64, 64);

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
        //set up starfield
        //generate 100 small stars
        for (var i = 0; i < 100; i++)
        {
            //make it so most stars are in the far background
            var howFast = Math.random() * 100;
            var speed = 5;
            if (howFast > 60)
            {
                speed = 2;
            }
            else if (howFast > 20)
            {
                speed = 1;
            }
            //var speed = (Math.floor(Math.random() * 3) + 1) * 1;
            var someStar = Star.makeStar(self.context, 2, speed);
            self.widgets.push(someStar);
        }

        //generate 10 large stars
        for (var i = 0; i < 10; i++) {
            var speed = (Math.floor(Math.random() * 3) + 1) * 1;
            var someStar = Star.makeStar(self.context, 5, speed);
            self.widgets.push(someStar);
        }

        //generate 20 medium stars
        for (var i = 0; i < 10; i++) {
            var speed = (Math.floor(Math.random() * 3) + 1) * 1;
            var someStar = Star.makeStar(self.context, 3, speed);
            self.widgets.push(someStar);
        }

        //and 200 tiny stars
        for (var i = 0; i < 200; i++) {
            var speed = (Math.floor(Math.random() * 3) + 1) * 1;
            var someStar = Star.makeStar(self.context, 1, speed);
            self.widgets.push(someStar);
        }

        //place enemies
        for (var i = 0; i < 2; i++)
        {
            for (var j = 0; j < 5; j++)
            {
                var x = 250 + j * 100;
                var y = 10 + i * 100;
                //set up player piece
                var enemyShip = new EnemyShip(self.context, self.enemyImage, 0, 0, 70, 91, x, y);
                self.widgets.push(enemyShip);
            }
        }

        //placing ship last puts it on top of the stars
        self.widgets.push(self.playerShip);

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

        astronaut.render();
        astronaut.update();

        //render widgets
        for(var i = 0; i < self.widgets.length; i++)
        {
            self.widgets[i].render();
            self.widgets[i].update();
        }

        //update bullets
        for(var i = 0; i < self.bullets.length; i++)
        {
            self.bullets[i].render();
            self.bullets[i].update();
        }

        //remove offscreen bullets from the array
        if(self.bullets.length > 0)
        {
            if(self.bullets[self.bullets.length - 1].y < minY)
            {
                self.bullets.pop();
            }
        }

        //update enemy bullets
        for(var i = 0; i < self.enemyBullets.length; i++)
        {
            self.enemyBullets[i].render();
            self.enemyBullets[i].update();
        }

        //remove offscreen bullets from the array
        if(self.enemyBullets.length > 0)
        {
            if(self.enemyBullets[self.enemyBullets.length - 1].y > maxY)
            {
                self.enemyBullets.pop();
            }
        }

        //plays trump clips
        if(enemies)
        {
            if(Math.floor(Math.random() * 100) + 1 == 1)
            {
                if(Math.floor(Math.random() * 2) + 1 == 1)
                {
                    if(loan.paused) {
                        loan.play();
                    }
                }
                else
                {
                    if(rich.paused) {
                        rich.play();
                    }
                }
            }
        }


        //only check collisions if not game over (can't keep playing once game over)
        if(lives > 0)
        {
            //enemy shooting at player
            for(var i = self.widgets.length - 2; i > self.widgets.length - 2 - enemies; i--)
            {
                if(Math.floor(Math.random() * 1000) + 1 == 1)
                {
                    var someBullet = Bullet.makeBullet(self.context, self.enemyBulletImage, self.widgets[i].x + 30, self.widgets[i].y + 91, 5);
                    self.enemyBullets.push(someBullet);
                    if (shootSound.paused) {
                        shootSound.play();
                    }else {
                        shootSound.currentTime = 0
                    }
                }
            }

            //check collision for ships touching the player
            for(var i = self.widgets.length - 2; i > self.widgets.length - 2 - enemies; i--)
            {
                //if ship collision, enemy explodes and lives go down
                //since the objects aren't perfect rectangles, there's sort of a buffer for the width to account for it
                if(self.playerShip.x + buffer < self.widgets[i].x + 70 &&
                   self.playerShip.x + 64 > self.widgets[i].x + buffer&&
                   self.playerShip.y < self.widgets[i].y + 91 &&
                   self.playerShip.y + 64 > self.widgets[i].y)
                {
                    //lives go down on hit
                    lives--;
                    enemies--;
                    //remove hit ship and play explosion, enemy ship dies on impact
                    self.widgets.splice(i, 1);
                    if (death.paused) {
                        death.play();
                    }else{
                        death.currentTime = 0;
                    }
                }
            }

            //collision check between player bullets and enemy ships
            for(var i = 0; i < self.bullets.length; i++)
            {
                for(var j = self.widgets.length - 2; j > self.widgets.length - enemies - 2; j--)
                {
                    if(self.bullets[i].x < self.widgets[j].x + 70 &&
                       self.bullets[i].x + 20 > self.widgets[j].x &&
                       self.bullets[i].y < self.widgets[j].y + 91 &&
                       self.bullets[i].y + 40 > self.widgets[j].y)
                    {
                        self.widgets.splice(j, 1);
                        enemies--;
                        if (death.paused) {
                            death.play();
                        }else{
                            death.currentTime = 0;
                        }
                        self.bullets.splice(i, 1);
                        break;
                    }
                }
            }

            //collision check between enemy bullets and playership
            for(var i = 0; i < self.enemyBullets.length; i++)
            {
                if(self.enemyBullets[i].x < self.playerShip.x +64 &&
                       self.enemyBullets[i].x + 20 > self.playerShip.x &&
                       self.enemyBullets[i].y < self.playerShip.y + 64 &&
                       self.enemyBullets[i].y + 40 > self.playerShip.y)
                {
                    lives--;
                    if (explosion.paused) {
                        explosion.play();
                    }else{
                        explosion.currentTime = 0;
                    }
                    self.enemyBullets.splice(i, 1);
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
        self.context.fillText("Lives: " + lives, 10, 590);

        //no lives, you've lost
        if(lives <= 0)
        {
            lives = 0;
            var red = Math.floor(Math.random() * 255);
            var green = Math.floor(Math.random() * 255);
            var blue = Math.floor(Math.random() * 255);
            self.context.fillStyle = "rgb(" + red + ", " + green + ", " + blue + ")";
            self.context.font = "100px Arial";
            self.context.fillText("GAME OVER", 200, 300);
        }

        //no enemies, you've won
        if(enemies <= 0)
        {
            enemies = 0;
            var red = Math.floor(Math.random() * 255);
            var green = Math.floor(Math.random() * 255);
            var blue = Math.floor(Math.random() * 255);
            self.context.fillStyle = "rgb(" + red + ", " + green + ", " + blue + ")";
            self.context.font = "100px Arial";
            self.context.fillText("YOU WIN", 275, 300);
            if(fart.paused)
            {
                fart.play();
            }
        }

        window.requestAnimationFrame(self.renderLoop);
    };

    self.canvasMouseMoved = function(evt)
    {
        //update interested parties
        self.playerShip.mouseMoved(evt);
    };

    self.canvasMouseClicked = function(evt)
    {
        //change ship on click for fun, lol
        
        if (self.playerShip.imageIndex < 9){
          self.playerShip.imageIndex += 1;
        } else {
          self.playerShip.imageIndex = 0;
        }

        //make bullet
        var someBullet = Bullet.makeBullet(self.context, self.bulletImage, self.playerShip.x + 22, self.playerShip.y, -5);
        self.bullets.push(someBullet);

        //bullet shoot sound
        if (shootSound.paused) {
            shootSound.play();
        }else{
            shootSound.currentTime = 0
        }
    };

    //set up event listeners
    canvas.addEventListener("mousemove", self.canvasMouseMoved, false);
    canvas.addEventListener("click", self.canvasMouseClicked);
}
