import  express  from "express";
import bodyParser from "body-parser";
import userRouter from "./routers/user.js"
import cors from "cors";

const app = express()
const PORT = 3002

app.use(cors({
    origin: [
        'http://localhost:5173', 
        'http://localhost',      
        'http://127.0.0.1'       
    ],
    credentials: true 
}));

app.use(bodyParser.json());

app.use('/', userRouter)

app.get('/healthcheck',(req,res)=>{
    res.status(200).send('OK');
})

app.listen(PORT, () => {console.log(`working on port: ${PORT}`)})