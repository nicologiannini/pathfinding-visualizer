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
        2: End node selected
        3: Path found
        4: Random maze generated
    */

    const [status, setStatus] = useState(0);
    const [grid, setGrid] = useState([]);
    const [start, setStart] = useState(null);
    const [end, setEnd] = useState(null);
    const [track, setTrack] = useState({
        path: [],
        pathLength: 0,
        history: [],
        historyLength: 0,
    });
    const [N, setN] = useState(30);
    const [M, setM] = useState(50);

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

    if (window.screen.availWidth < 600 && N !== 15 && M !== 15) {
        setN(15);
        setM(15);
    }

    // Functions

    const init = (refresh) => {
        if (status === 0 || refresh) {
            var field = HELPER.buildDefaultGrid(N, M);
            setTrack({
                path: [],
                pathLength: 0,
                history: [],
                historyLength: 0,
            });
            setGrid(field);
            setStart(null);
            setEnd(null);
        }
    };

    const cleanGrid = () => {
        HELPER.cleanGrid(grid);
    };

    const getPath = (finder) => {
        PATHFINDERS.getPath(
            finder,
            N,
            M,
            status,
            grid,
            start,
            end,
            setTrack,
            setStatus
        );
    };

    const generateMaze = () => {
        GENERATOR.generateMaze(N, M, status, setGrid, setStatus);
    };

    const triggerClick = (x, y, reloadNode) => {
        HELPER.triggerClick(
            x,
            y,
            reloadNode,
            status,
            grid,
            setStart,
            setEnd,
            setStatus
        );
    };

    const triggerDrag = (x, y, reloadNode) => {
        HELPER.triggerDrag(x, y, reloadNode, mouseDown, status, grid);
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
                    setTrack={setTrack}
                />
                {status === 0 && (
                    <div className="field">
                        {grid.map((row) =>
                            row.map((node) => (
                                <Node
                                    key={node.id}
                                    id={node.id}
                                    x={node.x}
                                    y={node.y}
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
                                    x={node.x}
                                    y={node.y}
                                    status={node.status}
                                    triggerDrag={triggerDrag}
                                    triggerClick={triggerClick}
                                />
                            ))
                        )}
                    </div>
                )}
                <Console track={track} />
            </div>
        </div>
    );
};

export default App;
