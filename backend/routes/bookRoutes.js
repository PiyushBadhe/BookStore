import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();

// Post Route for adding a new book in the database
router.post('/new-book', async (req, res) => {
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

// Get Route for getting a list of all books in the database
router.get('/get-books', async (req, res) => {
    try {
        const books = await Book.find({});

        return res.status(200).json({
            total_books: books.length,
            books_details: books,
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
})

// Get Route for getting book details by book id
router.get('/book/:id', async (req, res) => {
    try {

        const { id } = req.params;
        const book = await Book.findById(id);

        return res.status(200).json(book);

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
})

// Put Route for updating book details by book id
router.put('/update-book/:id', async (req, res) => {
    try {

        if (!req.body.title ||
            !req.body.author ||
            !req.body.publishYear) {
            return res.status(400).send({
                message: 'Provide all required input fields: title, author and publish year',
            });
        }

        const { id } = req.params;
        const result = await Book.findByIdAndUpdate(id, req.body);

        if (!result)
            return res.status(404).json({ message: "Book not found" });
        else
            return res.status(200).send({ message: "Book Updated Successfully" });

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
})

// Delete Route for deleting book details by book id
router.delete('/delete-book/:id', async (req, res) => {
    try {

        const { id } = req.params;
        const result = await Book.findByIdAndDelete(id);

        if (!result)
            return res.status(404).json({ message: "Book not found" });
        else
            return res.status(200).send({ message: "Book Delete Successfully" });

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
})

export default router;