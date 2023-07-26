const Deck = require("../../../models/Decks");

const db = require("../../../database/connect");

describe("Deck", () => {
  beforeEach(() => jest.clearAllMocks());

  afterAll(() => jest.resetAllMocks());

  describe("getAll", () => {
    test("it resolves with decks on successful db query", async () => {
      jest.spyOn(db, "query").mockResolvedValueOnce({
        rows: [
          {
            deck_id: 1,
            deck_name: "deck1",
            subject: "test1",
            tags: '{"testsubject1", "testsubject2"}',
            likes: 0,
            image: "image1",
            user_id: 1,
          },
          {
            deck_id: 2,
            deck_name: "deck1",
            subject: "test2",
            tags: '{"testsubject1", "testsubject2"}',
            likes: 0,
            image: "image2",
            user_id: 2,
          },
          {
            deck_id: 3,
            deck_name: "deck1",
            subject: "test3",
            tags: '{"testsubject1", "testsubject2"}',
            likes: 0,
            image: "image3",
            user_id: 1,
          },
        ],
      });
      const all = await Deck.getAll();
      expect(all).toHaveLength(3);
    });
  });

  describe("findById", () => {
    test("it resolves with Deck on successful db query", async () => {
      let deckData = {
        deck_id: 1,
        deck_name: "deck1",
        subject: "test1",
        tags: '{"testsubject1", "testsubject2"}',
        likes: 0,
        image: "image1",
        user_id: 1,
      };
      jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [deckData] });

      const result = await Deck.getOneById(1);
      expect(result).toBeInstanceOf(Deck);
      expect(result.id).toBe(1);
    });
  });

  describe("create", () => {
    test("it resolves with Deck on successful db query", async () => {
      let deckData = {
        deck_id: 1,
        deck_name: "deck1",
        subject: "test1",
        tags: '{"testsubject1", "testsubject2"}',
        likes: 0,
        image: "image1",
        user_id: 1,
      };

      jest
        .spyOn(db, "query")
        .mockResolvedValueOnce({ rows: [{ ...deckData }] });
      jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [deckData] });

      const result = await Deck.create(deckData);
      expect(result).toHaveProperty("name");
    });
  });

  describe("update", () => {
    test("it resolves with Deck on successful db query", async () => {
      const insertDeckData = {
        isLiked: true,
        deck_id: 1,
      };
      const returnedDeckData = {
        deck: {
          deck_id: 1,
          likes: 1,
        },
      };

      jest
        .spyOn(db, "query")
        .mockResolvedValueOnce({ rows: [{ ...returnedDeckData }] });
      //   jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [deckData.deck] });

      const result = await Deck.prototype.update(insertDeckData);
      expect(result).toHaveProperty("likes");
    });
  });

  describe("destroy", () => {
    test("it resolves with Deck on successful db query", async () => {
      const deckData = {
        deck_id: 1,
        deck_name: "deck1",
        subject: "test1",
        tags: '{"testsubject1", "testsubject2"}',
        likes: 0,
        image: "image1",
        user_id: 1,
      };
      //create instance of the deck
      const deckInstance = new Deck(deckData);

      jest.spyOn(db, "query").mockResolvedValueOnce({ rowCount: 1 });
      const result = await deckInstance.destroy();
      expect(result).toEqual({ deleted: true });
    });
  });
});
