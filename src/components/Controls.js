import React from 'react';
import { useState, useEffect } from 'react';

const Controls = ({
    getPath,
    updateStatus,
    refresh,
    loadSample,
    generateGrid
}) => {
    const [finder, setFinder] = useState(1);
    const [sample, setSample] = useState({ seed: 0 });

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
        <div className="controls">
            <button className="value left button" onClick={() => getPath(finder)}>
                RUN
            </button>
            <div className="group">
                {finder === 1 && (
                    <button
                        id="finder"
                        className="value center button text-blue"
                        onClick={() => setFinder(2)}
                    >
                        A
                    </button>
                )}
                {finder === 2 && (
                    <button
                        id="finder"
                        className="value center button"
                        onClick={() => setFinder(3)}
                    >
                        B
                    </button>
                )}
                {finder === 3 && (
                    <button
                        id="finder"
                        className="value center button"
                        onClick={() => setFinder(1)}
                    >
                        C
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
                    className="value center button"
                    onClick={() => resetAndGenerate()}
                >
                    GENERATE
                </button>
            </div>
            <button className="value right button" onClick={() => reset()}>
                RESET
            </button>
        </div>
    );
};

export default Controls;
