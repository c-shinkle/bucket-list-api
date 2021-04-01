import request from "supertest";
import server from "./server";

describe('GET /hello', () => {
    it('should return 200 & body message', async done => {
        request(server)
            .get('/')
            .expect(200)
            .end((err, res) => {
                if (err)
                    return done(err);
                expect(res.text).toEqual('Hello, World!');
                done();
            })
    });
});
