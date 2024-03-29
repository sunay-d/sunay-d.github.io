
let watchlist = localStorage.getItem("watchlist")
let watchlistParsed = watchlist ? JSON.parse(watchlist) : {}

function renderWatchlist() {
    let html = ''
    function fixNA(property) {
        return property === "N/A" ? "" : property
    }
    if (Object.keys(watchlistParsed).length > 0) {
        for (let movie of Object.values(watchlistParsed)){
            let movieJson = JSON.stringify(movie).replace(/'/g, "&#039;")
            html += `    
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
                            <img class="no-margin" src="./img/removeicon.png"  alt="add to watchlist icon" data-remove='${movieJson}'>
                            <p class="no-margin" data-remove='${movieJson}'>Remove</p>
                        </div>
                    </div>
                    <div class="summary no-margin">
                        <article class="no-margin">
                            ${fixNA(movie.Plot)}
                        </article>
                    </div>
                </div>
            </div>`
        }
    } else {
        html = `
        <div class="empty-list">
            <p>Your watchlist looking a little empty...</p>
            <a href="./index.html"><img src="./img/addicon.png"> Let's add some movies</a>
        </div>
        `
    }
    document.getElementById("watchlist-container").innerHTML = html
}

document.addEventListener("click", function(e) {
    if(e.target.dataset.remove) {
        const movie = JSON.parse(e.target.dataset.remove)
        removeFromList(movie)   
    }
})

function removeFromList(movie) {
    delete watchlistParsed[movie.imdbID]
    localStorage.setItem("watchlist", JSON.stringify(watchlistParsed))
    renderWatchlist()
}

renderWatchlist()
