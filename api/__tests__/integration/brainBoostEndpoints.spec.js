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
    expect(res.body[0]).toEqual({
      id: 1,
      name: "Biology Flashcards",
      subject: "Biology",
      tags: ["biology", "science"],
      likes: 0,
      image: "deck1 image",
      user_id: 1,
    });
  });

  it("should create a new deck", async () => {
    const newDeck = {
      deck_name: "History Revision",
      subject: "History",
      tags: ["History", "Humanities"],
      likes: 0,
      image: "example-image",
      user_id: 1,
    };

    const res = await request(api).post("/decks/").send(newDeck);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual({
      id: 2,
      image: "example-image",
      likes: 0,
      name: "History Revision",
      subject: "History",
      tags: ["History", "Humanities"],
      user_id: 1,
    });
  });

  it("should delete a new deck", async () => {
    // Delete associated cards first
    await request(api).delete("/decks/1/cards/1");
    //now try delete deck
    const res = await request(api).delete("/decks/1");
    expect(res.statusCode).toEqual(204);
  });

  it("should retrieve a deck", async () => {
    const res = await request(api).get("/decks/1");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({
      id: 1,
      name: "Biology Flashcards",
      subject: "Biology",
      tags: ["biology", "science"],
      likes: 0,
      image: "deck1 image",
      user_id: 1,
    });
  });
});

// deckRouter.get("/:id", deckController.show);
