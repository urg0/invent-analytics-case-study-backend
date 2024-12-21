import { Router } from "express";
import UserRoutes from "../modules/user/user.routes";
import BookRoutes from "../modules/book/book.routes";

const router = Router();

router.use("/users", UserRoutes);
router.use("/books", BookRoutes);

export default router;
