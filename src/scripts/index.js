import Maze from "./maze.js"

const mazeElm = document.getElementById("maze")

// Maze Controller
const maze = new Maze(mazeElm, {
    rows: Math.floor((mazeElm.parentElement.clientHeight - 100) / 36),
    columns: Math.floor((mazeElm.parentElement.clientWidth - 100) / 36),
    backgroundColor: "#1D2029",
    pathColor: "green",
    wallColor: "#662a2a"
})

window.addEventListener("resize", e => {
    maze.set({
        rows: Math.floor((mazeElm.parentElement.clientHeight - 100) / 36),
        columns: Math.floor((mazeElm.parentElement.clientWidth - 100) / 36)
    })
})