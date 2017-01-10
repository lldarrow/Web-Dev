// The Grid component allows an element to be located
//  on a grid of tiles
Crafty.c('Grid', {
    init: function () {
        this.attr({
            w: Game.map_grid.tile.width,
            h: Game.map_grid.tile.height
        })
    },

    // Locate this entity at the given position on the grid
    at: function (x, y) {
        if (x === undefined && y === undefined) {
            return { x: this.x / Game.map_grid.tile.width, y: this.y / Game.map_grid.tile.height }
        } else {
            this.attr({ x: x * Game.map_grid.tile.width, y: y * Game.map_grid.tile.height });
            return this;
        }
    }
});

// An "Actor" is an entity that is drawn in 2D on canvas
//  via our logical coordinate grid
Crafty.c('Actor', {
    init: function () {
        this.requires('2D, Canvas, Grid');
    },
});

// A OuterWall is just an Actor with a certain color
Crafty.c('OuterWall', {
    init: function () {
        this.requires('Actor, Color, Solid')
          .color('rgb(115, 115, 115)');
    },
});

// A Wall is just an Actor with a certain color
Crafty.c('Wall', {
    init: function () {
        this.requires('Actor, Color, Solid')
          .color('rgb(95, 95, 95)');
    },
});

Crafty.c('PlayerCharacter', {
    init: function () {
        this.requires('Actor, Fourway, Color, Collision, Image, Solid')
          .image("images/RedKnight1.png")
          .fourway(100)
          .color('rgb(255, 255, 255)')
          .stopOnSolids();
    },

    // Registers a stop-movement function to be called when
    //  this entity hits an entity with the "Solid" component
    stopOnSolids: function () {
        this.onHit('Solid', this.stopMovement);
        return this;
    },

    // Stops the movement
    stopMovement: function () {
        //Going Right
        if (this.dx > 0) {
            this.x = this.x - 2;
            Crafty.audio.play("bump", 1, 0.5);
        }
            //Going Left
        else if (this.dx < 0) {
            this.x = this.x + 2;
            Crafty.audio.play("bump", 1, 0.5);
        }
        //Going Down
        if (this.dy > 0) {
            this.y = this.y - 2;
            Crafty.audio.play("bump", 1, 0.5);
        }
            //Going Up
        else if (this.dy < 0) {
            this.y = this.y + 2;
            Crafty.audio.play("bump", 1, 0.5);
        }
    }
});

Crafty.c('aiCharacter', {
    init: function () {
        this.requires('Actor, Color, Collision, Image, Motion, Solid')
          .image("images/RedKnight1.png")
          .color('rgb(0, 0, 0)')
          .aiMove()
          .stopOnSolids();
    },

    aiMove: function () {
        this.vx = 100;
        return this;
    },

    // Registers a stop-movement function to be called when
    //  this entity hits an entity with the "Solid" component
    stopOnSolids: function () {
        this.onHit('Solid', this.stopMovement);

        return this;
    },

    // Stops the movement
    stopMovement: function () {
        //Going Right
        if (this.dx > 0) {
            this.x = this.x - 2;
            this.vx = 0;
            this.vy = -100;
            Crafty.audio.play("bump", 1, 0.5);
        }
            //Going Left
        else if (this.dx < 0) {
            this.x = this.x + 2;
            this.vx = 0;
            this.vy = 100;
            Crafty.audio.play("bump", 1, 0.5);
        }
        //Going Down
        if (this.dy > 0) {
            this.y = this.y - 2;
            this.vx = 100;
            this.vy = 0;
            Crafty.audio.play("bump", 1, 0.5);
        }
            //Going Up
        else if (this.dy < 0) {
            this.y = this.y + 2;
            this.vx = -100;
            this.vy = 0;
            Crafty.audio.play("bump", 1, 0.5);
        }
    }
});
