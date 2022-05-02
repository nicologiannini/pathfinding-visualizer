import React from 'react';

const Console = ({ track }) => {
    const disableButton = () => {
        var buttons = document.getElementsByClassName('button');
        Array.prototype.slice.call(buttons, 0).forEach(function (button) {
            button.setAttribute('disabled', '');
            button.classList.add('disabled');
            if (button.id === 'visualize') {
                button.classList.add('btn-disabled');
                button.classList.add('hide');
                var loader = document.getElementById('loader-cont');
                loader.classList.remove('hide')
            }
        });
    };

    const enableButton = () => {
        var buttons = document.getElementsByClassName('button');
        Array.prototype.slice.call(buttons, 0).forEach(function (button) {
            button.removeAttribute('disabled');
            button.classList.remove('disabled');
            if (button.id === 'visualize') {
                button.classList.remove('btn-disabled');
                button.classList.remove('hide');
                var loader = document.getElementById('loader-cont');
                loader.classList.add('hide')
            }
        });
    };

    if (track.historyLength > 0) {
        disableButton();

        for (let i = 1; i < track.historyLength - 1; i++) {
            setTimeout(function () {
                var element = document.getElementById(track.history[i].id);
                element.childNodes[0].classList.add('grey');
                if (i === track.historyLength - 2) {
                    for (let i = 0; i < track.pathLength - 1; i++) {
                        setTimeout(function () {
                            var element = document.getElementById(
                                track.path[i].id
                            );
                            element.classList.add('yellow');
                            if (i === track.pathLength - 2) {
                                enableButton();
                            }
                        }, i * 25);
                    }
                }
            }, i * 10);
        }
    } else {
        disableButton();
        var elements = [];
        elements = document.getElementsByClassName('grey');
        Array.prototype.slice.call(elements, 0).forEach(function (element) {
            element.classList.remove('grey');
        });
        elements = document.getElementsByClassName('yellow');
        Array.prototype.slice.call(elements, 0).forEach(function (element) {
            element.classList.remove('yellow');
        });
        enableButton();
    }

    return <div className="console"></div>;
};

export default Console;
