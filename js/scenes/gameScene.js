// create a new scene
let gameScene = new Phaser.Scene('Game');

// some parameters for our scene
gameScene.init = function () {

    this.gameW = this.sys.game.config.width;
    this.gameH = this.sys.game.config.height;

    this.iga = 2;
    this.fitz = 3;

    this.incX = 1440;
    this.incY = 900;

    this.xs = [];
    this.ys = [];
    this.photos = [];

    this.startX = 0;
    this.startY = 0;
    this.endX = 0;
    this.endY = 0;

};

// executed once, after assets were loaded
gameScene.create = function () {

    // create starting x and y coordinate arrays
    for (let vy = 0; vy < 5; vy++) {
        this.xs.push(this.incY * vy);
    }
    for (let vx = 0; vx < 6; vx++) {
        this.ys.push(this.incX * vx);
    }
    //console.log(this.xs, this.ys);

    // position all 30 images using start coordinates
    for (let iga = 0; iga < 5; iga++) {
        for (let fitz = 0; fitz < 6; fitz++) {
            // get loaded and named image, e.g. p10
            let imagename = 'p' + (fitz + 1) + iga;
            // add to stage using coordinate arrays
            let temp = this.add.sprite(this.xs[iga], this.ys[fitz], imagename, 0).setOrigin(0, 0).setInteractive();
            temp.on('pointerdown', function (pointer) {
                this.startX = Math.round(pointer.downX);
                this.startY = Math.round(pointer.downY);
            }, this);
            temp.on('pointerup', function (pointer) {
                this.nav(Math.round(pointer.upX), Math.round(pointer.upY));
            }, this);
            // make interactive to allow nav
            this.photos.push(temp);
        }
    }
};
gameScene.nav = function (dx, dy) {
    console.log(dx-this.startX, dy-this.startY);

    // update nav
    /*  if (this.iga < 1) {
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
     } */
}