

/**
 * Retrieve the full music library from S3
 * @param {any} req express request object
 * @param {any} res express response object
 * @param {Function} next Function to move to next middleware
 * @returns {Promise} promise to run S3 action.
 */
async function getMetadata (req, res, next) {

    const track = req.query.track;
    const artist = req.query.artist;


    try {
        const metadata = await req.onwardRequest.get(`http://ws.audioscrobbler.com/2.0/?method=track.getInfo&track=${track}&artist=${artist}&api_key=${req.config.LAST_FM_KEY}&format=json`);
        const parsedData = JSON.parse(metadata);

        if(parsedData.error)
        {
            res.status(404).send(parsedData.message);
        } else {
            res.json(parsedData.track);
        }
    } catch (error) {
        next(error);
    }
}

export default getMetadata;

