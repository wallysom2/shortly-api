import express, {json} from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes/route";

const app = express();

dotenv.config();
app.use (json());
app.use (cors());

router.use(router)

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
