
// our game's configuration
// backgroundColor - game only
// original reduced height by 100 (from 1136)

let config = {
  type: Phaser.AUTO,
  width: 1440,
  height: 900,
  scene: [bootScene, loadingScene, homeScene, gameScene],
  title: 'Six by six',
  pixelArt: false,
  backgroundColor: '000000'
};


// create the game, and pass it the configuration
let game = new Phaser.Game(config);
