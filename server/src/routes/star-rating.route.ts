import express, { NextFunction, Request, Response } from 'express';

// ===
import getRating from '../controllers/star-rating/get-rating.controller';
import addRating from '../controllers/star-rating/add-rating.controller';

const starRatingRoute = express();

starRatingRoute.get('/tests/:testName', getRating);

starRatingRoute.post('/tests', addRating);

export default starRatingRoute;
