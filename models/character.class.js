class Character extends MovableObject {
    
    width= 150;
    height = 330;
    y = 100;
    speed = 10
    IMAGES_WALKING = [
        '../img/2_character_pepe/2_walk/W-21.png',
        '../img/2_character_pepe/2_walk/W-22.png',
        '../img/2_character_pepe/2_walk/W-23.png',
        '../img/2_character_pepe/2_walk/W-24.png',
        '../img/2_character_pepe/2_walk/W-25.png',
        '../img/2_character_pepe/2_walk/W-26.png'
    ];
    world;
    
   
    constructor() {
        super().loadImage('../img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);

        this.animate();
    }

    animate() {
        // Wiederhole die folgenden Aktionen in einem Intervall von 1000/60 Millisekunden (ca. 60 Frames pro Sekunde)
        setInterval(() => {
          
          if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {   // Überprüfe, ob die RECHTSTASTE auf der Tastatur gedrückt wurde           
            this.x += this.speed;            // Bewege den Charakter nach rechts       
            this.otherDirection = false;     // Setze die Eigenschaft "otherDirection" auf false, da der Charakter nach rechts schaut
          }
          
          if (this.world.keyboard.LEFT && this.x > 0 ) {    // Überprüfe, ob die LINKSTASTE auf der Tastatur gedrückt wurde          
            this.x -= this.speed;            // Bewege den Charakter nach links             
            this.otherDirection = true;      // Setze die Eigenschaft "otherDirection" auf true, da der Charakter nach links schaut
          }
          this.world.camera_x = -this.x + 50;
        }, 1000 / 60);
      
        // Wiederhole die folgenden Aktionen in einem Intervall von 50 Millisekunden
        setInterval(() => {
          // Überprüfe, ob die RECHTSTASTE oder die LINKSTASTE auf der Tastatur gedrückt wurden
          if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
            // Bewege den Charakter weiter nach rechts (auch wenn die Taste LINKS gedrückt wurde)
            this.x += this.speed;
            // Walk-Animation: Wähle das nächste Bild aus der Liste der Animationsbilder
            let i = this.currentImage % this.IMAGES_WALKING.length;
            let path = this.IMAGES_WALKING[i];
            this.img = this.imageCache[path];
            this.currentImage++;
          }
        }, 1000 / 60);
      }
    jump() {

    }
}