import seed30x50JSON from './data/seed30x50.json';
import seed15x15JSON from './data/seed15x15.json';

export class Generator {
    constructor() {}

    createGridBlock = (n, m) => {
        var check = [];
        for (var i = 0; i < n; i++) {
            var row = [];
            for (var j = 0; j < m; j++) {
                var cell = {
                    status: 'block',
                };
                row.push(cell);
            }
            check.push(row);
        }

        return check;
    };

    validateOption = (n, m, i, j, check) => {
        var validated = true;

        var neighbors = [];
        if (i + 1 < m) neighbors.push(check[j][i + 1]);
        if (j + 1 < n && i + 1 < m) neighbors.push(check[j + 1][i + 1]);
        if (j + 1 < n) neighbors.push(check[j + 1][i]);
        if (j + 1 < n && i - 1 >= 0) neighbors.push(check[j + 1][i - 1]);
        if (i - 1 >= 0) neighbors.push(check[j][i - 1]);
        if (j - 1 >= 0 && i - 1 >= 0) neighbors.push(check[j - 1][i - 1]);
        if (j - 1 >= 0) neighbors.push(check[j - 1][i]);
        if (j - 1 >= 0 && i + 1 < m) neighbors.push(check[j - 1][i + 1]);
        if (i + 1 < m) neighbors.push(check[j][i + 1]); // workround

        var visitedCount = 0;
        var consecutiveVisited = 0;
        var previousEven = false;
        for (var k = 0; k < neighbors.length; k++) {
            if (neighbors[k].status === 'visited') {
                visitedCount += 1;
                consecutiveVisited += 1;
            } else {
                consecutiveVisited = 0;
            }
            if (k % 2 === 0) {
                if (neighbors[k].status === 'block') {
                    if (
                        previousEven === true &&
                        neighbors[k - 1].status === 'visited'
                    ) {
                        return false;
                    }
                    previousEven = true;
                } else {
                    previousEven = false;
                }
            }
            if (consecutiveVisited > 2 || visitedCount > 3) {
                return false;
            }
        }

        return validated;
    };

    generateRandomGrid = (n, m, status, setGrid, setStatus) => {
        if (status === 0) {
            var seed = null
            if(n === 30 && m === 50){
                seed = JSON.parse(JSON.stringify(seed30x50JSON));
            } else {
                seed = JSON.parse(JSON.stringify(seed15x15JSON));
            }
            var check = this.createGridBlock(n, m, seed);
            var history = [];

            var queue = [];
            check[0][0].status = 'visited';
            queue.push(seed[0][0]);

            while (queue.length > 0) {
                var p = queue[0];
                var next = '';
                queue.shift();
                history.push(p);

                var choices = [];

                if (p.y - 1 >= 0 && check[p.y - 1][p.x].status === 'block') {
                    if (this.validateOption(n, m, p.x, p.y - 1, check))
                        choices.push('north');
                }

                if (p.x - 1 >= 0 && check[p.y][p.x - 1].status === 'block') {
                    if (this.validateOption(n, m, p.x - 1, p.y, check))
                        choices.push('east');
                }

                if (p.y + 1 < n && check[p.y + 1][p.x].status === 'block') {
                    if (this.validateOption(n, m, p.x, p.y + 1, check))
                        choices.push('south');
                }

                if (p.x + 1 < m && check[p.y][p.x + 1].status === 'block') {
                    if (this.validateOption(n, m, p.x + 1, p.y, check))
                        choices.push('west');
                }

                if (choices.length > 0) {
                    var r = Math.floor(Math.random() * choices.length);

                    switch (choices[r]) {
                        case 'north':
                            next = seed[p.y - 1][p.x];
                            queue.push(next);
                            queue.push(p);
                            seed[p.y - 1][p.x].status = 'default';
                            check[p.y - 1][p.x].status = 'visited';
                            break;
                        case 'east':
                            next = seed[p.y][p.x - 1];
                            queue.push(next);
                            queue.push(p);
                            seed[p.y][p.x - 1].status = 'default';
                            check[p.y][p.x - 1].status = 'visited';
                            break;
                        case 'south':
                            next = seed[p.y + 1][p.x];
                            queue.push(next);
                            queue.push(p);
                            seed[p.y + 1][p.x].status = 'default';
                            check[p.y + 1][p.x].status = 'visited';
                            break;
                        case 'west':
                            next = seed[p.y][p.x + 1];
                            queue.push(next);
                            queue.push(p);
                            seed[p.y][p.x + 1].status = 'default';
                            check[p.y][p.x + 1].status = 'visited';
                            break;
                        default:
                            break;
                    }
                }
            }

            setGrid(seed);
            setStatus(5);
        }
    };
}

export default Generator;
