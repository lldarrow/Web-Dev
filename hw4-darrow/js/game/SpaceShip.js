/*
Luke Darrow 11349190
CptS 483 Web Dev
HW 4
 */
function SpaceShip(context, image, imageIndex, imageOffset, width, height)
{
    ScreenWidget.call(this, context);
    var self = this;
    self.image = image;
    self.imageIndex = imageIndex;
    self.imageOffset = imageOffset;
    self.width = width;
    self.height = height;
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

    self.mouseMoved = function(evt)
    {
        self.x = evt.clientX - self.width / 2;
        self.y = evt.clientY - self.height / 2;
    }
}
