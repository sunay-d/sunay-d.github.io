const darkModeBtn = document.getElementById("dark-light-mode")
const container = document.getElementById("container")
const box = document.querySelectorAll(".conversion-box")
const body = document.getElementById("body")
let darkMode = false

darkModeBtn.addEventListener("click", function() {
    darkMode = !darkMode
    changeMode(darkMode)
})

function changeMode(darkMode){
    if (darkMode){
        for (let el of box){
            body.style.backgroundColor="#2f2f2f"
            el.style.backgroundColor = "#273549"
            el.children[0].style.color = "#CCC1FF"
            el.children[1].style.color = "white"
        }
        container.style.backgroundColor = "#1F2937"
    } else {
        for (let el of box){
            body.style.backgroundColor="white"
            el.style.backgroundColor = "white"
            el.children[0].style.color = "#5A537B"
            el.children[1].style.color = "#353535"
        }
        container.style.backgroundColor = "#F4F4F4"
    }

}