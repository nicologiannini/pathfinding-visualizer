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

            var source = start;
            var queue = [];
            queue.push(source);

            while (queue.length > 0) {
                var p = queue[0];
                var next = '';
                queue.shift();
                history.push(p);

                if (p.status === 'finish') {
                    var run = {
                        nodes: p.path,
                        length: p.path.length,
                        visited: history,
                        visitedLength: history.length,
                    };
                    setPath(run);
                    setStatus(3);
                }

                if (p.y - 1 >= 0 && check[p.y - 1][p.x].status === false) {
                    next = grid[p.y - 1][p.x];
                    next.path.push(p);
                    next.path = next.path.concat(p.path);
                    queue.push(next);
                    check[p.y - 1][p.x].status = true;
                }

                if (p.x - 1 >= 0 && check[p.y][p.x - 1].status === false) {
                    next = grid[p.y][p.x - 1];
                    next.path.push(p);
                    next.path = next.path.concat(p.path);
                    queue.push(next);
                    check[p.y][p.x - 1].status = true;
                }

                if (p.y + 1 < rows && check[p.y + 1][p.x].status === false) {
                    next = grid[p.y + 1][p.x];
                    next.path.push(p);
                    next.path = next.path.concat(p.path);
                    queue.push(next);
                    check[p.y + 1][p.x].status = true;
                }

                if (p.x + 1 < columns && check[p.y][p.x + 1].status === false) {
                    next = grid[p.y][p.x + 1];
                    next.path.push(p);
                    next.path = next.path.concat(p.path);
                    queue.push(next);
                    check[p.y][p.x + 1].status = true;
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
        const search = (p) => {
            history.push(p);
            if (p.status !== 'finish') {
                var neighbors = [];
                if (p.y + 1 < rows && check[p.y + 1][p.x].status === false) {
                    neighbors.push(grid[p.y + 1][p.x]);
                }
                if (p.x + 1 < columns && check[p.y][p.x + 1].status === false) {
                    neighbors.push(grid[p.y][p.x + 1]);
                }
                if (p.y - 1 >= 0 && check[p.y - 1][p.x].status === false) {
                    neighbors.push(grid[p.y - 1][p.x]);
                }
                if (p.x - 1 >= 0 && check[p.y][p.x - 1].status === false) {
                    neighbors.push(grid[p.y][p.x - 1]);
                }

                check[p.y][p.x].status = true;
                var nLength = neighbors.length;
                var i = 0;

                while (i < nLength && isRunning) {
                    var next = neighbors[i];
                    next.path.push(p);
                    next.path = next.path.concat(p.path);
                    search(next);
                    i += 1;
                }
            } else {
                var run = {
                    nodes: p.path,
                    length: p.path.length,
                    visited: history,
                    visitedLength: history.length,
                };
                setPath(run);
                setStatus(3);
                isRunning = false;
            }
        };

        if (status === 2) {
            var check = this.createValidationGrid(grid, rows, columns);
            var history = [];

            search(start, check);
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
                let q = openList.find((node) => node.f === min);

                openList = openList.filter(function (node) {
                    return node.x !== q.x || node.y !== q.y;
                });

                var down =
                    q.y + 1 < rows && check[q.y + 1][q.x].status === false
                        ? grid[q.y + 1][q.x]
                        : null;
                var up =
                    q.y - 1 >= 0 && check[q.y - 1][q.x].status === false
                        ? grid[q.y - 1][q.x]
                        : null;
                var right =
                    q.x + 1 < columns && check[q.y][q.x + 1].status === false
                        ? grid[q.y][q.x + 1]
                        : null;
                var left =
                    q.x - 1 >= 0 && check[q.y][q.x - 1].status === false
                        ? grid[q.y][q.x - 1]
                        : null;

                var neighbors = [down, up, right, left];

                for (var i = 0; i < 4; i++) {
                    var next = neighbors[i];
                    if (next) {
                        next.path = [];
                        if (!history.includes(next)) {
                            history.push(next);
                        }
                        next.path.push(q);
                        next.path = next.path.concat(q.path);
                        if (next.status === 'finish') {
                            var run = {
                                nodes: next.path,
                                length: next.path.length,
                                visited: history,
                                visitedLength: history.length,
                            };
                            setPath(run);
                            setStatus(3);
                            isRunning = false;
                        } else {
                            var g = q.g + 1;
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
                                path: next.path,
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
                closedList.push(q);
            }
        }
    };
}

export default Pathfinders;
