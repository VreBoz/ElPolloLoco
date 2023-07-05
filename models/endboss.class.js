class Endboss extends MovableObject {
    height = 450;
    width = 280;
    y = 0;
    energy = 100;

    IMAGES_WALKING = [
        '/img/4_enemie_boss_chicken/2_alert/G5.png',
        '/img/4_enemie_boss_chicken/2_alert/G6.png',
        '/img/4_enemie_boss_chicken/2_alert/G7.png',
        '/img/4_enemie_boss_chicken/2_alert/G8.png',
        '/img/4_enemie_boss_chicken/2_alert/G9.png',
        '/img/4_enemie_boss_chicken/2_alert/G10.png',
        '/img/4_enemie_boss_chicken/2_alert/G11.png',
        '/img/4_enemie_boss_chicken/2_alert/G12.png',
    ];

    IMAGES_HURT = [
        '../img/4_enemie_boss_chicken/4_hurt/G21.png',
        '../img/4_enemie_boss_chicken/4_hurt/G22.png',
        '../img/4_enemie_boss_chicken/4_hurt/G23.png',
    ];

    IMAGES_DEAD = [
        '../img/4_enemie_boss_chicken/5_dead/G24.png',
        '../img/4_enemie_boss_chicken/5_dead/G25.png',
        '../img/4_enemie_boss_chicken/5_dead/G26.png',
    ];

    constructor() {
    super().loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.x = 4500;
    this.isDead = false;  // Initialisieren Sie isDead auf false
    this.animate();
    }

    animate() {
        setInterval(() => {
            if (!this.isDead) {  // Nur wenn der Endboss nicht tot ist
                if (this.isHurt()) {  // Wenn der Endboss in der letzten Sekunde getroffen wurde
                    this.playAnimation(this.IMAGES_HURT);  // Spielen Sie die Hurt-Animation ab
                } else {
                    this.playAnimation(this.IMAGES_WALKING);  // Andernfalls spielen Sie die Walking-Animation ab
                }
            } else {
                this.playAnimation(this.IMAGES_DEAD);  // Wenn der Endboss tot ist, spielen Sie die Death-Animation ab
                if(this.currentImage === this.IMAGES_DEAD.length) {
                    clearInterval(this.interval);
                }
            }
        }, 200);  // Aktualisieren Sie die Animation alle 200 Millisekunden
    }

    hit() {
        this.energy -= 20;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }

        // Überprüfen, ob der Endboss keine Lebenspunkte mehr hat und ihn sterben lassen
        if (this.energy <= 0) {
            this.die();
        }
    }

    die() {
        this.isDead = true;
    
        let i = 0;
        const animationInterval = setInterval(() => {
            if (i < this.IMAGES_DEAD.length) {
                this.img = this.imageCache[this.IMAGES_DEAD[i++]];
            } else {
                clearInterval(animationInterval);  // Stoppt die Todesanimation nach dem letzten Bild
    
                // Versteckt die Lebensleiste des Endbosses
                if (this.world && this.world.endbossBar) {
                    this.world.endbossBar.hide(); 
    
                    // Zeigt nach 2 Sekunden einen Gewinner-Alert an
                    setTimeout(() => {
                        alert('Du hast gewonnen!');
                    }, 2000);
                }
            }
        }, 100); // 500 Millisekunden Verzögerung zwischen den Bildern
    }
    
}