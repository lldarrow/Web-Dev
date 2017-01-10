/*
Luke Darrow, David Hoekman
CptS 483 Web Dev
Project
 */

function StartGame(canvas, player1ImageSrc, enemyImageSrc, swordImageSrc, swordImage2Src, wallImageSrc, bossImageSrc)
{
    var self = this;
    self.canvas = canvas;
    self.context = canvas.getContext("2d");

    var keyPressed = {};
    var direction = 3; //W = 0, A = 1, S = 2, D = 3
    var flag = 0;
    var level = 1;
    var boss_health = 100;

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

    self.bossImage = new Image();
    self.bossImage.src = bossImageSrc;

    self.player = Array();
    self.swords = Array();
    self.enemies = Array();
    self.boss = Array();
    self.walls = Array();

    var health = 100;
    var score = 0;
    var enemies = 0;

    //hide mouse
    self.canvas.style.cursor = "none";

    //set up player piece
    self.player1 = new Player(self.context, self.p1Image, 0, 66, 64, 64, 64, 256);

    //set up globals
    maxX = canvas.clientWidth;
    maxY = canvas.clientHeight;

    var audio = new Audio('mainTheme.mp3');
    var death = new Audio('death.mp3');
    var scream = new Audio('scream.mp3');

    audio.play(-1);

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

        self.spawnDungeon();

        //begin game
        window.requestAnimationFrame(self.renderLoop);
    };

    self.renderLoop = function()
    {
        //clear canvas
        self.context.clearRect(0, 0, maxX, maxY);

        var blueprint_background = new Image();
        blueprint_background.src = 'images/floor.png';
        var pattern = self.context.createPattern(blueprint_background, "repeat");
        //paint black
        self.context.fillStyle = pattern;

        //self.context.fillStyle = "rgb(0, 0, 0)";
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

        //p1 attack
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

        for(var i = 0; i < self.boss.length; i++)
        {
            self.boss[i].update();
            self.boss[i].render();
        }

        ////enemy wall collision
        //for(var j = 0; j < self.enemies.length; j++)
        //{
            
        //    self.enemies[j].render();

        //    for (i = 0; i < self.walls.length; i++) {
        //            if (self.enemies[j].x < self.walls[i].x + 64 &&
        //            self.enemies[j].x + 54 > self.walls[i].x &&
        //            self.enemies[j].y < self.walls[i].y + 64 &&
        //            self.enemies[j].y + 54 > self.walls[i].y) {
        //                if (self.enemies[j].vertical > 0)//up
        //                {
        //                    self.enemies[j].y += 50;
        //                    self.enemies[j].horizontal = 0;
        //                    self.enemies[j].vertical = 0;

        //                    self.enemies[j].horizontal = -1;
        //                    //if (Math.floor(Math.random() * 4) >= 2)
        //                    //    self.enemies[j].horizontal = 1;
        //                    //else
        //                    //    self.enemies[j].horizontal = -1;

        //                    //if (Math.floor(Math.random() * 4) >= 2)
        //                    //    self.enemies[j].vertical = 0;
        //                    //else
        //                    //    self.enemies[j].vertical = 1;

        //                }
        //                else if (self.enemies[j].horizontal < 0)//left
        //                {
        //                    self.enemies[j].x += 10;
        //                    self.enemies[j].horizontal = 0;
        //                    self.enemies[j].vertical = 0;

        //                    self.enemies[j].vertical = 1;
        //                    //if (Math.floor(Math.random() * 4) >= 2)
        //                    //    self.enemies[j].horizontal = 0;
        //                    //else
        //                    //    self.enemies[j].horizontal = 1;

        //                    //if (Math.floor(Math.random() * 4) >= 2)
        //                    //    self.enemies[j].vertical = 1;
        //                    //else
        //                    //    self.enemies[j].vertical = -1;

        //                }
        //                else if (self.enemies[j].vertical < 0)//down
        //                {
        //                    self.enemies[j].y -= 10;
        //                    self.enemies[j].horizontal = 0;
        //                    self.enemies[j].vertical = 0;

        //                    self.enemies[j].horizontal = 1;
        //                    //if (Math.floor(Math.random() * 4) >= 2)
        //                    //    self.enemies[j].horizontal = -1;
        //                    //else
        //                    //    self.enemies[j].horizontal = 1;

        //                    //if (Math.floor(Math.random() * 4) >= 2)
        //                    //    self.enemies[j].vertical = 0;
        //                    //else
        //                    //    self.enemies[j].vertical = -1;

        //                }
        //                else if (self.enemies[j].horizontal > 0)//right
        //                {
        //                    self.enemies[j].x -= 10;
        //                    self.enemies[j].horizontal = 0;
        //                    self.enemies[j].vertical = 0;

        //                    self.enemies[j].vertical = -1;
        //                    //if (Math.floor(Math.random() * 4) >= 2)
        //                    //    self.enemies[j].horizontal = -1;
        //                    //else
        //                    //    self.enemies[j].horizontal = 0;

        //                    //if (Math.floor(Math.random() * 4) >= 2)
        //                    //    self.enemies[j].vertical = 1;
        //                    //else
        //                    //    self.enemies[j].vertical = -1;

        //                }                    
        //        }
        //    }
        //}

        for (var j = 0; j < self.enemies.length; j++)
        {
            if (self.walls.length > 0)
                self.enemies[j].update(self.walls);
            self.enemies[j].render();
            
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
                    if(self.swords[0].width == 40)//collision left/right
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
                    else if(self.swords[0].width == 20)//collision up/down
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

            //collision between boss and sword
            for(var i = 0; i < self.boss.length; i++)
            {
                if(self.swords.length > 0)
                {
                    if(self.swords[0].width == 40)//collision left/right
                    {
                        if(self.swords[0].x < self.boss[i].x + 180 &&
                        self.swords[0].x + 40 > self.boss[i].x &&
                        self.swords[0].y < self.boss[i].y + 180 &&
                        self.swords[0].y + 20 > self.boss[i].y)
                        {
                            score += 100;
                            if(boss_health <= 0)
                            {
                                enemies--;
                                self.boss.splice(i, 1);
                            }
                            else
                                boss_health--;

                            if (death.paused) {
                                death.play();
                            }else{
                                death.currentTime = 0;
                            }
                        }
                    }
                    else if(self.swords[0].width == 20)//collision up/down
                    {
                        if(self.swords[0].x < self.boss[i].x + 100 &&
                        self.swords[0].x + 20 > self.boss[i].x &&
                        self.swords[0].y < self.boss[i].y + 100 &&
                        self.swords[0].y + 40 > self.boss[i].y)
                        {
                            score += 100;
                            if(boss_health <= 0)
                            {
                                enemies--;
                                self.boss.splice(i, 1);
                            }
                            else
                                boss_health--;

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
            for(var i = 0; i < self.enemies.length; i++)
            {
                    if(self.player[0].x < self.enemies[i].x + 100 &&
                    self.player[0].x + 54 > self.enemies[i].x &&
                    self.player[0].y < self.enemies[i].y + 100 &&
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

            //check collision between boss and player
            for(var i = 0; i < self.boss.length; i++)
            {
                    if(self.player[0].x < self.boss[i].x + 140 &&
                    self.player[0].x + 54 > self.boss[i].x &&
                    self.player[0].y < self.boss[i].y + 140 &&
                    self.player[0].y + 54 > self.boss[i].y)
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
            //wall collision with player
            if(self.player[0].x < self.walls[i].x + 64 &&
            self.player[0].x + 54 > self.walls[i].x &&
            self.player[0].y < self.walls[i].y + 64 &&
            self.player[0].y + 54 > self.walls[i].y)
            {
                if(keyPressed["87"])//w, up
                    self.player[0].y+= 5;
                if (keyPressed["65"])//a, left
                    self.player[0].x += 5;
                if (keyPressed["83"])//s, down
                    self.player[0].y -= 5;
                if (keyPressed["68"])//d, right
                    self.player[0].x -= 5;
            }
        }

        //display health left code (along with some extra color changing)
        //var red = Math.floor(Math.random() * 255);
        //var green = Math.floor(Math.random() * 255);
        //var blue = Math.floor(Math.random() * 255);
	var red = green = blue = 255;
        self.context.fillStyle = "rgb(" + red + ", " + green + ", " + blue + ")";
        self.context.font = "30px Arial";
        self.context.fillText("health: " + health, 860, 626);
        self.context.fillText("Score: " + score, 10, 626);
        self.context.fillText("Level: " + level, 10, 30);
	if(level % 10 == 0)
	{
		self.context.fillText("Boss: " + boss_health, 880, 30);
	}

        //no health, you've lost
        if(health <= 0)
        {
            health = 0;
            if(flag == 0)
            {
                flag = 1;
                scream.play();
            }
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
            self.player1.x = 64;
            self.player1.y = 256;
            level++;

            //clear the walls
            var length = self.walls.length
            for(var i = 0; i < length; i++)
            {
                self.walls.pop();
            }

            if(level % 10 != 0)//every ten levels spawn a boss
                self.spawnDungeon();//self.spawnDungeon();
            else
                self.spawnBoss();
        }

        window.requestAnimationFrame(self.renderLoop);
    };

    self.spawnDungeon = function()
    {
            //bordering walls
            for( var k = 0; k < 16; k++)
            {
                var wall = new Wall(self.context, self.wallImage, 0, 0, 64, 64, k * 64, 0);
                self.walls.push(wall);
                wall = new Wall(self.context, self.wallImage, 0, 0, 64, 64, k * 64, 576);
                self.walls.push(wall);
            }

            for( var l = 1; l < 9; l++)
            {
                var wall = new Wall(self.context, self.wallImage, 0, 0, 64, 64, 0, l * 64);
                self.walls.push(wall);
                wall = new Wall(self.context, self.wallImage, 0, 0, 64, 64, 960, l * 64);
                self.walls.push(wall);
            }
            

            //place enemies
            for( var i = 1; i < 15; i++)//x coord
            {
                for( var j = 1; j < 9; j++)//y coord
                {
                    //randomly decide to place in this location or not
                    if( Math.floor(Math.random() * 20) == 1 && (j != 4 && i != 0))
                    {
                        var x = i * 64;//64 since each tile is 64
                        var y = j * 64;

                        var enemy = new Enemy(self.context, self.enemyImage, 0, 0, 64, 64, x, y);
                        self.enemies.push(enemy);
                        enemies++;
                    }
                    else if(Math.floor(Math.random() * 10) == 1 && (j != 4 && i != 0))
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
    };

    self.spawnBoss = function()
    {
	boss_health = 100;
        //bordering walls
        for( var k = 0; k < 16; k++)
        {
            var wall = new Wall(self.context, self.wallImage, 0, 0, 64, 64, k * 64, 0);
            self.walls.push(wall);
            wall = new Wall(self.context, self.wallImage, 0, 0, 64, 64, k * 64, 576);
            self.walls.push(wall);
        }

        for( var l = 1; l < 9; l++)
        {
            var wall = new Wall(self.context, self.wallImage, 0, 0, 64, 64, 0, l * 64);
            self.walls.push(wall);
            wall = new Wall(self.context, self.wallImage, 0, 0, 64, 64, 960, l * 64);
            self.walls.push(wall);
        }
        var boss = new Boss(self.context, self.bossImage, 0, 0, 128, 128, 64 * 6, 64 * 4);
        self.boss.push(boss);
        enemies++;
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
