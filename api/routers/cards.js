const { Router } = require("express");
const cardsController = require("../controllers/cards.js");

const cardsRouter = Router({ mergeParams: true });

cardsRouter.get("/", cardsController.index);
cardsRouter.get("/:id", cardsController.show);
cardsRouter.post("/", cardsController.create);
cardsRouter.delete("/:id", cardsController.destroy);
cardsRouter.patch("/:id", cardsController.update);

module.exports = cardsRouter;
