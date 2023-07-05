class World {
  character = new Character(); // Erstellt eine Instanz der Klasse "Character" und speichert sie in der Eigenschaft "character"
  level = level1; // Setzt das Level auf level1 (muss zuvor definiert sein)
  canvas; // Das Canvas-Element
  ctx; // Der 2D-Kontext des Canvas-Elements
  keyboard; // Das Keyboard-Objekt für die Tastatureingaben
  camera_x = 0; // Die x-Koordinate der Kamera
  statusBar = new StatusBar();
  bottleBar = new BottleBar();
  coinBar = new CoinBar();
  endbossBar = new EndbossHealthBar();
  throwableObjects = [];
  throwableBottles = 0;
  gameOver = false;

  constructor(canvas, keyboard) {
      this.ctx = canvas.getContext('2d'); // Holt den 2D-Kontext des Canvas-Elements und speichert ihn in der Eigenschaft "ctx"
      this.canvas = canvas; // Speichert das Canvas-Element in der Eigenschaft "canvas"
      this.keyboard = keyboard; // Speichert das Keyboard-Objekt in der Eigenschaft "keyboard"
      this.draw(); // Ruft die Methode "draw" auf, um die Szene zu zeichnen
      this.setWorld(); // Ruft die Methode "setWorld" auf, um die Verbindung zwischen World und Character herzustellen
      this.run();
  }

  setWorld() {
      this.character.world = this; // Setzt die Eigenschaft "world" des Characters auf die aktuelle World-Instanz
  }

  run() {
    setInterval(() => {
        this.checkCollisions();
        this.checkThrowObjects();
        this.checkCoinCollisions();
        this.checkBottleCollisions();
        this.checkBottleCollisionEnemy();
        this.checkGameOver();
    }, 200);
}



checkThrowObjects() {
    if (this.keyboard.D && this.throwableBottles > 0) {
        let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
        this.throwableObjects.push(bottle);
        this.throwableBottles--;
        this.bottleBar.setBottles(this.throwableBottles); // Aktualisieren Sie die Anzahl der Flaschen in der Flaschenleiste
    }
}

checkBottleCollisionEnemy() {
    this.level.enemies.forEach((enemy, index) => {
        this.throwableObjects.forEach((bottle, bottleIndex) => {
            if (enemy.isColliding(bottle)) {
                enemy.hit();
                this.throwableObjects.splice(bottleIndex, 1);
                console.log('Enemy getroffen');

                // Gesundheit des Endbosses reduzieren um 20%
                const currentHealth = this.endbossBar.currentHealth;
                const newHealth = currentHealth - 20;
                this.endbossBar.setHealth(newHealth);

                if (newHealth <= 0) {
                    setTimeout(() => {
                        this.level.enemies.splice(index, 1);
                        this.endbossBar.hide(); // Die Gesundheitsleiste des Endbosses ausblenden
                    }, 2500); // Nach 2500 Millisekunden (2 Sekunden) ausführen
                }
            }
        });
    });
}




  

  checkCollisions() {
    this.level.enemies.forEach((enemy, index) => {
      if (this.character.isColliding(enemy)) {
        if (!this.character.isAboveGround()) {
          console.log('Collision with Character, energy', this.character.energy);
          this.character.hurt_sound.play(); // Spielt den Sound ab
          this.character.hit();
          this.statusBar.setPercentage(this.character.energy);
        } else if (this.character.isAboveGround() + 60) {
          console.log('above the ground');
          enemy.die(); // Das Huhn stirbt
          // Nach einer gewissen Zeit (z.B. 500ms) das tote Huhn entfernen
          setTimeout(() => {
            this.level.enemies.splice(index, 1);
          }, 250);
        }
      }
    });
  }
  checkBottleCollisions() {
    let collectedBottles = [];

    this.level.bottles.forEach((bottle) => {
        if (this.character.isColliding(bottle)) {
            collectedBottles.push(bottle);
        }
    });

    collectedBottles.forEach((bottle) => {
        const index = this.level.bottles.indexOf(bottle);
        if (index > -1) {
            this.level.bottles.splice(index, 1);
        }
    });

    this.bottleBar.setBottles(this.bottleBar.bottles + collectedBottles.length);
    this.throwableBottles += collectedBottles.length; // Aktualisieren Sie die Anzahl der werfbaren Flaschen
}

  

    checkCoinCollisions() {
    let collectedCoins = []; // Array, um die eingesammelten Münzen zu speichern

    this.level.coins.forEach((coin) => { // Iteriere durch jede Münze im Level
        if (this.character.isColliding(coin)) { // Überprüfe, ob der Charakter mit der Münze kollidiert
            this.character.coin_sound.play(); // Spiele den Münz-Sound ab
            collectedCoins.push(coin); // Füge die Münze dem Array der eingesammelten Münzen hinzu
        }
    });

    collectedCoins.forEach((coin) => { // Iteriere durch jede eingesammelte Münze
        const index = this.level.coins.indexOf(coin); // Finde den Index der Münze im Münz-Array des Levels
        if (index > -1) { // Wenn die Münze im Array gefunden wird
            this.level.coins.splice(index, 1); // Entferne die Münze aus dem Münz-Array des Levels
        }
    });

    this.coinBar.setCoins(this.coinBar.coins + collectedCoins.length); // Aktualisiere die Anzahl der Münzen in der Münzleiste
}

  // Die Methode "draw" wird immer wieder aufgerufen, um die Szene zu zeichnen
  draw() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // Löscht den gesamten Inhalt des Canvas

      this.ctx.translate(this.camera_x, 0); // Führt eine Translation des Kontextes in der horizontalen Richtung durch, um die Kamera zu simulieren

      this.addObjectsToMap(this.level.backgroundObjects); // Fügt die Hintergrundobjekte zur Karte hinzu
      this.addObjectsToMap(this.level.clouds); // Fügt die Wolken zur Karte hinzu


      this.ctx.translate(-this.camera_x, 0); // back
      //--------Space for fixed objects-----------
      this.addToMap(this.statusBar);
      this.addToMap(this.coinBar);
      this.addToMap(this.bottleBar);
      this.addToMap(this.endbossBar);
      this.ctx.translate(this.camera_x, 0); // Forward


      this.addObjectsToMap(this.level.bottles);
      this.addToMap(this.character); // Fügt den Character zur Karte hinzu
      
      this.addObjectsToMap(this.level.enemies); // Fügt die Gegner zur Karte hinzu
      this.addObjectsToMap(this.level.coins);
      this.addObjectsToMap(this.throwableObjects);
      
      this.ctx.translate(-this.camera_x, 0); // Setzt die Translation des Kontextes zurück

      let self = this;
      requestAnimationFrame(function () {
          self.draw(); // Ruft die "draw"-Methode erneut auf, um eine kontinuierliche Aktualisierung der Szene zu erreichen
      });
  }

  addObjectsToMap(objects) {
      objects.forEach((object) => {
          this.addToMap(object); // Fügt jedes Objekt zur Karte hinzu
      });
  }

  addToMap(mo) {
      if (mo.otherDirection) {
          this.flipImage(mo); // Überprüft, ob das Objekt in die andere Richtung zeigt und spiegelt es gegebenenfalls
      }

      mo.draw(this.ctx); // Zeichnet das Objekt auf dem Canvas
      mo.drawFrame(this.ctx); // Zeichnet den Rahmen um das Objekt

      if (mo.otherDirection) {
          this.flipImageBack(mo); // Setzt das Objekt wieder in seine ursprüngliche Ausrichtung zurück, falls es gespiegelt wurde
      }
  }

  

  flipImage(mo) {
      this.ctx.save(); // Speichert den aktuellen Kontext des Canvas
      this.ctx.translate(mo.width, 0); // Führt eine Translation durch, um das Objekt zu spiegeln
      this.ctx.scale(-1, 1); // Skaliert den Kontext in der horizontalen Richtung, um das Objekt zu spiegeln
      mo.x = mo.x * -1; // Passt die x-Koordinate des Objekts an, um die Spiegelung zu berücksichtigen
  }

  flipImageBack(mo) {
      mo.x = mo.x * -1; // Setzt die x-Koordinate des Objekts zurück, um den ursprünglichen Wert wiederherzustellen
      this.ctx.restore(); // Stellt den ursprünglichen Kontext des Canvas wieder her
  }
  

  checkGameOver() {
    if (this.character.energy <= 0 || this.level.enemies.length === 0 || (this.level.enemies.length === 1 && this.level.enemies[0] instanceof Endboss && this.level.enemies[0].isDead)) {
        lostOutroscreen();
        this.gameOver = true;
    }
}
}



// Füge diese Zeile in deine Spiel-Schleife ein:

