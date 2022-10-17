import { Router } from "express";
import { login} from "../controllers/registerController.js";
import {createUser} from "../controllers/userController.js";
import { validateSchema } from "../middlewares/schemaValidator.js";
import userSchema from "../schemas/userSchema.js";
import urlSchema from "../schemas/urlSchema.js";
import loginSchema from "../schemas/loginSchema.js";
import { shortenURL, getURLById, deleteURL, openShortUrl} from "../controllers/urlController.js";
import { validateToken } from "../middlewares/authValidator.js";
import { getRanking, getUserById } from "../controllers/userController.js";


const router = Router();

router.post("/signup", validateSchema (userSchema), createUser);
router.post("/signin", validateSchema (loginSchema), login);

urlsRouter.post("/urls/shorten", validateSchema(urlSchema), validateToken, shortenURL);
urlsRouter.get("/urls/:id", getURLById);
urlsRouter.delete("/urls/:id", validateToken, deleteURL);
urlsRouter.get('/urls/open/:shortUrl', openShortUrl);

router.get ("/users/me", validateToken, getUserById);
router.get ("/ranking", getRanking);


export default router;