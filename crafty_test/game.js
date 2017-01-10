window.onload = function() {
    Crafty.init();
    // A blue block, controlled by arrow keys
    
    var player = Crafty.e("2D, Canvas, Fourway, Image")
	.image("link.png")
        .attr({x:100, y:100})
        .fourway(100);
};
