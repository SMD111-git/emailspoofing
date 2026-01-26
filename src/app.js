import express from "express";
import cors from "cors";
import Emailparser from "./controllers/Emailparser";
const app = express()
app.use (cors({
    origin:process.env.Cors_ORIGIN,
    credentials:true
}))
app.use(express.json({limit:"16kb"}))
app.use("/api/v1/email",Emailparser)
app.use()
export default app;