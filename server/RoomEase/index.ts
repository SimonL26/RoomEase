import express, { Application, Request, Response } from "express";
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { sequelizeConnection } from "./src/db.config";
import authRouter from "./src/routes/auth.route";

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
    res.json({info: 'Testing Express js + Typescript and Postgre + Sequelize'})
})

app.use("/auth", authRouter);

app.listen(port, () => {
    console.log(`App running on port ${port}`)
    sequelizeConnection.authenticate().then(async () => {
        console.log("Connected to database roomease")
        try {
            await sequelizeConnection.sync({force: true})
        } catch (error: any) {
            console.log(error.message)
        }
    }).catch((err: any) => {
        console.log(err.message)
    })
})