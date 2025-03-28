import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function getMovies(req, res) {
  try {
    const dataPath = path.join(__dirname, '../data/movies.json');
    const raw = await fs.readFile(dataPath, 'utf-8');
    let movies = JSON.parse(raw);

    let { rating, genre } = req.query;
    let filtered = [...movies];

    // Filter by rating
    if (rating !== undefined) {
      const parsedRating = parseFloat(rating);
      if (isNaN(parsedRating) || parsedRating < 1 || parsedRating > 10) {
        return res.status(400).json({ error: 'Rating must be a number between 1 and 10.' });
      }
      filtered = filtered.filter(m => m.rating < parsedRating);
    }

    // Filter by genre (case-insensitive)
    if (genre !== undefined) {
      const lowerGenre = genre.toLowerCase();
      filtered = filtered.filter(m => m.genre.toLowerCase().includes(lowerGenre));
      if (filtered.length === 0) {
        return res.status(404).json({ error: `No movies found for genre "${genre}"` });
      }
    }

    // Sort by rating descending
    filtered.sort((a, b) => b.rating - a.rating);
    res.json(filtered);

  } catch (err) {
    res.status(500).json({ error: 'Could not load movie data.' });
  }
}
