import express, { Request, Response, Application } from 'express';
import http from 'http'
import { Server } from 'socket.io'
import { EVENT_TYPES } from './event-types.enum';

const APP: Application = express();
const PORT: string | undefined | 8000 = process.env.PORT || 8000;
const HTTP = new http.Server(APP);
const CONNECTIONURL: string = '';
const SOCKETIO = new Server(HTTP, {
    cors: {
        origin: CONNECTIONURL,
        methods: ["GET", "POST"]
    }
});

APP.get("/", (req: Request, res: Response): void => {
    res.send("Hello Typescript with Node.js!")
});

APP.listen(PORT, (): void => {
    console.log(`Server Running here 👉 https://localhost:${PORT}`);
});

SOCKETIO.on(EVENT_TYPES.connection, (socket) => {
    socket.emit(EVENT_TYPES.connectionSuccess, sum(1, 2));
});

function sum(num1: number, num2: number): number {
    return num1 + num2;
}

console.log(sum(8, 6));