class Player {
    constructor(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height
        this.color = color
    };

    draw(ctx) {
        ctx.clearRect(this.x, this.y, this.width, this.height);
        ctx.beginPath();
        ctx.fillStyle = this.color;
        const image = new Image();
        image.src = "https://cdn.pixabay.com/photo/2015/12/26/08/20/brick-wall-1108405__340.jpg";
        // image.onload = () => {
            ctx.drawImage(image, this.x, this.y, this.width, this.height);
        // }
    };

    move() {
        this.y -= 10;
        // this.draw();
    }
}

export default Player;