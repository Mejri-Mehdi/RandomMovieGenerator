document.addEventListener('DOMContentLoaded', () => {
    let generateButton = document.getElementById('generateButton');
    let movieDetailsContainer = document.getElementById('movieDetails');
    let btn=document.getElementById("generateButton");
	btn.addEventListener("click",getRandomMovie);
    

    function getRandomMovie() {
        let apiKey = 'd4928dccc05057f0d82b65ffc61ec2ef'; // Replace with your TMDb API key
        let genreId = Math.floor(Math.random() * 18) + 28; // Random genre between 28 and 45
        let url=`https://api.themoviedb.org/3/genre/${genreId}/movies?api_key=${apiKey}&language=en-US`;
        fetch(url)
            .then(response => response.json())
            .then(genreData => {
                if (genreData.results.length === 0) {
                    movieDetailsContainer.innerHTML = '<p>No movies found for this genre. Try again!</p>';
                    return;
                }

                let randomMovie = genreData.results[Math.floor(Math.random() * genreData.results.length)];

                let movieDetailsHTML = `
                    <h2>${randomMovie.title}</h2>
                    <img src="https://image.tmdb.org/t/p/w500${randomMovie.poster_path}" alt="${randomMovie.title} Poster">
                    <p>${randomMovie.overview}</p>
                    <p>Release Date: ${randomMovie.release_date}</p>
                    <p>Vote Average: ${randomMovie.vote_average}</p>
                `;
                movieDetailsContainer.innerHTML = movieDetailsHTML;
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                getRandomMovie();
            });
    }
});
