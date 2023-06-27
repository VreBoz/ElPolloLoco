class World {
    character = new Character();  // Erstellt eine Instanz der Klasse "Character" und speichert sie in der Eigenschaft "character"
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0 ;  
    constructor(canvas, keyboard) {
      this.ctx = canvas.getContext('2d');  // Holt den 2D-Kontext des Canvas-Elements und speichert ihn in der Eigenschaft "ctx"
      this.canvas = canvas;  // Speichert das Canvas-Element in der Eigenschaft "canvas"
      this.keyboard = keyboard
      this.draw();  // Ruft die Methode "draw" auf
      this.setWorld()
    }

    setWorld() {
      this.character.world = this;
    }
  
    // Die Methode "draw" wird immer wieder aufgerufen, um die Szene zu zeichnen
    draw() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);  // Löscht den gesamten Inhalt des Canvas
      // Zeichnet das Bild des Charakters an seiner aktuellen Position im Canvas

      this.ctx.translate(this.camera_x, 0);

      this.addObjectsToMap(this.level.backgroundObjects);
      this.addToMap(this.character);
      
      this.addObjectsToMap(this.level.enemies);

      this.addObjectsToMap(this.level.clouds);

      this.ctx.translate(-this.camera_x, 0);

      

      let self = this;
      requestAnimationFrame(function() {
        self.draw();  // Ruft die "draw"-Methode erneut auf, um eine kontinuierliche Aktualisierung der Szene zu erreichen
      });
    }

    addObjectsToMap(objects) {
      objects.forEach(object => {
        this.addToMap(object);
      });
    }

    addToMap(mo) {
      // Überprüfe, ob das Objekt in die andere Richtung zeigt
      if (mo.otherDirection) {
        this.ctx.save();                // Speichere den aktuellen Kontext des Canvas        
        this.ctx.translate(mo.width, 0);// Führe eine Translation durch, um das Objekt zu spiegeln        
        this.ctx.scale(-1, 1);          // Skaliere den Kontext in der horizontalen Richtung, um das Objekt zu spiegeln    
        mo.x = mo.x * -1;               //  Passe die x-Koordinate des Objekts an, um die Spiegelung zu berücksichtigen
      }
      
      this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height); // Zeichne das Bild des Objekts auf dem Canvas
      
      if (mo.otherDirection) {           // Überprüfe erneut, ob das Objekt in die andere Richtung zeigt
        mo.x = mo.x * -1;                // Setze die x-Koordinate des Objekts zurück, um den ursprünglichen Wert wiederherzustellen 
        this.ctx.restore();               // Stelle den ursprünglichen Kontext des Canvas wieder her
      }
    }
  }