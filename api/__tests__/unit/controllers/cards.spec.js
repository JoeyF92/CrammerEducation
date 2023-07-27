const cardsController = require("../../../controllers/cards");
const Card = require("../../../models/Card");

const mockSend = jest.fn();
const mockJson = jest.fn();

const mockStatus = jest.fn((code) => ({
  send: mockSend,
  json: mockJson,
  end: jest.fn(),
}));

const mockRes = { status: mockStatus };

describe("Cards controller", () => {
  beforeEach(() => jest.clearAllMocks());

  afterAll(() => jest.resetAllMocks());

  describe("index", () => {
    test("it returns cards with a 200 status code", async () => {
      const cards = [
        {
          card_id: 1,
          deck_id: 1,
          question: "Test Question",
          answer: "Test Answer",
          likes: 0,
          image: "card1 image",
        },
        {
          card_id: 2,
          deck_id: 1,
          question: "Test Question2",
          answer: "Test Answer2",
          likes: 0,
          image: "card2 image",
        },
      ];
      jest.spyOn(Card, "getAll").mockResolvedValue(cards);
      const mockReq = { params: { id: 1 } };
      await cardsController.index(mockReq, mockRes);
      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledWith(cards);
    });
  });

  describe("show", () => {
    test("it returns a card with an id with a 200 status code", async () => {
      let card = [
        {
          card_id: 1,
          deck_id: 1,
          question: "Test Question",
          answer: "Test Answer",
          likes: 0,
          image: "card1 image",
        },
      ];
      jest.spyOn(Card, "getOneById").mockResolvedValue(card);
      const mockReq = {
        params: {
          id: 1,
        },
      };
      await cardsController.show(mockReq, mockRes);
      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledWith(card);
    });
  });

  describe("create", () => {
    test("it returns a new card with a 201 status code", async () => {
      let card = [
        {
          card_id: 1,
          deck_id: 1,
          question: "Test Question",
          answer: "Test Answer",
          likes: 0,
          image: "card1 image",
        },
      ];

      jest.spyOn(Card, "create").mockResolvedValue(new Card(card));

      const mockReq = { body: card };
      await cardsController.create(mockReq, mockRes);
      expect(mockStatus).toHaveBeenCalledWith(201);
      expect(mockJson).toHaveBeenCalledWith(new Card(card));
    });
  });

  describe("destroy", () => {
    test("it returns a 204 status code on deletion of card", async () => {
      let card = {
        card_id: 1,
        deck_id: 1,
        question: "Test Question",
        answer: "Test Answer",
        likes: 0,
        image: "card1 image",
      };
      const mockReq = {
        params: {
          id: 1,
        },
      };
      // Mock the getOneById method
      jest.spyOn(Card, "getOneById").mockResolvedValue(new Card(card));
      // Mock the destroy method - we use prototype as its an instance method
      jest
        .spyOn(Card.prototype, "destroy")
        .mockResolvedValue({ deleted: true });
      await cardsController.destroy(mockReq, mockRes);
      expect(mockStatus).toHaveBeenCalledWith(204);
    });
  });

  describe("update", () => {
    test("it returns a 200 status on successful update", async () => {
      const card = [
        {
          card_id: 1,
          deck_id: 1,
          question: "Test Question",
          answer: "Test Answer",
          likes: 0,
          image: "card1 image",
        },
      ];
      const cardUpdate = [
        {
          card_id: 1,
          deck_id: 1,
          question: "Test Question",
          answer: "Test Answer",
          likes: 1,
          image: "card1 image",
        },
      ];

      jest.spyOn(Card, "getOneById").mockResolvedValue(new Card(card));

      jest
        .spyOn(Card.prototype, "update")
        .mockResolvedValue(new Card(cardUpdate));

      const mockReq = { params: cardUpdate };

      await cardsController.update(mockReq, mockRes);

      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledWith(new Card(cardUpdate));
    });
  });
});
