import React from 'react';

const Console = ({ track }) => {
    if(track.historyLength > 0){

        var buttons = document.getElementsByClassName("button");
        Array.prototype.slice.call( buttons, 0 ).forEach(function(button){
            button.setAttribute('disabled', '');
            button.classList.add('disabled')
        })


        for (let i = 1; i < track.historyLength - 1; i++) {
            setTimeout(function () {
                var element = document.getElementById(track.history[i].id);
                element.classList.add('grey');
                if (i === track.historyLength - 2) {
                    for (let i = 0; i < track.pathLength - 1; i++) {
                        setTimeout(function () {
                            var element = document.getElementById(track.path[i].id);
                            element.classList.add('yellow');
                            if(i === track.pathLength - 2){
                                Array.prototype.slice.call( buttons, 0 ).forEach(function(button){
                                    button.removeAttribute('disabled');
                                    button.classList.remove('disabled')
                                })
                            }
                        }, i * 25);
                    }
                }
            }, i * 10);
        }
    }

    return <div className="console"></div>;
};

export default Console;
