const createCheckGrid = (n, m, grid) => {
    var check = []
    for(var i = 0; i < n; i++){
        var row = []
        for(var j = 0; j < m; j++){
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

    return check
}

export const breadthFirstSearch = (n, m, status, grid, start, setTrack, setStatus) => {
    if(status === 2){
        var check = createCheckGrid(n, m, grid)
        var history = []

        var source = start
        var queue = []
        queue.push(source)

        while(queue.length > 0){
            var p = queue[0]
            var next = ''
            queue.shift()
            history.push(p)

            if(p.status === "finish"){
                var run = {
                    path: p.path,
                    pathLength: p.path.length,
                    history: history,
                    historyLength: history.length
                }
                setTrack(run)
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

            if (p.y + 1 < n && check[p.y + 1][p.x].status === false){
                next = grid[p.y + 1][p.x]
                next.path.push(p)
                next.path = next.path.concat(p.path)
                queue.push(next)
                check[p.y + 1][p.x].status = true
            }
            
            if (p.x + 1 < m && check[p.y][p.x + 1].status === false){
                next = grid[p.y][p.x + 1]
                next.path.push(p)
                next.path = next.path.concat(p.path)
                queue.push(next)
                check[p.y][p.x + 1].status = true
            }
        }
    }
}

export const depthFirstSearch = (n, m, status, grid, start, setTrack, setStatus) => {
    var isRunning = true
    const search = (p) =>{
        history.push(p)
        if(p.status !== 'finish'){
            var neighbour = []
            if (p.y + 1 < n && check[p.y + 1][p.x].status === false){
                neighbour.push(grid[p.y + 1][p.x])
            }
            if (p.x + 1 < m && check[p.y][p.x + 1].status === false){
                neighbour.push(grid[p.y][p.x + 1])
            }
            if (p.y - 1 >= 0 && check[p.y - 1][p.x].status === false){
                neighbour.push(grid[p.y - 1][p.x])
            }
            if (p.x - 1 >= 0 && check[p.y][p.x - 1].status === false){
                neighbour.push(grid[p.y][p.x - 1])
            }
            
            check[p.y][p.x].status = true
            var nLength = neighbour.length
            var i = 0

            while(i < nLength && isRunning){
                var next = neighbour[i]
                next.path.push(p)
                next.path = next.path.concat(p.path)
                search(next)
                i += 1
            }
        } else {
            var run = {
                path: p.path,
                pathLength: p.path.length,
                history: history,
                historyLength: history.length
            }
            setTrack(run)
            setStatus(3)
            isRunning = false
        }
    }

    if(status === 2){
        var check = createCheckGrid(n, m, grid)
        var history = []

        search(start, check)
    }
}

export const aStarSearch = (n, m, status, grid, start, end, setTrack, setStatus) => {

    var isRunning = true
    start.f = 0
    start.g = 0
    var openList = [start]
    var closedList = []

    if(status === 2){
        var check = createCheckGrid(n, m, grid)
        var history = [start]

        while(openList.length > 0 && isRunning){
            var min = Math.min.apply(Math, openList.map(node => node.f));
            var q = openList.find(node => node.f === min);
    
            openList = openList.filter(function(node){ 
                return node.x !== q.x || node.y !== q.y;
            });
    
            var down = q.y + 1 < n && check[q.y + 1][q.x].status === false ? grid[q.y + 1][q.x] : null;
    
            var up = q.y - 1 >= 0 && check[q.y - 1][q.x].status === false ? grid[q.y - 1][q.x] : null;
    
            var right = q.x + 1 < m && check[q.y][q.x + 1].status === false ? grid[q.y][q.x + 1] : null;
    
            var left = q.x - 1 >= 0 && check[q.y][q.x - 1].status === false ? grid[q.y][q.x - 1] : null;
    
            var successors = [down, up, right, left]
    
            for(var i = 0; i < 4; i++){
                var successor = successors[i]
                if(successor){
                    successor.path = []
                    if(!history.includes(successor)){
                        history.push(successor)
                    }
                    successor.path.push(q)
                    successor.path = successor.path.concat(q.path)
                    if(successor.status === 'finish'){
                        var run = {
                            path: successor.path,
                            pathLength: successor.path.length,
                            history: history,
                            historyLength: history.length
                        }
                        setTrack(run)
                        setStatus(3)
                        isRunning = false
                    } else {
                        var g = q.g + 1
                        var h = (Math.abs(end.x - successor.x) + Math.abs(end.y - successor.y))
                        var f = g + h

                        var dx1 = successor.x - end.x
                        var dy1 = successor.y - end.y
                        var dx2 = start.x - end.x
                        var dy2 = start.y - end.y
                        var cross = Math.abs(dx1 * dy2 - dx2 * dy1)
                        f += cross * 0.001

                        var node = {
                                x: successor.x,
                                y: successor.y,
                                id: successor.id,
                                path: successor.path,
                                g: g,
                                f: f
                        }
    
                        var alreadyTracked = openList.find(item => item.x === node.x && item.y === node.y && item.f <= node.f);
                        var alreadyClosed = closedList.find(item => item.x === node.x && item.y === node.y && item.f <= node.f);
    
                        if(!alreadyTracked && !alreadyClosed){
                            openList.push(node)
                        }
                    }
                }
            }
            closedList.push(q)
        }
    }
}