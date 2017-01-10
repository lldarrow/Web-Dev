/*
Luke Darrow, David Hoekman
CptS 483 Web Dev
Project
 */

function Player(context, image, imageIndex, imageOffset, width, height, x, y)
{
    var keyPressed = {};
    ScreenWidget.call(this, context);
    var self = this;
    self.image = image;
    self.imageIndex = imageIndex;
    self.imageOffset = imageOffset;
    self.width = width;
    self.height = height;
    self.x = x;
    self.y = y;
    self.hitbox = {x: self.x, y: self.y, width: 64, height: 64};

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
}
