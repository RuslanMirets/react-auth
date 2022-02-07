import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import routes from './routes';

// Midleware
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan('dev'));
app.use(cookieParser());

// Routes
app.use('/api', routes.authRouter);

// Database
import './config/database';

// Server listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Server started on port', 5000));
