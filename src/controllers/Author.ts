import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Author from "../models/Author";

//CRUD functionality for Author
const createAuthor = (req: Request, res: Response, next: NextFunction) => {
  const author = new Author({
    _id: new mongoose.Types.ObjectId(),
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
const readAuthor = (req: Request, res: Response, next: NextFunction) => {
  const authorId = req.params.authorId;

  return Author.findById(authorId)
    .then((author) => {
      author
        ? res.status(200).json({ author })
        : res.status(404).json({ message: "Not Found" });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};
const readAll = (req: Request, res: Response, next: NextFunction) => {
  return Author.find()
    .then((authors) => {
      authors
        ? res.status(200).json({ authors })
        : res.status(404).json({ message: "Not Found" });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};
const updateAuthor = (req: Request, res: Response, next: NextFunction) => {
  const authorId = req.params.authorId;

  return Author.findById(authorId)
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
      } else {
        res.status(404).json({ message: "Not Found" });
      }
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};
const deleteAuthor = (req: Request, res: Response, next: NextFunction) => {
  const authorId = req.params.AuthorId;

  return Author.findByIdAndDelete(authorId)
    .then((author) => {
      author
        ? res.status(201).json({ message: "deleted" })
        : res.status(404).json({ message: "Not Found" });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export default {
  createAuthor,
  updateAuthor,
  readAll,
  readAuthor,
  deleteAuthor,
};
