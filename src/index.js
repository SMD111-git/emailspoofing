import dotenv from  "dotenv"
import app from "./app.js"
import { connect } from "db"

dotenv.config({
    path:'./.env'
})
//connectDB()
.then(()=>{
    app.on("error",(error)=>{
        console.log("error",err);
        throw(err)
    })
    app.listen(process.env.PORT || 8000)
    console.log(`sever is run at :${process.env.PORT}`);
    
})
.catch((err)=>{
    console.log("error db connection falied",err);
    
})