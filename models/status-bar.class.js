class StatusBar extends DrawableObject {

    


    IMAGES = [
        './img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png',
    ];

    percentage = 100;

    constructor() {
        super(); // Ruft den Konstruktor der übergeordneten Klasse DrawableObject auf
        this.loadImages(this.IMAGES);
        this.x = 20;
        this.y = 0;
        this.width = 200;
        this.height = 60
        this.setPercentage(100);
    }

    setPercentage(percentage) {
        this.percentage = percentage; // Setzt den Prozentsatz
        let path = this.IMAGES[this.resolveImageIndex()]; // Holt den Pfad des aktuellen Bildes basierend auf dem Prozentsatz
        this.img = this.imageCache[path]; // Setzt das aktuelle Bild basierend auf dem Pfad aus dem Zwischenspeicher
    }

    resolveImageIndex() {
        // Ermittelt den Index des aktuellen Bildes basierend auf dem Prozentsatz
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 0) {
            return 1;
        } else {
            return 0;
        }
    }
}