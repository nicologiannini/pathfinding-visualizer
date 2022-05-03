import { useState } from 'react';

const Node = ({ id, x, y, status, triggerClick, triggerDrag }) => {
    const [nodeStatus, setNodeStatus] = useState(status);

    const reloadNode = (target) => {
        setNodeStatus(target);
    };

    return (
        <div className="node">
            {nodeStatus === 'default' && (
                <div
                    className="node-content"
                    key={id}
                    id={id}
                    onMouseOver={() => triggerDrag(x, y, reloadNode)}
                    onClick={() => triggerClick(x, y, reloadNode)}
                >
                    <span className='block'>•</span>
                </div>
            )}
            {nodeStatus === 'start' && (
                <div
                    className="node-content start"
                    key={id}
                    id={id}
                    onClick={() => triggerClick(x, y, reloadNode)}
                >
                    <span className='block'>⯁</span>
                </div>
            )}
            {nodeStatus === 'finish' && (
                <div
                    className="node-content finish"
                    key={id}
                    id={id}
                    onClick={() => triggerClick(x, y, reloadNode)}
                >
                    <span className='block'>⯁</span>
                </div>
            )}
            {nodeStatus === 'block' && (
                <div
                    className="node-content black"
                    key={id}
                    id={id}
                    onMouseOver={() => triggerDrag(x, y, reloadNode)}
                    onClick={() => triggerClick(x, y, reloadNode)}
                >
                    <span className='block'>•</span>
                </div>
            )}
        </div>
    );
};

export default Node;
