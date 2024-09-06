import { Sequelize } from 'sequelize-typescript';
import * as dotenv from 'dotenv';

export const sequelize = new Sequelize({
    database: process.env.DB_NAME,
    dialect: 'mysql',
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    storage: process.env.DB_STORAGE,
    host: process.env.DB_HOST,
    models: [__dirname + process.env.DB_MODELS],
});