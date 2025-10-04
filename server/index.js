//Import Modules and Router
import express from 'express';
import cors from 'cors';
import NotificationRouter from './routes/NotificationRouter.js';

//Basic Config
const app = express();
const port = process.env.PORT || 3000;

//Settings and Routes of app
app.use(cors());
app.use(express.json());
app.use("/api/notifications", NotificationRouter)

//Run app
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})