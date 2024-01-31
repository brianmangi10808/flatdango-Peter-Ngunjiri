
const apiUrl2 = "/db.json";

document.addEventListener("DOMContentLoaded", () => {
    // Fetch movie details
    fetch(apiUrl2)
        .then(response => response.json())
        .then(movieList => {
            if (movieList && movieList.films.length > 0) {
                const movieDetailsContainer = document.getElementById('user-list');

                for (let i = 0; i < movieList.films.length; i++) {
                    const movieData = movieList.films[i];

                    // Calculate available tickets
                    const availableTickets = movieData.capacity - movieData.tickets_sold;

                    // Create HTML content
                    const movieDetails= `
                        <div>
                            <img src="${movieData.poster}" alt="${movieData.title} Poster" style="max-width: 100%">
                            <h2>${movieData.title}</h2>
                            <p>Runtime: ${movieData.runtime} minutes</p>
                            <p>Showtime: ${movieData.showtime}</p>
                            <p>Available Tickets: ${availableTickets}</p>
                            <p>${movieData.description}</p>
                        </div>
                    `;

                    // Add movie details to container
                    movieDetailsContainer.innerHTML += movieDetails;
                }
            } else {
                console.error('Movie data not available.');
            }
        })
        .catch(error => {
            console.error('Error fetching movie details:', error);
        });
});
