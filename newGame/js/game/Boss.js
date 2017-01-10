/*
Luke Darrow, David Hoekman
CptS 483 Web Dev
Project
 */

function Boss(context, image, imageIndex, imageOffset, width, height, x, y)
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
    self.horizontal = -.5;
    self.vertical = -.5;
    self.health = 100;

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

    self.update = function ()
    {
        self.y += self.vertical;
        self.x += self.horizontal;
        self.checkBoundary();
    };

    self.checkBoundary = function()
    {
        if(self.y >= maxY - 128 - 64)//hit bottom
        {
            this.y -= 6;

            if (Math.floor(Math.random() * 4) >= 2)
                self.horizontal = -.5;
            else
                self.horizontal = .5;

            if (Math.floor(Math.random() * 4) >= 2)
                self.vertical = 0;
            else
                self.vertical = -.5;
        }
        else if (self.y < minY + 64) //hit top
        {
            this.y += 5;
            if (Math.floor(Math.random() * 4) >= 2)
                self.horizontal = -.5;
            else
                self.horizontal = .5;

            if (Math.floor(Math.random() * 4) >= 2)
                self.vertical = 0;
            else
                self.vertical = .5;
        }
        else if(self.x >= maxX - 128 - 64) //hit right
        {
            this.x -= 5;
            if (Math.floor(Math.random() * 4) >= 2)
                self.horizontal = -.5;
            else
                self.horizontal = 0;

            if (Math.floor(Math.random() * 4) >= 2)
                self.vertical = .5;
            else
                self.vertical = -.5;
        }
        else if(self.x < minX + 64) //hit left
        {
            this.x += 5;

            if (Math.floor(Math.random() * 4) >= 2)
                self.horizontal = 0;
            else
                self.horizontal = .5;

            if (Math.floor(Math.random() * 4) >= 2)
                self.vertical = .5;
            else
                self.vertical = -.5;
        }
    };
}
