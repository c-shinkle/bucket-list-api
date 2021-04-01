import express from "express";
import server from "../api/server";
const port = process.env.port || 8000;

server.listen(port, () => console.log(`Application listening on port ${port}!`))
