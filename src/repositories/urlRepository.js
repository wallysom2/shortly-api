import db from "./../database/db.js";

async function createShortURL (url, shortUrl, userId) {
return db.query("INSERT INTO urls (url, short_url, user_id) VALUES ($1, $2, $3) RETURNING *", [url, shortUrl, userId]);
}

const urlRepo = {
createShortURL
}

export default urlRepo;