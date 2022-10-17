import { nanoid } from "nanoid";
import urlsRepository from ".././repositories/urlRepository.js";

export async function shortenURL(req, res) {
  const { id } = res.locals.user;
  const { url } = req.body;
  
  const numbCaracters = 8;
  const shortURL = nanoid(numbCaracters);

  try {
    await urlsRepository.createShortURL(url, shortURL, id);
    res.status(201).send({shortURL});
  } 
  catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

export async function getURLById(req, res) {
    const { id } = req.params;
    
    try {
      const result = await urlsRepository.getURLById(id);
      if(result.rowCount === 0) {
        return res.sendStatus(404);
      }
    
      const [url] = result.rows;
    
      delete url.visitCount;
      delete url.userId;
    
      res.send(url);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500); 
    }
    
  }


export async function openShortUrl(req, res) {
  const { shortUrl } = req.params;
  try {
    const result = await urlsRepository.getByShortURL(shortUrl)
    if (result.rowCount === 0) {
      return res.sendStatus(404); 
    }
    const [url] = result.rows;
    await urlsRepository.incrementURLVisitCount(url.id);
    res.redirect(url.url);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

export async function deleteURL(req, res) {
    const { id } = req.params;
    const { user } = res.locals;
  
    try {
      const result = await urlsRepository.getURLById(id)
      if (result.rowCount === 0) {
        return res.sendStatus(404);
      }
    
      const [url] = result.rows;
      if(url.userId !== user.id) {
        return res.sendStatus(401); 
      }
    
      await urlsRepository.deleteURL(id);
      res.sendStatus(204);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  }