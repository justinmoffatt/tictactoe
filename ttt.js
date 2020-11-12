var canvas;
var context;
// 0 = empty, 1 = player, 2 = ai
grid = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];

function main(){
	/*
	*	setup function
	*/

	// get html canvas to work with
	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");
	// mouse click event listener
	canvas.addEventListener("mousedown", doMouseDown, false);
	
	// load the grid
	draw();
	//draw_cells();
}

// draw the board
function draw(){
	/*
	* 	clearing the canvas and drawing of the grid
	*/

	// clear
	context.clearRect(0, 0, canvas.width, canvas.height);
	grid = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];

	// horizontal
	for(i=1; i <= 2; i++){
		context.beginPath();
		context.moveTo(0,i*100);
		context.lineTo(300,i*100);
		context.stroke();
	}
	
	// vertical
	for(i=1; i <= 2; i++){
		context.beginPath();
		context.moveTo(i*100,0);
		context.lineTo(i*100,300);
		context.stroke();
	}
}

function draw_x(x, y){
	/*
	* 	draw an 'x' at cell
	*	@param x (number): grid integer number of x axis cell
	*	@param y (number): grid integer number of y axis cell
	*/

	i = 10 + get_coord(x);
	j = 10 + get_coord(y);
	
	// \
	context.beginPath();
	context.moveTo(i, j);
	context.lineTo(i+80, j+80);
	context.stroke();

	// /
	context.beginPath();
	context.moveTo(i+80, j);
	context.lineTo(i, j+80);
	context.stroke();
}

function draw_o(x, y){
	/*
	* 	draw an 'o' at cell
	*	@param x (number): grid integer number of x axis cell
	*	@param y (number): grid integer number of y axis cell
	*/

	i = 50 + get_coord(x);
	j = 50 + get_coord(y);

	context.beginPath();
	context.arc(i, j, 40, 0, 2 * Math.PI, false);
	context.stroke();
}

function draw_cells(){
	/*
	*	draw the cell numbers on the grid for debugging
	*/
	context.font = "12px Arial";
	for(i = 0; i <= 2; i++){
		for(j = 0; j <= 2; j++){
			context.fillText(i+","+j,i*100+50,j*100+50);
		}

	}
}

function get_cell(x){
	/*
	*	returns the cell number for the given coord
	*	@param x (number): the coord to get the cell number of
	*	@return (number): a cell number
	*/
	return parseInt(x/100);
}
function get_coord(x){
	/*
	*	returns the canvas coords for the given cell
	*	@param x (number): the cell number to get the coord of
	*	@return (number): a canvas coord
	*/
	return x*100;
}

function doMouseDown(event){
	/*
	*	mouse down event function and game actions
	*/
	x = get_cell(event.pageX);
	y = get_cell(event.pageY);

	// space selected is empty
	if(grid[x][y] == 0){
		grid[x][y] = 1;
		draw_x(x, y);
	}

	//	detect player win
	if(victory(x, y)){
		alert("Player victory!");
		draw();
	}
	// no victory so play AI
	else{
		// 'AI' is just picking random
		do{
			ai_x = Math.floor(Math.random() * 3);
			ai_y = Math.floor(Math.random() * 3);
		}while(grid[ai_x][ai_y] != 0);
		
		grid[ai_x][ai_y] = 2;
		draw_o(ai_x, ai_y);

		// check ai victory
		if(victory(ai_x, ai_y)){
			alert("AI victory!");
			draw()
		}
	}

}

function victory(x, y){
	/*
	*	checks if a victory has occured because of the last move
	*	@param x (number): the x cell number played
	*	@param y (number): the y cell number played
	*	@return (boolean): true if there is a victory
	*/
	player = grid[x][y]

	if(player == grid[x][0] && player == grid[x][1] && player == grid[x][2]){
		return true;
	}

	if(player == grid[0][y] && player == grid[1][y] && player == grid[2][y]){
		return true;
	}

	if(player == grid[0][0] && player == grid[1][1] && player == grid[2][2]){
		return true;
	}

	if(player == grid[0][2] && player == grid[1][1] && player == grid[2][0]){
		return true;
	}

	return false;
}