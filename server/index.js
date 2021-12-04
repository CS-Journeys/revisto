import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import {connectToServer} from './db/connection.js';
import postRoutes from './routes/posts.js';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use('/api/posts', postRoutes)

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
