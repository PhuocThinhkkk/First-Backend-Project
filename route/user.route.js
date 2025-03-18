import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";

import { getAllUsers, getUserById } from "../controller/user.controller.js";

const userRouter = Router();

userRouter.get('/', getAllUsers );

userRouter.get('/:id', authMiddleware, getUserById );

userRouter.post("/", (req, res) => {
    res.send({ title : "CREATE " });
});

userRouter.put('/users:id', (req, res) => {
    res.send({ title : "UPDATE user" });
});

userRouter.delete('/users:id', (req, res) => {
    res.send({ title : "DELETE user" });
});

export default userRouter;

