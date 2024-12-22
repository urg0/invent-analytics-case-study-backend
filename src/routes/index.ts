import { Router } from "express";
import UserRoutes from "../modules/user/user.routes";
import BookRoutes from "../modules/book/book.routes";
import BorrowRoutes from "../modules/borrow/borrow.routes";

const router = Router();

router.use("/users", UserRoutes);
router.use("/books", BookRoutes);
router.use("/", BorrowRoutes);

export default router;
