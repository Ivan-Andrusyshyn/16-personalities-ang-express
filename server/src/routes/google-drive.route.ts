import express from 'express';

import getGoogleDriveFile from '../controllers/google/google-drive/getGoogleDriveFile.controller';

const googleDrive = express();

googleDrive.get('/tests/16-personalities/results', getGoogleDriveFile);

export default googleDrive;
