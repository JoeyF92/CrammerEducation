const User = require("../models/User");
const bcrypt = require("bcrypt");
const Token = require("../models/Token");

async function register(req, res) {
  try {
    const data = req.body;
    const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_ROUNDS));
    console.log(salt);

    data.password = await bcrypt.hash(data.password, salt);

    const result = await User.create(data);

    res.status(201).send(result);
  } catch (err) {
    console.error("Registration error:", err);
    res.status(400).send({ error: "Could not register" });
  }
}

async function login(req, res) {
  try {
    const data = req.body;
    const user = await User.getOneByEmail(data.email);
    const authenticated = await bcrypt.compare(data.password, user.password);

    if (!authenticated) {
      throw new Error("Password does not match");
    } else {
      const token = await Token.create(user.id);
      res.status(200).send({ authenticated: true, token: token });
    }
  } catch (err) {
    res.status(401).send({ error: "Could not log in" });
  }
}

async function destroy(req, res) {
  try {
    const id = parseInt(req.params.id);
    const user = await User.getOneById(id);
    const result = await user.destroy();
    res.sendStatus(204);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

async function update(req, res) {
  try {
    const id = parseInt(req.params.id);
    const data = req.body;
    const user = await User.getOneById(id);
    const result = await user.update(data);
    res.status(200).json(result);
  } catch (err) {
    res.status(404).send({ error: err.message });
  }
}

async function show(req, res) {
  try {
    const id = parseInt(req.params.id);
    const user = await User.getOneById(id);
    res.json(user);
  } catch (err) {
    res.status(404).send({ error: err.message });
  }
}

async function getLiked(req, res) {
  const id = req.params.id;
  try {
    const likedDecks = await User.getLiked(id);
    res.status(200).json(likedDecks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

const likeUnlikeDeck = async (req, res) => {
  const userId = req.params.userId;
  const deckId = parseInt(req.params.deckId);

  try {
    const user = await User.getOneById(userId);

    // Check if the user has already liked the deck
    const isLiked = user.liked? user.liked.includes(deckId) : false;

    if (isLiked) {
      // User has liked the deck, so unlike it
      await User.updateUserLiked(userId, deckId, false);
      res.status(200).json({ message: "Deck unliked successfully." });
    } else {
      // User has not liked the deck, so like it
      await User.updateUserLiked(userId, deckId, true);
      res.status(200).json({ message: "Deck liked successfully." });
    }
    console.log(user.liked)
  } catch (error) {
    console.error("Error liking/unliking deck.", error);
    res.status(500).json({ error: "Unable to like/unlike deck." });
  }
};


module.exports = { register, login, destroy, update, show, getLiked, likeUnlikeDeck };
