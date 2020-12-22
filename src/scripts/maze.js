export default class {
    constructor(elm, config) {
        /** @type {HTMLDivElement} */
        this.mazeElm = elm
        this.rows = config.rows || Math.floor(this.mazeElm.clientHeight/36)
        this.columns = config.columns || Math.floor(this.mazeElm.clientWidth/36)
        this.backgroundColor = config.backgroundColor || "#1D2029"
        this.pathColor = config.pathColor || "green"
        this.wallColor = config.wallColor || "#662a2a"
        this.#draw()
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

        this.#draw()
    }
    // Create New
    refresh() {

    }
    #draw() {
        // Resize
        this.mazeElm.style.height = this.rows*36 + "px"
        this.mazeElm.style.width = this.columns*36 + "px"

        // colors
        this.mazeElm.style.backgroundColor = this.backgroundColor
    }
}