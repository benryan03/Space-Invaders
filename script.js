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
var score = 0;
var level = 1;
var gameActive = false;
var playerExplosionRadius = 51
var enemyExplosionRadius = 31;
var enemyExplosions = [];
var playerExplosion = [];

const missile = {
	x: 0,		// Center x
	y: 0,		// Center y
	size: 5,	// Radius
	dy: 20
}

var missiles = []
var bombs = []

function fireMissile(){
	xPos = player.x + 40;
	yPos = 740;
	missiles.push([xPos, yPos]);
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
		gameActive = false;
		alert("Game over.");
	}
}

function checkEnemiesMoveDown(){
	if (enemies[7][0] >= 540 || enemies[0][0] <= 10){
		enemySpeed *= -1;;

		if (enemySpeed > 0){
			enemySpeed += .05;
		}
		else if (enemySpeed < 0){
			enemySpeed -= .05;
		}

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
					updateScore(enemy[5]);
					enemyExplosions.push([enemy[0], enemy[1], enemy[2], enemy[3], 0]);
					checkLevelUp();					
				}
		});
	});
}

function keyDown(e){

	if (e.key == 'ArrowRight' || e.key == 'Right'){
		// Move player right
		if (gameActive == true){
			player.dx = player.speed;
		}
	}
	else if (e.key == 'ArrowLeft' || e.key == 'Left'){
		// Move player left
		if (gameActive == true){
			player.dx = -player.speed;
		}
	}
	else if (e.keyCode == 32 && event.repeat == false){
		e.preventDefault();
		if (gameActive == true){
			fireMissile();
		}
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
	if (gameActive == true){
		rand = Math.floor(Math.random() * 40);
		while (enemies[rand][4] == false){
			rand += 1;
			if (rand == 39){
				rand = 0;
			}
		}
		xPos = enemies[rand][0] + 25;
		yPos = enemies[rand][1] + 37;
		bombs.push([xPos, yPos]);
	}
}

function checkGameOver(){
	enemies.forEach(enemy => {
		if (enemy[1] + enemy[3] >= 780 && enemy[4] == true){
			gameActive = false;
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
				playerExplosionRadius = 0;
				loseLife();
			}		
	});
}

function update(){
	if (gameActive == true){

		clearCanvas();
		drawPlayer();
		drawMissiles();
		drawEnemies();
		drawBombs();
		drawEnemyExplosions();
		drawPlayerExplosion();

		detectMissileEnemyCollision();
		detectPlayerWallCollision();
		detectPlayerBombCollision();
		checkEnemiesMoveDown();
		checkGameOver();

		newPos();
		requestAnimationFrame(update);
	}
}

function updateScore(points){
	score += points;
	document.getElementById('score').innerHTML = "Score: " + score	.toString();
}

function startGame(){
	gameActive = true;
	update();
}

function checkLevelUp(){
	for(x = 0; x < 40; x++){
		if (enemies[x][4] == true){
			return;
		}
	}

	level++;;
	document.getElementById('level').innerHTML = "Level: " + level.toString();
	gameActive = false;
	enemies = resetEnemies();
	bombs = [];
	missiles = [];
	enemyExplosions = [];
	playerExplosionRadius = 51;
	enemySpeed = 1;

	levelUpScreen1();
	setTimeout(levelUpScreen2, 1000);
	setTimeout(levelUpScreen3, 2000);
	setTimeout(levelUp, 3000);
}

function levelUp(){


	gameActive = true;

	update();
}

//var dropBombEachSecond = setInterval(dropBomb, 1000);

// START
drawPlayer();
drawEnemies();
drawStartButton();

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);
canvas.onclick = startGame;