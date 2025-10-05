//Import Modules and Router
import express from 'express';
import cors from 'cors';
import NotificationRouter from './routes/NotificationRouter.js';
import UserRouter from "./routes/UserRouter.js";
import WeatherRouter from "./routes/WeatherRouter.js";
import PostRouter from "./routes/PostRouter.js";

//Basic Config
const app = express();
const port = process.env.PORT || 3000;

//Settings and Routes of app
app.use(cors());
app.use(express.json());
app.use("/api/notifications", NotificationRouter)
app.use("/api/users", UserRouter)
app.use("/api/weather", WeatherRouter)
app.use("/api/posts", PostRouter)

//Run app
app.listen(port,  () => {
    console.log(`Listening on port ${port}`);
})