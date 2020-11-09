var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");
const playerImage = document.getElementById("player");
const enemy1Image = document.getElementById("enemy1");

const player = {
	w: 80,
	h: 60,
	x: 5,
	y: 740,
	speed: 10,
	dx: 0,
	dy: 0
}

var missileRadius = 5;
var missileSpeed = 10;
var bombRadius = 5;
var bombSpeed = 10;
var enemySpeed = 1;

var lives = 3;
var gameOver = false;
var explosionRadius = 51

const missile = {
	x: 0,		// Center x
	y: 0,		// Center y
	size: 5,	// Radius
	dy: 20
}

var missiles = []
var bombs = []

function drawPlayer(){
	ctx.drawImage(playerImage, player.x, player.y, player.w, player.h);
}

function fireMissile(){
	xPos = player.x + 40;
	yPos = 740;
	missiles.push([xPos, yPos]);
}

function drawMissile(){
	missiles.forEach(x => {
		ctx.beginPath();
		ctx.arc(x[0], x[1], missileRadius, 0, Math.PI * 2);
		ctx.stroke();
		ctx.fillStyle = "green";
		ctx.fill();
	});
}


var enemies = [

	// [x, y, w, h, visible]

	// Top row
	[11, 10, 50, 37, true],
	[71, 10, 50, 37, true],
	[131, 10, 50, 37, true],
	[191, 10, 50, 37, true],
	[251, 10, 50, 37, true],
	[311, 10, 50, 37, true],
	[371, 10, 50, 37, true],
	[431, 10, 50, 37, true],

	// Row 2
	[11, 57, 50, 37, true],
	[71, 57, 50, 37, true],
	[131, 57, 50, 37, true],
	[191, 57, 50, 37, true],
	[251, 57, 50, 37, true],
	[311, 57, 50, 37, true],
	[371, 57, 50, 37, true],
	[431, 57, 50, 37, true],

	// Row 3
	[11, 104, 50, 37, true],
	[71, 104, 50, 37, true],
	[131, 104, 50, 37, true],
	[191, 104, 50, 37, true],
	[251, 104, 50, 37, true],
	[311, 104, 50, 37, true],
	[371, 104, 50, 37, true],
	[431, 104, 50, 37, true],

	// Row 4
	[11, 151, 50, 37, true],
	[71, 151, 50, 37, true],
	[131, 151, 50, 37, true],
	[191, 151, 50, 37, true],
	[251, 151, 50, 37, true],
	[311, 151, 50, 37, true],
	[371, 151, 50, 37, true],
	[431, 151, 50, 37, true],

	// Bottom row
	[11, 198, 50, 37, true],
	[71, 198, 50, 37, true],
	[131, 198, 50, 37, true],
	[191, 198, 50, 37, true],
	[251, 198, 50, 37, true],
	[311, 198, 50, 37, true],
	[371, 198, 50, 37, true],
	[431, 198, 50, 37, true],
]


function drawEnemies(){
	enemies.forEach(x => {
		if (x[4] == true){
			ctx.drawImage(enemy1Image, x[0], x[1], x[2], x[3]);
		}
	});
}

function clearCanvas(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function newPos(){
	player.x += player.dx;
	player.y += player.dy;

	missiles.forEach(missile => {
		missile[1] -= missileSpeed;
		if (missile[1] <= 0){
			missiles.shift();
		}
	});

	bombs.forEach(bomb => {
		bomb[1] += bombSpeed;
		if (bomb[1] >= 800){
			bombs.shift();
		}
	});

	enemies.forEach(enemy => {
		enemy[0] += enemySpeed;
	})
}

function detectPlayerWallCollision(){
	// Left wall
	if (player.x < 0){
		player.x = 0;
	}
	// Right wall
	if (player.x + player.w > canvas.width){
		player.x = canvas.width - player.w;
	}
}

function updateScore(blockColor){
	if (blockColor == "yellow"){
		score += 1;
	}
	else if (blockColor == "green"){
		score += 3;
	}
	else if (blockColor == "orange"){
		score += 5;
	}
	else if (blockColor == "red"){
		score += 7;
	}
	document.getElementById('score').innerHTML = "Score: " + score.toString();
}

function loseLife(){
	lives -= 1;
	if (lives > 0){
		document.getElementById('lives').innerHTML = "Lives: " + lives.toString();
	}
	else{
		document.getElementById('lives').innerHTML = "Lives: 0";
		gameOver = true;
		alert("Game over.");
	}
}

function checkEnemiesMoveDown(){
	if (enemies[7][0] >= 540 || enemies[0][0] <= 10){
		enemySpeed *= -1;;
		enemies.forEach(enemy => {
			enemy[1] += 47;
		})
	}
}

function detectMissileEnemyCollision(){
	missiles.forEach(missile => {
		enemies.forEach(enemy => {
			if (
					missile[0] >= enemy[0] &&				// missile xPos >= enemy left edge
					missile[0] <= enemy[0] + enemy[2] &&	// missile xPos <= enemy right edge
					missile[1] <= enemy[1] + enemy[3] &&	// missile yPos <= enemy bottom edge 
					missile[1] >= enemy[1] &&				// missile yPos == enemy bottom edge 
					enemy[4] == true						// enemy is alive
				)
				{
					enemy[4] = false;
					missiles.pop();
				}
		});
	});
}

function keyDown(e){
	if (e.key == 'ArrowRight' || e.key == 'Right'){
		// Move player right
		player.dx = player.speed;
	}
	else if (e.key == 'ArrowLeft' || e.key == 'Left'){
		// Move player left
		player.dx = -player.speed;
	}
	else if (e.keyCode == 32 && event.repeat == false){
		fireMissile();
		e.preventDefault();
	}
	else if (e.key =='ArrowUp' || e.key == 'Up' || e.key =='ArrowDown' || e.key == 'Down'){
		e.preventDefault();
	}
}

function keyUp(e){
	if (
		e.key == 'Right' ||
		e.key == 'ArrowRight' ||
		e.key == 'Left' ||
		e.key == 'ArrowLeft'
	){
		player.dx = 0;
		player.dy = 0;
	}
}

function dropBomb(){
	rand = Math.floor(Math.random() * 40);
	console.log(rand);
	console.log(enemies[rand][0]);
	while (enemies[rand][4] == false){
		rand += 1;
		if (rand == 39){
			rand = 0;
		}
	}
	xPos = enemies[rand][0] + 25;
	yPos = enemies[rand][1] + 37;
	bombs.push([xPos, yPos]);
	console.log(bombs);
}

function drawBombs(){
	bombs.forEach(x => {
		ctx.beginPath();
		ctx.arc(x[0], x[1], bombRadius, 0, Math.PI * 2);
		ctx.stroke();
		ctx.fillStyle = "red";
		ctx.fill();
	});
}

function checkGameOver(){
	enemies.forEach(enemy => {
		if (enemy[1] + enemy[3] >= 780 && enemy[4] == true){
			gameOver = true;
			alert("Game over!");

		}
	});
}

function detectPlayerBombCollision(){
	bombs.forEach(bomb => {
		if (
				bomb[0] > player.x &&
				bomb[0] < player.x + player.w &&
				bomb[1] > player.y &&
				bomb[1] < player.y + player.h
			)
			{
				bombs.pop();
				explosionRadius = 0;
				drawExplosion();
				loseLife();
			}		
	});
}

function drawExplosion(){

	explosionRadius += 10;

	if (explosionRadius <= 50){
		ctx.beginPath();
		ctx.arc(player.x + player.w/2, player.y, explosionRadius, 0, Math.PI * 2);
		ctx.stroke();
		ctx.fillStyle = "yellow";
		ctx.fill();
	}
	
}

function update(){
	clearCanvas();
	drawPlayer();
	drawMissile();
	detectMissileEnemyCollision();
	drawEnemies();
	drawBombs();

	if (explosionRadius <= 50){
		drawExplosion();
	}

	newPos();
	checkEnemiesMoveDown();
	detectPlayerWallCollision();
	detectPlayerBombCollision();
	checkGameOver();

	if (gameOver == false){
		requestAnimationFrame(update);
	}
}

var dropBombEachSecond = setInterval(dropBomb, 1000);

update();

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);