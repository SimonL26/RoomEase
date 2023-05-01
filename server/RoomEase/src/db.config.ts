import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
import User from "./models/user.model";

dotenv.config();

const host = process.env.PGHOST as string;
const port = parseInt(process.env.PORT || "5432") as number;
const username = process.env.PGUSER as string;
const password = process.env.PGPASSWORD as string;
const dbname = process.env.PGDATABSE as string;

export const sequelizeConnection = new Sequelize(dbname, username, password, {
    host: host,
    port: port,
    dialect: 'postgres',
    models: [User]
})