import express from 'express';
//

//
import {
  checkStatusPayment,
  clientInfo,
  createPayment,
  getWebhook,
  setWebhook,
} from '../controllers/payment/monopay.controller';
import { checkPaymentMiddleware } from '../middleware/checkPayment.middleware';
import getBills from '../controllers/payment/get-bills.controller';

const monoRouter = express.Router();

monoRouter.post('/create-payment', createPayment);
monoRouter.get('/check-status', checkPaymentMiddleware, checkStatusPayment);

monoRouter.get('/client-info', clientInfo);
monoRouter.post('/set-webhook', setWebhook);
monoRouter.post('/get-webhook', getWebhook);

monoRouter.get('/get-bills', getBills);

export default monoRouter;
