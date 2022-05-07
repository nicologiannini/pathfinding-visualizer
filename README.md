# visual-pathfind

[Try it here](https://visualizer.giannini.dev)

At the moment it all seems to be standing up with react@17.0.2 although my experience with it is very limited, all pathfinding algorithms implemented operate in 4 directions (*n, w, s ,e*), the field is fixed to be a 30x50 grid.

If you want to run **BFS** select the **A** setting from the control bar.

If you want to run **DFS** select the **B** setting from the control bar.

If you want to run **A*** select the **C** setting from the control bar.

For each run you need to indicate start(*blue*) and end(*red*) points, blocks are optional.

Settings 1, 2, 3 load different fields of pre-populated blocks.

### A-star search
In some grid maps there are many paths with the same length, A* could explore all the paths with the same value f (*the variable it uses for searching*), instead of just one. A quick way to solve this problem is to add a [tie-breaking](http://theory.stanford.edu/~amitp/GameProgramming/Heuristics.html#breaking-ties) cross-product to heuristic.

The result is that this code will give a slight preference to a path that is along a straight line from start to destination.

Please make all pull requests with new features or bugfixes to the `main`
branch. We are formatting code using [Prettier](https://prettier.io/), so you
should run `npm run format` on your code before making a pull request.
