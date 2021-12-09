export default class Ball {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.direction = "up";
        this.xDirection = "right";
        this.YDirection = "up";
    }

    draw(ctx) {
        ctx.clearRect(this.x, this.y, this.radius, this.radius);
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    };

    move() {
        if (this.YDirection === "up") {
            this.y -= 4;
        }
        else { this.y += 4; }
        if (this.xDirection === "right") {
            this.x += 2;
        } else { this.x -= 2 };
    }

    hitBrick() {
        if (this.YDirection === "up") {
            this.YDirection = "down";
        }
        else { this.YDirection = "up" }
    }

    hitSides() {
        if (this.xDirection == "left") this.xDirection = "right";
        else this.xDirection = "left";
    }

}