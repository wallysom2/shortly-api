import bcrypt from "bcrypt";

import db from "./../database/db.js";

async function getUser (email) {
    const user = await db.query("SELECT * FROM users WHERE email = $1", [email]);
    return user;
}

async function createUser (name, email, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query ("INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *", [name, email, hashedPassword]);
}


const userRepo = {
    getUser,
    createUser
}

export default userRepo;