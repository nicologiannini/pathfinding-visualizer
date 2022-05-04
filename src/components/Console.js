import React from 'react';

const Console = ({ path }) => {
    const disableButton = () => {
        var buttons = document.getElementsByClassName('button');
        Array.prototype.slice.call(buttons, 0).forEach((button) => {
            button.setAttribute('disabled', '');
            button.classList.add('disabled');
            if (button.id === 'visualize') {
                button.classList.add('btn-disabled');
                button.classList.add('hide');
                var loader = document.getElementById('loader-cont');
                loader.classList.remove('hide');
            }
        });
    };

    const enableButton = () => {
        var buttons = document.getElementsByClassName('button');
        Array.prototype.slice.call(buttons, 0).forEach((button) => {
            button.removeAttribute('disabled');
            button.classList.remove('disabled');
            if (button.id === 'visualize') {
                button.classList.remove('btn-disabled');
                button.classList.remove('hide');
                var loader = document.getElementById('loader-cont');
                loader.classList.add('hide');
            }
        });
    };

    if (path.visitedLength > 0) {
        disableButton();

        for (let i = 1; i < path.visitedLength - 1; i++) {
            setTimeout(function () {
                var element = document.getElementById(path.visited[i].id);
                element.childNodes[0].classList.add('grey');
                if (i === path.visitedLength - 2) {
                    for (let j = 0; j < path.length - 1; j++) {
                        setTimeout(function () {
                            var element = document.getElementById(
                                path.nodes[j].id
                            );
                            element.classList.add('yellow');
                            if (j === path.length - 2) {
                                enableButton();
                            }
                        }, j * 25);
                    }
                }
            }, i * 10);
        }
    } else {
        disableButton();
        var elements = [];
        elements = document.getElementsByClassName('grey');
        Array.prototype.slice.call(elements, 0).forEach((element) => {
            element.classList.remove('grey');
        });
        elements = document.getElementsByClassName('yellow');
        Array.prototype.slice.call(elements, 0).forEach((element) => {
            element.classList.remove('yellow');
        });
        enableButton();
    }

    return <div className="console"></div>;
};

export default Console;
