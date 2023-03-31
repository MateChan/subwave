const n = document.getElementById("n")
const d = document.getElementById("d")
const y = document.getElementById("y")
const digit = document.getElementById("digit")
const height = document.getElementById("height")
const emoji = document.getElementById("emoji")
const angle = document.getElementById("angle")
const generateButton = document.getElementById("generateButton")
const output = document.getElementById("output")
const copyButton = document.getElementById("copyButton")

const rad2deg = rad => {
    return (rad * 180 / Math.PI)
}

const position = (text, x, y) => {
    if (x == 0 && y == 0) {
        return text
    }
    let mfm = "$[position."
    if (x != 0) {
        mfm += "x=" + x
    }
    if (x != 0 && y != 0) {
        mfm += ","
    }
    if(y != 0) {
        mfm += "y=" + y
    }
    mfm += " " + text + "]"
    return mfm
}

const rotate = (text, deg) => {
    if (deg == 0) {
        return text
    }
    return "$[rotate.deg=" + deg + " " + text + "]"
}

/*
8  : 0.15
20 : 0.065
*/

const generate = (n, d, y, digit, angle, emoji) => {
    const n_num = parseFloat(n)
    const d_num = parseFloat(d)
    const y_num = parseFloat(y)
    const digit_num = parseInt(digit)
    const angle_num = parseFloat(angle)
    let mfm = "<center>\n"
    const width = n_num * 2 * Math.PI
    for(let i = 0; i < width; i += d_num) {
        const pre = Math.sin(i - d_num)
        const now = Math.sin(i)
        const nxt = Math.sin(i + d_num)
        const gap = (nxt - pre) / 2
        const rad = Math.atan(gap * y_num / 2.55)
        const deg = rad2deg(rad)
        const line = position(rotate(emoji, (-1 * deg + angle_num).toFixed(digit_num)), (y_num * now).toFixed(digit_num), 0)
        mfm += line + "\n"
    }
    mfm += "</center>"
    return mfm
}

generateButton.addEventListener("click", () => {
    const mfm = generate(n.value, d.value, y.value, digit.value, angle.value, emoji.value)
    output.value = mfm
    copyButton.innerText = "コピー"
})

copyButton.addEventListener("click", () => {
    const mfm = output.value
    navigator.clipboard.writeText(mfm)
    copyButton.innerText = "コピーしました"
})
