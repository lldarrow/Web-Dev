/*
Luke Darrow 11349190
CptS 483 Web Dev
HW 4
 */
function Bullet(context)
{
    ScreenWidget.call(this, context);
    var self = this;
    self.speed = -5;

    //self.image = image;
    self.imageIndex = 0;
    self.imageOffset = 0;
    self.width = 20;
    self.height = 40;
    self.hitbox = {x: self.x, y: self.y, width: 20, height: 40};

    self.render = function ()
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
        //keep moving
        self.y += self.speed;
    };
}

Bullet.makeBullet = function(context, bulletImage, x, y, speed)
{
    var someBullet = new Bullet(context);
    someBullet.speed = speed;
    someBullet.x = x;
    someBullet.y = y;
    someBullet.image = bulletImage;
    return someBullet;
};
