import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import passport from 'passport';
import passportLocal from 'passport-local';
//import Session from 'express-session';

import db from './db/connection.js';
import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';
import UserDetails from './models/userModel.js';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

/** 
app.use(Session({
  secret: 'hahafunnysecret',
  resave: false,
  saveUninitialized: false
}));
*/

//Set up passport.js
let LocalStrategy = passportLocal.Strategy;
passport.use(UserDetails.createStrategy({userNameField: 'email'}));
passport.serializeUser(UserDetails.serializeUser());
passport.deserializeUser(UserDetails.deserializeUser());
app.use(passport.initialize());
//app.use(passport.session());

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
