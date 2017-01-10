/*
Luke Darrow, David Hoekman
CptS 483 Web Dev
Project
 */

function Enemy(context, image, imageIndex, imageOffset, width, height, x, y)
{
    ScreenWidget.call(this, context);
    var self = this;
    self.image = image;
    self.imageIndex = imageIndex;
    self.imageOffset = imageOffset;
    self.width = width;
    self.height = height;
    self.x = x;
    self.y = y;
    self.horizontal = 1;
    self.vertical = 0;
    self.hitbox = {x: self.x, y: self.y, width: 70, height: 91};

    self.render = function()
    {
        self.context.drawImage(self.image,       //source image
            self.imageIndex * self.imageOffset,  //sprite x offset
            0,                                   //sprite y offset
            self.width,                          //sprite width
            self.height,                         //sprite height
            self.x,                              //destination x
            self.y,                              //destination y
            self.width,                          //destination width (for scaling)
            self.height);                        //destination height (for scaling)
    };

    self.update = function (walls)
    {
        self.checkBoundary();
        self.checkWall(walls);
        
        self.y += self.vertical;
        self.x += self.horizontal;
        
        
    };

    self.checkWall = function (walls) {
        for (i = 0; i < walls.length; i++) {
            if (self.x < walls[i].x + 64 &&
            self.x + 64 > walls[i].x &&
            self.y < walls[i].y + 64 &&
            self.y + 64 > walls[i].y) {
                if (self.vertical > 0 && self.vertical != 0)//up
                {
                    self.y += 15;
                    self.horizontal = 0;
                    self.vertical = 0;

                    self.horizontal = -1;
                    //if (Math.floor(Math.random() * 4) >= 2)
                    //    self.horizontal = 1;
                    //else
                    //    self.horizontal = -1;

                    //if (Math.floor(Math.random() * 4) >= 2)
                    //    self.vertical = 0;
                    //else
                    //    self.vertical = 1;

                }
                else if (self.horizontal < 0 && self.horizontal != 0)//left
                {
                    self.x += 15;
                    self.horizontal = 0;
                    self.vertical = 0;

                    self.vertical = 1;
                    //if (Math.floor(Math.random() * 4) >= 2)
                    //    self.horizontal = 0;
                    //else
                    //    self.horizontal = 1;

                    //if (Math.floor(Math.random() * 4) >= 2)
                    //    self.vertical = 1;
                    //else
                    //    self.vertical = -1;

                }
                else if (self.vertical < 0 && self.vertical != 0)//down
                {
                    self.y -= 15;
                    self.horizontal = 0;
                    self.vertical = 0;

                    self.horizontal = 1;
                    //if (Math.floor(Math.random() * 4) >= 2)
                    //    self.horizontal = -1;
                    //else
                    //    self.horizontal = 1;

                    //if (Math.floor(Math.random() * 4) >= 2)
                    //    self.vertical = 0;
                    //else
                    //    self.vertical = -1;

                }
                else if (self.horizontal > 0 && self.horizontal != 0)//right
                {
                    self.x -= 15;
                    self.horizontal = 0;
                    self.vertical = 0;

                    self.vertical = -1;
                    //if (Math.floor(Math.random() * 4) >= 2)
                    //    self.horizontal = -1;
                    //else
                    //    self.horizontal = 0;

                    //if (Math.floor(Math.random() * 4) >= 2)
                    //    self.vertical = 1;
                    //else
                    //    self.vertical = -1;

                }
            }
        }

    };

    self.checkBoundary = function()
    {
        if(self.y >= maxY - 64)//hit bottom
        {
            this.y -= 6;

            if (Math.floor(Math.random() * 4) >= 2)
                self.horizontal = -1;
            else
                self.horizontal = 1;

            if (Math.floor(Math.random() * 4) >= 2)
                self.vertical = 0;
            else
                self.vertical = -1;
        }
        else if (self.y < minY) //hit top
        {
            this.y += 5;
            if (Math.floor(Math.random() * 4) >= 2)
                self.horizontal = -1;
            else
                self.horizontal = 1;

            if (Math.floor(Math.random() * 4) >= 2)
                self.vertical = 0;
            else
                self.vertical = 1;
        }
        else if(self.x >= maxX - 64) //hit right
        {
            this.x -= 5;
            if (Math.floor(Math.random() * 4) >= 2)
                self.horizontal = -1;
            else
                self.horizontal = 0;

            if (Math.floor(Math.random() * 4) >= 2)
                self.vertical = 1;
            else
                self.vertical = -1;
        }
        else if(self.x < minX) //hit left
        {
            this.x += 5;

            if (Math.floor(Math.random() * 4) >= 2)
                self.horizontal = 0;
            else
                self.horizontal = 1;

            if (Math.floor(Math.random() * 4) >= 2)
                self.vertical = 1;
            else
                self.vertical = -1;
        }
    };
}
