import { likeDog, dislikeDog, dog} from './app.js'

const { SwipeEventListener } = window.SwipeEventListener
const { swipeArea } = SwipeEventListener({
    swipeArea: document.getElementById('dog-card')
})

swipeArea.addEventListener('swipeLeft', () => {
    dislikeDog(dog)
})  
swipeArea.addEventListener('swipeRight', () => {  
    likeDog(dog)
})

document.addEventListener("click", function(e){
    if (e.target.dataset.heart) {
        if (!dog.hasBeenSwiped) {
            likeDog(dog)
        }
    }
    else if(e.target.dataset.cross) {
        if (!dog.hasBeenSwiped) {
            dislikeDog(dog)
        }
    }
    else if(e.target.dataset.logo) {
        location.reload()
    }
})


