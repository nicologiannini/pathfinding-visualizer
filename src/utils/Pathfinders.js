export class Pathfinders {
    getPath = (
        finder,
        status,
        grid,
        rows,
        columns,
        start,
        target,
        setPath,
        setStatus
    ) => {
        switch (finder) {
            case 1:
                this.breadthFirstSearch(
                    status,
                    grid,
                    rows,
                    columns,
                    start,
                    setPath,
                    setStatus
                );
                break;
            case 2:
                this.depthFirstSearch(
                    status,
                    grid,
                    rows,
                    columns,
                    start,
                    setPath,
                    setStatus
                );
                break;
            case 3:
                this.aStarSearch(
                    status,
                    grid,
                    rows,
                    columns,
                    start,
                    target,
                    setPath,
                    setStatus
                );
                break;
            default:
                break;
        }
    };

    createValidationGrid = (grid, rows, columns) => {
        var validationGrid = [];
        for (var i = 0; i < rows; i++) {
            var row = [];
            for (var j = 0; j < columns; j++) {
                var cell = {
                    status: false,
                };
                if (
                    grid[i][j].status === 'block' ||
                    grid[i][j].status === 'start'
                ) {
                    cell.status = true;
                }
                row.push(cell);
            }
            validationGrid.push(row);
        }
        return validationGrid;
    };

    breadthFirstSearch = (
        status,
        grid,
        rows,
        columns,
        start,
        setPath,
        setStatus
    ) => {
        if (status === 2) {
            var check = this.createValidationGrid(grid, rows, columns);
            var history = [];
            var queue = [];
            queue.push(start);
            while (queue.length > 0) {
                var current = queue[0];
                var next = null;
                queue.shift();
                history.push(current);
                if (current.status === 'finish') {
                    var path = {
                        nodes: current.route,
                        length: current.route.length,
                        visited: history,
                        visitedLength: history.length,
                    };
                    setPath(path);
                    setStatus(3);
                }
                if (
                    current.y - 1 >= 0 &&
                    check[current.y - 1][current.x].status === false
                ) {
                    next = grid[current.y - 1][current.x];
                    next.route.push(current);
                    next.route = next.route.concat(current.route);
                    queue.push(next);
                    check[current.y - 1][current.x].status = true;
                }
                if (
                    current.x - 1 >= 0 &&
                    check[current.y][current.x - 1].status === false
                ) {
                    next = grid[current.y][current.x - 1];
                    next.route.push(current);
                    next.route = next.route.concat(current.route);
                    queue.push(next);
                    check[current.y][current.x - 1].status = true;
                }
                if (
                    current.y + 1 < rows &&
                    check[current.y + 1][current.x].status === false
                ) {
                    next = grid[current.y + 1][current.x];
                    next.route.push(current);
                    next.route = next.route.concat(current.route);
                    queue.push(next);
                    check[current.y + 1][current.x].status = true;
                }
                if (
                    current.x + 1 < columns &&
                    check[current.y][current.x + 1].status === false
                ) {
                    next = grid[current.y][current.x + 1];
                    next.route.push(current);
                    next.route = next.route.concat(current.route);
                    queue.push(next);
                    check[current.y][current.x + 1].status = true;
                }
            }
        }
    };

    depthFirstSearch = (
        status,
        grid,
        rows,
        columns,
        start,
        setPath,
        setStatus
    ) => {
        var isRunning = true;
        const search = (current) => {
            history.push(current);
            if (current.status !== 'finish') {
                var neighbors = [];
                if (
                    current.y + 1 < rows &&
                    check[current.y + 1][current.x].status === false
                ) {
                    neighbors.push(grid[current.y + 1][current.x]);
                }
                if (
                    current.x + 1 < columns &&
                    check[current.y][current.x + 1].status === false
                ) {
                    neighbors.push(grid[current.y][current.x + 1]);
                }
                if (
                    current.y - 1 >= 0 &&
                    check[current.y - 1][current.x].status === false
                ) {
                    neighbors.push(grid[current.y - 1][current.x]);
                }
                if (
                    current.x - 1 >= 0 &&
                    check[current.y][current.x - 1].status === false
                ) {
                    neighbors.push(grid[current.y][current.x - 1]);
                }
                check[current.y][current.x].status = true;
                var i = 0;
                while (i < neighbors.length && isRunning) {
                    var next = neighbors[i];
                    next.route.push(current);
                    next.route = next.route.concat(current.route);
                    search(next);
                    i += 1;
                }
            } else {
                var path = {
                    nodes: current.route,
                    length: current.route.length,
                    visited: history,
                    visitedLength: history.length,
                };
                setPath(path);
                setStatus(3);
                isRunning = false;
            }
        };
        if (status === 2) {
            var check = this.createValidationGrid(grid, rows, columns);
            var history = [];
            search(start);
        }
    };

    aStarSearch = (
        status,
        grid,
        rows,
        columns,
        start,
        end,
        setPath,
        setStatus
    ) => {
        var isRunning = true;
        start.f = 0;
        start.g = 0;
        var openList = [start];
        var closedList = [];
        if (status === 2) {
            var check = this.createValidationGrid(grid, rows, columns);
            var history = [start];
            while (openList.length > 0 && isRunning) {
                let min = Math.min.apply(
                    Math,
                    openList.map((node) => node.f)
                );
                let current = openList.find((node) => node.f === min);
                openList = openList.filter(function (node) {
                    return node.x !== current.x || node.y !== current.y;
                });
                var down =
                    current.y + 1 < rows &&
                    check[current.y + 1][current.x].status === false
                        ? grid[current.y + 1][current.x]
                        : null;
                var up =
                    current.y - 1 >= 0 &&
                    check[current.y - 1][current.x].status === false
                        ? grid[current.y - 1][current.x]
                        : null;
                var right =
                    current.x + 1 < columns &&
                    check[current.y][current.x + 1].status === false
                        ? grid[current.y][current.x + 1]
                        : null;
                var left =
                    current.x - 1 >= 0 &&
                    check[current.y][current.x - 1].status === false
                        ? grid[current.y][current.x - 1]
                        : null;
                var neighbors = [down, up, right, left];
                for (var i = 0; i < 4; i++) {
                    var next = neighbors[i];
                    if (next) {
                        next.route = [];
                        if (!history.includes(next)) {
                            history.push(next);
                        }
                        next.route.push(current);
                        next.route = next.route.concat(current.route);
                        if (next.status === 'finish') {
                            var path = {
                                nodes: next.route,
                                length: next.route.length,
                                visited: history,
                                visitedLength: history.length,
                            };
                            setPath(path);
                            setStatus(3);
                            isRunning = false;
                        } else {
                            var g = current.g + 1;
                            var h =
                                Math.abs(end.x - next.x) +
                                Math.abs(end.y - next.y);
                            var f = g + h;
                            var dx1 = start.x - end.x;
                            var dy1 = start.y - end.y;
                            var dx2 = next.x - end.x;
                            var dy2 = next.y - end.y;
                            var cross = Math.abs(dx1 * dy2 - dx2 * dy1);
                            f += cross * 0.001;
                            let node = {
                                x: next.x,
                                y: next.y,
                                id: next.id,
                                route: next.route,
                                g: g,
                                f: f,
                            };
                            var alreadyTracked = openList.find(
                                (item) =>
                                    item.x === node.x &&
                                    item.y === node.y &&
                                    item.f <= node.f
                            );
                            var alreadyClosed = closedList.find(
                                (item) =>
                                    item.x === node.x &&
                                    item.y === node.y &&
                                    item.f <= node.f
                            );
                            if (!alreadyTracked && !alreadyClosed) {
                                openList.push(node);
                            }
                        }
                    }
                }
                closedList.push(current);
            }
        }
    };
}

export default Pathfinders;
