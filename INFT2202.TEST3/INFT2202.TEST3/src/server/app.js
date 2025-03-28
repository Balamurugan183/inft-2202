// import the express library
const express = require('express');

// set the port for the server, use 3022
const PORT = 3022;

// create a new server instance
const app = express();

// configure the body renderer to parse json inputs
app.use(express.json());

// automatically serve static assets from the client folder
app.use(express.static('client'));

// automatically serve static assets from the node_modules folder
app.use('/scripts', express.static('node_modules'));

// create a new router instance
const router = express.Router();

// import the movie data
const movies = require('./data/movies.json');

// create a new route and route handler
router.get('/api/movies', (req, res) => {
    let { rating, genre } = req.query;
    let filteredMovies = [...movies];

    // Check and filter by rating
    if (rating !== undefined) {
        const parsedRating = parseFloat(rating);
        if (isNaN(parsedRating) || parsedRating < 1 || parsedRating > 10) {
            return res.status(400).json({ error: 'Rating must be a number between 1 and 10' });
        }
        filteredMovies = filteredMovies.filter(movie => movie.rating < parsedRating);
    }

    // Check and filter by genre (case-insensitive)
    if (genre !== undefined) {
        const genreLower = genre.toLowerCase();
        const genreMatches = filteredMovies.filter(movie =>
            movie.genre.toLowerCase().includes(genreLower)
        );
        if (genreMatches.length === 0) {
            return res.status(404).json({ error: `No movies found for genre "${genre}"` });
        }
        filteredMovies = genreMatches;
    }

    // Sort movies from highest rated to lowest
    filteredMovies.sort((a, b) => b.rating - a.rating);

    res.json(filteredMovies);
});

// configure the server to use your new router instance
app.use(router);

// start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
