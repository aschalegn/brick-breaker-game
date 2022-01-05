import Ball from "./ball.js";
import Brick from "./brick.js";
import Player from "./player.js";

const canvas = document.getElementById("canvas");

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
canvas.style.left = window.innerWidth;
const ctx = canvas.getContext("2d");

const state = {
    score: 0,
    isPlaying: false,
    bricks: [],
    isPaused: false,
};

const elements = {
    scoreBoard: document.getElementById("score"),
    gameOption: document.getElementById("gameOption"),
    startBtn: document.getElementById("startBtn"),
    gameOver: document.getElementById("gameOver"),
    currenScore: document.getElementById("currenScore"),
    win: document.getElementById("win"),
};

let player, ball;

function generateBricks(num) {
    let brickX = 5;
    let brickY = 50;
    state.bricks = [];
    for (let i = 0; i < num; i++) {
        const brick = new Brick(brickX, brickY, canvas.width / 10, 20, 3);
        if (brickX + 100 >= canvas.width) {
            brickY += 30;
            brickX = 5;
        }
        else brickX += canvas.width / 10 + 10;
        state.bricks.push(brick);
    };
}

const updateScore = () => {
    state.score += 10;
    elements.scoreBoard.innerText = state.score;
}

function update() {
    if (state.isPlaying) elements.gameOption.style.display = "none";
    if (state.isPlaying) elements.gameOver.style.display = "none";
    if (state.isPlaying) elements.win.style.display = "none";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player.draw(ctx);
    ball.draw(ctx);
    ball.move();
    if (state.bricks.length <= 0) {
        gameEnd("win");
        return;
    }

    state.bricks.forEach((brick, i) => {
        brick.draw(ctx);
        if ((brick.x < ball.x + ball.radius && ball.x + ball.radius < brick.x + brick.width) &&
            (ball.y - ball.radius <= brick.y + brick.height)) {
            brick.break();
            state.bricks.splice(i, 1);
            ball.hitBrick();
            updateScore();
        }
    });

    // hiting the sides
    if ((ball.x - ball.radius <= 0 || ball.x + ball.radius >= canvas.width)) ball.hitSides(canvas);
    // hitting the top and the player
    if ((ball.y - ball.radius <= 0) ||
        (ball.y + ball.radius >= player.y && ball.x + ball.radius > player.x && ball.x < player.x + player.width)) {
        console.log("hit the player");
        ball.hitBrick();
    };
    if (ball.y > player.y) {
        gameEnd("lose");
    };
    if (state.isPlaying & !state.isPaused) requestAnimationFrame(update);
};



function start() {
    generateBricks(30);
    state.score = 0;
    state.isPlaying = true;
    state.isPaused = false;
    player = new Player(canvas.width / 2 - 50, canvas.height - 100, 120, 10, "orange");
    ball = new Ball(canvas.width / 2, player.y - player.height - 5, 10, "green");
    update();
};

function gameEnd(status) {
    let element;
    if (status === "wind") element = elements.win;
    else element = elements.gameOver;
    state.isPlaying = false;
    state.isPaused = false;
    elements.currenScore.innerText = score + " Points";
    element.children[1].appendChild(elements.currenScore);
    elements.startBtn.innerText = "Play Again";
    element.appendChild(elements.startBtn);
    element.style.display = "block";
}

window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft" && player.x > 0) player.move(1);
    if (e.key === "ArrowRight" && player.x + player.width < canvas.width) player.move(2);
});

canvas.addEventListener("click", () => {
    if (state.isPlaying & !state.isPaused) {
        state.isPlaying = false;
        state.isPaused = true;
    }
    else {
        state.isPlaying = true;
        state.isPaused = false;
        update();
    }
});

elements.startBtn.onclick = start;