function drawStartButton(){
	ctx.beginPath();
	ctx.rect(100, 170, 400, 200);
	ctx.stroke();
	ctx.fillStyle = "lightgray";
	ctx.fill();

	ctx.fillStyle = "black";
	ctx.font = "60px Arial";
	ctx.textAlign = "center";
	ctx.fillText("START: enter", 300, 250);

	ctx.font = "30px Arial";
	ctx.textAlign = "center";
	ctx.fillText("Move: arrow keys", 300, 300);

	ctx.font = "30px Arial";
	ctx.textAlign = "center";
	ctx.fillText("Fire: space", 300, 330);
}

function levelUpScreen1(){
	clearCanvas();
	drawPlayer();
	drawEnemies();
	
	ctx.beginPath();
	ctx.rect(100, 170, 400, 200);
	ctx.stroke();
	ctx.fillStyle = "lightgray";
	ctx.fill();

	ctx.fillStyle = "black";
	ctx.font = "60px Arial";
	ctx.textAlign = "center";
	ctx.fillText("Level " + level.toString() + "...", 300, 250);

	ctx.font = "60px Arial";
	ctx.textAlign = "center";
	ctx.fillText("3", 300, 320);
}

function levelUpScreen2(){
	clearCanvas();
	drawPlayer();
	drawEnemies();

	ctx.beginPath();
	ctx.rect(100, 170, 400, 200);
	ctx.stroke();
	ctx.fillStyle = "lightgray";
	ctx.fill();

	ctx.fillStyle = "black";
	ctx.font = "60px Arial";
	ctx.textAlign = "center";
	ctx.fillText("Level " + level.toString() + "...", 300, 250);

	ctx.font = "60px Arial";
	ctx.textAlign = "center";
	ctx.fillText("2", 300, 320);
}

function levelUpScreen3(){
	clearCanvas();
	drawPlayer();
	drawEnemies();
	
	ctx.beginPath();
	ctx.rect(100, 170, 400, 200);
	ctx.stroke();
	ctx.fillStyle = "lightgray";
	ctx.fill();

	ctx.fillStyle = "black";
	ctx.font = "60px Arial";
	ctx.textAlign = "center";
	ctx.fillText("Level " + level.toString() + "...", 300, 250);

	ctx.font = "60px Arial";
	ctx.textAlign = "center";
	ctx.fillText("1", 300, 320);
}

function drawGameOverScreen(){
	ctx.beginPath();
	ctx.rect(100, 170, 400, 200);
	ctx.stroke();
	ctx.fillStyle = "lightgray";
	ctx.fill();

	ctx.fillStyle = "black";
	ctx.font = "60px Arial";
	ctx.textAlign = "center";
	ctx.fillText("GAME OVER", 300, 250);

	ctx.font = "30px Arial";
	ctx.textAlign = "center";
	ctx.fillText("Score: " + score.toString(), 300, 300);

	ctx.font = "30px Arial";
	ctx.textAlign = "center";
	ctx.fillText("Press ENTER to play again", 300, 350);
}