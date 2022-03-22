import { useState } from 'react';

const Cell = ({ id, x, y, status, triggerCell, triggerBound }) => {
    const [cellStatus, setCellStatus] = useState("default");

    const reloadCell = (target) => {
        setCellStatus(target);
    }

    return (
        <div className="cell">           
            {cellStatus === "default" && <div className="innercell" key={id} id={id} onMouseOver={() => triggerCell(x, y, reloadCell)} onClick={() => triggerBound(x, y, reloadCell)}>+</div>}
            {cellStatus === 0 && <div className="innercell blue" key={id} id={id} onMouseOver={() => triggerCell(x, y, reloadCell)}>+</div>}
            {cellStatus === 1 && <div className="innercell red" key={id} id={id} onMouseOver={() => triggerCell(x, y, reloadCell)}>+</div>}
            {cellStatus === 2 && <div className="innercell black" key={id} id={id} onMouseOver={() => triggerCell(x, y, reloadCell)}>+</div>}
        </div>
    )
};

export default Cell;