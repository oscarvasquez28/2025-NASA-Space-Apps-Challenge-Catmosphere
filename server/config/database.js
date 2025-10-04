import {Sequelize} from 'sequelize';

const dbConnection = new Sequelize(process.env.DB_NAME, process.env.USER_NAME, process.env.USER_PASSWORD, {
    host: "localhost",
    dialect: "mysql",
    port: 3306,
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