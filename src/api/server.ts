import express from "express";
const server = express();

server.get('/', (_, res: express.Response): void => {
    res.send('Hello, World!');
});

server.get('/ben', (_, res: express.Response): void => {
    res.send('Hello, Ben!');
});

export default server;