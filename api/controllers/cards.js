const Card = require("../models/Card");

async function index(req, res) {
  try {
    const deckId = parseInt(req.params.id);
    if (isNaN(deckId)) {
      return res.status(400).json({ error: "Invalid deck ID." });
    }

    const cards = await Card.getAll(deckId);
    res.status(200).json(cards);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function show(req, res) {
  try {
    const id = parseInt(req.params.id);
    const card = await Card.getOneById(id);
    res.status(200).json(card);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

async function create(req, res) {
  try {
    const card = await Card.create(req.body);
    res.status(201).json(card);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

async function destroy(req, res) {
  try {
    const id = parseInt(req.params.id);
    const card = await Card.getOneById(id);
    const deletionResult = await card.destroy();
    if (deletionResult.deleted) {
      res.status(204);
    } else {
      res.status(404).json({ error: "Card not found." });
    }
  } catch (err) {
    console.error("Error during deletion:", err);
    res.status(500).json({ error: err.message });
  }
}

async function update(req, res) {
  try {
    const id = parseInt(req.params.id);
    const data = req.body;
    const card = await Card.getOneById(id);
    const result = await card.update(data);
    res.status(200).json(result);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

module.exports = { index, show, create, destroy, update };
