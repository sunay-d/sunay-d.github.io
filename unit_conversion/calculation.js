const inputArea = document.getElementById("input")
const convertBtn = document.getElementById("convert")
const lengthArea = document.getElementById("length-area")
const volumeArea = document.getElementById("volume-area")
const massArea = document.getElementById("mass-area")

function convert(){
    if (inputArea.value === ""){
        lengthArea.textContent = "0 meters = 0 feet | 0 feet = 0 meters"
        volumeArea.textContent = "0 liters = 0 gallons | 0 gallons = 0 liters"
        massArea.textContent = "0 kilos = 0 pounds | 0 pounds = 0 kilos"
    } else {
        const data = inputArea.value
        const length = convertLength(data)
        const volume = convertVolume(data)
        const mass = convertMass(data)

        lengthArea.textContent = `${data} meters = ${length[0].toFixed(3)} feet | ${data} feet = ${length[1].toFixed(3)} meters`
        volumeArea.textContent = `${data} liters = ${volume[0].toFixed(3)} gallons | ${data} gallons = ${volume[1].toFixed(3)} liters`
        massArea.textContent = `${data} kilos = ${mass[0].toFixed(3)} pounds | ${data} pounds = ${mass[1].toFixed(3)} kilos`
    }
}

function convertLength(length){
    const feet = length*3.281
    const meter = length*0.3048
    return [feet, meter]
}

function convertVolume(volume){
    const gallon = volume*0.264
    const liter = volume*3.785411784
    return [gallon, liter]
}

function convertMass(mass){
    const pound = mass*2.204
    const kilo = mass*0.45359237
    return [pound, kilo]
}

inputArea.addEventListener("input", function(e) {
    let value = inputArea.value
    inputArea.value = value.length > 3 ? value.slice(0,3) : value
    console.log(inputArea.value, e.data)
})

convertBtn.addEventListener("click", function() {
    convert()
})