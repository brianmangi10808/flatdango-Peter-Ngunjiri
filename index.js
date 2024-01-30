// your_script.js

const apiUrl2 = "/db.json";

document.addEventListener("DOMContentLoaded", () => {
    // Fetch movie details
    fetch(apiUrl2)
        .then(response => response.json())
        .then(movieList => {
            if (movieList && movieList.length > 0) {
                const movieData = movieList[0];

                // Calculate available tickets
                const availableTickets = movieData.capacity - movieData.tickets_sold;

                // Update HTML content
                const movieDetailsContainer = document.getElementById('user-list');
                movieDetailsContainer.innerHTML = `
                    <img src="${movieData.poster}" alt="${movieData.title} Poster" style="max-width: 100%">
                    <h2>${movieData.title}</h2>
                    <p>Runtime: ${movieData.runtime} minutes</p>
                    <p>Showtime: ${movieData.showtime}</p>
                    <p>Available Tickets: ${availableTickets}</p>
                    <p>${movieData.description}</p>
                `;
            } else {
                console.error('Movie data not available.');
            }
        })
        .catch(error => {
            console.error('Error fetching movie details:', error);
        });
});
