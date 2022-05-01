import { useState } from 'react';

const Cell = ({ id, x, y, status, triggerClick, triggerDrag }) => {
    const [cellStatus, setCellStatus] = useState(status);

    const reloadCell = (target) => {
        setCellStatus(target);
    };

    return (
        <div className="cell">
            {cellStatus === 'default' && (
                <div
                    className="innercell"
                    key={id}
                    id={id}
                    onMouseOver={() => triggerDrag(x, y, reloadCell)}
                    onClick={() => triggerClick(x, y, reloadCell)}
                >
                    •
                </div>
            )}
            {cellStatus === 'start' && (
                <div
                    className="innercell start"
                    key={id}
                    id={id}
                    onClick={() => triggerClick(x, y, reloadCell)}
                >
                    ⯁
                </div>
            )}
            {cellStatus === 'finish' && (
                <div
                    className="innercell finish"
                    key={id}
                    id={id}
                    onClick={() => triggerClick(x, y, reloadCell)}
                >
                    ⯁
                </div>
            )}
            {cellStatus === 'block' && (
                <div
                    className="innercell black"
                    key={id}
                    id={id}
                    onMouseOver={() => triggerDrag(x, y, reloadCell)}
                    onClick={() => triggerClick(x, y, reloadCell)}
                >
                    •
                </div>
            )}
        </div>
    );
};

export default Cell;
