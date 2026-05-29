import express from 'express';

import socialLinksCounter from '../controllers/counter/social-links-counter.controller';
import getAllClicksData from '../controllers/counter/get-all-clicks-data.controller';

const counterRoute = express();

counterRoute.post('/social-links', socialLinksCounter);
counterRoute.get('/social-links', getAllClicksData);

export default counterRoute;
