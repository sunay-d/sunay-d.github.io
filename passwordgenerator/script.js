const lower = document.getElementById("lower-case")
const upper = document.getElementById("upper-case")
const nums = document.getElementById("nums")
const specChar = document.getElementById("spec-char")
const splitWord = document.getElementById("split-word")
const len = document.getElementById("length")
const specWord = document.getElementById("spec-word")

let password = passwordGenerator()
let passwordArray = []
len.value = 12

document.addEventListener("click", function(e) {
    if(e.target.className === "copy-btn") {
        let copyText = document.getElementById("password").textContent
        navigator.clipboard.writeText(copyText)
    }

    if(e.target.className === "password-generate-btn") {
        generate()
        document.getElementById("password").textContent = password
        render()
    }
})

len.addEventListener("input", function(){
    document.getElementById("length-label").textContent = `Length: ${len.value}`
})


function passwordGenerator(){
    let password = ''
    let specialWord = specWord.value
    let passw = specChar.checked ? '%!*@#$()^&' : ''
    passw += nums.checked ? '0123456789' : ''
    passw += upper.checked ? 'ABCDEFGHIJKLMONPQRSTUWVXYZ' : ''
    passw += lower.checked ? 'abcdefghijklmnopqrstuwvxyz' : ''

    let arr = splitWord.checked ? specialWord.split('') : [specialWord]

    for (let i=0; i<len.value-specialWord.length; i++){
        arr.push(passw[Math.floor(Math.random() * passw.length)])
    }
    while (arr.length > 0){
        let random = Math.floor(Math.random() * arr.length)
        password += arr[random]
        arr.splice(random,1)
    }

    return password
}

function generate() {
    if (checkConditions()) {
        if (passwordArray.length === 2) {
            passwordArray.pop()
            passwordArray.unshift(password)
        } else if (passwordArray.length === 1) {
            passwordArray.unshift(password)
        } else if (passwordArray.length === 0) {
            passwordArray.push(password)
        }
    
        password = passwordGenerator()
    }
}

function render() {
    document.getElementById("password").innerHTML = password

    let html = `
        <div class="pasw">
            <img class="copy-btn" src="./img/copy${passwordArray[0] ? '-white' : ''}.png" alt="copy-password-icon">
            <p id="pasw1">${passwordArray[0] ? passwordArray[0] : ''}</p>
        </div>
    `
    if (passwordArray.length === 2){
        html += `
        <div class="pasw">
            <p id="pasw2">${passwordArray[1]}</p>
            <img class="copy-btn" src="./img/copy-white.png" alt="copy-password-icon">
        </div>
        `
    }
    document.getElementById("old-passwords").innerHTML = html
}

function checkConditions() {
    if ((specWord.value).length > len.value) {
        alert("number of characters must be less than the length")
        return false
    }
    return true
}


render()


















