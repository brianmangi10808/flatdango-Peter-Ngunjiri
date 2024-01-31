
// const apiUrl2 = "/db.json";
// const movieList = document.querySelector(".movielist");

// document.addEventListener("DOMContentLoaded",  () => {
  
//     const movieDetailsContainer = document.getElementById('user-list');
//     let movieList = null;

    
//     fetch(apiUrl2)
//         .then(response => response.json())
//         .then(data => {
//             movieList = data.films;
//             if (movieList && movieList.length > 0) {
//                 displayMovies(movieList);
//             } else {
//                 console.error('Movie data not available.');
//             }
//         })
//         .catch(error => {
//             console.error('Error fetching movie details:', error);
//         });

    
//     function displayMovies(movies) {
//         movieDetailsContainer.innerHTML = '';

//         for (let i = 0; i < movies.length; i++) {
//             const movieData = movies[i];
//             const availableTickets = movieData.capacity - movieData.tickets_sold;

//             const movieDetails = `
//                 <div>
//                     <img src="${movieData.poster}" alt="${movieData.title} Poster" style="max-width: 100%">
//                     <h2>${movieData.title}</h2>
//                     <p>Runtime: ${movieData.runtime} minutes</p>
//                     <p>Showtime: ${movieData.showtime}</p>
//                     <p class="available-tickets">Available Tickets: ${availableTickets}</p>
//                     <p>${movieData.description}</p>
//                     <button type="button" class="buy" onclick="
//                         const availableTicketsElement = this.parentElement.querySelector('.available-tickets');
//                         const availableTickets = parseInt(availableTicketsElement.textContent.split(' ')[2]);
//                         if (availableTickets > 0) {
//                             availableTicketsElement.textContent = \`Available Tickets: \${availableTickets - 1}\`;
//                         } else {
//                             alert('No more tickets available!');
//                         }
//                     ">Buy Now</button>
//                 </div>
//             `;

//             movieDetailsContainer.innerHTML += movieDetails;
//         }
//     }
// });

const apiUrl2 = "/db.json";
const movieListContainer = document.querySelector(".movielist");
const movieDetailsContainer = document.getElementById('user-list');

document.addEventListener("DOMContentLoaded", async () => {
    loadFirstMovie();
    await loadMovieMenu();
});

async function loadFirstMovie() {
    fetch(apiUrl2)
        .then(response => response.json())
        .then(data => {
            const firstMovie = data.films[0];
            bindValues(firstMovie);
        })
        .catch(error => {
            console.error('Error fetching movie details:', error);
        });
}

async function loadMovieMenu() {
    const response = await fetch(apiUrl2);
    const data = await response.json();

    const movieTitles = data.films.map((movie) => movie.title);
    
    movieTitles.forEach((title) => {
        const li = document.createElement("li");
        li.textContent = title;
        movieListContainer.appendChild(li);

        li.addEventListener("click", () => {
            const selectedMovie = data.films.find((movie) => movie.title === title);
            bindValues(selectedMovie);
        });
    });
}

function bindValues(movieData) {
    const availableTickets = movieData.capacity - movieData.tickets_sold;

    const movieDetails = `
        <div>
            <img src="${movieData.poster}" alt="${movieData.title} Poster" style="max-width: 100%">
            <h2>${movieData.title}</h2>
            <p>Runtime: ${movieData.runtime} minutes</p>
            <p>Showtime: ${movieData.showtime}</p>
            <p class="available-tickets">Available Tickets: ${availableTickets}</p>
            <p>${movieData.description}</p>
            <button type="button" class="buy" onclick="
                const availableTicketsElement = this.parentElement.querySelector('.available-tickets');
                const availableTickets = parseInt(availableTicketsElement.textContent.split(' ')[2]);
                if (availableTickets > 0) {
                    availableTicketsElement.textContent = \`Available Tickets: \${availableTickets - 1}\`;
                } else {
                    alert('No more tickets available!');
                }
            ">Buy Now</button>
        </div>
    `;

    movieDetailsContainer.innerHTML = movieDetails;
}

