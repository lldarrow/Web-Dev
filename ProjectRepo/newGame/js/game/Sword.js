/*
Luke Darrow, David Hoekman
CptS 483 Web Dev
Project
 */

function Sword(context)
{
    ScreenWidget.call(this, context);
    var self = this;
    self.speed = 0;

    //self.image = image;
    self.imageIndex = 0;
    self.imageOffset = 0;
    self.width = 40;
    self.height = 40;
    self.timer = 1;
    self.hitbox = {x: self.x, y: self.y, width: 20, height: 40};

    self.render = function ()
    {
        self.timer--;
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
        //keep moving
        self.x += self.speed;
    };
}

Sword.makeSword = function(context, swordImage, imageIndex, imageOffset, width, height, x, y)
{
    var someSword = new Sword(context);
    someSword.x = x;
    someSword.y = y;
    someSword.image = swordImage;
    someSword.imageIndex = imageIndex;
    someSword.imageOffset = imageOffset;
    someSword.width = width;
    someSword.height = height;
    return someSword;
};
