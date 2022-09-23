import express from "express";
import http from "http";
import mongoose from "mongoose";
import { config } from "./config/config";
import Logging from "./library/Loging";
import AuthorRoutes from "./routes/Author";
import BookRoutes from "./routes/Book";
const router = express();

mongoose
  .connect(config.mongo.url)
  .then(() => {
    Logging.info("connected");
    StartServer();
  })
  .catch((err) => {
    Logging.error(err);
  });

const StartServer = () => {
  // Log the request.
  router.use((req, res, next) => {
    Logging.info(
      `Incomming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}]`
    );
    res.on("finish", () => {
      Logging.info(
        `Incomming => Method: [${req.method}] - Url: [${req.url}] - IP [${req.socket.remoteAddress}] - Status: [${res.statusCode}]`
      );
    });
    next();
  });

  router.use(express.urlencoded({ extended: true }));
  router.use(express.json());

  //Api rules
  router.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, content-Type, Accept, Authorization"
    );
    if (req.method == "OPTIONS") {
      res.header(
        "Access-Control-Allow-Methods",
        "PUT, POST, PATCH, DELETE, GET"
      );
      return res.status(200).json({});
    }
    next();
  });

  //Routes
  router.use("/authors", AuthorRoutes);
  router.use("/books", BookRoutes);

  //Pinging
  router.get("/ping", (req, res) => {
    res.status(200).json({ message: "ping" });
  });

  // error handling
  router.use((req, res) => {
    const error = new Error("Not Found");
    Logging.error(error);
    return res.status(404).json({ message: error.message });
  });

  // creating server
  http.createServer(router).listen(config.server.port, () => {
    Logging.info(`Server is ruiing on port ${config.server.port}.`);
  });
};
