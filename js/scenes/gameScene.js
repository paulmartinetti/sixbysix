// create a new scene
let gameScene = new Phaser.Scene('Game');

/* game flow
*  
*
*/

// some parameters for our scene
gameScene.init = function () {

    this.gameW = this.sys.game.config.width;
    this.gameH = this.sys.game.config.height;

};

// executed once, after assets were loaded
gameScene.create = function () {
    // init
    let topPhoto = 1;
    let iga = 3;
    let fitz = 3; 

    // btns
    let l_btn = this.add.sprite(50, 50, 'btn').setDepth(500).setInteractive();

    let concat = 'p'+fitz+''+iga;
    let first = this.add.sprite(0,0,concat).setOrigin(0,0).setDepth(1);

};