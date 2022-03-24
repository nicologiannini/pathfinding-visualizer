import React from 'react';
import { useState } from 'react';

const Controls = ({getPath, updateStatus, refresh, loadSample}) => {
    const [finder, setFinder] = useState(1);

    const clear = () => {
        refresh(true)
        updateStatus(0)
    }

	return (
		<div className='controls'>
            <h2 className="value left button" onClick={() => getPath(finder)}>RUN</h2>
            <div className="group">
                {finder === 1 && <h4 id="finder" className="value center button text-blue" onClick={() => setFinder(2)}>A</h4>}
                {finder === 2 && <h4 id="finder" className="value center button" onClick={() => setFinder(3)}>B</h4>}
                {finder === 3 && <h4 id="finder" className="value center button" onClick={() => setFinder(1)}>C</h4>}
            </div>
            <div className="group">
                <h4 className="value center button" onClick={() => loadSample(1)}>1</h4>
                <h4 className="value center button" onClick={() => loadSample(2)}>2</h4>
                <h4 className="value center button" onClick={() => loadSample(3)}>3</h4>
            </div>
            <h4 className="value right button" onClick={() => clear()}>CLEAR</h4>
		</div>
	);
};

export default Controls;
