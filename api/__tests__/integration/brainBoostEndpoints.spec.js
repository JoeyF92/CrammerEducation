const {
  createDbEnv,
  populateDbEnv,
  destroyDbEnv,
} = require("../../database/setup-test-db");

describe("BrainBoost endpoints", () => {
  let api;

  beforeEach(async () => {
    await createDbEnv();
    await populateDbEnv();
  });

  afterEach(async () => {
    await destroyDbEnv();
  });

  beforeAll(async () => {
    api = app.listen(5002, () =>
      console.log("Test server running on port 5002")
    );
  });

  afterAll(async () => {
    console.log("Gracefully stopping test server");
    await api.close();
  });

  it("should retrieve all decks", async () => {
    const res = await request(api).get("/decks/");
    expect(res.statusCode).toEqual(200);
    // expect(res.body.name).toEqual("Peanuts");
  });
});
