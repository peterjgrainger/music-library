/**
 * Get the signed URL from S3 for the track
 * @param {any} req express request object
 * @param {any} res express response object
 * @returns {Promise} promise to run S3 action.
 */
function getSignedUrl (req, res) {

    const params = {
        Bucket: req.config.S3_BUCKET,
        Key: decodeURIComponent(req.params.id),
        Expires: 60 * 10
    };
    const url = req.s3.getSignedUrl('getObject', params);
    return res.send(url);
}

export default getSignedUrl;

