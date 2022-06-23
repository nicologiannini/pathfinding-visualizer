# visual-pathfind

[Try it](https://visualizer.giannini.dev)

At the moment it all seems to be standing up with react@17.0.2 although my experience with it is very limited, all pathfinding algorithms implemented operate in 4 directions (*n, w, s ,e*), the field is fixed to be a 30x50 grid.

For each run you need to indicate *start* and *target* points, blocks are optional.

* **Generate**, loads a field with pre-populated blocks random generated (*guaranteed path*).
* **Selector**, displays the one currently selected.
* **Visualize**, draws all visited nodes and the path found on the field.
* **Clear field**, deletes the previous path, if any, without changing the field.
* **Reset field**, restores the initial field.

In some grid maps there are many paths with the same length, A* could explore all the paths with the same value f (*the variable it uses for searching*), instead of just one. A quick way to solve this problem is to add a [tie-breaking](http://theory.stanford.edu/~amitp/GameProgramming/Heuristics.html#breaking-ties) cross-product to heuristic.

The result is that this code will give a slight preference to a path that is along a straight line from start to destination.

Please make all pull requests with new features or bugfixes to the `main`
branch. We are formatting code using [Prettier](https://prettier.io/), so you
should run `npm run format` on your code before making a pull request.
