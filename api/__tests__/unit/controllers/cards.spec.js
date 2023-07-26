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
      let cards = [
        {
          deck_id: 1,
          question: "Test Question",
          answer: "Test Answer",
          likes: 0,
          image: "card1 image",
        },
      ];
      jest.spyOn(Card, "getAll").mockResolvedValue(cards);
      const mockReq = { params: { id: 1 } };
      await cardsController.index({ mockReq }, mockRes);
      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledWith(cards);
    });
  });
});
