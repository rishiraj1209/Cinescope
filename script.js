// REPLACE THIS WITH YOUR OWN API KEY
const API_KEY = "fdbfa5f"; 
const BASE_URL = "https://www.omdbapi.com/";

async function searchMovies() {
    const query = document.getElementById("searchInput").value.trim();
    if (!query) {
        alert("Please enter a movie name!");
        return;
    }

    const url = `${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(query)}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.Response === "True") {
            displayMovies(data.Search);
        } else {
            document.getElementById("movies").innerHTML = `<p>No movies found!</p>`;
        }
    } catch (error) {
        console.error("Error fetching movies:", error);
    }
}

async function displayMovies(movies) {
    const movieContainer = document.getElementById("movies");
    movieContainer.innerHTML = "";

    for (let movie of movies) {
        const details = await fetch(`${BASE_URL}?apikey=${API_KEY}&i=${movie.imdbID}`).then(res => res.json());

        const card = document.createElement("div");
        card.classList.add("movie-card");
        card.innerHTML = `
            <img src="${details.Poster !== "N/A" ? details.Poster : "https://via.placeholder.com/200"}" alt="${details.Title}">
            <div class="movie-title">${details.Title}</div>
            <div class="movie-year">${details.Year}</div>
            <p>${details.Plot && details.Plot !== "N/A" ? details.Plot : "No plot available."}</p>
            <p><strong>IMDB Rating:</strong> ${details.imdbRating || "N/A"}</p>
        `;
        movieContainer.appendChild(card);
    }
}
