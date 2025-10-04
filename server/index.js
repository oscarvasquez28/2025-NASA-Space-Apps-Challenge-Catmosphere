//Import Modules and Router
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

//Basic Config
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

//Settings and Routes of app
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to the NASA-Space App!');
})

//Run app
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})