import Ball from "./ball.js";
import Brick from "./brick.js";
import Player from "./player.js";

const canvas = document.getElementById("canvas");
canvas.width = 500;
canvas.height = 500;
const ctx = canvas.getContext("2d");

const state = {
    score: 0,
    speed: 5,
    damage: 0,
    isPlaying: false,
};
const elements = {
    scoreBoard: document.getElementById("score"),
};
let bricks = [];

const player = new Player(canvas.width / 2 - 50, canvas.height - 100, 120, 10, "orange");
const ball = new Ball(canvas.width / 2, player.y - player.height - 5, 10, "green");
let brickX = 25;
let brickY = 50;

for (let i = 0; i < 20; i++) {
    const brick = new Brick(brickX, brickY, 100, 20, 3);
    if (brickX + 100 >= canvas.width) {
        brickY += 25;
        brickX = 25;
    }
    else brickX += 102;
    bricks.push(brick);
};


const updateScore = () => {
    state.score += 10
    elements.scoreBoard.innerText = state.score;
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player.draw(ctx);
    ball.draw(ctx);
    ball.move();
    if (bricks.length <= 0) {
        state.isPlaying = false;
    }
    bricks.forEach((brick, i) => {
        brick.draw(ctx);
        if ((brick.x < ball.x + ball.radius && ball.x + ball.radius < brick.x + brick.width) &&
            (ball.y - ball.radius <= brick.y + brick.height)) {
            brick.break();
            bricks.splice(i, 1);
            ball.hitBrick();
            updateScore();
        }
    });

    // hiting the sides
    if ((ball.x - ball.radius <= 0 || ball.x + ball.radius >= canvas.width)) ball.hitSides(canvas);
    // hitting the top and the player
    //! && ball.x + ball.radius > player.x && ball.x < player.x + player.width
    if ((ball.y - ball.radius <= 0) ||
        (ball.y + ball.radius >= player.y)) {
        ball.hitBrick();
    }
    if (state.isPlaying) requestAnimationFrame(update);
};


canvas.addEventListener("click", (e) => {
    state.isPlaying = !state.isPlaying;
    update();
});

(function () {
    player.draw(ctx);
    ball.draw(ctx);
    bricks.forEach(brick => brick.draw(ctx));
})();

// init();