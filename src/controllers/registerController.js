import userRepo from "./../repositories/userRepository.js";
import { v4 as uuid } from "uuid";


export async function registerUser(req, res) {
const newUser = req.body;
try {
    const emailResult = await userRepo.getUser(newUser.email);
    if (emailResult.rowCount > 0) {
        return res.status(409)
    }

    const {name, email, password} = newUser;
    await userRepo.createUser(name, email, password);
    res.status(201);
    
} catch (error) {
    console.log(error);
    res.status(500) 
}

const {error} = userSchema.validate(newUser, {abortEarly: false});
error ? res.status(422).json({error: error.details[0].message}) : res.status(200);

}

export async function login(req, res) {
    const {email, password} = req.body;
    try {
        const {rows: users} = await userRepo.getUser(email);
        const [user] = users;
        if (!user) {
            return res.status(401);
        }
        if (bcrypt.compareSync(password, user.password)) {
            const token = uuid();
            await sessionRepo.createSession(user, token);
            res.status(200);

        }
    }
    catch (error) {
        console.log(error);
        res.status(500);
    }
}
