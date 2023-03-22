import app from "../../src/server/app"
import * as request from "supertest"
import { describe } from "node:test"

describe("GET", () => {
    it("Hello API Request", async () => {
        const result = await request(app).get("/time").query({lat: 0, long: 0})
        expect(result.statusCode).toEqual(200)
    });
})