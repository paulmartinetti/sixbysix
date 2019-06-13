// create a new scene
let gameScene = new Phaser.Scene('Game');

// some parameters for our scene
gameScene.init = function () {

    this.gameW = this.sys.game.config.width;
    this.gameH = this.sys.game.config.height;

    this.iga = 0;
    this.fitz = 1;

    this.incX = 1440;
    this.incY = 900;

    this.xs = [];
    this.ys = [];
    this.photos = [];

    this.startX = 0;
    this.startY = 0;
    this.endX = 0;
    this.endY = 0;

    this.swipemin = 200;

    this.ready = false;

};

// executed once, after assets were loaded
gameScene.create = function () {

    // create starting x and y coordinate arrays
    for (let vy = 0; vy < 5; vy++) {
        this.ys.push(this.incY * vy);
    }
    for (let vx = 0; vx < 6; vx++) {
        this.xs.push(this.incX * vx);
    }

    // position all 30 images using start coordinates
    for (let iga = 0; iga < 5; iga++) {
        for (let fitz = 0; fitz < 6; fitz++) {
            // get loaded and named image, e.g. p10
            let imagename = 'p' + (fitz + 1) + iga;
            // add to stage using coordinate arrays
            let temp = this.add.sprite(this.xs[fitz], this.ys[iga], imagename, 0).setOrigin(0, 0).setInteractive();
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
// called on pointerup
gameScene.nav = function (dx, dy) {

    if (!this.ready) {
        this.ready = true;
        return;
    }

    /*** check bounds and update x  ***/

    // confirm purposeful swipe
    let diffX = dx - this.startX;

    if (Math.abs(diffX) < this.swipemin) {
        return;
    }

    diffX < 0 ? this.fitz++ : this.fitz--;

    // check bounds
    if (this.fitz < 1) {
        this.fitz = 1;
        return;
    }
    if (this.fitz > 6) {
        this.fitz = 6;
        return;
    }


    // okay to swipe left
    let xdir = 0;

    if (diffX < 0) {
        xdir = -1;
    } else {
        xdir = 1;
    }
    for (let i = 0; i < 6; i++) {
        this.xs[i] += (this.incX * xdir);
    }

    // load photo at 0,0
    let j = 0;
    for (let iga = 0; iga < 5; iga++) {
        for (let fitz = 0; fitz < 6; fitz++) {
            if (this.xs[fitz] == 0 && this.ys[iga] == 0) {
                // get loaded and named image, e.g. p10
                let imagename = this.photos[j];
                imagename.x = imagename.y = 0;
                return;
            }
            j++;
        }
    }


    // update nav
    /*  
     if (this.fitz < 2) {
         this.l_btn.visible = false;
     }
     if (this.fitz > 5) {
         this.r_btn.visible = false;
     } */
}