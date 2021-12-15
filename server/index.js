import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import passport from 'passport';

import db from './db/connection.js';
import postRoutes from './routes/postsRoutes.js';
import userRoutes from './routes/usersRoutes.js';
import UserDetails from './models/userModel.js';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

// Set up passport.js
passport.use(UserDetails.createStrategy({userNameField: 'email'}));
passport.serializeUser(UserDetails.serializeUser());
passport.deserializeUser(UserDetails.deserializeUser());

app.use(passport.initialize());

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
