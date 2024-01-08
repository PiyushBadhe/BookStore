import express from "express";
import { PORT, mongodbURL } from "./config.js";
import mongoose from "mongoose";
const app = express();

app.get('/', (req, res) => {
    return res.status(234).send('Started');
});

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