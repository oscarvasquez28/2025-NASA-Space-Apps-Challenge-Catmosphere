import {Sequelize} from 'sequelize';
import * as path from "node:path";
import * as fs from "node:fs";

const dbConnection = new Sequelize(process.env.DB_NAME, process.env.USER_NAME, process.env.USER_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: "mysql",
    port: process.env.DB_PORT,
    dialectOptions: {
        ssl: {
            ca: fs.readFileSync(path.resolve('./isrgrootx1.pem')).toString(),
            rejectUnauthorized: true
        }
    },
});

(async () => {
    try {
        await dbConnection.authenticate();
        console.log('Database connected successfully.');
    } catch (error) {
        console.error('Database connection failed:', error);
    }
})();

export default dbConnection;