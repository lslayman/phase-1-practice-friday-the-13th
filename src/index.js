const movieList = document.querySelector("#movie-list")
const movieInfo = document.querySelector("#movie-info")
const movieImg = document.querySelector("#detail-image")
const movieTitle = document.querySelector("#title")
const releaseYear = document.querySelector("#year-released")
const movieDesc = document.querySelector("#description")
const watchedButton = document.querySelector("#watched")
const bloodAmount = document.querySelector("#amount")
const bloodForm = document.querySelector("#blood-form")
let globalMovie
let bloodDrops = 0

document.addEventListener("DOMContentLoaded", () =>{
    fetchData()
})

function fetchData() {
    fetch("http://localhost:3000/movies")
    .then((res) => res.json())
    .then((data) => {
        data.forEach((movie) => {
            displayImage(movie)
        })
        showDetails(data[0])
        updateWatchedStatus()
        addBloodDrops()
    })
}

function displayImage(movie) {
    let img = document.createElement("img")
    img.src = movie.image
    img.addEventListener('click', () => {
        showDetails(movie)
    })

    movieList.appendChild(img)
}

function showDetails(movie) {
    globalMovie = movie;

    movieImg.src = movie.image
    movieTitle.textContent = movie.title
    releaseYear.textContent = movie.release_year
    movieDesc.textContent = movie.description
    watchedButton.textContent = (movie.watched ? "Watched" : "Unwatched")
    bloodAmount.textContent = movie.blood_amount
}

function updateWatchedStatus() {
    watchedButton.addEventListener('click', () => {
        globalMovie.watched = !globalMovie.watched 
        watchedButton.textContent = globalMovie.watched ? "Watched" : "Unwatched"
    })
}

function addBloodDrops() {
    bloodForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const newDropsAmount = e.target["blood-amount"].value
    globalMovie.blood_amount += parseInt(newDropsAmount)

    document.querySelector("#amount").textContent = globalMovie.blood_amount
    
    e.target.reset()
})
}

