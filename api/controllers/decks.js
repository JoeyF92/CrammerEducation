const Deck = require("../models/Decks.js");

async function index(req, res) {
  try {
    const decks = await Deck.getAll();
    res.status(200).json(decks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function show(req, res) {
  try {
    const id = parseInt(req.params.id);
    const deck = await Deck.getOneById(id);
    res.status(200).json(deck);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

async function create(req, res) {
  try {
    const deck = await Deck.create(req.body);
    res.status(201).json(deck);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

async function update(req, res) {
  try {
    const id = parseInt(req.params.id);
    const data = req.body;
    const deck = await Deck.getOneById(id);
    const result = await deck.update(data);
    res.status(200).json(result);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

async function destroy(req, res) {
  try {
    const id = parseInt(req.params.id);
    const deck = await Deck.getOneById(id);
    await deck.destroy();
    res.sendStatus(204);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

module.exports = {
  index,
  show,
  update,
  create,
  destroy,
};
