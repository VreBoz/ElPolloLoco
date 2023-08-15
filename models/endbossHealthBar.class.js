class EndbossHealthBar extends DrawableObject {
  IMAGES = [
      './img/7_statusbars/2_statusbar_endboss/blue/blue0.png',
      './img/7_statusbars/2_statusbar_endboss/blue/blue20.png',
      './img/7_statusbars/2_statusbar_endboss/blue/blue40.png',
      './img/7_statusbars/2_statusbar_endboss/blue/blue60.png',
      './img/7_statusbars/2_statusbar_endboss/blue/blue80.png',
      './img/7_statusbars/2_statusbar_endboss/blue/blue100.png'
      
  ];

  currentHealth = 100;

  constructor() {
      super(); // Ruft den Konstruktor der übergeordneten Klasse DrawableObject auf
      this.loadImages(this.IMAGES);
      this.x = 500;
      this.y = 10;
      this.width = 200;
      this.height = 60;
      this.setHealth(100);
  }

  setHealth(health) {
      this.currentHealth = health; // Setzt die Gesundheit des Endbosses
      let path = this.IMAGES[this.resolveImageIndex()]; // Ruft den Pfad des aktuellen Bildes basierend auf der Gesundheit ab
      this.img = this.imageCache[path]; // Setzt das aktuelle Bild basierend auf dem Pfad aus dem Zwischenspeicher

      if (this.currentHealth <= 0) {
          this.hide(); // Versteckt die Gesundheitsleiste, wenn die Gesundheit des Endbosses 0 erreicht
      }
  }
  hide() {
    this.isVisible = false; // Setzt die Eigenschaft "isVisible" auf "false", um die Lebensleiste auszublenden
}

  resolveImageIndex() {
      // Ermittelt den Index des aktuellen Bildes basierend auf der Gesundheit
      if (this.currentHealth == 100) {
          return 5;
      } else if (this.currentHealth > 79) {
          return 4;
      } else if (this.currentHealth > 59) {
          return 3;
      } else if (this.currentHealth > 39) {
          return 2;
      } else if (this.currentHealth > 19) {
          return 1;
      } else {
          return 0;
      }
  }
}