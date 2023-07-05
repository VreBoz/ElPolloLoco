class ThrowableObject extends MovableObject {


    IMAGES_BOTTLE_ROTATE = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    IMAGES_BOTTLE_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png'
    ];

    constructor(x, y){
        super().loadImage('../img/6_salsa_bottle/salsa_bottle.png');
        this.x = x;
        this.y = y;
        this.height = 70;
        this.width = 60;
        this.throw();

    }

    throw() {
        this.speedY = 23;
        this.applyGravity();

        let rotationIndex = 0; // Index für die Rotation der Flasche
        let rotationInterval = setInterval(() => {
            // Animation für die Rotation der Flasche
            this.loadImage(this.IMAGES_BOTTLE_ROTATE[rotationIndex]);
            rotationIndex++;
            if (rotationIndex >= this.IMAGES_BOTTLE_ROTATE.length) {
                rotationIndex = 0;
            }
        }, 100);

        setInterval(() => {
            this.x += 7;
        }, 25);

        setTimeout(() => {
            clearInterval(rotationInterval); // Stoppt die Rotation der Flasche nach einer bestimmten Zeit
        }, 2000);
    }
}