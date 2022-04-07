import React from 'react';

const Console = ({ track }) => {
    for (let i = 1; i < track.historyLength - 1; i++) {
        setTimeout(function () {
            var element = document.getElementById(track.history[i].id);
            element.classList.add('grey');
            if (i === track.historyLength - 2) {
                for (let i = 0; i < track.pathLength - 1; i++) {
                    setTimeout(function () {
                        var element = document.getElementById(track.path[i].id);
                        element.classList.add('yellow');
                    }, i * 25);
                }
            }
        }, i * 7);
    }

    return <div className="console"></div>;
};

export default Console;
