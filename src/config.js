/**
 * Allow certain configuration to be changed via environment variables.
 */

if(!process.env.LAST_FM_KEY) {
    throw new Error('LAST_FM_KEY environment variable required');
}

const config = {
    PORT: process.env.PORT || 8000,
    LAST_FM_KEY: process.env.LAST_FM_KEY,
    S3_BUCKET: process.env.S3_BUCKET || 'pg-music'
};
export default config;