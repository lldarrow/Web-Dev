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

// A Tree is just an Actor with a certain color
Crafty.c('Wall', {
    init: function () {
        this.requires('Actor, Color, Solid')
          .color('rgb(115, 115, 115)');
    },
});

// A Bush is just an Actor with a certain color
Crafty.c('Bush', {
    init: function () {
        this.requires('Actor, Color, Solid')
          .color('rgb(95, 95, 95)');
    },
});

Crafty.c('PlayerCharacter', {
    init: function () {
        this.requires('Actor, Fourway, Color, Collision, Image')
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

        if(this.dx > 0)
        {
            this.x = this.x -2; 
        }
        else if (this.dx < 0)
        {
            this.x = this.x + 2;
        }

        if(this.dy > 0)
        {
            this.y = this.y - 2;
        }
        else if (this.dy < 0)
        {
            this.y = this.y + 2;
        }
    }
});
