const app = require("../../app");
const request = require("supertest");
describe("api server", () => {
let api;

beforeAll(() => {
api = app.listen(5000, () => {
console.log("Test server running on port 5000");
});
});

afterAll((done) => {
console.log("Stopping test server");
api.close(done);
});

test("it responds to a get/ with status 200", (done) => {
//request the api and get the first get route
request(api).get("/").expect(200, done);
});

});

// post to /

// delete /:id

// patch /:id

// get /:id

// get / index
