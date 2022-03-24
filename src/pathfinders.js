export const breadthFirstSearch = (n, m, status, grid, start, setTrack, setStatus) => {
    if(status === 2){
        var check = []
        var history = []
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
            if(!check[p.y][p.x].status){
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
        var check = []
        var history = []
        for(var i = 0; i < n; i++){
            var row = []
            for(var j = 0; j < m; j++){
                var cell = {
                    status: false,
                }
                if(grid[i][j].status === "block"){
                    cell.status = true
                }
                row.push(cell)
            }
            check.push(row)
        }

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
        var check = []
        var history = [start]
        for(var i = 0; i < n; i++){
            var row = []
            for(var j = 0; j < m; j++){
                var cell = {
                    status: false,
                }
                if(grid[i][j].status === "block"){
                    cell.status = true
                }
                row.push(cell)
            }
            check.push(row)
        }

        while(openList.length > 0 && isRunning){
            var min = Math.min.apply(Math, openList.map(node => node.f));
            var q = openList.find(node => node.f === min);
    
            openList = openList.filter(function(node, index, arr){ 
                return node.x != q.x || node.y != q.y;
            });
    
            var up = q.y + 1 < n && check[q.y + 1][q.x].status === false ? grid[q.y + 1][q.x] : null;
    
            var down = q.y - 1 >= 0 && check[q.y - 1][q.x].status === false ? grid[q.y - 1][q.x] : null;
    
            var right = q.x + 1 < m && check[q.y][q.x + 1].status === false ? grid[q.y][q.x + 1] : null;
    
            var left = q.x - 1 >= 0 && check[q.y][q.x - 1].status === false ? grid[q.y][q.x - 1] : null;
    
            var successors = [up, down, right, left]
    
            for(var i = 0; i < 4; i++){
                var successor = successors[i]
                if(successor){
                    successor.path = []
                    if(!history.includes(successor)){
                        history.push(successor)
                    }
                    successor.path = successor.path.concat(q.path)
                    successor.path.push(q)
                    if(successor.status === 'finish'){
                        successor.path.shift()
                        successor.path.push(end)
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
                        successor.g = q.g + 1
                        successor.h = Math.abs(end.x - successor.x) + Math.abs(end.y - successor.y)
                        successor.f = successor.g + successor.h
    
                        var alreadyTracked = openList.find(node => node.x === successor.x && node.y === successor.y && node.f < successor.f);
                        var alreadyClosed = closedList.find(node => node.x === successor.x && node.y === successor.y && node.f < successor.f);
    
                        if(!alreadyTracked && !alreadyClosed){
                            openList.push(successor)
                        }
                        closedList.push(successor)
                    }
                }
            }
        }
    }
}