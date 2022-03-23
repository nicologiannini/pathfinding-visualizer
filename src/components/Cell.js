import { useState } from 'react';

const Cell = ({ id, x, y, status, triggerCell, triggerBound }) => {
    const [cellStatus, setCellStatus] = useState(status);

    const reloadCell = (target) => {
        setCellStatus(target);
    }

    return (
        <div className="cell">           
            {cellStatus === "default" && <div className="innercell" key={id} id={id} onMouseOver={() => triggerCell(x, y, reloadCell)} onClick={() => triggerBound(x, y, reloadCell)}>+</div>}
            {cellStatus === "start" && <div className="innercell blue" key={id} id={id} onMouseOver={() => triggerCell(x, y, reloadCell)}>+</div>}
            {cellStatus === "finish" && <div className="innercell red" key={id} id={id} onMouseOver={() => triggerCell(x, y, reloadCell)}>+</div>}
            {cellStatus === "block" && <div className="innercell black" key={id} id={id} onMouseOver={() => triggerCell(x, y, reloadCell)}>+</div>}
        </div>
    )
};

export default Cell;
