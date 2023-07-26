const decksController = require("../../../controllers/decks");
const Decks = require("../../../models/Decks");

const mockSend = jest.fn();
const mockJson = jest.fn();

const mockStatus = jest.fn((code) => ({
  send: mockSend,
  json: mockJson,
  end: jest.fn(),
}));

const mockRes = { status: mockStatus };

describe("Decks controller", () => {
  beforeEach(() => jest.clearAllMocks());

  afterAll(() => jest.resetAllMocks());

  describe("index", () => {
    test("it returns Decks with a 200 status code", async () => {
      let decks = [
        {
          id: 1,
          name: "Biology Flashcards",
          subject: "Biology",
          tags: ["biology", "science"],
          likes: 0,
          image: "deck1 image",
          user_id: 1,
        },
      ];
      jest.spyOn(Decks, "getAll").mockResolvedValue(decks);
      await decksController.index(null, mockRes);
      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledWith(decks);
    });
  });
  describe("show", () => {
    test("it returns a deck with an id with a 200 status code", async () => {
      let deckId = "1"; // Set the deckId as a string
      let deck = [
        {
          id: 1,
          name: "Biology Flashcards",
          subject: "Biology",
          tags: ["biology", "science"],
          likes: 0,
          image: "deck1 image",
          user_id: 1,
        },
      ];
      jest.spyOn(Decks, "getOneById").mockResolvedValue(deck);
      const mockReq = {
        params: {
          id: deckId, // Pass the deckId as a string
        },
      };
      await decksController.show(mockReq, mockRes);
      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledWith(deck);
    });
  });

  describe("create", () => {
    test("it returns a new deck with a 201 status code", async () => {
      let testDeck = {
        deck_id: 3,
        deck_name: "Test Deck",
        subject: "Test",
        tags: ["test1", "test2"],
        likes: 0,
        image: "test image",
        user_id: 1,
      };

      jest.spyOn(Decks, "create").mockResolvedValue(new Decks(testDeck));

      const mockReq = { body: testDeck };
      await decksController.create(mockReq, mockRes);
      expect(mockStatus).toHaveBeenCalledWith(201);
      expect(mockJson).toHaveBeenCalledWith(new Decks(testDeck));
    });
  });

  // describe("destroy", () => {
  //   test("it returns a 204 status code on successful deletion", async () => {
  //     const mockDeck = new Deck({
  //       /* Provide necessary properties */
  //     });
  //     jest.spyOn(Decks.prototype, "destroy").mockResolvedValue(mockDeck);

  //     const mockReq = { params: { id: 1 } };
  //     await decksController.destroy(mockReq, mockRes);
  //     expect(mockStatus).toHaveBeenCalledWith(204);
  //   });
  // });
});
