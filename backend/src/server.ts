import express from 'express';
require('dotenv').config()
import { sequelize } from './util/database';
import { User } from './data/models/user';
import { getUsers } from './controllers/userController';

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200"); // update to match the domain you will make the request from
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, content-type");
    res.setHeader("Access-Controll-Allow-Credentials", 'true');
    next();
})

/**
 * @author Ömer Aynaci
 * @returns de users die opgeslagen zijn worden gereturnt (dit wordt later aangepast, dit is nu een dummy data)
 * de users die opgeslagen zijn worden opgehaald met een get request zoals hierboven wordt het later aangepst
 */
app.get('/users', async (req: express.Request, res: express.Response) => {
    const users = await getUsers();
    return res.status(200).json(users);
})


/**
 * @author Ömer Aynaci
 * hier wordt de model toegevoegd aan de database, de model wordt
 * als een table gezien in de database daarna wordt er gesynced met de database connectie
 */
try {
    sequelize.addModels([User]);
    sequelize.sync();
} catch (error) {
    console.log(error);
}


try {
    app.listen(port, (): void => {
        console.log(`Connected succesfully on port ${port}`);
    });
} catch (error: any) {
    console.log(`Error occured: ${error.message}`)
}