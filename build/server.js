"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("./config/config");
const Loging_1 = __importDefault(require("./library/Loging"));
const Author_1 = __importDefault(require("./routes/Author"));
const Book_1 = __importDefault(require("./routes/Book"));
const router = (0, express_1.default)();
mongoose_1.default
    .connect(config_1.config.mongo.url)
    .then(() => {
    Loging_1.default.info("connected");
    StartServer();
})
    .catch((err) => {
    Loging_1.default.error(err);
});
const StartServer = () => {
    // Log the request.
    router.use((req, res, next) => {
        Loging_1.default.info(`Incomming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}]`);
        res.on("finish", () => {
            Loging_1.default.info(`Incomming => Method: [${req.method}] - Url: [${req.url}] - IP [${req.socket.remoteAddress}] - Status: [${res.statusCode}]`);
        });
        next();
    });
    router.use(express_1.default.urlencoded({ extended: true }));
    router.use(express_1.default.json());
    //Api rules
    router.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, content-Type, Accept, Authorization");
        if (req.method == "OPTIONS") {
            res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
            return res.status(200).json({});
        }
        next();
    });
    //Routes
    router.use("/authors", Author_1.default);
    router.use("/books", Book_1.default);
    //Pinging
    router.get("/ping", (req, res) => {
        res.status(200).json({ message: "ping" });
    });
    // error handling
    router.use((req, res) => {
        const error = new Error("Not Found");
        Loging_1.default.error(error);
        return res.status(404).json({ message: error.message });
    });
    // creating server
    http_1.default.createServer(router).listen(config_1.config.server.port, () => {
        Loging_1.default.info(`Server is ruiing on port ${config_1.config.server.port}.`);
    });
};
