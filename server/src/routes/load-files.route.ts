import express from 'express';
import loadAllFiles from '../controllers/load-files/loadAllFiles.controller';

const loadFilesRoute = express();

// loadFilesRoute.get('/load-files', loadAllFiles);

export default loadFilesRoute;
