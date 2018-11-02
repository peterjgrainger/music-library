import app from './app';
import config from './config';
/**
 * Server specific configuration.  Starts the application.
 */
app.listen(config.PORT,
    () => console.log(`Music library API running on port ${config.PORT}.  Waiting for connections...`));