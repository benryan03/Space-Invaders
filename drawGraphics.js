function clearCanvas(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawPlayer(){
	ctx.drawImage(playerImage, player.x, player.y, player.w, player.h);
}

function drawEnemies(){

	/*
	if (enemyAnimationBool == true){
		var currentEnemyFrame = enemy1Image;
	}
	else {
		var currentEnemyFrame = enemy2Image;
	}
	*/

	enemies.forEach(x => {

		if (x[6] == 3){
			if (enemyAnimationBool == true){
				var currentEnemyFrame = enemy1Image;
			}
			else {
				var currentEnemyFrame = enemy2Image;
			}
		}
		else if (x[6] == 2){
			if (enemyAnimationBool == true){
				var currentEnemyFrame = enemy1Image;
			}
			else {
				var currentEnemyFrame = enemy2Image;
			}
		}
		else if (x[6] == 1){
			if (enemyAnimationBool == true){
				var currentEnemyFrame = enemy3Image;
			}
			else {
				var currentEnemyFrame = enemy4Image;
			}
		}

		if (x[4] == true){
			ctx.drawImage(currentEnemyFrame, x[0], x[1], x[2], x[3]);
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

var enemyAnimationBool = true;
function switchEnemyImage(){
	enemyAnimationBool = !enemyAnimationBool;
}

var enemyAnimation = setInterval(switchEnemyImage, 250);