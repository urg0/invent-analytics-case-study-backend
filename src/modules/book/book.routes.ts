import { Router } from "express";
import * as BookController from "./book.controller";

const router = Router();

router.get("/", BookController.getBooks);
router.get("/:id", BookController.getBookById);

export default router;
