import { Router } from "express";
import { registerUser, login} from "../controllers/registerController.js";
import { validateSchema } from "../middlewares/schemaValidator.js";
import userSchema from "../schemas/userSchema.js";
import loginSchema from "../schemas/loginSchema.js";

const router = Router();

router.post("/signup", validateSchema (userSchema), registerUser);
router.post("/signin", validateSchema (loginSchema), login);
router.post ("/urls/shorten", validateSchema(urlSchema), validateToken, shortenURL);
router.get ("/urls/:id", getURLById);
router.delete ("/urls/:id", validateToken, deleteURL);
router.get ("urls/open/:shortURL", openShortUrl);


export default router;