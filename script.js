var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");
const playerImage = document.getElementById("player");

const player = {
	w: 80,
	h: 60,
	x: 300,
	y: 740,
	speed: 10,
	dx: 0,
	dy: 0
}

var missileRadius = 5;
var missileSpeed = 20;

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
		ctx.arc(x[0], x[1], missileSize, 0, Math.PI * 2);
		ctx.stroke();
		ctx.fillStyle = "green";
		ctx.fill();
	});
	
}

/*
var blocks = [

	// [w, h, x, y, visible]

	// Top row
	[95, 20, 005, 5, true, "red"],
	[95, 20, 105, 5, true, "red"],
	[95, 20, 205, 5, true, "red"],
	[95, 20, 305, 5, true, "red"],
	[95, 20, 405, 5, true, "red"],
	[95, 20, 505, 5, true, "red"],
	[95, 20, 605, 5, true, "red"],
	[90, 20, 705, 5, true, "red"],

	// Row 2
	[95, 20, 005, 30, true, "red"],
	[95, 20, 105, 30, true, "red"],
	[95, 20, 205, 30, true, "red"],
	[95, 20, 305, 30, true, "red"],
	[95, 20, 405, 30, true, "red"],
	[95, 20, 505, 30, true, "red"],
	[95, 20, 605, 30, true, "red"],
	[90, 20, 705, 30, true, "red"],

	// Row 3
	[95, 20, 005, 55, true, "orange"],
	[95, 20, 105, 55, true, "orange"],
	[95, 20, 205, 55, true, "orange"],
	[95, 20, 305, 55, true, "orange"],
	[95, 20, 405, 55, true, "orange"],
	[95, 20, 505, 55, true, "orange"],
	[95, 20, 605, 55, true, "orange"],
	[90, 20, 705, 55, true, "orange"],

	// Row 4
	[95, 20, 005, 80, true, "orange"],
	[95, 20, 105, 80, true, "orange"],
	[95, 20, 205, 80, true, "orange"],
	[95, 20, 305, 80, true, "orange"],
	[95, 20, 405, 80, true, "orange"],
	[95, 20, 505, 80, true, "orange"],
	[95, 20, 605, 80, true, "orange"],
	[90, 20, 705, 80, true, "orange"],

	// Row 5
	[95, 20, 005, 105, true, "green"],
	[95, 20, 105, 105, true, "green"],
	[95, 20, 205, 105, true, "green"],
	[95, 20, 305, 105, true, "green"],
	[95, 20, 405, 105, true, "green"],
	[95, 20, 505, 105, true, "green"],
	[95, 20, 605, 105, true, "green"],
	[90, 20, 705, 105, true, "green"],

	// Row 6
	[95, 20, 005, 130, true, "green"],
	[95, 20, 105, 130, true, "green"],
	[95, 20, 205, 130, true, "green"],
	[95, 20, 305, 130, true, "green"],
	[95, 20, 405, 130, true, "green"],
	[95, 20, 505, 130, true, "green"],
	[95, 20, 605, 130, true, "green"],
	[90, 20, 705, 130, true, "green"],

	// Row 7
	[95, 20, 005, 155, true, "yellow"],
	[95, 20, 105, 155, true, "yellow"],
	[95, 20, 205, 155, true, "yellow"],
	[95, 20, 305, 155, true, "yellow"],
	[95, 20, 405, 155, true, "yellow"],
	[95, 20, 505, 155, true, "yellow"],
	[95, 20, 605, 155, true, "yellow"],
	[90, 20, 705, 155, true, "yellow"],

	// RBottom row
	[95, 20, 005, 180, true, "yellow"],
	[95, 20, 105, 180, true, "yellow"],
	[95, 20, 205, 180, true, "yellow"],
	[95, 20, 305, 180, true, "yellow"],
	[95, 20, 405, 180, true, "yellow"],
	[95, 20, 505, 180, true, "yellow"],
	[95, 20, 605, 180, true, "yellow"],
	[90, 20, 705, 180, true, "yellow"]
]
*/

function drawBlocks(){
	blocks.forEach(x => {
		if (x[4] == true){
			ctx.beginPath();
			ctx.rect(x[2], x[3], x[0], x[1]);
			ctx.stroke();
			ctx.fillStyle = x[5];
			ctx.fill();
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
	drawMissile();
	//drawBlocks();
	drawPlayer();
	newPos();
	//detectBallWallCollision();
	//detectBallBlockCollision();
	detectPlayerWallCollision();
	//detectPlayerBallCollision();
	requestAnimationFrame(update);
}

update();

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);