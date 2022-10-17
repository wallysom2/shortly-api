export function validateSchema (schema) {
    return (req, res, next) => {
        const {error} = schema.validate(req.body, {abortEarly: false});
        error ? res.status(422).json({error: error.details[0].message}) : next();
    }
}