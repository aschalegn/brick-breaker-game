export default class Brick {
    constructor(x, y, width, height, strength) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color;
        this.startingStrength = strength;
        this.strength = strength;
    };

    draw(ctx) {
        ctx.clearRect(this.x, this.y, this.width, this.height);
        ctx.beginPath();
        switch (this.strength) {
            case 1:
                this.color = "blue";
                break;
            case 2:
                this.color = "red";
                break;
            case 3:
                this.color = "yellow";
                break;
            default:
                break;
        };

        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    break() {
        this.strength -= 1;
        if (this.strength>1) {
            this.width=0;
            this.height=0;
        }
        return this.strength;
    };

}

const createBricks = (level) => {
    switch (level) {
        case "easy":

            break;
        case "mediaum":

            break;
        case "deficult":

            break;
        default:
            break;
    }
}