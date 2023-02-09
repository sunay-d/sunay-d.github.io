const seedColour = document.getElementById("seed-colour")
const mode = document.getElementById("scheme")
getScheme()

function render(colours) {
    let html = ``
    for (i=0; i<5; i++) {
        const style = `background-color: ${colours[i]};`

        html +=         
        `<div class="colour">
            <div class="colour-box"  data-hex=${colours[i]} style="${style}"><p class="message" id="${colours[i]}"></p></div>
            <p class="hex-code" data-hex=${colours[i]}>${colours[i]}</p>
        </div>`
    }

    document.getElementById("colour-list").innerHTML = html
}

function getScheme() {
    fetch(`https://www.thecolorapi.com/scheme?hex=${seedColour.value.slice(1)}&mode=${mode.value}&count=5`)
    .then(response => response.json())
    .then(data => {
        let colours = []
        for (let color of data.colors) {
            colours.push(color.hex.value)
        }
        render(colours)
    })
}

document.addEventListener("click", function(e) {
    if (e.target.id === "get-scheme") {
        getScheme()
    }
    else if (e.target.dataset.hex){
        const copyText = e.target.dataset.hex
        navigator.clipboard.writeText(copyText);
        document.getElementById(e.target.dataset.hex).textContent = "copied"
        document.getElementById(e.target.dataset.hex).style.padding = "10px"
        setTimeout(function() {
            document.getElementById(e.target.dataset.hex).textContent = ""
            document.getElementById(e.target.dataset.hex).style.padding = "0"
        },1000)
    }
})
