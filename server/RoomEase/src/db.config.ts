//require('dotenv').config();
import { Sequelize } from "sequelize-typescript";
import User from "./models/user.model";
import config from "config";

const postgres = config.get<{
    host: string;
    port: number;
    user: string;
    password: string;
    database: string;
}>("postgresConfig")

// const host = process.env.PGHOST as string;
// const port = parseInt(process.env.PORT || "5432") as number;
// const username = process.env.PGUSER as string;
// const password = process.env.PGPASSWORD as string;
// const dbname = process.env.PGDATABSE as string;

export const sequelizeConnection = new Sequelize(postgres.database, postgres.user, postgres.password, {
    host: postgres.host,
    port: postgres.port,
    dialect: 'postgres',
    models: [User]
})