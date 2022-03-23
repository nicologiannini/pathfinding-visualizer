import Cell from './components/Cell';
import Controls from './components/Controls';
import Console from './components/Console';
import sampleJSON from './data/sample.json';
import { useState, useEffect } from 'react';

const App = () => {
	const [cost, setCost] = useState(0);
	const [length, setLength] = useState(0);
	const [grid, setGrid] = useState([]);
	const [status, setStatus] = useState(0);
	const [start, setStart] = useState(null);
	const N = 30
	const M = 50

	var mouseDown = false
	document.onmousedown = function() {
		mouseDown = true
	}
	document.onmouseup = function() {
		mouseDown = false
	}

	const init = (refresh) => {
		if(status === 0 || refresh){
			var field = []
			for(var i = 0; i < N; i++){
				var row = []
				for(var j = 0; j < M; j++){
					var cell = {
						id: M * i + j,
						x: j,
						y: i,
						status: "default",
						path: []
					}
					row.push(cell)
				}
				field.push(row)
			}
			setGrid(field)
			setStart(null)
		}
	}

	const loadSample = () => {
		if(status === 0){
			setGrid(sampleJSON.field)
			setStatus(2)
			setStart(sampleJSON.start)
		}
	}

	const getPath = () => {
		if(status === 2){
			var check = []
			var history = []
			for(var i = 0; i < N; i++){
				var row = []
				for(var j = 0; j < M; j++){
					var cell = {
						status: false,
					}
					if(grid[i][j].status === "block" || grid[i][j].status === "start"){
						cell.status = true
					}
					row.push(cell)
				}
				check.push(row)
			}

			var source = start
			var queue = []
			queue.push(source)

			while(queue.length > 0){
				var p = queue[0]
				var next = ''
				queue.shift()
				history.push(p)

				if(p.status === "finish"){
					buildHistory(history, history.length, p.path)
					setStatus(3)
				}

				if (p.y - 1 >= 0 && check[p.y - 1][p.x].status === false){
					next = grid[p.y - 1][p.x]
					next.path.push(p)
					next.path = next.path.concat(p.path)
					queue.push(next)
					check[p.y - 1][p.x].status = true
				}

				if (p.x - 1 >= 0 && check[p.y][p.x - 1].status === false){
					next = grid[p.y][p.x - 1]
					next.path.push(p)
					next.path = next.path.concat(p.path)
					queue.push(next)
					check[p.y][p.x - 1].status = true
				}

				if (p.y + 1 < N && check[p.y + 1][p.x].status === false){
					next = grid[p.y + 1][p.x]
					next.path.push(p)
					next.path = next.path.concat(p.path)
					queue.push(next)
					check[p.y + 1][p.x].status = true
				}
				
				if (p.x + 1 < M && check[p.y][p.x + 1].status === false){
					next = grid[p.y][p.x + 1]
					next.path.push(p)
					next.path = next.path.concat(p.path)
					queue.push(next)
					check[p.y][p.x + 1].status = true
				}
			}
		}
	}

	const buildHistory = (history, target, path) => {
		history.shift()
		history.pop()
		for (let i = 0; i < history.length; i++) {
			setTimeout(function() {
				if(i % 10 === 0){
					setCost(i)
				}
				var element = document.getElementById(history[i].id)
				element.classList.add("grey")
				if(i === target - 3){
					setCost(i + 1)
					buildPath(path)
				}
			}, i * 5)
		}		
	}

	const buildPath = (path) => {
		path.pop()
		setLength(path.length)
		for (let i = 0; i < path.length; i++) {
			setTimeout(function() {
				var element = document.getElementById(path[i].id)
				element.classList.add("yellow")
			}, i * 25)
		}
	}

    const triggerBound = (x, y, reloadCell) => {
		switch(status){
			case 0:
				if(grid[y][x].status === "default"){
					grid[y][x].status = "start"
					setStart(grid[y][x])
					setStatus(1)
				}	
				break
			case 1:
				if(grid[y][x].status === "default"){
					grid[y][x].status = "finish"
					setStatus(2)
				}
				break
			default:
				break
		}
		reloadCell(grid[y][x].status)
	}

	const triggerCell = (x, y, reloadCell) => {
		if(mouseDown && status === 2){
			if(grid[y][x].status === "default"){
				grid[y][x].status = "block"
			} else if(grid[y][x].status === "block"){
				grid[y][x].status = "default"
			}
			reloadCell(grid[y][x].status)
		}
	}

	useEffect(() => {
		init()
	}, [])
	
	return (
		
		<div className='dash'>
			<div className='container'>
				<Controls 
					getPath={getPath}
					updateStatus={setStatus}
					refresh={init}
					loadSample={loadSample}
					cost={cost}
					length={length}
				/>
				{ status === 0 &&
					<div className='field'>
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
				}
				{ status !== 0 &&
					<div className='field'>
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
				}
				<Console 
					cost={cost}
					length={length}
				/>
			</div>
		</div>
	)
}

export default App;
