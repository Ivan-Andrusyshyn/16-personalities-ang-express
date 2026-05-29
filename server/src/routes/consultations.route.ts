import express from 'express';

import getBenefitConsultation from '../controllers/consultations/get-benefit-consultation.controller';

const consultationRoute = express();

consultationRoute.get('/benefit', getBenefitConsultation);

export default consultationRoute;
