class ChickenSmall extends Chicken {

    width = 50;
    height = 50;

    IMAGES_CHICKEN_SMALL = [
        '../img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        '../img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        '../img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    IMAGES_CHICKEN_SMALL_DEAD = [
        '../img/3_enemies_chicken/chicken_small/2_dead/dead.png'
      ];

    constructor() {
        super().loadImage('../img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_CHICKEN_SMALL);
        this.loadImages(this.IMAGES_CHICKEN_SMALL_DEAD);  // Laden der Todesbilder
        this.x = 700 + Math.random() * 4000;
        this.speed = 0.1 + Math.random() * 0.5; // Zufällige Geschwindigkeit zwischen 0.1 und 1.0
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
        
        setInterval(() => {
            if (!this.isDead) { // Überprüfe ob das Huhn nicht tot ist
                this.playAnimation(this.IMAGES_CHICKEN_SMALL, true);
            }
        }, 200);      
    }

   die() {
    this.isDead = true;
    this.playAnimation(this.IMAGES_CHICKEN_SMALL_DEAD);
  }
}