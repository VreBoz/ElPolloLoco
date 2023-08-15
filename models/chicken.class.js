class Chicken extends MovableObject{

    width = 60;
    height = 60;
    y = 360;
    IMAGES_WALKING = [
        './img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        './img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        './img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];
    isDead = false;
    IMAGES_DEAD = [
        './img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];

    constructor() {
    super().loadImage('./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png')
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);  // Laden der Todesbilder
    this.x = 700 + Math.random() * 4000 ;
    this.speed = 0.1 + Math.random() * 0.9;
    this.animate();
    }

    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    
        setInterval(() => {
            if (!this.isDead) { // Überprüfe ob das Huhn nicht tot ist
                this.playAnimation(this.IMAGES_WALKING, true);
            }
        }, 200);      
    }

   


   die() {
    this.isDead = true; // Setzt den Zustand des Huhns auf "tot"
    this.playAnimation(this.IMAGES_DEAD); // Spielt die Todesanimation ab (das entsprechende Bild)
    
}
}