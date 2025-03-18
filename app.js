import express from 'express';
import { PORT } from './config/env.js';

import userRouter from './route/user.route.js';
import authRouter from './route/auth.route.js';
import connectToDatabase from './database/mongodb.js';
import errorMiddleware from './middlewares/error.middlewares.js';
import cookieParser from 'cookie-parser';


import { arcjetMiddleWare } from './middlewares/arcjet.middleware.js';

import './utils/shutdown.js'


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(arcjetMiddleWare);

app.use('/api/v1/user', userRouter);
app.use('/api/v1/auth', authRouter);

app.get('/', (req, res) => {
  res.send('Bye World');
});

app.use(errorMiddleware);

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT} http://localhost:${PORT}`);
    await connectToDatabase();
});

export default app;