const search = document.getElementById("search-input")
let watchlist = localStorage.getItem("watchlist")
let watchlistParsed = watchlist ? JSON.parse(watchlist) : {}

document.addEventListener("click", function(e) {
    if (e.target.id === "search-btn") {
        if(search.value) {
            render()
        }else {
            firstQuery()
        }
        search.value = ''
    } else if (e.target.dataset.add) {
        const movie = JSON.parse(e.target.dataset.add)
        if (watchlistParsed[movie.imdbID] != null) {
            removeFromList(movie.imdbID)
        } else {
            addToList(movie)
        }
        localStorage.setItem('watchlist',JSON.stringify(watchlistParsed))
    }
})

document.addEventListener("keypress", function(e){
    if (e.key === 'Enter') {
        if(search.value) {
            render()
        }else {
            firstQuery()
        }
        search.value = ''
    }
})

function removeFromList(movieTitle) {
    document.getElementById(`ar-${movieTitle}`).textContent = "Watchlist"
    document.getElementById(`arlogo-${movieTitle}`).src = "./img/addicon.png"
    delete watchlistParsed[movieTitle]
}

function addToList(movie) {
    watchlistParsed[movie.imdbID] = movie
    document.getElementById(`ar-${movie.imdbID}`).textContent = "Remove"
    document.getElementById(`arlogo-${movie.imdbID}`).src = "./img/removeicon.png"
}

function render() {
    fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=d031105a&s=${search.value}`)
    .then(response => response.json())
    .then(data => {
        document.getElementById("movie-list-container").innerHTML = ''
        if (data.Search){
            document.getElementById("no-data").style.display = "none"
            for(let i=0; i<data.Search.length; i++) {
                getMovieDetails(data.Search[i].imdbID).then(
                    movieDetails => {
                        document.getElementById("movie-list-container").innerHTML += getMovieCard(movieDetails) }
                )
            }
        } else {
            document.getElementById("no-data").style.display = "inline"
        }
    })
}

function getMovieCard(movie) {
    if (movie) {
        let movieJson = JSON.stringify(movie).replace(/'/g, "&#039;")
        function fixNA(property) {
            return property === "N/A" ? "" : property
        }
        return (`
        <div class="movie-card">
        <img class="poster no-margin" src="${movie.Poster === "N/A" ? './img/alt-poster.jpg' : movie.Poster}" alt="${fixNA(movie.Title)} poster">
            <div class="movie-info no-margin">
                <div class="title no-margin">
                    <h3 class="no-margin">${fixNA(movie.Title)}</h3>
                    <div class="rating no-margin">
                        <i class="fa fa-star no-margin"></i>
                        <p class="no-margin">${fixNA(movie.imdbRating)}</p>
                    </div>
                </div>
                <div class="details">
                    <div class="time-genre">
                        <p class="time">${fixNA(movie.Runtime)}</p> 
                        <p class="genre">${fixNA(movie.Genre)}</p>
                    </div>
                    <div class="add-to-list">
                        <img class="no-margin" id="arlogo-${movie.imdbID}" src=${watchlistParsed[movie.imdbID] ? "./img/removeicon.png" : "./img/addicon.png"} alt="add to watchlist icon" data-add='${movieJson}'>
                        <p class="no-margin"  id="ar-${movie.imdbID}" data-add='${movieJson}'>${watchlistParsed[movie.imdbID] ? "Remove" : "Watchlist"}</p>
                    </div>
                </div>
                <div class="summary no-margin">
                    <article class="no-margin">
                        ${fixNA(movie.Plot)}
                    </article>
                </div>
            </div>
        </div>
    `)
    }
    return ''
}

async function getMovieDetails(imdbID){
    let data = await fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=d031105a`)
    let movie = await data.json()               
    if (!movie.Error) {
        return movie
    } else {
        return false
    }
}


function firstQuery() {
    fetch("https://www.omdbapi.com/?i=tt3896198&apikey=d031105a&s=all")
        .then(response => response.json())
        .then(data => {
            for(let i=0; i<data.Search.length; i++) {
                getMovieDetails(data.Search[i].imdbID).then(
                    movieDetails => { document.getElementById("movie-list-container").innerHTML += getMovieCard(movieDetails) }
                )
            }
        })
}
firstQuery()