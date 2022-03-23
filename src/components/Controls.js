import React from 'react';

const Controls = ({getPath, updateStatus, refresh, loadSample, cost, length}) => {

    //<h4 className="value center">COST: {cost}</h4>
    //<h4 className="value center"> LENGTH: {length}</h4>
    //window.location.reload(false)
    const clear = () => {
        refresh(true)
        updateStatus(0)
    }

	return (
		<div className='controls'>
            <h2 className="value left button" onClick={() => getPath()}>RUN</h2>
            <h4 className="value center button" onClick={() => loadSample()}>SAMPLE</h4>
            <h2 className="value right button" onClick={() => clear()}>CLEAR</h2>
		</div>
	);
};

export default Controls;
