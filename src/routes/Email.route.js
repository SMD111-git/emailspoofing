import { Router } from "express";
const router =Router()
router.route("/emailchecking").post(Emailparser)
export default router