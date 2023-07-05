class Character extends MovableObject {
    
    width= 120;
    height = 300;
    y = 30;
    speed = 10;
    offset = {
      top: 120,
      left: 0,
      right: 0,
      bottom: 0 
  };
    IMAGES_WALKING = [
        '../img/2_character_pepe/2_walk/W-21.png',
        '../img/2_character_pepe/2_walk/W-22.png',
        '../img/2_character_pepe/2_walk/W-23.png',
        '../img/2_character_pepe/2_walk/W-24.png',
        '../img/2_character_pepe/2_walk/W-25.png',
        '../img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_JUMPING = [
      '../img/2_character_pepe/3_jump/J-31.png',
      '../img/2_character_pepe/3_jump/J-32.png',
      '../img/2_character_pepe/3_jump/J-33.png',
      '../img/2_character_pepe/3_jump/J-34.png',
      '../img/2_character_pepe/3_jump/J-35.png',
      '../img/2_character_pepe/3_jump/J-36.png',
      '../img/2_character_pepe/3_jump/J-37.png',
      '../img/2_character_pepe/3_jump/J-38.png',
      '../img/2_character_pepe/3_jump/J-39.png',
      
    ];

    IMAGES_DEAD = [
      '../img/2_character_pepe/5_dead/D-51.png',
      '../img/2_character_pepe/5_dead/D-52.png',
      '../img/2_character_pepe/5_dead/D-53.png',
      '../img/2_character_pepe/5_dead/D-54.png',
      '../img/2_character_pepe/5_dead/D-55.png',
      '../img/2_character_pepe/5_dead/D-56.png',
      '../img/2_character_pepe/5_dead/D-57.png'
    ];

    IMAGES_HURT = [
      '../img/2_character_pepe/4_hurt/H-41.png',
      '../img/2_character_pepe/4_hurt/H-42.png',
      '../img/2_character_pepe/4_hurt/H-43.png'
    ]
    world;
    walking_sound = new Audio('./audio/Running On Grass - Sound Effect for editing.mp3');
    jump_sound = new Audio('audio/jump.wav');
    coin_sound = new Audio('audio/pickupCoin.wav');
    hurt_sound = new Audio('audio/hitHurt (1).wav')
    
   
    constructor() {
        super().loadImage('../img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.applyGravity();
        this.animate();
    }

    animate() {
        // Wiederhole die folgenden Aktionen in einem Intervall von 1000/60 Millisekunden (ca. 60 Frames pro Sekunde)
        setInterval(() => {
          this.jump_sound.pause();
          this.walking_sound.pause();
          
          if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
            this.moveRight();
            this.walking_sound.play();
          }
          
          if (this.world.keyboard.LEFT && this.x > 0) {
            this.moveLeft();
            this.walking_sound.play();
            this.otherDirection = true;
          }
          
          if (this.world.keyboard.SPACE && !this.isAboveGround()) {
            this.jump_sound.pause();
            this.jump_sound.currentTime = 0; // Zurückspulen zum Anfang des Sounds
            this.jump();
            this.jump_sound.play();
          }
      
          this.world.camera_x = -this.x + 50;
        }, 1000 / 25);
      
        // Wiederhole die folgenden Aktionen in einem Intervall von 50 Millisekunden
        setInterval(() => {
          if(this.isDead()) {
            this.playAnimation(this.IMAGES_DEAD);
          } else if(this.isHurt()) {
            this.playAnimation(this.IMAGES_HURT);
          } else if(this.isAboveGround()) {
            this.playAnimation(this.IMAGES_JUMPING);
          }else {
          // Überprüfe, ob die RECHTSTASTE oder die LINKSTASTE auf der Tastatur gedrückt wurden
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
              this.playAnimation(this.IMAGES_WALKING);
            }
          }
        }, 1000 / 25);
      }

      isCollidingWithCoin(coin) {
        return this.x < coin.x + coin.width &&
               this.x + this.width > coin.x &&
               this.y < coin.y + coin.height &&
               this.y + this.height > coin.y;
    }

    
    
}