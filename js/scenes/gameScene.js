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

    this.btnW = 262;
    this.btnH = 53;

    this.topPhoto = 1;
    this.iga = 3;
    this.fitz = 3;

};

// executed once, after assets were loaded
gameScene.create = function () {

    // btns
    this.t_btn = this.add.sprite(this.gameW/2, this.btnH * 2, 'btn').setDepth(500).setInteractive();
    this.t_btn.on('pointerdown', function () {
        this.iga--;
        this.nextPhoto();
    }, this)

    this.b_btn = this.add.sprite(this.gameW/2, this.gameH - this.btnH, 'btn').setDepth(500).setInteractive();
    this.b_btn.angle = 180;

};
gameScene.nextPhoto = function () {
    // all btns.visible = true;

    //this.topPhoto++;
    let concat = 'p' + this.fitz + '' + this.iga;
    let curPhoto = this.add.sprite(0, 0, concat).setOrigin(0, 0).setDepth(1);

    // hide certain buttons
    if (this.iga < 1) {
        this.t_btn.visible = false;
    }
}