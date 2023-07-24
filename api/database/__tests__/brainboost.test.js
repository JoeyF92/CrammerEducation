const db = require("../connect");
const app = require("../../app");
const { Pool } = require("pg");
const pool = require("../connect");

//test that jest works
describe("Jest Test", () => {
  it("Should work", () => {
    const result = 1 + 1;
    expect(result).toBe(2);
  });
});

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

  // write all tests in here:

  //login functionality:
  describe("Login functionality", () => {});

  describe("General app functionality", () => {});
});
