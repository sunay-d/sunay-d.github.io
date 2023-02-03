import Dog from "./Dog.js"
import dogs from "./data.js"

const nopeBadge = document.getElementById("nope-badge")
const likeBadge = document.getElementById("like-badge")

let dog = new Dog(dogs.shift())
let likedDogsHtml = ``
const likedDogsArray = []

function likeDog(dog) {
    likeBadge.style.display = "inline"
    dog.hasBeenSwiped = true
    dog.hasBeenLiked = true
    likedDogsHtml += dog.likedDogCardHtml
    likedDogsArray.push(dog)
    getNewDog()   
}

function dislikeDog(dog) {
    nopeBadge.style.display = "inline"
    dog.hasBeenSwiped = true
    getNewDog()
}


function getNewDog(){
    setTimeout(function() {
        if(dogs.length > 0) {
            dog = new Dog(dogs.shift())
            likeBadge.style.display = "none"
            nopeBadge.style.display = "none"
            render()
        }
        else {
            renderLastPage()
        }
    },1500)
}


function renderLastPage(){
    document.getElementById("app-container").style.display = "none"
    document.getElementById("last-page").style.display = "block"
    if(likedDogsHtml){
        document.getElementById("liked-dogs").innerHTML = likedDogsHtml
    }else {
        document.getElementById("message").textContent = "You couldn't find any dog worth liking. What does it tell us about you? 🤨"
    }
}

function render(){
    document.getElementById("dog-card").innerHTML = dog.dogCardHtml
}

render()

export {likeDog, dislikeDog, dog}





