import express from "express";
import controller from "../controllers/Book";
import { Schemas, ValidationSchema } from "../middleware/ValidateSchema";
const router = express.Router();

router.post(
  "/create",
  ValidationSchema(Schemas.book.create),
  controller.createBook
);
router.get("/get/:bookId", controller.readBook);
router.get("/get/", controller.readAll);
router.patch(
  "/update/:bookId",
  ValidationSchema(Schemas.book.update),
  controller.updateBook
);
router.delete("/delete/:bookId", controller.deleteBook);

export default router;
