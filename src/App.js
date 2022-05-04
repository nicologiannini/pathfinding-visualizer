import { useState, useEffect } from 'react';
import Node from './components/Node';
import Controls from './components/Controls';
import Console from './components/Console';
import Helper from './utils/Helper';
import Generator from './utils/Generator';
import Pathfinders from './utils/Pathfinders';

const App = () => {
    /*
    status:
        0: Empty grid
        1: Starting node selected
        2: Target node selected
        3: Path found
        4: Random maze generated
    */

    const [status, setStatus] = useState(0);
    const [grid, setGrid] = useState([]);
    const [start, setStart] = useState(null);
    const [target, setTarget] = useState(null);
    const [path, setPath] = useState({
        nodes: [],
        length: 0,
        visited: [],
        visitedLength: 0,
    });
    const [rows, setRows] = useState(30);
    const [columns, setColumns] = useState(50);

    // Libraries

    const HELPER = new Helper();
    const GENERATOR = new Generator();
    const PATHFINDERS = new Pathfinders();

    // Document data

    var mouseDown = false;
    document.onmousedown = function () {
        mouseDown = true;
    };
    document.onmouseup = function () {
        mouseDown = false;
    };

    if (window.screen.availWidth < 600 && rows !== 15 && columns !== 15) {
        setRows(15);
        setColumns(15);
    }

    // Functions

    const init = (refresh) => {
        if (status === 0 || refresh) {
            var field = HELPER.buildDefaultGrid(rows, columns);
            setPath({
                nodes: [],
                length: 0,
                visited: [],
                visitedLength: 0,
            });
            setGrid(field);
            setStart(null);
            setTarget(null);
        }
    };

    const cleanGrid = () => {
        HELPER.cleanGrid(grid);
    };

    const getPath = (finder) => {
        PATHFINDERS.getPath(
            finder,
            status,
            grid,
            rows,
            columns,
            start,
            target,
            setPath,
            setStatus
        );
    };

    const generateMaze = () => {
        GENERATOR.generateMaze(status, rows, columns, setGrid, setStatus);
    };

    const triggerClick = (y, x, reloadNode) => {
        HELPER.triggerClick(
            status,
            grid,
            y,
            x,
            reloadNode,
            setStart,
            setTarget,
            setStatus
        );
    };

    const triggerDrag = (y, x, reloadNode) => {
        HELPER.triggerDrag(status, grid, y, x, reloadNode, mouseDown);
    };

    useEffect(() => {
        init();
    }, []);

    // Render

    return (
        <div className="dash">
            <div className="container">
                <Controls
                    status={status}
                    getPath={getPath}
                    updateStatus={setStatus}
                    refresh={init}
                    generateMaze={generateMaze}
                    cleanGrid={cleanGrid}
                    updatePath={setPath}
                />
                {status === 0 && (
                    <div className="field">
                        {grid.map((row) =>
                            row.map((node) => (
                                <Node
                                    key={node.id}
                                    id={node.id}
                                    y={node.y}
                                    x={node.x}
                                    status={node.status}
                                    triggerDrag={triggerDrag}
                                    triggerClick={triggerClick}
                                />
                            ))
                        )}
                    </div>
                )}
                {status !== 0 && (
                    <div className="field">
                        {grid.map((row) =>
                            row.map((node) => (
                                <Node
                                    key={node.id}
                                    id={node.id}
                                    y={node.y}
                                    x={node.x}
                                    status={node.status}
                                    triggerDrag={triggerDrag}
                                    triggerClick={triggerClick}
                                />
                            ))
                        )}
                    </div>
                )}
                <Console path={path} />
            </div>
        </div>
    );
};

export default App;
