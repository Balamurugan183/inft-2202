// import the express library
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import movies from './data/movies.json' assert { type: 'json' };

// Get __dirname equivalent in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// set the port for the server
const PORT = 3022;

// create a new server instance
const app = express();

// configure the body renderer to parse json inputs
app.use(express.json());

// serve static files from client folder
app.use(express.static(path.join(__dirname, '../client')));

// serve node_modules scripts
app.use('/scripts', express.static(path.join(__dirname, '../../node_modules')));

// create a router
const router = express.Router();

// handle GET /api/movies
router.get('/api/movies', (req, res) => {
    let { rating, genre } = req.query;
    let filteredMovies = [...movies];

    if (rating !== undefined) {
        const parsedRating = parseFloat(rating);
        if (isNaN(parsedRating) || parsedRating < 1 || parsedRating > 10) {
            return res.status(400).json({ error: 'Rating must be a number between 1 and 10' });
        }
        filteredMovies = filteredMovies.filter(movie => movie.rating < parsedRating);
    }

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

    filteredMovies.sort((a, b) => b.rating - a.rating);
    res.json(filteredMovies);
});

// mount router
app.use(router);

// start server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
