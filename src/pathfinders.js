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