let generatePalette = () => {
    const baseColorInput = document.getElementById("base-color");                 //default palette
    const colorPaletteContainer = document.getElementById("palette");             //default palette 
    const baseColor = baseColorInput.value;

    //Clear previous palette
    colorPaletteContainer.innerHTML = "";
    const palette = generateHarmoniousPalette(baseColor);
    palette.forEach((color) => {
        const colorBox = document.createElement("div");
        colorBox.style.backgroundColor = color;
        colorBox.className = "color-box";
        colorBox.addEventListener("click", copyCode);
        colorPaletteContainer.append(colorBox);
    });

};


function generateHarmoniousPalette(baseColor) {
    const numberOfColors = 5;
    const baseHue = extractHue(baseColor);
    const colorPalette = [];
    for (let i = 0; i < numberOfColors; i++) {
        const hue = (baseHue + (360 / numberOfColors) * i) % 360;
        const color = `hsl(${hue}, 70%, 50%)`;
        colorPalette.push(color);
    }
    return colorPalette;
}

function extractHue(color) {
    const hex = color.slice(1);
    const rgb = parseInt(hex, 16);


    const r = rgb >> 16 & 0xff;
    const g = rgb >> 8 & 0xff;
    const b = rgb >> 0 & 0xff;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);

    let hue;
    if (max === min) {
        hue = 0;
    } else {
        const d = max - min;
        switch (max) {
            case r:
                hue = ((g - b) / d + (g < b ? 6 : 0)) * 60;
                break;
            case g:
                hue = ((b - r) / d + 2) * 60;
                break;
            case b:
                hue = ((r - g) / d + 4) * 60;
                break;
        }
    }
    return hue;
}

function copyCode(e) {
    let input = document.createElement("input");
    input.type = "text";
    let text = e.target.style.backgroundColor;
    let hex = "#";
    let rgbcode = text.replace(/[rgb()]+/g, "") || rgbcode;
    rgbcode = rgbcode.split(",");
    rgbcode.forEach((value) => {
        value = parseInt(value).toString(16);
        hex += value.length == 1 ? "0" + value : value;
    });
    input.value = hex;
    //append to body
    document.body.appendChild(input);
    input.select();
    document.execCommand("copy");
    document.body.removeChild(input);
    alert("Color Copied: " + hex);
}

window.addEventListener("load", generatePalette);
document.getElementById("generate-btn");
document.addEventListener("click", generatePalette);

//Why the simplified way doesn't work?
//document.getElementById("generate-btn").addEventListener("click", generatePalette);

let colorInput = document.querySelector('#picked-color');

document.getElementById("generate-btn1");
colorInput.addEventListener('click', () => {
    let pickedColor = colorInput.value;
    document.body.style.backgroundColor = pickedColor;
    document.querySelector('#color-box1').style.backgroundColor = pickedColor;

    const colorPalette = [];
    for (let i = 0; i < 5; i++) {
        const color = pickedColor;
        colorPalette.push(pickedColor);
    }
});
