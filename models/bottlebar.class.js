class BottleBar extends DrawableObject {
    IMAGES = [
        // Setzen Sie hier die Pfade zu Ihren Bildern ein
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png',

    ];

    bottles = 0;

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 20;  // Stellen Sie diese Koordinaten entsprechend ein
        this.y = 120;  // Stellen Sie diese Koordinaten entsprechend ein
        this.width = 200;
        this.height = 60;
        this.setBottles(0);
    }

    setBottles(bottles) {
        this.bottles = bottles;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    incrementBottles() {
        this.bottles++;
        if (this.bottles % 2 === 0) {  // Die Leiste füllt sich nach je 2 Flaschen
            this.setBottles(this.bottles);
        }
    }

    resolveImageIndex() {
        if (this.bottles >= 10) {  // Bild für 100% Anzahl der Flaschen setzen (hier 10 Flaschen)
            return 5;
        } else {
            return Math.floor((this.bottles / 10) * 5);  // Index des Bildes basierend auf der Anzahl der Flaschen ermitteln
        }
    }
}