Game = {
    // This defines our grid's size and the size of each of its tiles
    map_grid: {
        width: 24,
        height: 16,
        tile: {
            width: 32,
            height: 32
        }
    },

    // The total width of the game screen. Since our grid takes up the entire screen
    //  this is just the width of a tile times the width of the grid
    width: function () {
        return this.map_grid.width * this.map_grid.tile.width;
    },

    // The total height of the game screen. Since our grid takes up the entire screen
    //  this is just the height of a tile times the height of the grid
    height: function () {
        return this.map_grid.height * this.map_grid.tile.height;
    },

    start: function () {
        // Start crafty and set a background color so that we can see it's working
        Crafty.init(Game.width(), Game.height());
        Crafty.background('rgb(144, 195, 212)');

        //adding audio from an object
        //Crafty.audio.add("song", "Dungeonmaster.mp3");
        Crafty.audio.add("walk", "Step.wav");
        Crafty.audio.add("bump", "Bump.wav");
        //Crafty.audio.play("song", -1);

        // Place an outerwall at every edge square on our grid of 16x16 tiles
        for (var x = 0; x < Game.map_grid.width; x++) {
            for (var y = 0; y < Game.map_grid.height; y++) {
                var at_edge = x == 0 || x == Game.map_grid.width - 1 || y == 0 || y == Game.map_grid.height - 1;

                if (at_edge) {
                    // Place a outerwall entity at the current tile
                    Crafty.e('OuterWall').at(x, y);
                } else if (Math.random() < 0.1) {
                    // Place a wall entity at the current tile
                    if (x != 5 && y != 5) {
                        Crafty.e('Wall').at(x, y);
                    }
                }
            }
        }

        Crafty.e('PlayerCharacter').at(5, 5);
        Crafty.e('aiCharacter').at(10, 10);
    }
}
