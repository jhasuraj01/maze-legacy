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

    }
    _draw() {
        // Resize
        this.mazeElm.style.height = this.rows*36 + "px"
        this.mazeElm.style.width = this.columns*36 + "px"

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
                box.id = r + "#" + c
                frag.appendChild(box)
            }
        }
        this.mazeElm.innerHTML = ""
        this.mazeElm.appendChild(frag)
    }
}