// create a new scene
let gameScene = new Phaser.Scene('Game');

// some parameters for our scene
gameScene.init = function () {

    this.gameW = this.sys.game.config.width;
    this.gameH = this.sys.game.config.height;

    this.btnW = 262;
    this.btnH = 53;

    this.curPhoto = 0;
    this.iga = 2;
    this.fitz = 3;

};

// executed once, after assets were loaded
gameScene.create = function () {

    // btns
    let btnDepth = 500;
    this.t_btn = this.add.sprite(this.gameW / 2, this.btnH / 2, 'btn').setDepth(btnDepth).setInteractive();
    this.t_btn.on('pointerdown', function () {
        this.iga--;
        this.nextPhoto();
    }, this);

    this.b_btn = this.add.sprite(this.gameW / 2, this.gameH - this.btnH / 2, 'btn').setDepth(btnDepth).setInteractive();
    this.b_btn.angle = 180;
    this.b_btn.on('pointerdown', function (){
        this.iga++;
        this.nextPhoto();
    }, this);

    this.l_btn = this.add.sprite(this.btnH / 2, this.gameH / 2, 'btn').setDepth(btnDepth).setInteractive();
    this.l_btn.angle = -90;
    this.l_btn.on('pointerdown', function (){
        this.fitz--;
        this.nextPhoto();
    }, this);

    this.r_btn = this.add.sprite(this.gameW-this.btnH/2, this.gameH/2, 'btn').setDepth(btnDepth).setInteractive();
    this.r_btn.angle = 90;
    this.r_btn.on('pointerdown', function (){
        this.fitz++;
        this.nextPhoto();
    }, this);

    // init
    this.nextPhoto();

};
gameScene.nextPhoto = function () {
    // all btns.visible = true;
    this.t_btn.visible = true;
    this.b_btn.visible = true;
    this.l_btn.visible = true;
    this.r_btn.visible = true;

    let concat = 'p' + this.fitz + '' + this.iga;
    if (this.curPhoto) this.curPhoto.destroy();
    this.curPhoto = this.add.sprite(0, 0, concat).setOrigin(0, 0);

    // update nav
    if (this.iga < 1) {
        this.t_btn.visible = false;
    }
    if (this.iga > 3) {
        this.b_btn.visible = false;
    }
    if (this.fitz < 2) {
        this.l_btn.visible = false;
    }
    if (this.fitz > 5) {
        this.r_btn.visible = false;
    }
}