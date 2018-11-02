import Joi from 'joi';

/**
 * Validate the input query parameters for the metadata request
 * @param {any} req express request object
 * @param {any} res express response object
 * @param {Function} next Function to move to next middleware
 * @returns {void} promise to run S3 action.
 */
function validateMetaDataRequest (req, res, next) {

    const schema = {
        track: Joi.string().min(1).max(80).required(),
        artist: Joi.string().min(1).max(100).required()
    };

    const {error} = Joi.validate(req.query, schema);

    if(error) {
        console.error(error);
        res.status(422).send(error.details.map(value => value.message).join(','));
    } else {
        next();
    }
}

export default validateMetaDataRequest;

