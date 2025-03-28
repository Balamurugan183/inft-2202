// Follow the README.md to set up the rest of this file.



/*
 *  fetchMovies
 *  This should take two parameters
 *  -   The genre you want to filter by, defaults to null
 *  -   The rating you want to filter by, defaults to null
 *  It should return a list a movies
 *  It should throw an error if something went wrong
 *  You need to use the following classes: URLSearchParams, URL, Headers, and Request.
 */



/*
 *  insertMoviesIntoTable
 *  This should take two parameters
 *  - a reference to the table you want to populate
 *  - a list of movies to put in the table
 *  It should return nothing
 */
    // use the reference to the table to get a reference to the tbody
    // empty the table first
    // for each movie
        // insert a row into your table element
        // insert a cell for each attribute of a movie
        // the datetime is a "unix timestamp", measured in seconds.  
        // javascript dates are measured in milliseconds.
        // convert this timestamp to a javascript date and print out the date as a normal string
        // if a movie is rated two or below, make this row red
        // if this movie is rated higher than two but less than or equal to five, make this row orange
        // if this movie is rated higher than five but less than or equal to 8, make this row blue
        // if this movie is rated higher than eight, make this row green
// Set footer with name and year
document.querySelector('footer').textContent = `© Shrihari Krishna - ${new Date().getFullYear()}`;

// Fetch movies
async function fetchMovies(genre = null, rating = null) {
  try {
    const params = new URLSearchParams();
    if (genre) params.append('genre', genre);
    if (rating) params.append('rating', rating);

    const res = await fetch(`/api/movies?${params.toString()}`);
    if (!res.ok) throw new Error(await res.text());
    return await res.json();
  } catch (err) {
    throw new Error(`Fetch error: ${err.message}`);
  }
}

// Populate table
function insertMoviesIntoTable(table, movies) {
  const tbody = table.querySelector('tbody');
  tbody.innerHTML = '';

  movies.forEach(movie => {
    const row = document.createElement('tr');

    ['title', 'genre', 'rating'].forEach(key => {
      const td = document.createElement('td');
      td.textContent = movie[key];
      row.appendChild(td);
    });

    const date = new Date(movie.datetime * 1000).toLocaleDateString();
    const dateTd = document.createElement('td');
    dateTd.textContent = date;
    row.appendChild(dateTd);

    // Color row based on rating
    if (movie.rating <= 2) row.style.backgroundColor = 'red';
    else if (movie.rating <= 5) row.style.backgroundColor = 'orange';
    else if (movie.rating <= 8) row.style.backgroundColor = 'blue';
    else row.style.backgroundColor = 'green';

    tbody.appendChild(row);
  });
}

// Filter handler
const genreSelect = document.querySelector('#genre');
const ratingSelect = document.querySelector('#rating');
const table = document.querySelector('table');
const error = document.querySelector('#error');

async function handleFilters() {
  const genre = genreSelect.value || null;
  const rating = ratingSelect.value || null;

  try {
    const movies = await fetchMovies(genre, rating);
    if (movies.length) {
      error.textContent = '';
      table.style.display = '';
      insertMoviesIntoTable(table, movies);
    } else {
      table.style.display = 'none';
      error.textContent = 'There are no movies in the database that match your filters.';
    }
  } catch (err) {
    table.style.display = 'none';
    error.textContent = err.message;
  }
}

genreSelect.addEventListener('change', handleFilters);
ratingSelect.addEventListener('change', handleFilters);
