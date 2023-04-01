import express, { Express, Request, Response } from "express";
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
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

app.listen(port, () => {
    console.log(`App running on port ${port}`)
})