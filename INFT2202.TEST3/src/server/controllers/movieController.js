import movies from '../data/movies.json' assert { type: 'json' };

export function getMovies(req, res) {
  let { rating, genre } = req.query;
  let result = [...movies];

  // Filter by rating
  if (rating !== undefined) {
    const parsedRating = parseFloat(rating);
    if (isNaN(parsedRating) || parsedRating < 1 || parsedRating > 10) {
      return res.status(400).json({ error: 'Rating must be a number between 1 and 10.' });
    }
    result = result.filter(movie => movie.rating < parsedRating);
  }

  // Filter by genre (case-insensitive)
  if (genre !== undefined) {
    const lowerGenre = genre.toLowerCase();
    result = result.filter(movie => movie.genre.toLowerCase().includes(lowerGenre));
    if (result.length === 0) {
      return res.status(404).json({ error: `No movies found for genre "${genre}"` });
    }
  }

  // Sort from highest rated to lowest
  result.sort((a, b) => b.rating - a.rating);

  res.json(result);
}
