const uploadBtn = document.getElementById("upload")
const downloadBtn = document.getElementById("download")
const resetBtn = document.getElementById("reset")

const editedImage = document.getElementById("edited-image")
const imageInput = document.getElementById("image-input")

const rotateLeftBtn = document.getElementById("rotate-left")
const rotateRightBtn = document.getElementById("rotate-right")
const flipHorizontalBtn = document.getElementById("flip-horizontal")
const flipVerticalBtn = document.getElementById("flip-vertical")

const brightnessBtn = document.getElementById("brightness")
const saturationBtn = document.getElementById("saturation")
const grayscaleBtn = document.getElementById("grayscale")
const inversionBtn = document.getElementById("inversion")

const brightnessLabel = document.getElementById("brightness-label")
const saturationLabel = document.getElementById("saturation-label")
const grayscaleLabel = document.getElementById("grayscale-label")
const inversionLabel = document.getElementById("inversion-label")

let rotation = 0
let scaleX = 1
let scaleY = 1

uploadBtn.addEventListener("click", function() {
    imageInput.click()
})

imageInput.onchange = () => {
    if (this.files && this.files[0]) {
        editedImage.onload = () => {
            URL.revokeObjectURL(editedImage.src);
        }
    }
    editedImage.src = URL.createObjectURL(imageInput.files[0])
}

rotateLeftBtn.addEventListener("click", function(){
    rotation -= 90
    editedImage.style.transform = `rotate(${rotation}deg)`
})

rotateRightBtn.addEventListener("click", function(){
    rotation += 90
    editedImage.style.transform = `rotate(${rotation}deg)`
})

flipHorizontalBtn.addEventListener("click", function(){
    scaleY= scaleY*(-1)
    editedImage.style.transform = `scaleY(${scaleY})`
})

flipVerticalBtn.addEventListener("click", function(){
    scaleX = scaleX*(-1)
    editedImage.style.transform = `scaleX(${scaleX})`
})

brightnessBtn.addEventListener("input", function(){
    const value = brightnessBtn.value
    editedImage.style.filter = `brightness(${value}%)`
    brightnessLabel.textContent = `Brightness | ${value}%`
})

saturationBtn.addEventListener("input", function(){
    const value = saturationBtn.value
    editedImage.style.filter = `saturate(${value}%)`
    saturationLabel.textContent = `Saturation | ${value}%`
})

grayscaleBtn.addEventListener("input", function(){
    const value = grayscaleBtn.value
    editedImage.style.filter = `grayscale(${value}%)`
    grayscaleLabel.textContent = `Grayscale | ${value}%`
})

inversionBtn.addEventListener("input", function(){
    const value = inversionBtn.value
    editedImage.style.filter = `invert(${value}%)`
    inversionLabel.textContent = `Inversion | ${value}%`
})

resetBtn.addEventListener("click", resetChanges)

function resetChanges(){
    resetRotateBtns()
    resetSettingsBtns()
}

function resetSettingsBtns() {
    editedImage.style.filter = `brightness(100%)`
    brightnessLabel.textContent = `Brightness | 100%`
    brightnessBtn.value = 100

    editedImage.style.filter = `saturate(100%)`
    saturationLabel.textContent = `Saturation | 100%`
    saturationBtn.value = 100

    editedImage.style.filter = `grayscale(0)`
    grayscaleLabel.textContent = `Grayscale | 0%`
    grayscaleBtn.value = 0

    editedImage.style.filter = `invert(0)`
    inversionLabel.textContent = `Inversion | 0%`
    inversionBtn.value = 0
}

function resetRotateBtns() {
    rotation = 0
    scaleX = 1
    scaleY = 1

    editedImage.style.transform = `rotate(0)`
    editedImage.style.transform = `scaleX(1)`
    editedImage.style.transform = `scaleY(1)`
}

window.addEventListener("load", resetChanges)

