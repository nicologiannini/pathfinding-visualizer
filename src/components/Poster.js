import React from 'react';
import { useState } from 'react';

const Poster = ({}) => {
    const [index, setIndex] = useState(1);

    const next = () => {
        if (index === 4) {
            close();
        } else {
            setIndex(index + 1);
        }
    };

    const prev = () => {
        if (index > 1) {
            setIndex(index - 1);
        }
    };

    const close = () => {
        var element = document.getElementById('poster');
        element.classList.add('hide');
    };

    return (
        <div className="poster-cont mobile-hide" id="poster">
            <div className="poster">
                {index === 1 && (
                    <div className="poster-content">
                        <div className="poster-heading">
                            <p className="poster-title">
                                A simple pathfinding visualizer
                            </p>
                            <p className="poster-number">1/4</p>
                        </div>
                        <div className="poster-body">
                            <p>
                                This short tutorial will walk you through all
                                the core features of this application. If you
                                want to dive right in, feel free to press the
                                "Skip" button below. Otherwise, press "Next".
                            </p>
                        </div>
                    </div>
                )}
                {index === 2 && (
                    <div className="poster-content">
                        <div className="poster-heading">
                            <p className="poster-title">
                                What is a pathfinding algorithm?
                            </p>
                            <p className="poster-number">2/4</p>
                        </div>
                        <div className="poster-body">
                            <p>
                                A pathfinding algorithm could be intended as a
                                strategy to find the shortest path between two
                                points. This application let you visualizes
                                various pathfinding algorithms in action, to
                                discover some of their behaviors and how they
                                works. All the algorithms in this application
                                are adapted for a two-dimensional grid.
                            </p>
                            <br />
                            <p>
                                You will be able to select them from the
                                settings bar.
                            </p>
                        </div>
                    </div>
                )}
                {index === 3 && (
                    <div className="poster-content">
                        <div className="poster-heading">
                            <p className="poster-title">Customize the field</p>
                            <p className="poster-number">3/4</p>
                        </div>
                        <div className="poster-body">
                            <p>
                                Once you have selected the bounding nodes, which
                                will indicate the start and end points of the
                                path, all that's left to do, is modify the field
                                adding blocks to see how the different
                                algorithms will unravel to find a solution.
                            </p>
                            <p>
                                Other options will be available from the
                                settings bar, to clean and reset the field or to
                                generate random mazes.
                            </p>
                        </div>
                    </div>
                )}
                {index === 4 && (
                    <div className="poster-content">
                        <div className="poster-heading">
                            <p className="poster-title">Enjoy!</p>
                            <p className="poster-number">4/4</p>
                        </div>
                        <div className="poster-body">
                            <p>
                                Now you're ready to go, just if you have any
                                doubts about what is going on, below the
                                settings bar there is a small status indicator
                                that will guide you and suggests you the
                                commands to execute to enjoy the application.
                            </p>
                        </div>
                    </div>
                )}
                <div className="poster-nav">
                    <p className="poster-button" onClick={() => close()}>
                        Skip
                    </p>
                    <div className="poster-nav-option">
                        <p
                            className="poster-button"
                            style={{ marginRight: 8 }}
                            onClick={() => prev()}
                        >
                            Prev
                        </p>
                        <p className="poster-button" onClick={() => next()}>
                            Next
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Poster;
