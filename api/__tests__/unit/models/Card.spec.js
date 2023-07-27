const Card = require("../../../models/Card");

const db = require("../../../database/connect");

describe("Card", () => {
  beforeEach(() => jest.clearAllMocks());

  afterAll(() => jest.resetAllMocks());

  describe("getAll", () => {
    test("it resolves with cards on successful db query", async () => {
      jest.spyOn(db, "query").mockResolvedValueOnce({
        rows: [
          {
            card_id: 1,
            deck_id: 1,
            question: "question1",
            answer: "answer1",
            image: "image1",
          },
          {
            card_id: 2,
            deck_id: 1,
            question: "question2",
            answer: "answer2",
            image: "image2",
          },
          {
            card_id: 3,
            deck_id: 2,
            question: "question1",
            answer: "answer1",
            image: "image1",
          },
        ],
      });
      const all = await Card.getAll();
      expect(all).toHaveLength(3);
    });
  });

  describe("findById", () => {
    test("it resolves with Card on successful db query", async () => {
      let cardData = {
        card_id: 1,
        deck_id: 1,
        question: "question1",
        answer: "answer1",
        image: "image1",
      };
      jest.spyOn(db, "query").mockResolvedValueOnce({ rows: [cardData] });

      const result = await Card.getOneById(1);
      expect(result).toBeInstanceOf(Card);
      expect(result.id).toBe(1);
    });
  });

  describe("create", () => {
    test("it resolves with Card on successful db query", async () => {
      let cardData = {
        card_id: 1,
        deck_id: 1,
        question: "question1",
        answer: "answer1",
        image: "image1",
      };

      jest
        .spyOn(db, "query")
        .mockResolvedValueOnce({ rows: [{ ...cardData }] });

      const result = await Card.create(cardData);
      expect(result).toHaveProperty("question");
    });
  });

  describe("update", () => {
    test("it resolves with Card on successful db query", async () => {
      const cardData = {
        card_id: 1,
        deck_id: 1,
        question: "new question",
        answer: "new answer",
        image: "image2",
      };

      jest
        .spyOn(db, "query")
        .mockResolvedValueOnce({ rows: [{ ...cardData }] });

      const result = await Card.prototype.update(cardData);
      expect(result).toHaveProperty("question");
    });
  });

  describe("destroy", () => {
    test("it resolves with deleted: true on successful db query", async () => {
      const cardData = {
        card_id: 1,
        deck_id: 1,
        question: "question 1",
        answer: "answer 1",
        image: "image2",
      };

      //create instance of the deck
      const cardInstance = new Card(cardData);

      jest.spyOn(db, "query").mockResolvedValueOnce({ rowCount: 1 });
      const result = await cardInstance.destroy();
      expect(result).toEqual({ deleted: true });
    });
  });
});
