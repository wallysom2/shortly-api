import db from "./../database/db.js";

async function createShortURL (url, shortUrl, userId) {
return db.query("INSERT INTO urls (url, short_url, user_id) VALUES ($1, $2, $3) RETURNING *", [url, shortUrl, userId]);
}

async function getURLById (id) {
    return db.query("SELECT * FROM urls WHERE id = $1", [id]);
}

async function deleteURL (id) {
    return db.query("DELETE FROM urls WHERE id = $1", [id]);
}

async function getByShortURL (shortUrl) {
    return db.query("SELECT * FROM urls WHERE short_url = $1", [shortUrl]);
}

async function incrementCounter (id) {
    return db.query("UPDATE urls SET contador = contador + 1 WHERE id = $1", [id]);
}


const urlRepo = {
createShortURL,
getURLById,
deleteURL,
getByShortURL,
incrementCounter
}

export default urlRepo;