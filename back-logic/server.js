import  express  from "express";
import bodyParser from "body-parser";
import taskRouter from "./routers/task.js"
import cors from "cors";

const app = express()
const PORT = 3002

app.use(cors({
    origin: function (origin, callback) {
        callback(null, true);
    },
    credentials: true 
}));

app.use(bodyParser.json());

app.use('/', taskRouter)

app.get('/healthcheck',(req,res)=>{
    res.status(200).send('OK');
})

app.listen(PORT, () => {console.log(`working on port: ${PORT}`)})