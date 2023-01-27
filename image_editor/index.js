const uploadBtn = document.getElementById("upload")
const downloadBtn = document.getElementById("download")
const resetBtn = document.getElementById("reset")

const imageSection = document.getElementById("image-section")
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
let brightness = 100
let saturation = 100
let grayscale = 0
let inversion = 0

uploadBtn.onclick = () => imageInput.click()
imageInput.onchange = () => {
    if (this.files && this.files[0]) {
        editedImage.onload = () => {
            URL.revokeObjectURL(editedImage.src);
        }
    }
    editedImage.src = URL.createObjectURL(imageInput.files[0])

    const mediaQuery = window.matchMedia('(max-width: 1000px)')

    if (mediaQuery.matches){
        imageSection.style.height = `300px`
        imageSection.style.width = `300px`
        imageSection.style.margin = `auto auto`
        document.querySelector("main").style.width = `350px`
    }

}
resetBtn.addEventListener("click", resetChanges)
downloadBtn.addEventListener("click", dowloadEditedImage)

rotateLeftBtn.addEventListener("click", function(){
    rotation -= 90
    editImage()
})

rotateRightBtn.addEventListener("click", function(){
    rotation += 90
    editImage()
})

flipHorizontalBtn.addEventListener("click", function(){
    scaleY= scaleY*(-1)
    editImage()
})

flipVerticalBtn.addEventListener("click", function(){
    scaleX = scaleX*(-1)
    editImage()
})

brightnessBtn.addEventListener("input", function(){
    brightness = brightnessBtn.value
    editImage()
    brightnessLabel.textContent = `Brightness | ${brightness}%`
})

saturationBtn.addEventListener("input", function(){
    saturation = saturationBtn.value
    editImage()
    saturationLabel.textContent = `Saturation | ${saturation}%`
})

grayscaleBtn.addEventListener("input", function(){
    grayscale = grayscaleBtn.value
    editImage()
    grayscaleLabel.textContent = `Grayscale | ${grayscale}%`
})

inversionBtn.addEventListener("input", function(){
    inversion = inversionBtn.value
    editImage()
    inversionLabel.textContent = `Inversion | ${inversion}%`
})


function editImage(){
    editedImage.style.filter = `brightness(${brightness}%) saturate(${saturation}%) grayscale(${grayscale}%) invert(${inversion}%)`
    editedImage.style.transform = `rotate(${rotation}deg) scaleX(${scaleX}) scaleY(${scaleY})`
}

function resetChanges(){
    resetRotateBtns()
    resetSettingsBtns()
}

function resetSettingsBtns() {
    editedImage.style.filter = `brightness(100%) saturate(100%) grayscale(0) invert(0)`

    brightnessLabel.textContent = `Brightness | 100%`
    brightness = 100
    brightnessBtn.value = 100

    saturationLabel.textContent = `Saturation | 100%`
    saturation = 100
    saturationBtn.value = 100

    grayscaleLabel.textContent = `Grayscale | 0%`
    grayscale = 0
    grayscaleBtn.value = 0

    inversionLabel.textContent = `Inversion | 0%`
    inversion = 0
    inversionBtn.value = 0
}

function resetRotateBtns() {
    rotation = 0
    scaleX = 1
    scaleY = 1

    editedImage.style.transform = `rotate(0) scaleX(1) scaleY(1)`
}

function dowloadEditedImage() {
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    canvas.width = editedImage.naturalWidth
    canvas.height = editedImage.naturalHeight
    
    ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) grayscale(${grayscale}%) invert(${inversion}%)`
    ctx.translate(canvas.width/2,canvas.height/2)
    ctx.scale(scaleX,scaleY)
    ctx.rotate(rotation*Math.PI/180)
    ctx.drawImage(editedImage,-canvas.width/2,-canvas.height/2,canvas.width,canvas.height)
    
    const link = document.createElement("a")
    link.download = "editedImage"
    link.href = canvas.toDataURL()
    link.click()
}

window.addEventListener("load", resetChanges)

