import bcrypt from "bcrypt";

import db from "./../database/db.js";

async function createSession (user, token) {

    await db.query ("INSERT INTO sessions (token, user_id) VALUES ($1, $2) RETURNING *", [token, user.id]);

}


const sessionRepo = {
    createSession
}

export default sessionRepo;