const { Router } = require("express");

const deckController = require("../controllers/decks.js");

const deckRouter = Router();

deckRouter.get("/", deckController.index);
deckRouter.post("/", deckController.create);
deckRouter.delete("/:id", deckController.destroy);
deckRouter.patch("/:id", deckController.update);
deckRouter.get("/:id", deckController.show);

module.exports = deckRouter;
