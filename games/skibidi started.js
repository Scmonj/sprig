/*
@title: getting_started
@author: leo, edits
@tags: ['tutorial']
@addedOn: 2022-07-26

Check the tutorial in the bottom right, the run button is in the top right.
Make sure to remix this tutorial if you want to save your progress!
*/
const song = tune`
297.029702970297: G4/297.029702970297,
297.029702970297,
297.029702970297: C4/297.029702970297,
297.029702970297,
297.029702970297: C5/297.029702970297 + G4/297.029702970297,
297.029702970297: F4/297.029702970297,
297.029702970297: E5/297.029702970297,
297.029702970297: D5/297.029702970297,
297.029702970297: C5/297.029702970297,
297.029702970297: B4/297.029702970297,
297.029702970297: A4/297.029702970297,
297.029702970297,
297.029702970297: C5/297.029702970297 + G4/297.029702970297,
297.029702970297: B4/297.029702970297,
297.029702970297: C5/297.029702970297 + G4/297.029702970297,
594.059405940594,
297.029702970297: G4/297.029702970297,
297.029702970297: C5/297.029702970297,
297.029702970297,
297.029702970297: C5/297.029702970297,
297.029702970297: D5/297.029702970297,
297.029702970297: E5/297.029702970297,
297.029702970297: D5/297.029702970297,
297.029702970297: C5/297.029702970297,
297.029702970297: A5/297.029702970297 + E5/297.029702970297,
297.029702970297: G5/297.029702970297 + E4/297.029702970297,
594.059405940594,
297.029702970297: C5/297.029702970297,
297.029702970297: A4/297.029702970297,
297.029702970297: C5/297.029702970297`a
const playback = playTune(song, Infinity)

// define the sprites in our game
const player = "p";
const box = "b";
const goal = "g";
const wall = "w";

// assign bitmap art to each sprite
setLegend(
  [ player, bitmap`
................
................
................
.......0........
.....00.000.....
....0.....00....
....0.0.0..0....
....0......0....
....0......0....
....00....0.....
......00000.....
......0...0.....
....000...000...
................
................
................`],
  [ box, bitmap`
................
................
................
...88888888888..
...8....8....8..
...8....8....8..
...8....8....8..
...8....8....8..
...88888888888..
...8....8....8..
...8....8....8..
...8....8....8..
...8....8....8..
...88888888888..
................
................`],
  [ goal, bitmap`
................
................
................
....444444......
...44....44.....
...4......4.....
...4.......4....
...4.......4....
...4.......4....
...44......4....
....4......4....
....44....44....
.....444444.....
................
................
................`],
  [ wall, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`]
);

// create game levels
let level = 0; // this tracks the level we are on
const levels = [
  map`
..p.
.b.g
....`,
  map`
p..
.b.
..g`,
  map`
p..g
.bw.
..w.
..w.`,
  map`
...........
w..........
w..w.ww....
w..w..ww...
w.bw....w..
w..w....w..
w...p.www..
w.....w....
w.wwwww....
www.g......`,
  map`
...
.p.
...`,
  map`
.....................
.....................
.......wwwwwwww..w...
.......w......w..w...
..wwwwww......w..w...
..w......wwwwww..w...
..w.....w........w...
..w....ww........w...
..w.w..w.wwwwww..w...
..w.w..w......w..w...
..w.w..w..wwwww..w...
..w.w..w..w......w...
..w.w..wwww......w...
p.w.w............w...
www.w............w...
....wwwwwwwwwwwwww...
..bg...w.............`,
   map`
.................wwwwwwwwwwwwww.
.wwwwwwwwwwwww...w............w.
.w...........w...w.wwwwwwwwww.w.
.w.wwwwwwwww.w...w.w........w.w.
.w.w.......w.w...w.wwwwwwwwww.w.
.w.w.......w.w...w.........ww.w.
.w.w.......w.w...wwwwwwwww.ww.w.
.w.wwwwwwwww.wwwwww......w.ww.w.
.w........ww......w......w.ww.w.
.w.wwwwww.wwwwwww.wwwwwwww.ww.w.
.w.w....w.w..........w.....ww.w.
.w.w....w.w.wwwww..w.w.wwwwww.w.
.w.wwww.w.w.w...w..w.w.w....w.w.
.w....w.w.w.www.w..w.w.wwwwww.w.
.wwww.w.w.w...w.w..w.w.ww.....w.
....w.w.w.w...w.w..w.w.w..wwwww.
.wwww.w.w.wwwww.w..w.w.w..w.....
ww......w.......w..w.w.w..wwwww.
p.......wwwwwwwww..w.w.w......w.
wwwww.www..........w....wwwww.w.
....w.w...........wwwww.....w.ww
....w.wwwwwwwwwwwwwwwwwwwwwww.bg
....w.......................wwww`,
   map`
wwwwwwww.
w..wwwww.
w..wgww..
w..wb.ww.
w.bww...w
w..ww...w
w.....www
w.....w..
w.ww.ww..
www.gw...`,
  map`
............
wwwwwwwwwww.
w.........w.
w.www.w.w.w.
w.w.w.w.w.w.
w.w.w.w.w.w.
w.w.w.w.w.w.
wpw.....w.w.
wwwwwwwww.w.
gb..........`,
  map`
.....................
.....................
.......wwwwwwww..w...
.......w......w..w...
..wwwwww......w..w...
..w......wwwwww..w...
..w.....w........w...
..w....ww........w...
..w.w..w.wwwwww..w...
..w.w..w......w..w...
..w.w..w..wwwww..w...
..w.w..w..w......w...
..w.w..wwww......w...
p.w.w............w...
www.w............w...
....wwwwwwwwwwwwww...
..bg...w.............`,
   map`
.................wwwwwwwwwwwwww.www.........
.wwwwwwwwwwwww...w............w.w.w.www.wwww
.w...........w...w.wwwwwwwwww.w.w.w.w.w.w..w
.w.wwwwwwwww.w...w.w........w.w.w.w.w.www...
.w.w.......w.w...w.wwwwwwwwww.w.w.www.......
.w.w.......w.w...w.........ww.w.w.....wwwwww
.w.w.......w.w...wwwwwwwww.ww.w.w.www.w.....
.w.wwwwwwwww.wwwwww......w.ww.w.w.w.w.wwwwww
.w........ww......w......w.ww.w.w.w.w.......
.w.wwwwww.wwwwwww.wwwwwwww.ww.w.w.w.w.www.ww
.w.w....w.w..........w.....ww.w.w.w.w.w.w.ww
.w.w....w.w.wwwww..w.w.wwwwww.w.w.w.w.w.w.ww
.w.wwww.w.w.w...w..w.w.w....w.w.w.w.w.w.w.w.
.w....w.w.w.www.w..w.w.wwwwww.w.w.w.w.w.w.w.
.wwww.w.w.w...w.w..w.w.ww.....w.w.www.w.w.w.
....w.w.w.w...w.w..w.w.w..wwwww.w.w...w.w.w.
.wwww.w.w.wwwww.w..w.w.w..w.....w.w.www.w.w.
ww......w.......w..w.w.w..wwwww.w.w.w...w.ww
p.......wwwwwwwww..w.w.w......w.w.w.w...w..w
wwwww.www..........w....wwwww.w.w.w.w...ww.w
....w.w...........wwwww.....w.www.w.w....w.w
....w.wwwwwwwwwwwwwwwwwwwwwww.....w.ww.w.w.w
....w.......................wwwwwww....w..bg`
];

// set the map displayed to the current level
const currentLevel = levels[level];
setMap(currentLevel);

setSolids([ player, box, wall ]); // other sprites cannot go inside of these sprites

// allow certain sprites to push certain other sprites

setPushables({
  [player]: [ box ]
});

// inputs for player movement control
onInput("s", () => {
  getFirst(player).y += 1; // positive y is downwards
});

onInput("d", () => {
  getFirst(player).x += 1;
});

onInput("w", () => {
  getFirst(player).y -= 1; // Negative y is upwards
});

onInput("a", () => {
  getFirst(player).x -= 1; // Negativesd x is to the right
});

// input to reset level
onInput("j", () => {
  const currentLevel = levels[level]; // get the original map of the level

  // make sure the level exists before we load it
  if (currentLevel !== undefined) {
    clearText("");
    setMap(currentLevel);
  }
});

// these get run after every input
afterInput(() => {
  // count the number of tiles with goals
  const targetNumber = tilesWith(goal).length;
  
  // count the number of tiles with goals and boxes
  const numberCovered = tilesWith(goal, box).length;

  // if the number of goals is the same as the number of goals covered
  // all goals are covered and we can go to the next level
  if (numberCovered === targetNumber) {
    // increase the current level number
    level = level + 1;

    const currentLevel = levels[level];

    // make sure the level exists and if so set the map
    // otherwise, we have finished the last level, there is no level
    // after the last level
    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      addText("you win!", { y: 4, color: color`3` });
    }
  }
});
