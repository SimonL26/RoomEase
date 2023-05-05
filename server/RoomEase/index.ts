import express, { Application, NextFunction, Request, Response } from "express";
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { sequelizeConnection } from "./src/db.config";
import authRouter from "./src/routes/auth.route";
import cookieParser from "cookie-parser";
import cors from "cors";
import testRoute from "./src/routes/test.route";
import AppError from "./src/utils/appError";

dotenv.config();

// app initialization
const app: Application = express();
const port = 5000;

//  Template engine
app.set("view engine", "pug");
app.set("views", `${__dirname}/src/views`)

// Middlewares
// Cors
app.use(cors({credentials: true}));

// Body parser
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

// cookie parser
app.use(cookieParser())

// Routes
app.use("/api/auth", authRouter);
app.use("/api/test", testRoute);

// Unhandled Routes
app.all("*", (req: Request, res: Response, next: NextFunction) => {
    next(new AppError(404, `Route ${req.originalUrl} not found`));
});

// Global Error handler
app.use(
    (error: AppError, req: Request, res: Response, next: NextFunction) => {
        error.status = error.status || 'error';
        error.statusCode = error.statusCode || 500;

        res.status(error.statusCode).json({
            status: error.statusCode,
            message: error.message
        });
    }
);

// app activation with DB connection
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