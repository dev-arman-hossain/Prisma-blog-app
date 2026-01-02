import express from 'express';
import { postRouter } from './modules/post/post.router';
import { toNodeHandler } from "better-auth/node";
import { auth } from './lib/auth';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(cors({
    origin: process.env.BETTER_AUTH_URL as string,
    credentials: true
}));

app.all('/api/auth/*splat', toNodeHandler(auth));

app.use(express.json());
app.use('/posts', postRouter);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

export default app;