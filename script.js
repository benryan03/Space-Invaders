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
var missileSpeed = 20;
var enemySpeed = 1;

const missile = {
	x: 0,		// Center x
	y: 0,		// Center y
	size: 5,	// Radius
	dy: 20
}

var missiles = []

function drawPlayer(){
	ctx.drawImage(playerImage, player.x, player.y, player.w, player.h);
}

function fireMissile(){
	xPos = player.x + 40;
	yPos = 740;
	missiles.push([xPos, yPos]);
	console.log(missiles);
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
/*
function detectPlayerBallCollision(){
	if 
	(
		ball.y + ball.size == player.y && 
		ball.x + ball.size > player.x && 
		ball.x + ball.size < player.x + player.w
	)
{ 		// Bounce up
		ball.dy *= -1;

		// Calculate angle
		var ballPos = (ball.x);
		var playerCenter = player.x + (player.w / 2);
		var ballOffset = (ballPos - playerCenter) / (player.w / 2);
		
		// Change angle
		ball.dx = ballOffset * 5;
		ball.dx.toFixed(2);
		click.play();
	}
}
*/

/*
function detectBallWallCollision(){
	// Side walls
	if (ball.x + ball.size > canvas.width || ball.x - ball.size < 0){
		ball.dx *= -1
	}
	// Top wall
	if (ball.y - (ball.size*2) < 0){
		ball.dy *= -1;
	}
	// Bottom wall
	if (ball.y + ball.size == canvas.height){
		loseLife();
	}
}
*/
/*
function detectBallBlockCollision(){
	for (x = 0; x < blocks.length; x++){
		if 
		(
			(
				// Bottom edge of block
				ball.y - ball.size == blocks[x][3] + blocks[x][1] &&	// Top point of ball is at block bottom edge
				ball.x - ball.size >= blocks[x][2] && 					// Top point of ball is right of left side of block
				ball.x - ball.size <= blocks[x][2] + blocks[x][0] && 	// Top point of ball is left of right side of block
				blocks[x][4] == true									// Block was visible
			) || 
			(
				// Top edge of block
				ball.y + ball.size == blocks[x][3] &&					// Bottom point of ball is at block top edge
				ball.x + ball.size >= blocks[x][2] && 					// Bottom point of ball is right of left side of block
				ball.x + ball.size <= blocks[x][2] + blocks[x][0] && 	// Bottom point of ball is left of right side of block
				blocks[x][4] == true									// Block was visible
			)
		)
		{
			ball.dy *= -1;
			blocks[x][4] = false;
			crack.play();
			updateScore(blocks[x][5]);
			break;
		}
	}
}
*/

/*
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
		ball.x = 10;
		ball.y = 250;
		ball.dx = 5,
		ball.dy = 5
	}
	else{
		alert("Game over.");
	}
}
*/

function checkEnemiesMoveDown(){
	if (enemies[7][0] >= 540){

		enemies.forEach(enemy => {
			enemy[1] += 47;
		})

		enemySpeed *= -1;;

	}
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
	else if (e.keyCode == 32){
		fireMissile();
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

function update(){
	clearCanvas();
	drawPlayer();
	drawMissile();
	drawEnemies();
	newPos();
	checkEnemiesMoveDown();
	//detectBallWallCollision();
	//detectBallBlockCollision();
	detectPlayerWallCollision();
	//detectPlayerBallCollision();
	requestAnimationFrame(update);
}

update();

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);