


export async function registerUser(req, res) {
const newUser = req.body;


const {error} = userSchema.validate(newUser, {abortEarly: false});
error ? res.status(422).json({error: error.details[0].message}) : res.status(200);

}
