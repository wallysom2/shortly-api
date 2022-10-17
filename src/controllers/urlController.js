import { nanoid } from "nanoid";

export async function shortenUrl (req, res) {
    const {id } = res.locals.user;
    const {url} = req.body;

    const numberChars = 8;
    const shortUrl = nanoid(numberChars);

    try {
        await urlRepo.createShortURL(url, shortUrl, id);
        res.sendStatus(201).send (shortUrl);
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export async function getURLById (req, res) {
}

export async function deleteURL (req, res) {
}

export async function openShortUrl (req, res) {
}