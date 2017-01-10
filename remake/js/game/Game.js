/*
Luke Darrow 11349190
CptS 483 Web Dev
HW 4
 */
function StarGame(canvas, player1ImageSrc, enemyImageSrc, swordImageSrc, swordImage2Src, wallImageSrc)
{
    var self = this;
    self.canvas = canvas;
    self.context = canvas.getContext("2d");

    var keyPressed = {};
    var direction = 3; //W = 0, A = 1, S = 2, D = 3

    //images
    self.p1Image = new Image();
    self.p1Image.src = player1ImageSrc;

    self.enemyImage = new Image();
    self.enemyImage.src = enemyImageSrc;

    self.swordLRImage = new Image();
    self.swordLRImage.src = swordImageSrc;

    self.swordUDImage = new Image();
    self.swordUDImage.src = swordImage2Src;

    self.wallImage = new Image();
    self.wallImage.src = wallImageSrc;

    self.player = Array();
    self.swords = Array();
    self.enemies = Array();
    self.walls = Array();

    var health = 100;
    var score = 0;
    var enemies = 0;

    //hide mouse
    self.canvas.style.cursor = "none";

    //set up player piece
    self.player1 = new Player(self.context, self.p1Image, 0, 66, 64, 64, 0, 0);

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
        //place player
        self.player.push(self.player1);

        //place enemies
        for( var i = 2; i < 15; i++)
        {
            for( var j = 2; j < 9; j++)
            {
                //randomly decide to place in this location or not
                if( Math.floor(Math.random() * 20) == 1)
                {
                    var x = i * 64;
                    var y = j * 64;

                    var enemy = new Enemy(self.context, self.enemyImage, 0, 0, 64, 64, x, y);
                    self.enemies.push(enemy);
                    enemies++;
                }else if(Math.floor(Math.random() * 10) == 1)
                {
                    var x = i * 64;
                    var y = j * 64;

                    var wall = new Wall(self.context, self.wallImage, 0, 0, 64, 64, x, y);
                    self.walls.push(wall);
                }
            }
        }

        //spawn atleast one enemy in the rare case none spawn randomly
        if(self.enemies.length < 1)
        {
            var enemy = new Enemy(self.context, self.enemyImage, 0, 0, 64, 64, 64 * 2, 64 * 2);
            self.enemies.push(enemy);
            enemies++;
        }

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
            if(self.player1.y > 0)
                self.player1.y -= 5;
            direction = 0;
        }
        if(keyPressed["65"])
        {
            //a (left)
            if(self.player1.x > 0)
                self.player1.x -= 5;
            direction = 1;
        }
        if(keyPressed["83"])
        {
            //s (down)
            if(self.player1.y < 640 - 64)
                self.player1.y += 5;
            direction = 2;
        }
        if(keyPressed["68"])
        {
            //d (right)
            if(self.player1.x < 1024 - 64)
                self.player1.x += 5;
            direction = 3;
        }

        //p1 attach
        if(keyPressed["32"])
        {
            if(direction == 3)//right
            {
                var sword = Sword.makeSword(self.context, self.swordLRImage, 0, 40, 40, 20, self.player1.x + 64, self.player1.y + 22);
                if(self.swords.length < 1)
                    self.swords.push(sword);
            }
            else if(direction == 1)//left
            {
                var sword = Sword.makeSword(self.context, self.swordLRImage, 1, 40, 40, 20, self.player1.x - 40, self.player1.y + 22);
                if(self.swords.length < 1)
                    self.swords.push(sword);
            }
            else if(direction == 2)//down
            {
                var sword = Sword.makeSword(self.context, self.swordUDImage, 1, 20, 20, 40, self.player1.x + 22, self.player1.y + 64);
                if(self.swords.length < 1)
                    self.swords.push(sword);
            }
            else if(direction == 0)//up
            {
                var sword = Sword.makeSword(self.context, self.swordUDImage, 0, 20, 20, 40, self.player1.x + 22, self.player1.y - 40);
                if(self.swords.length < 1)
                    self.swords.push(sword);
            }
        }

        for(var i = 0; i < self.walls.length; i++)
        {
            self.walls[i].render();
        }

        for(var i = 0; i < self.enemies.length; i++)
        {
            //self.enemies[i].update();
            self.enemies[i].render();
        }

        //render player
        if(self.player.length > 0)
            self.player[0].render();

        if(health > 0)
        {
            //game still going on, check collision

            //collision check between player sword and enemies
            for(var i = 0; i < self.enemies.length; i++)
            {
                if(self.swords.length > 0)
                {
                    if(self.swords[0].width == 40)
                    {
                        if(self.swords[0].x < self.enemies[i].x + 64 &&
                        self.swords[0].x + 40 > self.enemies[i].x &&
                        self.swords[0].y < self.enemies[i].y + 64 &&
                        self.swords[0].y + 20 > self.enemies[i].y)
                        {
                            score += 100;
                            enemies--;
                            self.enemies.splice(i, 1);

                            if (death.paused) {
                                death.play();
                            }else{
                                death.currentTime = 0;
                            }
                        }
                    }
                    else if(self.swords[0].width == 20)
                    {
                        if(self.swords[0].x < self.enemies[i].x + 64 &&
                        self.swords[0].x + 20 > self.enemies[i].x &&
                        self.swords[0].y < self.enemies[i].y + 64 &&
                        self.swords[0].y + 40 > self.enemies[i].y)
                        {
                            score += 100;
                            enemies--;
                            self.enemies.splice(i, 1);

                            if (death.paused) {
                                death.play();
                            }else{
                                death.currentTime = 0;
                            }
                        }
                    }
                }
            }

            //check collision between enemies and player
            //collision check between player sword and enemies
            for(var i = 0; i < self.enemies.length; i++)
            {
                    if(self.player[0].x < self.enemies[i].x + 54 &&
                    self.player[0].x + 54 > self.enemies[i].x &&
                    self.player[0].y < self.enemies[i].y + 54 &&
                    self.player[0].y + 54 > self.enemies[i].y)
                    {
                        if(health > 0)
                            health--;

                        if (death.paused) {
                            death.play();
                        }else{
                            death.currentTime = 0;
                        }
                    }
            }

            //render sword
            if(self.swords.length > 0)
            {
                self.swords[0].render();
                self.swords[0].update();
                if(self.swords[0].timer == 0)
                {
                    self.swords.pop();
                }
            }
        }

        for(i = 0; i < self.walls.length; i++)
        {
            //wall collision
            if(self.player[0].x < self.walls[i].x + 64 &&
            self.player[0].x + 54 > self.walls[i].x &&
            self.player[0].y < self.walls[i].y + 64 &&
            self.player[0].y + 54 > self.walls[i].y)
            {
                if(keyPressed["87"])//w, up
                    self.player[0].y += 5;
                if(keyPressed["65"])//a, left
                    self.player[0].x += 5;
                if(keyPressed["83"])//s, down
                    self.player[0].y -= 5;
                if(keyPressed["68"])//d, right
                    self.player[0].x -= 5;
            }
        }

        for(i = 0; i < self.walls.length; i++)
        {
            //wall collision
            if(self.player[0].x < self.walls[i].x + 64 &&
            self.player[0].x + 54 > self.walls[i].x &&
            self.player[0].y < self.walls[i].y + 64 &&
            self.player[0].y + 54 > self.walls[i].y)
            {
                if(keyPressed["87"])//w, up
                    self.player[0].y += 5;
                if(keyPressed["65"])//a, left
                    self.player[0].x += 5;
                if(keyPressed["83"])//s, down
                    self.player[0].y -= 5;
                if(keyPressed["68"])//d, right
                    self.player[0].x -= 5;
            }
        }

        //display health left code (along with some extra color changing)
        var red = Math.floor(Math.random() * 255);
        var green = Math.floor(Math.random() * 255);
        var blue = Math.floor(Math.random() * 255);
        self.context.fillStyle = "rgb(" + red + ", " + green + ", " + blue + ")";
        self.context.font = "30px Arial";
        self.context.fillText("health: " + health, 860, 626);
        self.context.fillText("Score: " + score, 10, 626);

        //no health, you've lost
        if(health <= 0)
        {
            health = 0;
            //self.players.pop();
            var red = Math.floor(Math.random() * 255);
            var green = Math.floor(Math.random() * 255);
            var blue = Math.floor(Math.random() * 255);
            self.context.fillStyle = "rgb(" + red + ", " + green + ", " + blue + ")";
            self.context.font = "100px Arial";
            self.context.fillText("GAME OVER", 240, 300);
            self.context.font = "30px Arial";
            self.context.fillText("FINAL SCORE: " + score, 400, 400);
        }

        //enemies killed next level
        if(enemies <= 0)
        {
            self.player1.x = 0;
            self.player1.y = 0;

            //clear the walls
            var length = self.walls.length
            for(var i = 0; i < length; i++)
            {
                self.walls.pop();
            }

            //place enemies
            for( var i = 2; i < 15; i++)
            {
                for( var j = 2; j < 9; j++)
                {
                    //randomly decide to place in this location or not
                    if( Math.floor(Math.random() * 20) == 1)
                    {
                        var x = i * 64;
                        var y = j * 64;

                        var enemy = new Enemy(self.context, self.enemyImage, 0, 0, 64, 64, x, y);
                        self.enemies.push(enemy);
                        enemies++;
                    }
                    else if(Math.floor(Math.random() * 10) == 1)
                    {
                        var x = i * 64;
                        var y = j * 64;

                        var wall = new Wall(self.context, self.wallImage, 0, 0, 64, 64, x, y);
                        self.walls.push(wall);
                    }
                }
            }

            //spawn atleast one enemy in the rare case none spawn randomly
            if(self.enemies.length < 1)
            {
                var enemy = new Enemy(self.context, self.enemyImage, 0, 0, 64, 64, 64 * 2, 64 * 2);
                self.enemies.push(enemy);
                enemies++;
            }
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
