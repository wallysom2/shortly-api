import bcrypt from "bcrypt";

import db from "./../database/db.js";

async function getUserByEmail (email) {
    const user = await db.query("SELECT * FROM users WHERE email = $1", [email]);
    return user;
}

async function createUser (name, email, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query ("INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *", [name, email, hashedPassword]);
}

async function getUserById (id) {
    const user = await db.query("SELECT * FROM users WHERE id = $1", [id]);
    return user;
}

const userRepo = {
    getUserByEmail,
    createUser,
    getUserById
}

export default userRepo;