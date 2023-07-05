class DrawableObject {
    img; // Bild des Objekts
    imageCache = {}; // Zwischenspeicher für Bilder
    currentImage = 0; // Index des aktuellen Bildes
    x = 120; // x-Koordinate des Objekts
    y = 280; // y-Koordinate des Objekts
    height = 150; // Höhe des Objekts
    width = 100; // Breite des Objekts

    getBoundingRectangle() {
        return {
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height
        };
    }


    loadImage(path) {
        // Funktion zum Laden eines Bildes
        this.img = new Image();
        this.img.src = path; // Setze den Pfad des Bildes
    }

    draw(ctx) {
        // Funktion zum Zeichnen des Objekts auf dem Canvas
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height); // Zeichne das Bild des Objekts auf dem Canvas
    }

    drawFrame(ctx) {
        // Funktion zum Zeichnen des Rahmens um das Objekt
        if (
            this instanceof Character ||
            this instanceof Chicken ||
            this instanceof Endboss ||
            this instanceof ThrowableObject
        ) {
            // Überprüfe, ob das Objekt vom Typ Character, Chicken oder Endboss ist
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'blue';
            let frame = this.getBoundingRectangle(); // Get frame using getBoundingRectangle method
            ctx.rect(frame.x, frame.y, frame.width, frame.height); // Zeichne ein Rechteck um das Objekt
            ctx.stroke();
        }
    }

    loadImages(arr) {
        // Funktion zum Laden einer Liste von Bildern
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img; // Speichere das Bild im Zwischenspeicher
        });
    }

}