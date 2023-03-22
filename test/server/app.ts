import app from "../../src/server/app"
import * as request from "supertest"
import { describe } from "node:test"
import { expect, test } from "@jest/globals"
import "../helpers/toBeDate"

const exampleQuery = {
    lat: 0,
    long: 0
}
const exampleQueryWithDate = {
    lat: 0, 
    long: 0, 
    date: '2021-10-20'
}
const exampleResponse = {
    solarNoon: "2023-03-22T12:08:17.611Z",
    nadir: "2023-03-22T00:08:17.611Z",
    sunrise: "2023-03-22T06:04:57.684Z",
    sunset: "2023-03-22T18:11:37.539Z",
    sunriseEnd: "2023-03-22T06:07:05.609Z",
    sunsetStart: "2023-03-22T18:09:29.614Z",
    dawn: "2023-03-22T05:44:17.560Z",
    dusk: "2023-03-22T18:32:17.663Z",
    nauticalDawn: "2023-03-22T05:20:17.508Z",
    nauticalDusk: "2023-03-22T18:56:17.715Z",
    nightEnd: "2023-03-22T04:56:17.453Z",
    night: "2023-03-22T19:20:17.770Z",
    goldenHourEnd: "2023-03-22T06:32:17.663Z",
    goldenHour: "2023-03-22T17:44:17.560Z"
  }


describe("/time GET returns 200 with valid parameters", () => {
    it.each([
        exampleQuery,
        exampleQueryWithDate
    ])("Returns 200 status code", async (testQuery) => {
        const result = await request(app).get("/time").query(testQuery)
        expect(result.statusCode).toEqual(200)
    });
})

describe("/time GET returns object with time information", () => {
    it.each([
        exampleQuery,
        exampleQueryWithDate
    ])("Returns a response with a body", async (testQuery) => {
        const result = await request(app).get("/time").query(testQuery)
        expect(result.body).toBeDefined()
    })
    it.each([
        exampleQuery,
        exampleQueryWithDate
    ])("Returns a body with timing properties", async (testQuery) => {
        const result = await request(app).get("/time").query(testQuery)
        for (var prop in exampleResponse){
            expect(result.body).toHaveProperty(prop)
        }
    })
    it.each([
        exampleQuery,
        exampleQueryWithDate
    ])("Returns a body with timing properties mapped to date-time", async (testQuery) => {
        const result = await request(app).get("/time").query(testQuery)
        for (var prop in exampleResponse){
            expect(result.body[prop]).toBeDate()
        }
    })
})
