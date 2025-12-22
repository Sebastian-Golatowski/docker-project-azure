import  express  from "express";
import bodyParser from "body-parser";
import userRouter from "./routers/user.js"
import cors from "cors";

const app = express()
const PORT = 3001

app.use(cors({
    origin: function (origin, callback) {
        callback(null, true);
    },
    credentials: true 
}));

app.use(bodyParser.json());

app.use('/', userRouter)

app.get('/healthcheck',(req,res)=>{
    res.status(200).send('OK');
})

app.listen(PORT, () => {console.log(`working on port: ${PORT}`)})