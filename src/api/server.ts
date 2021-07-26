import express, {Request, Response} from "express";
import { Dictionary } from "lodash";

const server = express();

const database: Dictionary<string[]> = {
    '1': ['Visit Paris', 'Taste French Wine', 'Visit German Castles', 'Remember those who have fallen at Normandy'],
    '2': ['Climb Mount Everest', 'Scuba Dive in the Great Barrier Reef']
}

server.get('/bucket-list/:id', (req: Request, res: Response): void => {
    const maybeBucketList = database[req.params.id];
    if (maybeBucketList) {
        res.header("Access-Control-Allow-Origin", "*");
        res.send(maybeBucketList);
    } else {
        res.status(404).send("Not Found");
    }
});

export default server;