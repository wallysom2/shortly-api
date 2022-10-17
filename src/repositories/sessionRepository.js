import bcrypt from "bcrypt";

import db from "./../database/db.js";

async function createSession (user, token) {

    await db.query ("INSERT INTO sessions (token, user_id) VALUES ($1, $2) RETURNING *", [token, user.id]);

}

async function getSession (token) {

    const session = await db.query ("SELECT * FROM sessions WHERE token = $1", [token]);

    return session;

}

const sessionRepo = {
    createSession,
    getSession
}

export default sessionRepo;