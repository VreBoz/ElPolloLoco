class Bottle extends MovableObject{
    
        IMAGE_BOTTLE = [
            './img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
        ];
    
        constructor(x, y) {
        super().loadImage('./img/6_salsa_bottle/2_salsa_bottle_on_ground.png');
        this.loadImages(this.IMAGE_BOTTLE);
        this.x = x;
        this.y = y;
        this.width = 90;
        this.height = 110;
        }
}