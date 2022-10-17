import sessionRepo from "../repositories/sessionRepository";


export async function validateToken (req, res, next) {
const authorization = req.headers.authorization;
const token = authorization?.replace("Bearer ", "");
if (!token) {
    return res.sendStatus(401).json({error: "Token não encontrado"});
}
try {
    const {rows: sessions} = await sessionRepo.getSession(token);
    const [session] = sessions;
    if (!session) {
        return res.sendStatus(401)
    }

  const {rows : users} = await userRepo.getUserById(session.user_id);
    const [user] = users;
    if (!user) {
        return res.sendStatus(401)
    }

    res.locals.user = user;
    next();
    
} catch (error) {
    console.log(error);
    res.sendStatus(500);
}
}