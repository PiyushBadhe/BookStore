import express from "express";
import { PORT, mongodbURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
const app = express();

app.use(express.json());

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

app.get('/', (req, res) => {
    return res.status(234).send('Started');
});

app.post('/new-book', async (req, res) => {
    try {
        if (!req.body.title ||
            !req.body.author ||
            !req.body.publishYear) {
            return res.status(400).send({
                message: 'Provide all required input fields: title, author and publish year',
            });
        }
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear,
        };

        const book = await Book.create(newBook);

        return res.status(201).send(book);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
})

app.get('/get-books', async (req, res) => {
    try {
        const books = await Book.find({});

        return res.status(200).json({
            total_books : books.length,
            books_details: books,
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
})