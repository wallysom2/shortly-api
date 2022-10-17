import { Router } from "express";
import { registerUser } from "../controllers/registerController.js";
import { validateSchema } from "../middlewares/schemaValidator.js";
import userSchema from "../schemas/userSchema.js";

const router = Router();

router.post("/signup", validateSchema (userSchema), registerUser);
    
router.post("/signin");

export default router;