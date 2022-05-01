import React from 'react';
import { useState, useEffect } from 'react';

const Controls = ({
    getPath,
    updateStatus,
    refresh,
    loadSample,
    generateGrid,
    setTrack,
    cleanGrid
}) => {
    const [finder, setFinder] = useState(1);
    const [sample, setSample] = useState({ seed: 0 });

    const clear = () => {
        cleanGrid();
        setTrack({
            path: [],
            pathLength: 0,
            history: [],
            historyLength: 0,
        });
        updateStatus(2);
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
                        Generate
                    </button>
                </div>
                <div className="group left">
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
                <div className="group hide">
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
                        id='visualize'
                    >
                        Visualize
                    </button>
                </div>
                <div className="group right">
                    <button
                        className="value center button"
                        onClick={() => clear()}
                    >
                        Clear
                    </button>
                </div>
                <div className="group right">
                    <button className="value right button" onClick={() => reset()}>
                        Reset
                    </button>
                </div>
            </div>
            <div className="controls-info"></div>
        </div>
    );
};

export default Controls;
