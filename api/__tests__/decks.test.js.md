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
});

// post to /

// delete /:id

// patch /:id

// get /:id

// get / index
