import express from "express";
import controller from "../controllers/Author";
import { Schemas, ValidationSchema } from "../middleware/ValidateSchema";

const router = express.Router();

router.post(
  "/create",
  ValidationSchema(Schemas.author.create),
  controller.createAuthor
);
router.get("/get/:authorId", controller.readAuthor);
router.get("/get/", controller.readAll);
router.patch(
  "/update/:authorId",
  ValidationSchema(Schemas.author.update),
  controller.updateAuthor
);
router.delete("/delete/:authorId", controller.deleteAuthor);

export default router;
