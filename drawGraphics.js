function clearCanvas(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawPlayer(){
	ctx.drawImage(playerImage, player.x, player.y, player.w, player.h);
}

function drawEnemies(){
	enemies.forEach(x => {
		if (x[4] == true){
			ctx.drawImage(enemy1Image, x[0], x[1], x[2], x[3]);
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
	explosionRadius += 10;
	if (explosionRadius <= 50){
		ctx.beginPath();
		ctx.arc(player.x + player.w/2, player.y, explosionRadius, 0, Math.PI * 2);
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