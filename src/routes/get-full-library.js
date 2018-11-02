/**
 * Retrieve the full music library from S3
 * @param {any} req express request object
 * @param {any} res express response object
 * @param {Function} next call to go to next middleware
 * @returns {Promise} promise to run S3 action.
 */
async function getFullLibrary (req, res, next) {

    const params = {
        Bucket: req.config.S3_BUCKET
    };

    try {
        const s3Objects = await req.s3.listObjects(params).promise();
        const allTracks = s3Objects.Contents.map(object => ({
            id: encodeURIComponent(object.Key),
            artist: object.Key.split('/')[0],
            album: object.Key.split('/')[1],
            track: object.Key.split('/')[2].replace('.mp3', '')
        }));
        return res.json(allTracks);
    } catch (error) {
        next(error);
    }
}

export default getFullLibrary;