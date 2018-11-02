import express from 'express';
import helmet from 'helmet';
import getFullLibrary from './routes/get-full-library';
import getSignedUrl from './routes/get-signed-track-url';
import config from './config';
import validateMetaDataRequest from './middleware/validate-metadata-request';
import getMetadata from './routes/get-metadata';
import AWS from 'aws-sdk';
import request from 'request-promise-native';

const s3 = new AWS.S3({apiVersion: '2006-03-01'});

/**
 * Set up all the middleware and routes.
 */
const app = express();

// Add security headers to avoid XSS
app.use(helmet());

// Add any dependencies to the request
app.use((req, res, next) => {
    req.config = config;
    req.s3 = s3;
    req.onwardRequest = request;
    next();
});

// Base route should respond with 200 useful for load balancers.
app.get('/', (req, res) => res.status(200).send());

// Get the full library including metadata
app.get('/tracks', getFullLibrary);

// Stream a specific track
app.get('/track/:id/stream', getSignedUrl);

// Search for the metadata for a track using query parameters
app.get('/track/metadata', validateMetaDataRequest, getMetadata);

// Catch all the errors
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
    console.error(err);
    res.status(500).send(err.message);
});

export default app;