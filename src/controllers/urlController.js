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
    const {id} = req.params;
    try {
     const urlresult = await urlRepo.getURLById(id);
     if (urlresult.rowCount === 0) {
         return res.sendStatus(404);
     }
        const [url] = urlresult.rows;
        delete url.user_id;
        delete url.contador;

        res.send (url);
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export async function deleteURL (req, res) {
    const {id} =  req.params;
    const {user} = res.locals;
    try {
        const urlResult = await urlRepo.getURLById(id);
        if (urlResult.rowCount === 0) {
            return res.sendStatus(404);
        }
        const [url] = urlResult.rows;
        if (url.user_id !== user.id) {
            return res.sendStatus(401);
        }
        await urlRepo.deleteURL(id);
        res.sendStatus(204);
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export async function openShortUrl (req, res) {
    const {shortUrl} = req.params;
    try {
        const urlResult = await urlRepo.getByShortURL(shortUrl);
        if (urlResult.rowCount === 0) {
            return res.sendStatus(404);
        }
        const [url] = urlResult.rows;
        await urlRepo.incrementCounter(url.id);
        res.redirect(url.url);
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}