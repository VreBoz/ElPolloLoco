class MovableObject extends DrawableObject {
    
    
    speed = 0.15; // Geschwindigkeit des Objekts
    otherDirection = false; // Flag, ob das Objekt in die andere Richtung schaut
    speedY = 0; // Vertikale Geschwindigkeit des Objekts
    acceleration = 1.5; // Beschleunigung des Objekts
    energy = 100;
    lastHit = 0;
    jumpAnimationFrame = 0;  // Neue Variable, um den Index des aktuellen Sprungbilds zu speichern
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    };

    applyGravity() {
        // Funktion zum Anwenden der Schwerkraft
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                // Überprüfe, ob das Objekt über dem Boden schwebt oder nach unten fällt
                this.y -= this.speedY; // Aktualisiere die y-Koordinate basierend auf der vertikalen Geschwindigkeit
                this.speedY -= this.acceleration; // Verringere die vertikale Geschwindigkeit basierend auf der Beschleunigung
            }
        }, 1000 / 40); // Aktualisiere alle 25 Millisekunden
    }

    isAboveGround() {
        // Funktion zum Überprüfen, ob das Objekt über dem Boden schwebt
        if(this instanceof ThrowableObject) {  // ThrowableObjects should always fall
            return true;
        } else{
            return this.y < 130; // Wenn die y-Koordinate kleiner als 130 ist, befindet sich das Objekt über dem Boden
        }
    }

    

    

    

    isColliding(mo) {
        let collisionBoxThis = this.getBoundingRectangle();
        let collisionBoxMo = mo.getBoundingRectangle();
    
        return  collisionBoxThis.x + collisionBoxThis.width > collisionBoxMo.x &&
                collisionBoxThis.y + collisionBoxThis.height > collisionBoxMo.y &&
                collisionBoxThis.x < collisionBoxMo.x + collisionBoxMo.width &&
                collisionBoxThis.y < collisionBoxMo.y + collisionBoxMo.height;
    }

    getBoundingRectangle() {
        return {
            x: this.x + this.offset.left,
            y: this.y + this.offset.top,
            width: this.width - this.offset.left - this.offset.right,
            height: this.height - this.offset.top - this.offset.bottom
        };
    }

    hit() {
        this.energy -= 5;
        if (this.energy < 0 ) {
            this.energy = 0;
        }else {
            this.lastHit = new Date().getTime();
        }
        
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000; // difference in seconds
        return timepassed < 1;
    }

    isDead() {
        return this.energy == 0;
    }

    /**
     * @param {Array} arr - ['/img/image1.png','/img/image1.png',......]
     */
    

    playAnimation(images, shouldLoop) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];

    if (shouldLoop || i < images.length - 1) { // Überprüfen, ob die Animation wiederholt werden sollte oder ob das aktuelle Bild nicht das letzte ist
        this.currentImage++;
    }
}

    moveRight() {
        // Funktion zum Bewegen nach rechts
        this.x += this.speed; // Inkrementiere die x-Koordinate basierend auf der Geschwindigkeit, um das Objekt nach rechts zu bewegen
        this.otherDirection = false; // Setze die Eigenschaft "otherDirection" auf false, da das Objekt nach rechts schaut
    }

    moveLeft() {
        // Funktion zum Bewegen nach links
        this.x -= this.speed; // Dekrementiere die x-Koordinate basierend auf der Geschwindigkeit, um das Objekt nach links zu bewegen
    }

    jump() {
        // Funktion zum Springen
        this.speedY = 15; // Verringern Sie die vertikale Geschwindigkeit, um den Sprung zu verringern
        this.acceleration = 1.0; // Verringern Sie die Beschleunigung, um die Aufwärtsbewegung langsamer zu machen
    }

    attackEndBoss() {
        setInterval(() => {
          this.x -= 0.20;
        }, 1000 / 60);
        
      }
}
 //write a setInterval 



