import express from 'express';

import postTestsResultGoogleSheet from '../controllers/google/google-sheets/postTestsResultGoogleSheet.controller';
import postRegistrationGoogleSheet from '../controllers/google/google-sheets/postRegistrationGoogleSheet.controller';
import getGoogleSheetData from '../controllers/google/google-sheets/getGoogleSheetData.controller';
import { postRegistrationGoogleSheetValidator } from '../validators/google-sheet';
import postFeedBackGoogleSheet from '../controllers/google/google-sheets/postFeedBackGoogleSheet.controller';

const googleSheetRouer = express();

googleSheetRouer.post('/tests-results/send', postTestsResultGoogleSheet);
googleSheetRouer.post(
  '/registration/send',
  postRegistrationGoogleSheetValidator,
  postRegistrationGoogleSheet,
);
googleSheetRouer.post('/feed-back/send', postFeedBackGoogleSheet);

googleSheetRouer.get('/tests/data', getGoogleSheetData);

export default googleSheetRouer;
