
function renderWatchlist() {
    let watchlist = JSON.parse(localStorage.getItem('watchlist'))
    let html = ''
    for (let movie of Object.values(watchlist.movies)){
        let movieJson = JSON.stringify(movie).replace(/'/g, "&#039;")
        html += `    
        <div class="movie-card">
        <img class="poster no-margin" src="${movie.Poster}" alt="${movie.Title} poster">
            <div class="movie-info no-margin">
                <div class="title no-margin">
                    <h3 class="no-margin">${movie.Title}</h3>
                    <div class="rating no-margin">
                        <i class="fa fa-star no-margin"></i>
                        <p class="no-margin">${movie.imdbRating}</p>
                    </div>
                </div>
                <div class="details">
                    <div class="time-genre">
                        <p class="time">${movie.Runtime }</p> 
                        <p class="genre">${movie.Genre}</p>
                    </div>
                    <div class="add-to-list">
                        <img class="no-margin" src="./img/removeicon.png"  alt="add to watchlist icon" data-remove='${movieJson}'>
                        <p class="no-margin" data-remove='${movieJson}'>Remove</p>
                    </div>
                </div>
                <div class="summary no-margin">
                    <article class="no-margin">
                        ${movie.Plot}
                    </article>
                </div>
            </div>
        </div>`
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
    let watchlist = JSON.parse(localStorage.getItem("watchlist"))
    delete watchlist.movies[movie.Title]
    localStorage.setItem("watchlist", JSON.stringify(watchlist))
    renderWatchlist()
}

renderWatchlist()