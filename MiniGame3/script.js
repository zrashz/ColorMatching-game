const canvas = document.getElementById('mazeCanvas');
const context = canvas.getContext('2d');
const timeElement = document.getElementById('time');

const maze = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 1],
    [1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1],
    [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

const player = {
    x: 1,
    y: 1,
    size: 30, // Smaller player size for increased difficulty
};

const goal = {
    x: 10,
    y: 11
};

let startTime, interval;

canvas.width = player.size * maze[0].length;
canvas.height = player.size * maze.length;

function drawMaze() {
    for (let y = 0; y < maze.length; y++) {
        for (let x = 0; x < maze[y].length; x++) {
            if (maze[y][x] === 1) {
                context.fillStyle = '#333';
            } else {
                context.fillStyle = '#fff';
            }
            context.fillRect(x * player.size, y * player.size, player.size, player.size);
        }
    }
}

function drawPlayer() {
    context.fillStyle = '#007bff';
    context.fillRect(player.x * player.size, player.y * player.size, player.size, player.size);
}

function drawGoal() {
    context.fillStyle = '#28a745';
    context.fillRect(goal.x * player.size, goal.y * player.size, player.size, player.size);
}

function updateTime() {
    const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
    timeElement.textContent = elapsedTime;
}

function startGame() {
    startTime = Date.now();
    interval = setInterval(updateTime, 1000);
}

function movePlayer(dx, dy) {
    if (maze[player.y + dy][player.x + dx] !== 1) {
        player.x += dx;
        player.y += dy;
        if (player.x === goal.x && player.y === goal.y) {
            clearInterval(interval);
            alert(`Congratulations! You reached the goal in ${timeElement.textContent} seconds!`);
            resetGame();
        }
    }
}

function resetGame() {
    player.x = 1;
    player.y = 1;
    timeElement.textContent = '0';
    startGame();
    draw();
}

document.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowUp':
            movePlayer(0, -1);
            break;
        case 'ArrowDown':
            movePlayer(0, 1);
            break;
        case 'ArrowLeft':
            movePlayer(-1, 0);
            break;
        case 'ArrowRight':
            movePlayer(1, 0);
            break;
    }
    draw();
});

function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawMaze();
    drawGoal();
    drawPlayer();
}

startGame();
draw();
