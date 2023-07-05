class Coin extends MovableObject {
    IMAGES_COIN = [
        '../img/8_coin/coin_1.png',
        '../img/8_coin/coin_2.png'
    ];

    constructor(x, y) {
        super().loadImage('../img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES_COIN);
        this.x = x;
        this.y = y;
        this.width = 80;
        this.height = 80;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_COIN);
        }, 400);
    }
}