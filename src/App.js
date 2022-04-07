import Cell from './components/Cell';
import Controls from './components/Controls';
import Console from './components/Console';
import sample1JSON from './data/sample_1.json';
import sample2JSON from './data/sample_2.json';
import sample3JSON from './data/sample_3.json';
import Pathfinder from './pathfinders'
import { useState, useEffect } from 'react';

const App = () => {
	const [status, setStatus] = useState(0);
	const [grid, setGrid] = useState([]);
	const [start, setStart] = useState(null);
	const [end, setEnd] = useState(null);
	const [track, setTrack] = useState({
		path: [],
		pathLength: 0,
		history: [],
		historyLength: 0
	});
	const N = 30
	const M = 50
	const pathfinder = new Pathfinder()

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
			setTrack({
				path: [],
				pathLength: 0,
				history: [],
				historyLength: 0
			})
			setGrid(field)
			setStart(null)
			setEnd(null)
		}
	}

	const loadSample = (target) => {
		if(status === 0){
			var sample = []
			switch(target){
				case 1:
					sample = JSON.parse(JSON.stringify(sample1JSON))
					break
				case 2:
					sample = JSON.parse(JSON.stringify(sample2JSON))
					break
				case 3:
					sample = JSON.parse(JSON.stringify(sample3JSON))
					break
				default:
					break
			}
			setGrid(sample)
			setStatus(5)
		}
	}

	const getPath = (finder) => {
		switch(finder){
			case 1:
				pathfinder.breadthFirstSearch(N, M, status, grid, start, setTrack, setStatus)
				break
			case 2:
				pathfinder.depthFirstSearch(N, M, status, grid, start, setTrack, setStatus)
				break
			case 3:
				pathfinder.aStarSearch(N, M, status, grid, start, end, setTrack, setStatus)
				break
			default:
				break
		}
	}

    const triggerBound = (x, y, reloadCell) => {
		switch(status){
			case 0:
			case 5:
				if(grid[y][x].status === "default"){
					grid[y][x].status = "start"
					setStart(grid[y][x])
					setStatus(1)
				}	
				break
			case 1:
				if(grid[y][x].status === "default"){
					grid[y][x].status = "finish"
					setEnd(grid[y][x])
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
					track={track}
				/>
			</div>
		</div>
	)
}

export default App;
