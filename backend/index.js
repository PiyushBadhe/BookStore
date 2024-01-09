import express from "express";
import { PORT, mongodbURL } from "./config.js";
import mongoose from "mongoose";
import bookRoutes from "./routes/bookRoutes.js";
import cors from "cors";
const app = express();

app.use('/books', bookRoutes);

app.use(express.json());

app.use(cors());

mongoose
    .connect(mongodbURL)
    .then(() => {
        console.log('Connected to db');
        app.listen(PORT, () => {
            console.log(`App is listening on port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log('Error occurred:', error);
    });

// Get Route for homepage
app.get('/', (req, res) => {
    return res.status(234).send('Welcome to the Book Store');
});