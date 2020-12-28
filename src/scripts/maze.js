export default class {
    constructor(elm, config) {
        /** @type {HTMLDivElement} */
        this.mazeElm = elm
        this.rows = config.rows || Math.floor(this.mazeElm.clientHeight/36)
        this.columns = config.columns || Math.floor(this.mazeElm.clientWidth/36)

        this.mazeElm.addEventListener("mousedown", e => {
            e.target.classList.toggle("selected-box")
        })
        this._draw()
    }
    // set configurations
    set(config) {
        if(typeof config.rows === "number")
            this.rows = config.rows

        if(typeof config.columns === "number")
            this.columns = config.columns

        if(typeof config.backgroundColor === "string")
            this.backgroundColor = config.backgroundColor

        if(typeof config.pathColor === "string")
            this.pathColor = config.pathColor

        if(typeof config.wallColor === "string")
            this.wallColor = config.wallColor

        this._draw()
    }
    // Create New
    refresh() {
        this._draw()
    }
    _draw() {
        // Resize
        this.mazeElm.style.height = this.rows*36 + "px"
        this.mazeElm.style.width = this.columns*36 + "px"
        const maze = getMazeData(this.rows, this.columns)
        const frag = new DocumentFragment()
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.columns; c++) {
                const box = document.createElement("div")
                box.style.width = "36px"
                box.style.height = "36px"
                box.style.position = "absolute"
                box.style.top = r*36 + "px"
                box.style.left = c*36 + "px"
                box.classList.add("box")
                if (maze[r][c].topWall) {
                    box.classList.add("topWall")
                }
                if (maze[r][c].bottomWall) {
                    box.classList.add("bottomWall")
                }
                if (maze[r][c].leftWall) {
                    box.classList.add("leftWall")
                }
                if (maze[r][c].rightWall) {
                    box.classList.add("rightWall")
                }
                box.id = r + "#" + c
                frag.appendChild(box)
            }
        }
        this.mazeElm.innerHTML = ""
        this.mazeElm.appendChild(frag)
    }
}

/* Source: https://stackoverflow.com/a/2450976 */
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function availablePaths(r, c, grid) {
    const output = []
    if (grid[r + 1]?.[c]?.visited === false) {
        output.push("down")
    }
    if (grid[r - 1]?.[c]?.visited === false) {
        output.push("up")
    }
    if (grid[r][c + 1]?.visited === false) {
        output.push("right")
    }
    if (grid[r][c - 1]?.visited === false) {
        output.push("left")
    }
    return output
}
const getMazeData = (rows, cols) => {
    const grid = []
    for (let i = 0; i < rows; i++) {
        const row = []
        for (let ii = 0; ii < cols; ii++) {
            row.push({
                visited:false,
                round:0,
                leftWall:true,
                rightWall:true,
                topWall:true,
                bottomWall:true
            })
        }
        grid.push(row)
    }

    const position = [0, 0]
    let counter = 0
    const explore = ([r, c]) => {
        if (grid[r][c].visited) {
            return false
        }

        grid[r][c].visited = true
        grid[r][c].round = ++counter

        const directions = shuffle(availablePaths(r, c, grid))
        directions.forEach(direction => {
            let isExploring = true
            switch (direction) {
                case "down":
                    isExploring = explore([r + 1, c])
                    if (isExploring) {
                        grid[r][c].bottomWall = false
                        grid[r+1][c].topWall = false
                    }
                    break;

                case "up":
                    isExploring = explore([r - 1, c])
                    if (isExploring) {
                        grid[r][c].topWall = false
                        grid[r-1][c].bottomWall = false
                    }
                    break;

                case "right":
                    isExploring = explore([r, c + 1])
                    if (isExploring) {
                        grid[r][c].rightWall = false
                        grid[r][c+1].leftWall = false
                    }
                    break;

                case "left":
                    isExploring = explore([r, c - 1])
                    if (isExploring) {
                        grid[r][c].leftWall = false
                        grid[r][c-1].rightWall = false
                    }
                    break;
            }
        })
        return true
    }
    explore(position)
    console.log("Counter: ", counter);
    return grid
}