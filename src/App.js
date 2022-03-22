import Cell from './components/Cell';

const App = () => {

	const N = 30;
	const M = 50;
	var gridStatus = 0;
	var start = null;

	const getPath = () => {
		if(gridStatus === 2){
			var check = [];
			var history = [];
			for(var i = 0; i < N; i++){
				var row = [];
				for(var j = 0; j < M; j++){
					var cell = {
						status: false,
					};
					row.push(cell);
				}
				check.push(row);
			}

			for(var i = 0; i < N; i++){
				for(var j = 0; j < M; j++){
					if(grid[i][j].status === 2){
						check[i][j].status = true;
					}
				}
			}

			var source = start;
			var queue = [];
			queue.push(source);

			while(queue.length > 0){
				var p = queue[0];
				var next = '';
				queue.shift();
				history.push(p);

				if(p.status === 1){
					buildHistory(history, history.length, p.path);
				}

				if (p.y - 1 >= 0 && check[p.y - 1][p.x].status === false){
					next = grid[p.y - 1][p.x];
					next.path.push(p);
					next.path = next.path.concat(p.path)
					queue.push(next);
					check[p.y - 1][p.x].status = true;
				}

				if (p.y + 1 < N && check[p.y + 1][p.x].status === false){
					next = grid[p.y + 1][p.x];
					next.path.push(p);
					next.path = next.path.concat(p.path)
					queue.push(next);
					check[p.y + 1][p.x].status = true;
				}
				
				if (p.x - 1 >= 0 && check[p.y][p.x - 1].status === false){
					next = grid[p.y][p.x - 1];
					next.path.push(p);
					next.path = next.path.concat(p.path)
					queue.push(next);
					check[p.y][p.x - 1].status = true
				}
				
				if (p.x + 1 < M && check[p.y][p.x + 1].status === false){
					next = grid[p.y][p.x + 1];
					next.path.push(p);
					next.path = next.path.concat(p.path)
					queue.push(next)
					check[p.y][p.x + 1].status = true
				}
			}
		}
	}

	const buildHistory = (history, target, path) => {
		history.pop();
		for (let i = 0; i < history.length; i++) {
			setTimeout(function() {
				var element = document.getElementById(history[i].id);
				element.classList.add("grey");
				if(i === target - 2){
					buildPath(path);
				}
			}, i * 5);
		}		
	}

	const buildPath = (path) => {
		path.pop();	
		for (let i = 0; i < path.length; i++) {
			setTimeout(function() {
				var element = document.getElementById(path[i].id);
				element.classList.add("yellow");
			}, i * 25);
		}
	}

	var mouseDown = false;
	document.onmousedown = function() {
		mouseDown = true;
	}
	document.onmouseup = function() {
		mouseDown = false;
	}
    const triggerBound = (x, y, reloadCell) => {
		switch(gridStatus){
			case 0:
				if(grid[y][x].status === "default"){
					grid[y][x].status = 0;
					start = grid[y][x];
					gridStatus = 1;
				}	
				break
			case 1:
				if(grid[y][x].status === "default"){
					grid[y][x].status = 1;
					gridStatus = 2;
				}
				break
			default:
				break;
		}
		reloadCell(grid[y][x].status);
	}

	const triggerCell = (x, y, reloadCell) => {
		if(mouseDown && gridStatus === 2){
			if(grid[y][x].status === "default"){
				grid[y][x].status = 2;
			} else if(grid[y][x].status === 2){
				grid[y][x].status = "default";
			}
			reloadCell(grid[y][x].status);
		}
	}

	var grid = [];
	for(var i = 0; i < N; i++){
		var row = [];
		for(var j = 0; j < M; j++){
			var cell = {
				id: M * i + j,
				x: j,
				y: i,
				status: "default",
				path: []
			};
			row.push(cell);
		}
		grid.push(row);
	}

	return (
		<div className='dash'>
			<p onClick={() => getPath()}>Click</p>
			<div className='container'>
				{grid.map((row) => (
					row.map((cell) => (
						<Cell
							key={cell.id}
							id={cell.id}
							x={cell.x}
							y={cell.y}
							status={cell.status}
							triggerCell={triggerCell}
							triggerBound={triggerBound}
						/>
					))
				))}
			</div>
		</div>
	);
};

export default App;
