import React from 'react';
import { useState, useEffect } from 'react';

const Controls = ({
    status,
    getPath,
    updateStatus,
    refresh,
    loadSample,
    generateGrid,
    setTrack,
    cleanGrid,
}) => {
    const [finder, setFinder] = useState(1);
    const [sample, setSample] = useState({ seed: 0 });

    const clear = () => {
        if (status == 3) {
            cleanGrid();
            setTrack({
                path: [],
                pathLength: 0,
                history: [],
                historyLength: 0,
            });
            updateStatus(2);
        }
    };

    const resetAndGenerate = () => {
        reset();
        setSample({ seed: 'random' });
    };

    const resetAndLoad = (target) => {
        reset();
        setSample({ seed: target });
    };

    const reset = () => {
        refresh(true);
        updateStatus(0);
    };

    useEffect(() => {
        if (sample.seed !== 0) {
            if (sample.seed !== 'random') {
                loadSample(sample.seed);
            } else generateGrid();
        }
    }, [sample]);

    return (
        <div className="controls-cont">
            <div className="controls">
                <div className="group left">
                    <button
                        className="value center button"
                        onClick={() => resetAndGenerate()}
                    >
                        Generate maze
                    </button>
                </div>
                <div className="group left mobile-hide">
                    {finder === 1 && (
                        <button
                            id="finder"
                            className="value center button text-blue"
                            onClick={() => setFinder(2)}
                        >
                            Breadth-first search
                        </button>
                    )}
                    {finder === 2 && (
                        <button
                            id="finder"
                            className="value center button"
                            onClick={() => setFinder(3)}
                        >
                            Depth-first search
                        </button>
                    )}
                    {finder === 3 && (
                        <button
                            id="finder"
                            className="value center button"
                            onClick={() => setFinder(1)}
                        >
                            A* search
                        </button>
                    )}
                </div>
                <div className="group hide mobile-hide">
                    <button
                        className="value center button"
                        onClick={() => resetAndLoad(1)}
                    >
                        1
                    </button>
                    <button
                        className="value center button"
                        onClick={() => resetAndLoad(2)}
                    >
                        2
                    </button>
                    <button
                        className="value center button"
                        onClick={() => resetAndLoad(3)}
                    >
                        3
                    </button>
                </div>
                <div className="group">
                    <button
                        className="value left button btn-black"
                        onClick={() => getPath(finder)}
                        id="visualize"
                    >
                        Visualize
                    </button>
                    <div className="hide" id="loader-cont">
                        <div className="loader" id="loader-1"></div>
                    </div>
                </div>
                <div className="group right mobile-hide">
                    <button
                        className="value center button"
                        onClick={() => clear()}
                    >
                        Clear field
                    </button>
                </div>
                <div className="group right">
                    <button
                        className="value right button"
                        onClick={() => reset()}
                    >
                        Reset field
                    </button>
                </div>
            </div>
            <div className="controls-info">
                <p className="info-text">
                    <span className="info-item info-cell start">⯁</span>{' '}
                    Bounding nodes
                </p>
                <p className="info-text">
                    <span className="info-item info-cell grey">•</span> Visited
                    node
                </p>
                <p className="info-text">
                    <span className="info-item info-cell white">•</span>{' '}
                    Unvisited node
                </p>
                <p className="info-text">
                    <span className="info-item info-cell black">•</span> Block
                    node
                </p>
                <p className="info-text">
                    <span className="info-item info-cell path-found">•</span>{' '}
                    Path found
                </p>
            </div>
            <div className="mobile-hide">
                {(status === 0 || status === 5 || !status) && (
                    <p id='hint' className="hint-text">state: select a starting node.</p>
                )}
                {status === 1 && (
                    <p id='hint' className="hint-text">state: select a target node.</p>
                )}
                {status === 3 && (
                    <p id='hint' className="hint-text">state: clear or reset the field.</p>
                )}
                {status > 1 && status !== 5 && status !== 3 && (
                    <p id='hint' className="hint-text">
                        state: add some block or visualize.
                    </p>
                )}
            </div>
        </div>
    );
};

export default Controls;
