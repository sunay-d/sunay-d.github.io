import { links } from "./links.js"

fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=summer")
    .then(response => response.json())
    .then(image => {
        document.querySelector("body").style.backgroundImage = `url(${image.urls.full})`
        document.getElementById("image-author").textContent = `By: ${image.user.name}`
    })
    .catch(err => {
        document.querySelector("body").style.backgroundImage = `url(https://images.unsplash.com/photo-1611952961634-349806683d73…8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzY0NTE5Nzc&ixlib=rb-4.0.3&q=80)`
        document.getElementById("image-author").textContent = `By: Antonella Vilardo`
    })

const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
}

function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
}

navigator.geolocation.getCurrentPosition(loc => getWeather(loc.coords.latitude, loc.coords.longitude), error, options)
function getWeather(lat,lon){

    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=tr&appid=85e64ff84a677268947ab8e4b89fb33f`)
        .then(response => response.json())
        .then(data => {
            document.getElementById("weather").innerHTML = `
                <div class="weather-temp"> 
                    <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /> 
                    <p>${data.main.temp.toFixed(0)}&#8451;<p>
                </div>
                    <p class="weather-desc">${data.weather[0].description}<p>
                    <p id="weather-loc">🌍 ${data.name}</p>
            `
        })
}

function getTime(){
    let time = new Date()
    const dateOptions = { weekday: 'short', month: 'short', day: 'numeric' }
    const timeOptions = {timeStyle: "short"}
    document.getElementById("time").textContent = time.toLocaleTimeString("tr", timeOptions)
    document.getElementById("date").textContent = time.toLocaleDateString("tr", dateOptions)
}

function addLink(site) {
    return (`
    <div class="link">
        <img class="link-icon">
        <p class="link-title">
    </div>
`)
}

setInterval(getTime,1000)

function renderLinks() {
    let html = ``
    for (let link of Object.keys(links)){
        console.log(link)
        html += `
        <div class="link">
            <a href=${links[link].href} id=${link}>${links[link].icon}</a>
        </div>
        `
    }
    document.getElementById("links-tab").innerHTML = html
}

renderLinks()
