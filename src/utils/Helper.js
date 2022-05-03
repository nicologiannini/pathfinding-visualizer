export class Helper {
    buildDefaultGrid = (n, m) => {
        var field = [];
        for (var i = 0; i < n; i++) {
            var row = [];
            for (var j = 0; j < m; j++) {
                var node = {
                    id: m * i + j,
                    x: j,
                    y: i,
                    status: 'default',
                    path: [],
                };
                row.push(node);
            }
            field.push(row);
        }

        return field;
    };

    cleanGrid = (grid) => {
        grid.forEach(function (row) {
            row.forEach(function (item) {
                item.path = [];
            });
        });
    };

    triggerClick = (
        x,
        y,
        reloadNode,
        status,
        grid,
        setStart,
        setEnd,
        setStatus
    ) => {
        switch (status) {
            case 0:
            case 4:
                if (grid[y][x].status === 'default') {
                    grid[y][x].status = 'start';
                    setStart(grid[y][x]);
                    setStatus(1);
                }
                break;
            case 1:
                if (grid[y][x].status === 'default') {
                    grid[y][x].status = 'finish';
                    setEnd(grid[y][x]);
                    setStatus(2);
                } else if (grid[y][x].status === 'start') {
                    grid[y][x].status = 'default';
                    setStart(null);
                    setStatus(0);
                }
                break;
            case 2:
                if (grid[y][x].status === 'default') {
                    grid[y][x].status = 'block';
                } else if (grid[y][x].status === 'block') {
                    grid[y][x].status = 'default';
                } else if (grid[y][x].status === 'finish') {
                    grid[y][x].status = 'default';
                    setEnd(null);
                    setStatus(1);
                }
                break;
            default:
                break;
        }
        reloadNode(grid[y][x].status);
    };

    triggerDrag = (x, y, reloadNode, mouseDown, status, grid) => {
        if (mouseDown && status === 2) {
            if (grid[y][x].status === 'default') {
                grid[y][x].status = 'block';
            } else if (grid[y][x].status === 'block') {
                grid[y][x].status = 'default';
            }
            reloadNode(grid[y][x].status);
        }
    };
}

export default Helper;
