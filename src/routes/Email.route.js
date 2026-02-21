import { Router } from "express";
import Emailparser from "../controllers/Emailparser.js";

const router = Router();

router.route("/emailchecking").post(Emailparser);

export default router;