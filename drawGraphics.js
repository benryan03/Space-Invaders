function clearCanvas(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawPlayer(){
	ctx.drawImage(playerImage, player.x, player.y, player.w, player.h);
}

function drawEnemies(){

	enemies.forEach(x => {

		var enemyType = x[6];
		var enemyVisible = x[4];

		if (enemyType == 1 && enemyAnimBool == true){
			var enemyImg = enemy1_1;
		}
		else if (enemyType == 1 && enemyAnimBool == false){
			var enemyImg = enemy1_2;
		}
		if (enemyType == 2 && enemyAnimBool == true){
			var enemyImg = enemy2_1;
		}
		else if (enemyType == 2 && enemyAnimBool == false){
			var enemyImg = enemy2_2;
		}
		if (enemyType == 3 && enemyAnimBool == true){
			var enemyImg = enemy3_1;
		}
		else if (enemyType == 3 && enemyAnimBool == false){
			var enemyImg = enemy3_2;
		}

		if (enemyVisible == true){
			ctx.drawImage(enemyImg, x[0], x[1], x[2], x[3]);
		}
	});
}

function drawMissiles(){
	missiles.forEach(x => {
		ctx.beginPath();
		ctx.arc(x[0], x[1], missileRadius, 0, Math.PI * 2);
		ctx.stroke();
		ctx.fillStyle = "green";
		ctx.fill();
	});
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

function drawPlayerExplosion(){
	if (playerExplosionRadius <= 50){
		playerExplosionRadius += 10;
		ctx.beginPath();
		ctx.arc(player.x + player.w/2, player.y, playerExplosionRadius, 0, Math.PI * 2);
		ctx.stroke();
		ctx.fillStyle = "yellow";
		ctx.fill();
	}
}

function drawEnemyExplosions(){
	enemyExplosions.forEach(explosion => {
		explosion[4] += 5; // explosion radius
		if (explosion[4] <= enemyExplosionRadius){
			ctx.beginPath();
			ctx.arc(explosion[0] + explosion[2]/2, explosion[1] + explosion[3] / 2, explosion[4], 0, Math.PI * 2);
			ctx.stroke();
			ctx.fillStyle = "white";
			ctx.fill();
		}
		else {
			enemyExplosions.pop();
		}
	});
}

var enemyAnimBool = true;
var enemyAnimation = setInterval(switchEnemyImage, 250);
function switchEnemyImage(){
	enemyAnimBool = !enemyAnimBool;
}