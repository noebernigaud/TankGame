# TankGame
Tank game similar to the Wii tank game coded in Javascript for a university project. You are one lonely tank against an army, and will need to use great tactics to come out on top.
Every tank have a single life, and they lose it by getting hit by a bullet. Friendly fire is allowed. Bullets bounce once on walls before dying themselves at the next collision. A bullet can destroy another bullet.
You and your opponent will be separated by walls. Some are destroyable, and have a grey image. There are also holes, which you can't move over, but bullets do fly over them.
When you kill all the ennemy tanks in a level, you can proceed to the next level, until you have beaten all 5 levels. If you get killed, you start back from the beginning.
You can ajust your char's speed or change its reload time with the inputs below the game. The game's default difficulty is conceived to be challenging and rewarding, but feel free to create your own experience using those parameters.

**DONE**

- Change the controls for the tank's movement so we can fire and move in 2 different directions. We now use ZQSD to move.
- Create walls, destructable walls, holes.
- Collision between bullets and walls.
- Collision tank/tank, bullet/bullet, bullet/tank.
- Bullets have a set number of lifes and bounce off on walls using those lifes.
- Change cooldowns and speeds to make the game interesting.
- Create ennemy tanks.
- Ennemies AI.
- Mines.
- Images (tanks, walls destructable/not, bullets, background, mines).
- Background music.
- Sounds (fire bullets, bullet's bounce, bullet explosion, tank explosion, put mine, applause).
- Implement different types of enemies (green tanks are immobile, red tanks are mobile, blue tanks are fast and have a shorter reloading time).
- Implements different levels.
- Inputs below the canvas to adjust the speed and reloading time of the played tank.

**IMPORTANTE NOTE**

Once downloaded the html file needs to be opened with a live server, else access to scripts will be bocked by the CORS policy.

