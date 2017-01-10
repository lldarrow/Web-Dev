Luke Darrow
David Hoekman

Web Dev project directory

oldGame is the implementation using CraftyJs

newGame is the implementation based on the in class game examples
where we gave up on CraftyJs and started over

Unfortunately we spent most of the semester in Crafty until we did game stuff in class. We didn't even know Java
at the beginning of the semester as well (so that was fun). Once we started our own gameplay code things went
much faster that trying to figure out CraftyJs. To this day, there is still no documentation on where Crafty's
game loop is or how things work together.

The player collision is perfect but there was some unexplainable problems with enemies and the walls.
The old enemy collision worked with blocks in the arena but had a slight chance of going into the outer walls.
The newest enemy collision looks a little weird but the enemies don't get stuck on edges anymore.
Sometimes it works, sometimes it doesn't. This could be similar to how there was input delay with key presses
but it randomly stopped happening  one day. To this day we can't explain it, the code didn't change.
