// create a new scene
let loadingScene = new Phaser.Scene('Loading');

// preload
// load asset files for our game
// ALL scenes have access to these objects!
loadingScene.preload = function () {
    
    // 
    let gameW = this.sys.game.config.width;
    let gameH = this.sys.game.config.height;

    // loaded in bootScene
    //let logo = this.add.sprite(gameW / 2, 250, 'logo');

    // progress bar bg
    let bgBar = this.add.graphics();
    let barW = 150;
    let barH = 30;

    // for graphics objs, the default origin is top-left
    bgBar.setPosition(gameW / 2 - barW / 2, gameH / 2 - barH / 2);
    // color, alpha (0-1)
    bgBar.fillStyle(0xF5F5F5,1);
    bgBar.fillRect(0,0,barW,barH);

    // progress bar
    let progressBar = this.add.graphics();
    progressBar.setPosition(gameW / 2 - barW / 2, gameH / 2 - barH / 2);

    // listen to progress event
    // value = 0-1 of loaded
    this.load.on('progress',function(value){

        // clear the bar so we can draw it again
        progressBar.clear();

        // set style
        progressBar.fillStyle(0x9AD98D);

        // draw with updated 'value'
        progressBar.fillRect(0, 0, (barW*value), barH);

    },this);
    
    // LOAD ASSETS
    this.load.image('bg', 'assets/images/bg.png');
    // btn
    this.load.image('btn', 'assets/images/btn.png');
    // zoom
    this.load.spritesheet('zoom','assets/images/zoom.png', {
        frameWidth: 110,
        frameHeight: 111,
        startFrame: 0,
        endFrame: 1,
        margin: 0,
        spacing: 0,
        frameNum: 0
    });

    // load 36 photos
    let i = 0;
    for (let iga = 0; iga < 5; iga++) {
        for (let fitz = 1; fitz < 7; fitz++) {
            i++;
            if (i < 10) i = '0'+i;
            this.load.image('p'+fitz+''+iga, 'assets/images/p10_Page_'+i+'.jpg');
            //console.log(i);
        }
    }
};

loadingScene.create = function () {

    // animation of spritesheet - animations are global (available in multiple scenes)
    // to loop forever, repeat: -1
    // key name is arbitrary
    /* this.anims.create({
        key: 'funnyfaces',
        frames: this.anims.generateFrameNames('pet', { frames: [1, 2, 3] }),
        frameRate: 7,
        yoyo: true,
        repeat: 0
    }); */

    // 

    // ready to offer game
    this.scene.start('Home');

};