class Endboss extends MovableObject {
    height = 450;
    width = 280;
    y = 0;
    energy = 100;
    hasBeenHit = false;
    offset = {
        top: 90,
        left: 20,
        right: 15,
        bottom: 15 
    };

    IMAGES_ALERT = [
        './img/4_enemie_boss_chicken/2_alert/G5.png',
        './img/4_enemie_boss_chicken/2_alert/G6.png',
        './img/4_enemie_boss_chicken/2_alert/G7.png',
        './img/4_enemie_boss_chicken/2_alert/G8.png',
        './img/4_enemie_boss_chicken/2_alert/G9.png',
        './img/4_enemie_boss_chicken/2_alert/G10.png',
        './img/4_enemie_boss_chicken/2_alert/G11.png',
        './img/4_enemie_boss_chicken/2_alert/G12.png',

    ]

    IMAGES_WALKING = [
        './img/4_enemie_boss_chicken/1_walk/G1.png',
        './img/4_enemie_boss_chicken/1_walk/G2.png',
        './img/4_enemie_boss_chicken/1_walk/G3.png',
        './img/4_enemie_boss_chicken/1_walk/G4.png',
        
    ];

    IMAGES_HURT = [
        './img/4_enemie_boss_chicken/4_hurt/G21.png',
        './img/4_enemie_boss_chicken/4_hurt/G22.png',
        './img/4_enemie_boss_chicken/4_hurt/G23.png',
    ];

    IMAGES_DEAD = [
        './img/4_enemie_boss_chicken/5_dead/G24.png',
        './img/4_enemie_boss_chicken/5_dead/G25.png',
        './img/4_enemie_boss_chicken/5_dead/G26.png',
    ];

    constructor() {
    super().loadImage(this.IMAGES_ALERT[0]);
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.x = 4500;
    this.isDead = false;  // Initialisieren Sie isDead auf false
    this.animate();
    }

    animate() {
        this.interval = setInterval(() => {
            if (!this.isDead) {
                if (this.isHurt()) {
                    this.playAnimation(this.IMAGES_HURT, false);
                } else {
                    if (this.hasBeenHit) {
                        this.playAnimation(this.IMAGES_WALKING, true);
                    } else {
                        // Wenn er nicht verletzt und noch nicht getroffen wurde, spielen Sie die Alert-Animation
                        this.playAnimation(this.IMAGES_ALERT, true);
                    }
                }
            } else {
                this.playAnimation(this.IMAGES_DEAD, false);
                if (this.currentImage === this.IMAGES_DEAD.length - 1) {
                    clearInterval(this.interval);
                }
            }
        }, 200);
    }

    hit() {
        this.energy -= 20;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
            this.playAnimation(this.IMAGES_HURT, false);
            
            // Nachdem die Hurt-Animation abgespielt wurde, rufen Sie attackEndBoss auf und spielen die Walking-Animation
            setTimeout(() => {
                this.attackEndBoss();
                this.playAnimation(this.IMAGES_WALKING, true);
            }, this.IMAGES_HURT.length * 200);  // Die Dauer, die benötigt wird, um die Hurt-Animation abzuspielen
        }
        this.hasBeenHit = true;
    
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
    
                }
            }
        }, 100); // 500 Millisekunden Verzögerung zwischen den Bildern
    }
    
}