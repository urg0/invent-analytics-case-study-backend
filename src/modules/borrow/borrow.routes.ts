import { Router } from "express";
import * as BorrowController from "./borrow.controller";

const router = Router();

router.post("/:userId/borrow/:bookId", BorrowController.borrowBook);
router.post("/:userId/return/:bookId", BorrowController.returnBook);

export default router;
