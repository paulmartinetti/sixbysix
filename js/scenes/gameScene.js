// create a new scene
let gameScene = new Phaser.Scene('Game');

// some parameters for our scene
gameScene.init = function () {

    this.gameW = this.sys.game.config.width;
    this.gameH = this.sys.game.config.height;

    // iga is 0 to 4
    this.iga = 0;
    // FitzPatrick skin types are 1 to 6
    this.fitz = 1;

    // width of one photo
    this.incX = 1000;
    // height of one photo
    this.incY = 1500;

    // set of x / fitz coordinates of photo grid
    this.xs = [];
    // set of y / iga coordinates of grid
    this.ys = [];
    // image sprites are loaded into this array
    // use to update displayed photo coordinates and depth
    this.photosA = [];

    // for swipe input
    this.startX = 0;
    this.startY = 0;
    this.endX = 0;
    this.endY = 0;

    this.swipemin = 200;
    this.level = 1;

    // zoom and nav controls
    this.zoomed = false;
    this.curPhoInd = 0;

};

// executed once, after assets were loaded
gameScene.create = function () {

    // create starting x and y coordinate arrays
    // fitz - start w fitz 3
    for (let vx = 0; vx < 6; vx++) {
        this.xs.push(this.incX * vx);
    }
    // iga
    for (let vy = 0; vy < 5; vy++) {
        this.ys.push(this.incY * vy);
    }

    // add all 30 images using start coordinates
    for (let iga = 0; iga < 5; iga++) {
        for (let fitz = 0; fitz < 6; fitz++) {
            // get loaded and named image, e.g. p10
            let imagename = 'p' + (fitz + 1) + iga;
            // add to stage using coordinate arrays
            let temp = this.add.sprite(this.xs[fitz], this.ys[iga], imagename, 0).setOrigin(0, 0).setInteractive();
            // make interactive to allow nav
            temp.on('pointerdown', function (pointer) {
                this.startX = Math.round(pointer.downX);
                this.startY = Math.round(pointer.downY);
            }, this);
            temp.on('pointerup', function (pointer) {
                this.nav(Math.round(pointer.upX), Math.round(pointer.upY));
            }, this);
            // add zoom and drag ability
            this.input.setDraggable(temp);
            this.input.on('drag', function (pointer, obj, dragX, dragY){
                if (!this.zoomed) return;
                this.dragit(obj, dragX, dragY);
            }, this);

            // store each to access for updates
            this.photosA.push(temp);
        }
    }

    // add zoom sprite (x, y, name, start frame)
    let zoom = this.add.sprite(60, this.gameH - 120, 'zoom', 0).setInteractive().setDepth(500);
    zoom.on('pointerdown', function () {

        // toggle global zoom var, scale photo
        if (!this.zoomed) {
            this.zoomed = true;
            // 'ok'
            zoom.setFrame(1);
            // position
            let photo = this.photosA[this.curPhoInd].setScale(2);
            photo.x = -500;
            photo.y = -750;
        } else if (this.zoomed) {
            this.zoomed = false;
            // plus sign (+)
            zoom.setFrame(0);
            // reset
            let photo = this.photosA[this.curPhoInd].setScale(1);
            photo.x = photo.y = 0;
        }

    }, this);
 
};

// called on pointerup
gameScene.nav = function (dx, dy) {

    console.log("startX "+this.startX, "startY"+this.startY);
    console.log("dx "+dx, "dy "+dy);

    // no nav if zoomed
    if (this.zoomed) return;

    // confirm purposeful swipe
    let diffX = dx - this.startX;
    let diffY = dy - this.startY;
    if (Math.abs(diffX) < this.swipemin && Math.abs(diffY) < this.swipemin) {
        return;
    }
    // start with x / fitz
    if (Math.abs(diffX) > this.swipemin) {
        if (diffX < 0) {
            this.fitz++;
        } else {
            this.fitz--;
        }

        // check bounds
        if (this.fitz < 1) {
            // no change
            this.fitz = 1;
        } else if (this.fitz > 6) {
            // no change
            this.fitz = 6;
        } else {
            // okay to swipe left or right
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
            // update y values
            for (let i = 0; i < 5; i++) {
                this.ys[i] += (this.incY * ydir);
            }
        }
    }
    console.log(this.fitz, this.iga);
    // ready to update photo based on swipe
    let j = 0;
    // next row
    for (let iga = 0; iga < 5; iga++) {
        // next column
        for (let fitz = 0; fitz < 6; fitz++) {
            // load photo on top whose coordinates are now 0,0
            if (this.xs[fitz] == 0 && this.ys[iga] == 0) {
                // get loaded and named image, e.g. p10
                let imagename = this.photosA[j];
                imagename.x = imagename.y = 0;
                this.level++;
                imagename.setDepth(this.level);
                // update global photo index for zoom fn
                this.curPhoInd = j;
                return;
            }
            // photos are stored linearly, one row at a time
            j++;
        }
    }
}

// drag when zoomed
gameScene.dragit = function (obj, dragX, dragY) {

    //console.log(obj.x, obj.y);
    obj.x = dragX;
    obj.y = dragY;

    // bounds
    if (obj.x < -1000) obj.x = -1000;
    if (obj.y < -1500) obj.y = -1500;
    if (obj.x > 0) obj.x = 0;
    if (obj.y > 0) obj.y = 0;
}

// no code here, doesn't run