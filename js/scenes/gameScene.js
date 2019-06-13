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
    this.level = 1;

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

    // prevent run from home screen click
    if (!this.ready) {
        this.ready = true;
        return;
    }

    /*** check bounds and update x  ***/

    // confirm purposeful swipe
    let diffX = dx - this.startX;
    let diffY = dy - this.startY;
    if (Math.abs(diffX) < this.swipemin && Math.abs(diffY) < this.swipemin) {
        return;
    }

    if (Math.abs(diffX) > this.swipemin) {
        if (diffX < 0) {
            this.fitz++;
        } else {
            this.fitz--;
        }

        // check bounds
        if (this.fitz < 1) {
            this.fitz = 1;
        } else if (this.fitz > 6) {
            this.fitz = 6;
        } else {
            // okay to swipe left
            let xdir = 0;
            if (diffX < 0) {
                xdir = -1;
            } else {
                xdir = 1;
            }
            // update x values
            for (let i = 0; i < 6; i++) {
                this.xs[i] += (this.incX * xdir);
            }
        }
    }

    // vertical swipe
    if (Math.abs(diffY) > this.swipemin) {
        if (diffY < 0) {
            this.iga++;
        } else {
            this.iga--;
        }

        // check bounds
        if (this.iga < 0) {
            // no change
            this.iga = 0;
        } else if (this.iga > 4) {
            // no change
            this.iga = 4;
        } else {
            // okay to swipe up or down
            let ydir = 0;
            if (diffY < 0) {
                ydir = -1;
            } else {
                ydir = 1;
            }
            // update x values
            for (let i = 0; i < 5; i++) {
                this.ys[i] += (this.incY * ydir);
            }
        }
    }

    // load photo at 0,0
    let j = 0;
    for (let iga = 0; iga < 5; iga++) {
        for (let fitz = 0; fitz < 6; fitz++) {
            if (this.xs[fitz] == 0 && this.ys[iga] == 0) {
                // get loaded and named image, e.g. p10
                let imagename = this.photos[j];
                imagename.x = imagename.y = 0;
                this.level++;
                imagename.setDepth(this.level);
                return;
            }
            j++;
        }
    }
}