import express, { Application, Request, Response } from "express";
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { sequelizeConnection } from "./src/configs/db.config";

dotenv.config();

const app: Application = express();
const port = 5000;

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.get('/', (req: Request, res: Response) => {
    res.json({info: 'Testing Express js + Typescript and Postgres test reload'})
})

app.listen(port, async () => {
    console.log(`App running on port ${port}`)
    sequelizeConnection.authenticate().then(() => {
        console.log("Connected to database roomease")
    }).catch((err: any) => {
        console.log(err.message)
    })
})