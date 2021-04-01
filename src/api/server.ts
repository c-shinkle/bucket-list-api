import express from "express";
const server = express();

server.get('/', (_, res: express.Response): void => {
    res.send({ 'message': 'Hello, stranger!' });
});

export default server;