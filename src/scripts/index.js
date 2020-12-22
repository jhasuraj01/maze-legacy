import Maze from "./maze.js"

const mazeElm = document.getElementById("maze")
const refreshBtn = document.getElementById("refresh")
const shareBtn = document.getElementById("share")
const solveBtn = document.getElementById("solve")
const hintBtn = document.getElementById("hint")
const columnsInp = document.getElementById("columns")
const rowsInp = document.getElementById("rows")
const algorithmInp = document.getElementById("algorithm")
const backgroundColorInp = document.getElementById("background")
const pathColorInp = document.getElementById("path")
const wallColorInp = document.getElementById("wall")

// event listners
refreshBtn.addEventListener("click", () => {
    // TO Do ...
    console.log("Button Clicked: refreshBtn")
})
shareBtn.addEventListener("click", () => {
    // TO Do ...
    console.log("Button Clicked: shareBtn")
})
solveBtn.addEventListener("click", () => {
    // TO Do ...
    console.log("Button Clicked: solveBtn")
})
hintBtn.addEventListener("click", () => {
    // TO Do ...
    console.log("Button Clicked: hintBtn")
})
columnsInp.addEventListener("input", () => {
    // TO Do ...
    console.log("Column Count Changed: ", columnsInp.value)
})
rowsInp.addEventListener("input", () => {
    // TO Do ...
    console.log("Row Count Changed: ", rowsInp.value)
})
algorithmInp.addEventListener("change", () => {
    // TO Do ...
    console.log("Algorithm Changed: ", algorithmInp.value)
})
backgroundColorInp.addEventListener("input", () => {
    backgroundColorInp.previousElementSibling.style.backgroundColor = backgroundColorInp.value
    mazeElm.style.backgroundColor = backgroundColorInp.value
})
pathColorInp.addEventListener("input", () => {
    // TO Do ...
    console.log("Input Received: pathColorInp", pathColorInp.value)
})
wallColorInp.addEventListener("input", () => {
    // TO Do ...
    console.log("Input Received: wallColorInp")
})


const config = {
    rows: Math.floor((mazeElm.parentElement.clientHeight - 100) / 36),
    columns: Math.floor((mazeElm.parentElement.clientWidth - 100) / 36)
}
// Maze Controller
const maze = new Maze(mazeElm, config)

window.addEventListener("resize", e => {
    maze.set({
        rows: Math.floor((mazeElm.parentElement.clientHeight - 100) / 36),
        columns: Math.floor((mazeElm.parentElement.clientWidth - 100) / 36)
    })
})