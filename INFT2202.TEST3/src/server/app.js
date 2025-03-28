import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import movieRouter from './routes/movieRouter.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3022;

// Parse JSON requests
app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, '../../public')));

// Use the movieRouter for /api/movies
app.use('/api/movies', movieRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
