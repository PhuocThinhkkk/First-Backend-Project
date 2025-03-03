import { Router } from "express";

const userRouter = Router();

userRouter.get('/', (req, res) => {
  res.send({ title : "GET all users" });
});

userRouter.get('/users/:id', (req, res) => {
    res.send({ title : "GET user detail" });
});

userRouter.post("/", (req, res) => {
    res.send({ title : "CREATE user" });
});

userRouter.put('/users:id', (req, res) => {
    res.send({ title : "UPDATE user" });
});

userRouter.delete('/users:id', (req, res) => {
    res.send({ title : "DELETE user" });
});

export default userRouter;

