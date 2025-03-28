import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import movieRouter from './routes/movieRouter.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3022;

// Middleware
app.use(express.json());

// Static files
app.use(express.static(path.join(__dirname, '../../public')));

// Use router
app.use('/api/movies', movieRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}/movie/index.html`);
});
