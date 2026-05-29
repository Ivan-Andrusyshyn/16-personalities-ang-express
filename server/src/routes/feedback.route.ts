import express from 'express';
//

import {
  createTestFeedback,
  getAllTestsFeedbacks,
} from '../controllers/feedback/test-feedback.controller';
//

const feedbackRouter = express();

feedbackRouter.post('/test', createTestFeedback);
feedbackRouter.get('/tests/feedbacks', getAllTestsFeedbacks);

export default feedbackRouter;
