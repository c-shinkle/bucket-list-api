import express from "express";
const server = express();

server.get('/', (_, res: express.Response): void => {
    res.send('Hello, World!');
});

export default server;