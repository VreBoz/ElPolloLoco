class Character extends MovableObject {
    
    width= 120;
    height = 300;
    y = 30;
    speed = 10;
    offset = {
      top: 120,
      left: 0,
      right: 15,
      bottom: 5 
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
    ];

    idleImages = [
      '../img/2_character_pepe/1_idle/idle/I-1.png',
      '../img/2_character_pepe/1_idle/idle/I-2.png',
      '../img/2_character_pepe/1_idle/idle/I-3.png',
      '../img/2_character_pepe/1_idle/idle/I-4.png',
      '../img/2_character_pepe/1_idle/idle/I-5.png',
      '../img/2_character_pepe/1_idle/idle/I-6.png',
      '../img/2_character_pepe/1_idle/idle/I-7.png',
      '../img/2_character_pepe/1_idle/idle/I-8.png',
      '../img/2_character_pepe/1_idle/idle/I-9.png',
      '../img/2_character_pepe/1_idle/idle/I-10.png',
  ];

  longIdleImages = [
      '../img/2_character_pepe/1_idle/long_idle/I-11.png',
      '../img/2_character_pepe/1_idle/long_idle/I-12.png',
      '../img/2_character_pepe/1_idle/long_idle/I-13.png',
      '../img/2_character_pepe/1_idle/long_idle/I-14.png',
      '../img/2_character_pepe/1_idle/long_idle/I-15.png',
      '../img/2_character_pepe/1_idle/long_idle/I-16.png',
      '../img/2_character_pepe/1_idle/long_idle/I-17.png',
      '../img/2_character_pepe/1_idle/long_idle/I-18.png',
      '../img/2_character_pepe/1_idle/long_idle/I-19.png',
      '../img/2_character_pepe/1_idle/long_idle/I-20.png'
  ];
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
        this.loadImages(this.idleImages);
        this.loadImages(this.longIdleImages);
        this.lastMoved = Date.now();
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
            this.lastMoved = Date.now();
        }
        
        if (this.world.keyboard.LEFT && this.x > 0) {
            this.moveLeft();
            this.walking_sound.play();
            this.lastMoved = Date.now();
            this.otherDirection = true;
        }
        
        if (this.world.keyboard.UP && !this.isAboveGround()) {
            this.jump();
            this.jump_sound.play();
            this.lastMoved = Date.now();
        }
      
          this.world.camera_x = -this.x + 50;
        }, 1000 / 25);
      
        // Wiederhole die folgenden Aktionen in einem Intervall von 50 Millisekunden
        setInterval(() => {
          if(this.isDead()) {
              this.playAnimation(this.IMAGES_DEAD, false);
          } else if(this.isHurt()) {
              this.playAnimation(this.IMAGES_HURT, true);
          } else if(this.isAboveGround()) {
              this.playAnimation(this.IMAGES_JUMPING, true);
          } else {
              // Überprüfe, ob die RECHTSTASTE oder die LINKSTASTE auf der Tastatur gedrückt wurden
              if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                  this.playAnimation(this.IMAGES_WALKING, true);
              } else {
                  const timeSinceLastMoved = Date.now() - this.lastMoved;
                  if (timeSinceLastMoved > 5000) { // 5000ms = 5s
                      // longIdle Animation, wenn der Charakter länger als 5 Sekunden inaktiv war
                      this.playAnimation(this.longIdleImages, true);
                  } else {
                      // idle Animation, wenn der Charakter inaktiv ist, aber noch keine 5 Sekunden vergangen sind
                      this.playAnimation(this.idleImages, true);
                  }
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