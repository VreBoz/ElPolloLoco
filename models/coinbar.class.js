class CoinBar extends DrawableObject {
    IMAGES = [
        './img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png',
    ];

    coins = 0;

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 20;
        this.y = 60;
        this.width = 200;
        this.height = 60;
        this.setCoins(0);
    }

    setCoins(coins) {
        this.coins = coins;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    incrementCoins() {
        this.coins++;
        if (this.coins % 10 === 0) {  // Hier wurde die Bedingung angepasst, damit das Bild nach je 10 Münzen wechselt
            this.setCoins(this.coins);
        }
    }

    resolveImageIndex() {
        if (this.coins >= 50) {  // Hier wurde die Bedingung angepasst, um das Bild für 100% Anzahl der Münzen zu setzen
            return 5;
        } else {
            return Math.floor((this.coins / 50) * 5);  // Hier wurde die Berechnung angepasst, um den Index des Bildes basierend auf der Anzahl der Münzen zu ermitteln
        }
    }
}