"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Author_1 = __importDefault(require("../models/Author"));
//CRUD functionality for Author
const createAuthor = (req, res, next) => {
    const author = new Author_1.default({
        _id: new mongoose_1.default.Types.ObjectId(),
        name: String,
    });
    return author
        .save()
        .then((author) => {
        res.status(201).json({ author });
    })
        .catch((error) => {
        res.status(500).json({ error });
    });
};
const readAuthor = (req, res, next) => {
    const authorId = req.params.authorId;
    return Author_1.default.findById(authorId)
        .then((author) => {
        author
            ? res.status(200).json({ author })
            : res.status(404).json({ message: "Not Found" });
    })
        .catch((error) => {
        res.status(500).json({ error });
    });
};
const readAll = (req, res, next) => {
    return Author_1.default.find()
        .then((authors) => {
        authors
            ? res.status(200).json({ authors })
            : res.status(404).json({ message: "Not Found" });
    })
        .catch((error) => {
        res.status(500).json({ error });
    });
};
const updateAuthor = (req, res, next) => {
    const authorId = req.params.authorId;
    return Author_1.default.findById(authorId)
        .then((author) => {
        if (author) {
            author.set(req.body);
            return author
                .save()
                .then((author) => {
                res.status(201).json({ author });
            })
                .catch((error) => {
                res.status(500).json({ error });
            });
        }
        else {
            res.status(404).json({ message: "Not Found" });
        }
    })
        .catch((error) => {
        res.status(500).json({ error });
    });
};
const deleteAuthor = (req, res, next) => {
    const authorId = req.params.AuthorId;
    return Author_1.default.findByIdAndDelete(authorId)
        .then((author) => {
        author
            ? res.status(201).json({ message: "deleted" })
            : res.status(404).json({ message: "Not Found" });
    })
        .catch((error) => {
        res.status(500).json({ error });
    });
};
exports.default = {
    createAuthor,
    updateAuthor,
    readAll,
    readAuthor,
    deleteAuthor,
};