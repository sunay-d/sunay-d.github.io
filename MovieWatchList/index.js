const search = document.getElementById("search-input")
let watchlist = localStorage.getItem("watchlist")
let watchlistParsed = JSON.parse(watchlist)

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
        if(!watchlist) {
            watchlistParsed = {}
        }

        if (watchlistParsed[movie.Title] != null) {
            removeFromList(movie.Title)
        } else {
            addToList(movie)
        }
        localStorage.setItem('watchlist',JSON.stringify(watchlistParsed))
    }
})

function removeFromList(movieTitle) {
    document.getElementById(`ar-${movieTitle}`).textContent = "Watchlist"
    document.getElementById(`arlogo-${movieTitle}`).src = "./img/addicon.png"
    delete watchlistParsed[movieTitle]
}

function addToList(movie) {
    watchlistParsed[movie.Title] = movie
    document.getElementById(`ar-${movie.Title}`).textContent = "Remove"
    document.getElementById(`arlogo-${movie.Title}`).src = "./img/removeicon.png"
}

function render() {
    fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=d031105a&s=${search.value}`)
    .then(response => response.json())
    .then(data => {
        document.getElementById("movie-list-container").innerHTML = ''
        if (data.Search){
            document.getElementById("no-data").style.display = "none"
            for(let i=0; i<data.Search.length; i++) {
                getMovieDetails(data.Search[i].Title).then(
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
        function checkNA(property) {
            return property === "N/A" ? "" : property
        }
        return (`
        <div class="movie-card">
        <img class="poster no-margin" src="${movie.Poster === "N/A" ? './img/alt-poster.jpg' : movie.Poster}" alt="${movie.Title} poster">
            <div class="movie-info no-margin">
                <div class="title no-margin">
                    <h3 class="no-margin">${checkNA(movie.Title)}</h3>
                    <div class="rating no-margin">
                        <i class="fa fa-star no-margin"></i>
                        <p class="no-margin">${checkNA(movie.imdbRating)}</p>
                    </div>
                </div>
                <div class="details">
                    <div class="time-genre">
                        <p class="time">${checkNA(movie.Runtime)}</p> 
                        <p class="genre">${checkNA(movie.Genre)}</p>
                    </div>
                    <div class="add-to-list">
                        <img class="no-margin" id="arlogo-${movie.Title}" src=${watchlistParsed[movie.Title] ? "./img/removeicon.png" : "./img/addicon.png"} alt="add to watchlist icon" data-add='${movieJson}'>
                        <p class="no-margin"  id="ar-${movie.Title}" data-add='${movieJson}'>${watchlistParsed[movie.Title] ? "Remove" : "Watchlist"}</p>
                    </div>
                </div>
                <div class="summary no-margin">
                    <article class="no-margin">
                        ${checkNA(movie.Plot)}
                    </article>
                </div>
            </div>
        </div>
    `)
    }
    return ''
}

async function getMovieDetails(title){
    let data = await fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=d031105a&t=${title}`)
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
                getMovieDetails(data.Search[i].Title).then(
                    movieDetails => { document.getElementById("movie-list-container").innerHTML += getMovieCard(movieDetails) }
                )
            }
        })
}
firstQuery()